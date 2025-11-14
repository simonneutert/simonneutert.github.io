---
title: "Selecting, Copying, Pasting - not working in Wayland"
layout: post
---

You're tugging along happily, setting things up, but one thing starts bothering you.

Let's say, you have a config file open in (n)vim on your server and want to select parts and paste them somewhere else.

`Ctrl+Shift+C` and `Ctrl+Shift+V` are not working from inside (n)vim editors 🤔

You resort to the solution, that always slipped your mind in the past:

Visually selecting the parts in vim and yanking to clipboard with `"+y` - well, that's broken, too.

> vim system register \* and + not working

Neovim should work.  
But, it does not.

Googling brought me to: `sudo apt install wl-clipboard`.

This works because Wayland uses a different clipboard protocol than X11. The `wl-clipboard` package provides the necessary tools (`wl-copy` and `wl-paste`) that Neovim uses to interface with Wayland's clipboard, enabling the `+` and `*` registers to function properly.

Some things are just plain hard in Linux.
