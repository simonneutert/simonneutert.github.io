---
title: Code Clojure in NeoVim (with LazyVim and Conjure)
layout: post
---

Want to develop Clojure with a modern, interactive REPL experience right in NeoVim? This guide will walk you through setting up Conjure with LazyVim for a smooth Clojure development workflow.

## Prerequisites

Before we begin, make sure you have the following installed:

1. **Java** - A modern Java version (I recommend [Temurin 23](https://adoptium.net/))
2. **Clojure** - Get it from [clojure.org](https://clojure.org/guides/install_clojure)
3. **LazyVim** - If you haven't set this up yet, check out [LazyVim's installation guide](https://www.lazyvim.org/)

## Configure nREPL

First, configure nREPL in your project. Add this to your `~/.clojure/deps.edn` file to make nREPL available globally:

```clojure
{:aliases
 {:nREPL
  {:extra-deps {nrepl/nrepl {:mvn/version "1.4.0"}}}}}
```

> Version 1.4.0 is the latest stable release at the time of writing.

For more configuration options, check the [nREPL documentation](https://nrepl.org/nrepl/usage/server.html).

## Configure LazyVim

LazyVim makes this super easy! Simply enable the Clojure/Conjure extras:

1. Open LazyVim and run `:LazyExtras`
2. Search for and enable the `lang.clojure` extra
3. Restart NeoVim to apply the changes

This will automatically install Conjure and configure it for Clojure development.

## Start Coding

Now you're ready to code! Here's the workflow:

### 1. Start the nREPL Server

In a separate terminal at your project root, start the nREPL server:

```bash
clj -M:nREPL -m nrepl.cmdline
```

You should see output showing the server started on a specific port (but you don't need to worry about it).

### 2. Open Your Project in NeoVim

```bash
nvim .
```

When you open a `.clj` file, Conjure will automatically detect and connect to your running nREPL server.

### 3. Learn Conjure's Keybindings

Conjure comes with an interactive tutorial! Run this command in NeoVim:

```
:ConjureSchool
```

This will teach you all the essential keybindings for evaluating code, managing the REPL, and more.

## Quick Tips

- **Evaluate current form**: Place your cursor inside a form and use `<localleader>ee`
- **Evaluate file**: `<localleader>ef` to evaluate the entire file
- **View documentation**: `K` while hovering over a function
- **Open REPL log**: `<localleader>ls` to see evaluation results

Happy Clojure coding! 🎉
