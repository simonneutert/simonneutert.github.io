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

Well the solution was "Settings >> Universal Access >> Typing". Toggle the caret of "Repeat Keys", then slide the `delay` a tiny bit to the right, just enough to make it work for you.

Hope this works for you!
