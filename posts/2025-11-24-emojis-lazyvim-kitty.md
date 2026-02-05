+++
layout = "post"
title = "Type emojis in LazyVim (in a Kitty terminal)"
+++

As I'm learning LazyVim, I ran into a surprisingly tricky problem: how do I type
emojis from my keyboard? Here's how I solved it.

## My Setup

- OS: Bazzite (Gnome)
- Terminal Emulator: Kitty

## The Problem

When you're trying to stay keyboard-focused in LazyVim, reaching for the mouse
to insert an emoji feels wrong. Gnome has a built-in emoji picker (accessible
via mouse), but there has to be a better way.

## Solution #1: External Emoji Picker

I use [smile](https://github.com/mijorus/smile/) (the Flatpak version) combined
with [switcher](https://github.com/daniellandau/switcher) to quickly launch an
emoji picker and paste the selection. This works, but it still requires
switching windows.

## Solution #2: Kitty's Built-in Unicode Input

Kitty has a fantastic built-in
[Unicode input kitten](https://sw.kovidgoyal.net/kitty/kittens/unicode_input/)
that lets you search and insert emojis directly from your keyboard. When
triggered, it opens a searchable interface right in your terminal.

According to the docs, `ctrl+shift+u` should activate it. Unfortunately, this
keybinding didn't work for me—likely conflicting with LazyVim or Gnome
keybindings.

### The Fix: Remap the Keybinding

Edit your `~/.config/kitty/kitty.conf` and add a custom keybinding:

```
#: Unicode input

# Default keybindings (commented out if they don't work)
# map kitty_mod+u    kitten unicode_input
# map ctrl+cmd+space kitten unicode_input

# Custom keybinding - use something that doesn't conflict
map ctrl+alt+u kitten unicode_input
```

**Note:** I initially tried `ctrl+u`, but that conflicts with Vim's "scroll up
half page" command. `ctrl+alt+u` is a safer choice that won't interfere with
your editing workflow.

### How to Use It

1. Press your mapped keybinding (e.g., `ctrl+alt+u`)
2. A searchable emoji picker appears in your terminal
3. Type to search (e.g., "smile", "rocket", "fire")
4. Use arrow keys to navigate, press `Enter` to insert

Now go on and smash that 😼
