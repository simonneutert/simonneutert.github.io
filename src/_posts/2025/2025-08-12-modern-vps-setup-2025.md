---
layout: post
title: "VPS Setup and Hardening in 2025: A No-Nonsense Guide"
categories: [server, security]
tags: [vps, debian, security, docker]
description: 🔒 Stop following outdated tutorials - here's how to properly secure a VPS in 2025
---

Your fresh Debian 12 VPS is sitting there, naked and vulnerable. Let's fix that with modern security practices that actually make sense in 2025.

This guide assumes you've got a fresh Debian 12 instance (though Ubuntu 24.04 LTS works too). We're going to harden it properly, remove the bloat, and set up a foundation you can actually build on.

## TL;DR: The Modern VPS Checklist

- ✅ Secure SSH with keys and modern algorithms
- ✅ Firewall with fail2ban and rate limiting  
- ✅ Automatic security updates
- ✅ Container runtime (Docker/Podman)
- ✅ Reverse proxy with automatic HTTPS
- ✅ System monitoring and log management
- ✅ Remove unnecessary services and packages

Let's dive in.

## Initial Hardening (Do This First!)

SSH into your fresh VPS as root and let's start with the basics:

```bash
# Update everything first
apt update && apt upgrade -y

# Install essential security tools
apt install -y ufw fail2ban unattended-upgrades apt-listchanges needrestart

# Remove bloat that you probably don't need
apt purge -y apache2* nginx* sendmail* postfix* bind9* 
apt autoremove -y && apt autoclean
```

**Why remove web servers?** You're going to run everything in containers behind a proper reverse proxy. Default web server installations are often misconfigured and create attack surfaces.

## Create Your Admin User (Properly)

```bash
# Create user with a strong shell and home directory
useradd -m -s /bin/bash -G sudo yourusername

# Set a temporary password (you'll disable this later)
passwd yourusername

# Switch to your user
su - yourusername
```

## SSH Hardening (2025 Edition)

Modern SSH security isn't just about disabling passwords - it's about using current cryptographic standards:

```bash
# Generate your SSH key locally (on your machine, not the server!)
# Use Ed25519 - it's faster and more secure than RSA
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy your public key to the server
ssh-copy-id -i ~/.ssh/id_ed25519.pub yourusername@your-server-ip
```

Now let's harden SSH configuration:

```bash
sudo nano /etc/ssh/sshd_config
```

Here's a modern SSH config that actually makes sense:

```bash
# /etc/ssh/sshd_config - Modern SSH hardening

# Network settings
Port 22
AddressFamily inet
ListenAddress 0.0.0.0

# Authentication
PermitRootLogin no
PasswordAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes

# Key-based auth only
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# Modern crypto only
KexAlgorithms curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com,hmac-sha2-256,hmac-sha2-512

# Security settings
X11Forwarding no
AllowTcpForwarding no
AllowAgentForwarding no
ClientAliveInterval 300
ClientAliveCountMax 2
MaxAuthTries 3
MaxStartups 2
LoginGraceTime 30

# Only allow your user
AllowUsers yourusername

# Logging
LogLevel VERBOSE
SyslogFacility AUTH
```

Restart SSH and test your connection:

```bash
sudo systemctl restart ssh
# Test in a new terminal - don't close your current session yet!
ssh yourusername@your-server-ip
```

## Firewall Setup (UFW with Intelligence)

UFW is fine, but let's configure it properly:

```bash
# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Essential services
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Rate limiting for SSH (blocks brute force)
sudo ufw limit ssh

# Enable logging
sudo ufw logging on

# Enable firewall
sudo ufw enable
```

## Fail2Ban Configuration (Actually Useful)

Default fail2ban is too permissive. Let's fix that, and handle the Debian-specific setup:

```bash
# Debian-specific: Create the auth log file if it doesn't exist
sudo touch /var/log/auth.log

sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
# Ban for 24 hours after 3 attempts in 10 minutes
bantime = 86400
findtime = 600
maxretry = 3

# Ignore your own IP (replace with your actual IP)
ignoreip = 127.0.0.1/8 YOUR.ACTUAL.IP.HERE

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 3
```

Start fail2ban:

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Automatic Security Updates (Set and Forget)

Configure unattended upgrades for security patches:

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

```bash
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
    "${distro_id}ESMApps:${distro_codename}-apps-security";
    "${distro_id}ESM:${distro_codename}-infra-security";
};

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

Enable it:

```bash
sudo systemctl enable unattended-upgrades
sudo systemctl start unattended-upgrades
```

## Modern Container Runtime

Skip Docker's convenience script - install properly:

```bash
# Add Docker's official GPG key
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add your user to docker group
sudo usermod -aG docker yourusername

# Configure Docker daemon for security
sudo nano /etc/docker/daemon.json
```

```json
{
  "log-driver": "journald",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "userland-proxy": false,
  "experimental": false,
  "live-restore": true
}
```

```bash
sudo systemctl restart docker
sudo systemctl enable docker
```

## Modern Reverse Proxy: Caddy

Forget Traefik complexity and nginx configuration hell. Caddy handles HTTPS automatically and makes reverse proxying actually pleasant:

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Create Caddyfile
sudo nano /etc/caddy/Caddyfile
```

```caddyfile
# /etc/caddy/Caddyfile
# Global options
{
    email your-email@example.com
    admin off
}

# Example site configuration with static asset handling
your-domain.com {
    # Handle static assets directly (faster than proxying)
    handle /assets/* {
        root * /var/www/your-app/public/assets
        file_server
    }
    
    handle /vendor/* {
        root * /var/www/your-app/public/vendor
        file_server
    }
    
    # Proxy everything else to your app
    handle {
        reverse_proxy localhost:3000
    }
    
    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options nosniff
        X-Frame-Options DENY
        X-XSS-Protection "1; mode=block"
        Referrer-Policy strict-origin-when-cross-origin
    }
    
    # Rate limiting
    rate_limit {
        zone static {
            key {remote_host}
            events 100
            window 1m
        }
    }
}
```

```bash
sudo systemctl enable caddy
sudo systemctl start caddy
```

## Developer Quality of Life Improvements

While you're setting up your VPS, make it actually pleasant to work with:

```bash
# Modern shell and tools
apt install -y zsh git curl wget neovim htop

# Change to zsh (optional but recommended)
chsh -s $(which zsh) yourusername

# Install modern CLI tools (optional but very nice)
# These make server administration much more pleasant
```

For the full developer experience, consider adding:
- **Starship prompt** for a modern shell prompt
- **Zoxide** for smarter `cd` command
- **Eza** as a modern `ls` replacement  
- **Just** for running project commands
- **ASDF** for version management (if you need multiple language versions)
- **Direnv** for per-directory environment variables

These aren't security essentials, but they make your VPS much more pleasant to work with day-to-day.

## System Monitoring (Know What's Happening)

Install basic monitoring tools:

```bash
# System monitoring
sudo apt install -y htop iotop nethogs ncdu

# Log management
sudo apt install -y logrotate rsyslog

# Configure logrotate for Docker
sudo nano /etc/logrotate.d/docker
```

```bash
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=1M
    missingok
    delaycompress
    copytruncate
}
```

## Final Security Tweaks

### Disable unused services:

```bash
# Check what's running
sudo systemctl list-unit-files --type=service --state=enabled

# Disable what you don't need (examples)
sudo systemctl disable bluetooth
sudo systemctl disable cups
sudo systemctl disable avahi-daemon
```

### Configure kernel parameters:

```bash
sudo nano /etc/sysctl.d/99-security.conf
```

```bash
# IP Spoofing protection
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Ignore ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# Ignore send redirects
net.ipv4.conf.all.send_redirects = 0

# Disable source packet routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Log Martians
net.ipv4.conf.all.log_martians = 1

# Ignore ping requests
net.ipv4.icmp_echo_ignore_all = 1

# Ignore Directed pings
net.ipv4.icmp_echo_ignore_broadcasts = 1
```

Apply the changes:

```bash
sudo sysctl -p /etc/sysctl.d/99-security.conf
```

## Example Application Deployment

Here's how to deploy a simple app with your new setup:

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    image: your-app:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "journald"
      options:
        tag: "your-app"

networks:
  default:
    driver: bridge
```

## Maintenance Commands You'll Actually Use

```bash
# Check security updates
sudo unattended-upgrade --dry-run

# View fail2ban status
sudo fail2ban-client status
sudo fail2ban-client status sshd

# Check firewall status
sudo ufw status verbose

# Monitor resource usage
htop
sudo iotop
sudo nethogs

# Check Docker container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# View logs
sudo journalctl -u caddy -f
sudo journalctl -u fail2ban -f
docker logs --tail 50 -f container-name
```

## What We Achieved

Your VPS is now:

- 🔒 **Properly secured** with modern SSH, firewall, and intrusion detection
- 🚀 **Lightweight** without unnecessary services
- 🔄 **Self-maintaining** with automatic security updates
- 📊 **Observable** with proper logging and monitoring
- 🐳 **Container-ready** with Docker and automatic HTTPS
- 🛡️ **Hardened** against common attack vectors

This setup gives you a solid foundation that's both secure and practical. No over-engineering, no cargo cult configurations from 2015 tutorials - just what actually works in 2025.

The best part? Once it's set up, it mostly runs itself. Focus on building your applications, not babysitting your infrastructure.

---

*Next time someone tells you to disable IPv6 or change your SSH port to "hide" it, you can confidently ignore their advice. Real security comes from proper configuration, not security through obscurity.*
