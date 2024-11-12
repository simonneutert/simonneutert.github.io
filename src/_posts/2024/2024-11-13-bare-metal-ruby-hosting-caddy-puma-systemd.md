---
title: "Hosting a Ruby/Roda app on bare metal with Caddy, Puma and systemd"
layout: post
---

For the past years I've been using [traefik](https://traefik.io) as a reverse proxy. It was configured tapping the docker socket and routing requests to the appropriate container using docker labels.

It's been working great, but I've been wanting to try something new. 

I've been reading a lot of good things about [Caddy](https://caddyserver.com) and I wanted to give it a try. DHH left the cloud loudly, so I thought, why not use Caddy and Puma to host my Roda app on a "bare metal server" (a VPS with ARM)?

## Preparing debian for ruby

APT packages:

```sh
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

More on this [here](https://www.simon-neutert.de/2022/setup-vps/).

### 1. SSH login with keys only

Please, please, please, don't use password authentication. Use SSH keys. 

### 2. Fail2ban on Debian

fail2ban needs a little help to work on debian. 

```sh
$ sudo touch /var/log/auth.log`
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

### 4. wrap it up

Reboot the server now, before you proceed.

I took the time to make the server a happy place.

- `zsh` instead of `bash`
  - in .zshrc: `setopt autocd` (..)
  - `setopt share_history`
  - `setopt HIST_IGNORE_ALL_DUPS` # save only one command if 2 common are same and consistent
- zoxide
- `eza` instead of `ls`
- [starship](https://starship.rs)
- atuin
- neovim
- zsh-autocomplete
- zsh-autosuggestions
- zsh-syntax-highlighting
- [just](https://github.com/casey/just)
- [asdf](https://asdf-vm.com)
- direnv
- httpie

## Caddy

Installing caddy was straightforward and won't be covered here.

The Caddyfile is where the magic happens. To serve assets, static files and vendor files, I wrote the following configuration:

```Caddyfile
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

Here's how I initiated asdf with all plugins I needed:

```bash
asdf plugin-add ruby
asdf plugin-add rust
asdf plugin-add bun
asdf plugin-add just
asdf install rust 1.72.1 && asdf global rust 1.72.1
export RUBY_CONFIGURE_OPTS=--enable-yjit # you WANT yjit!!!
cd /var/www/myapp/code && asdf install
```

## Systemd

Here's an inspiration for environment variables in systemd (in a file called `puma.conf` below):

```env
RUBY_YJIT_ENABLE=1
RUBY_CONFIGURE_OPTS="--enable-yjit --with-jemalloc --yjit-mem-size=256"
```

☝️ Google yourself smart for the `--yjit-mem-size` value or if you want jemalloc or not.

By running `which bundler` you can find the path to the bundler executable.\
Adjust the paths and the user to your needs in your systemd service file.:

```systemd
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

```bash
sudo systemctl enable puma.service
sudo systemctl start puma.service
```

🚀
