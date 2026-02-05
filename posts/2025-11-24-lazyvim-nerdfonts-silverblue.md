+++
layout = "post"
title = "Setting Up Nerd Fonts for Kitty and LazyVim on Bazzite"
+++

If you're new to Linux and just getting started, this guide is for you.

My setup:

- OS: [Bazzite](https://bazzite.gg/) (Gnome)
- Terminal Emulator: [Kitty](https://sw.kovidgoyal.net/kitty/)
- Editor: [LazyVim](https://www.lazyvim.org/) (inside a
  [distrobox](https://distrobox.it/))

After setting up your distrobox with your preferred tools (likely what you were
comfortable with before switching to an atomic distribution), it's time to get
coding.

You install packages via brew, apt, dnf, or pacman, finally open LazyVim, and...
the icons are missing. Damn.

Here's the fix:

Download your favorite font from [nerdfonts.com](https://www.nerdfonts.com/) and
unzip it.

Copy or move the `*.ttf` files into `~/.local/share/fonts/`:

```bash
cp *.ttf ~/.local/share/fonts/
```

Close all distroboxes and Kitty windows, then open a fresh Kitty terminal and
run:

```bash
kitten choose-fonts
```

Pick your favorite font 🥳\
Enjoy!
