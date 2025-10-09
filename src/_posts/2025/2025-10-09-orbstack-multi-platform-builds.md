---
layout: post
title: "Enabling Multi-Platform Docker Builds with OrbStack"
description: How to set up OrbStack for building Docker images for multiple architectures
---

OrbStack is a fast, lightweight alternative to Docker Desktop for macOS. One of its powerful features is the ability to build Docker images for multiple architectures (like ARM64 and AMD64) using Docker Buildx. This is essential when you're developing on Apple Silicon but need to deploy to x86_64 servers or support multiple platforms.

## Why Multi-Platform Builds Matter

With the rise of ARM-based systems (Apple Silicon, AWS Graviton, Raspberry Pi), building images that work across architectures has become crucial. Multi-platform builds allow you to:

- Develop on Apple Silicon Macs and deploy to x86_64 servers
- Create images that work on both ARM and AMD architectures
- Support diverse deployment environments without maintaining separate build pipelines
- Ensure your application works consistently across different hardware

## Prerequisites

First, make sure you have OrbStack installed on your Mac. You can download it from [orbstack.dev](https://orbstack.dev) or install it via Homebrew:

```bash
brew install orbstack
```

Once installed, OrbStack will manage your Docker daemon and provide enhanced performance compared to Docker Desktop.

## Setting Up Docker Buildx

Docker Buildx is Docker's CLI plugin for extended build capabilities with full BuildKit support. OrbStack has excellent support for Buildx, but you need to set up a builder instance to enable multi-platform builds.

### Create a New Builder Instance

The key command to enable multi-platform builds is:

```bash
docker buildx create --name builder --driver docker-container --use
```

Let's break down what this command does:

- `docker buildx create` - Creates a new builder instance
- `--name builder` - Names the builder instance "builder" (you can use any name you prefer)
- `--driver docker-container` - Uses the docker-container driver, which runs BuildKit in a container for better isolation and platform support
- `--use` - Automatically switches to use this new builder as the default

### Verify Your Builder

After creating the builder, you can inspect it:

```bash
docker buildx inspect --bootstrap
```

This command will show you the platforms your builder supports. You should see something like:

```text
Name:   builder
Driver: docker-container

Nodes:
Name:      builder0
Endpoint:  orbstack
Status:    running
Platforms: linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```

The `--bootstrap` flag ensures the builder container is started if it's not already running.

## Building Multi-Platform Images

Now that your builder is set up, you can build images for multiple platforms.

### Basic Multi-Platform Build

Here's a simple example:

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest .
```

This builds your image for both AMD64 (x86_64) and ARM64 architectures.

### Building and Pushing to a Registry

To build and push multi-platform images to a container registry:

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t myregistry.com/myapp:latest \
  --push \
  .
```

The `--push` flag automatically pushes the images to your registry after building.

### Loading Images Locally

If you want to build for multiple platforms and load the image into your local Docker instance (note: this only works for your current architecture):

```bash
docker buildx build \
  --platform linux/arm64 \
  -t myapp:latest \
  --load \
  .
```

The `--load` flag loads the image into your local Docker daemon, but it only works with a single platform that matches your current architecture.

## 🔐 Configuring GitHub Token for Container Registry

If you're planning to push your multi-platform images to GitHub Container Registry (GHCR), you'll need to configure your GitHub token properly. Here's a friendly reminder to set things up correctly!

### Setting Up Your GH_TOKEN

First, create a Personal Access Token (PAT) on GitHub with the following permissions:

- `write:packages` - Upload packages to GitHub Package Registry
- `read:packages` - Download packages from GitHub Package Registry
- `delete:packages` - Delete packages from GitHub Package Registry (optional)
- `repo` - Full control of private repositories (if pushing private images)

Then, add it to your `~/.zshrc` or `~/.bashrc`:

```bash
# Add this to your ~/.zshrc or ~/.bashrc
export GH_TOKEN="your_github_personal_access_token_here"
```

Don't forget to reload your shell configuration:

```bash
source ~/.zshrc  # for zsh
# or
source ~/.bashrc  # for bash
```

### Authenticate with GitHub

Once your token is configured, refresh your GitHub CLI authentication and log in to the container registry:

```bash
# Refresh GitHub CLI authentication
gh auth refresh

# Login to GitHub Container Registry
docker login ghcr.io -u <your-github-username>
```

When prompted for a password, use your `GH_TOKEN` value (not your GitHub password).

Alternatively, you can login directly using your token:

```bash
echo $GH_TOKEN | docker login ghcr.io -u <your-github-username> --password-stdin
```

### Verify Your Authentication

Test that everything is configured correctly:

```bash
gh auth status
```

## Managing Builders

```bash
docker buildx # for help with buildx commands
```

## Wrapping Up

Setting up multi-platform builds with OrbStack is straightforward and powerful. The `docker buildx create --name builder --driver docker-container --use` command gives you access to cross-platform building capabilities that are essential in today's diverse computing landscape.

With OrbStack's excellent performance on Apple Silicon and Docker Buildx's multi-platform support, you can develop locally on ARM and confidently deploy to any architecture your production environment requires.

Happy building! 🚀
