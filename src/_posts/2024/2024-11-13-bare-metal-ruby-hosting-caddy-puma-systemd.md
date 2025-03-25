---
title: "Hosting a Ruby/Roda app on bare metal with Caddy, Puma and systemd"
layout: post
---

For years, I've been using [traefik](https://traefik.io) as a reverse proxy. It was configured to tap into the docker socket and route requests to appropriate containers using docker labels.

While this setup has served me well, I was ready to explore something new. 

I'd been hearing great things about [Caddy](https://caddyserver.com) and wanted to give it a try. Inspired by DHH's notable departure from cloud services, I decided to host my Roda app on "bare metal" (specifically, a VPS with ARM) using Caddy and Puma.

## Preparing debian for ruby

APT packages:

```bash
sudo apt-get update
sudo apt install -y \
  build-essential \
  direnv \
  fail2ban \
  fonts-firacode \
  git \
  libcurl4-openssl-dev \
  libffi-dev \
  libjemalloc2 \
  libpq-dev \
  libreadline-dev \
  libsqlite3-dev \
  libssl-dev \
  libxml2-dev \
  libxslt1-dev \
  libyaml-dev \
  neovim \
  postgresql-common \
  postgresql-16 \
  slirp4netns \
  software-properties-common \
  sqlite3 \
  ufw \
  uidmap \
  zlib1g-dev \
  zsh
```

## Securing the server

For more detailed information, check out [this guide](https://www.simon-neutert.de/2022/setup-vps/).

### 1. SSH login with keys only

Security best practice: Always use SSH keys instead of password authentication.

### 2. Fail2ban on Debian

Fail2ban requires a simple setup step on Debian:

```bash
$ sudo touch /var/log/auth.log
```

### 3. UFW

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw show added
sudo ufw enable
```

### 4. Setting up a comfortable environment

Before proceeding further, reboot your server.

I took some time to make the server environment more developer-friendly by installing:

- `zsh` as the default shell instead of `bash`, with useful configurations:
  - `setopt autocd` for easier directory navigation
  - `setopt share_history` for shared command history
  - `setopt HIST_IGNORE_ALL_DUPS` to maintain a clean command history
- Modern CLI tools:
  - `zoxide` for smarter directory navigation
  - `eza` as a modern replacement for `ls`
  - [starship](https://starship.rs) for an enhanced prompt
  - `atuin` for shell history management
  - `neovim` as the text editor
- ZSH enhancements:
  - zsh-autocomplete
  - zsh-autosuggestions
  - zsh-syntax-highlighting
- Development tools:
  - [just](https://github.com/casey/just) for command running
  - [asdf](https://asdf-vm.com) for version management
  - `direnv` for environment management
  - `httpie` for API testing

## Caddy

The Caddy installation process is straightforward and won't be covered here.

Here's the Caddyfile configuration for serving assets, static files, and vendor files:

```bash
this-is.myapp.com {
	handle /assets/* {
    root * /home/deploy/myapp/public/assets
    file_server
  }
  handle /vendor/* {
    root * /home/deploy/myapp/public/vendor
    file_server
  }
	handle {
		reverse_proxy :9292
	}
}
```

## ASDF

Initialize asdf with the necessary plugins (ymmv):

```bash
asdf plugin-add ruby
asdf plugin-add rust
asdf plugin-add deno
asdf plugin-add just
asdf install rust 1.72.1 && asdf global rust 1.72.1
export RUBY_CONFIGURE_OPTS=--enable-yjit # you WANT yjit!!!
cd /var/www/myapp/code && asdf install
```

## Systemd

Here's a template for environment variables in systemd (save as `puma.conf` - it is referenced in the systemd service file):

```bash
RUBY_YJIT_ENABLE=1
RUBY_CONFIGURE_OPTS="--enable-yjit --with-jemalloc --yjit-mem-size=256 --yjit-code-gc"
```

[YJIT docs](https://docs.ruby-lang.org/en/master/yjit/yjit_md.html#label-Examples)
☝️ For the `--yjit-mem-size` value and jemalloc configuration, consult the documentation and your specific needs.

Use `which bundler` to locate the bundler executable path. Adjust the following systemd service file according to your paths and user:

```bash
[Unit]    
Description=My angry little Puma HTTP Server    
After=network.target

[Service]
# Puma supports systemd's `Type=notify` and watchdog service
# monitoring, as of Puma 5.1 or later.
# On earlier versions of Puma or JRuby, change this to `Type=simple` and remove
# the `WatchdogSec` line.
Type=notify

# If your Puma process locks up, systemd's watchdog will restart it within seconds.
WatchdogSec=10

# Preferably configure a non-privileged user
# User=mynonsudouser

# The path to your application code root directory.
# Also replace the "<YOUR_APP_PATH>" placeholders below with this path.
WorkingDirectory=/var/www/myapp/code

# Helpful for debugging socket activation, etc.
# Environment=PUMA_DEBUG=1
EnvironmentFile=/home/mynonsudouser/puma.conf

# SystemD will not run puma even if it is in your path. You must specify
# an absolute URL to puma. For example /usr/local/bin/puma
ExecStart=/home/mynonsudouser/.asdf/shims/bundler exec puma -C /var/www/mynonsudouser/code/config/puma/production.rb -p9292
    
Restart=always    
    
[Install]    
WantedBy=multi-user.target
```

## systemctl

Finally, enable and start the service:

```bash
sudo systemctl enable puma.service
sudo systemctl start puma.service
```

🚀