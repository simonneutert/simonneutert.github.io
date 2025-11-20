---
layout: post
title: "Gnome-Terminal keypress gets stuck and repeats forever"
subtitle: "Gnome spams keyboard input 💀"
---

This bug almost made my keyboard shortcuts useless.

I am not alone with this problem. [StackExchange](https://unix.stackexchange.com/questions/360898/gnome-terminal-keypress-gets-stuck-and-repeats-forever)

My system at the time of writing:

- Bazzite (Fedora Silverblue)
- Gnome 49.1
- Mutter (Wayland)
- Linux 6.17.7

When switching Workspaces, say from "1" to "2" using "super+2" it would spam my input with "twos".

Nothing ever worked, no fix, no "hack". Turns out, there's a bug! See [mutter issue](https://gitlab.gnome.org/GNOME/mutter/-/issues/4416).
