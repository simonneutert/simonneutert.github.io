---
layout: post
title: Distrobox is freedom - Coding on my current crush Aurora Linux
---

Distrobox is a fantastic tool for running containerized Linux distributions on your host, giving you the flexibility to use different environments for coding, testing, or just experimenting—without messing up your main system.

### Creating and Cloning a Distrobox with NVIDIA Support

If you want GPU acceleration inside your container (for AI, graphics, etc.), just add the `--nvidia` flag when creating or cloning a distrobox. Here’s a quick reminder:

```bash
distrobox create --name trixie --image debian:13
# To clone an existing box, this time enabling --nvidia graphics, because you need it to run GUI app like VSCode:
distrobox create --clone trixie --name devbox --nvidia
```

### Example: Throwaway Firefox on Arch with Temporary Home

Need a disposable browser session? You can spin up an Arch container, install Firefox, and set your home to a temporary folder:

```bash
# never forget to add `--nvidia` when you are running on teamgreen and need a GUI
distrobox create --name arch-throwaway --image archlinux:latest --home /tmp/arch-home
distrobox enter arch-throwaway
# then in the distrobox
sudo pacman -Sy --noconfirm firefox
firefox
```

When you’re done, just exit and remove the container — your browsing session is gone!

Distrobox makes it easy to experiment, stay secure, and keep your host clean. Give it a try!
