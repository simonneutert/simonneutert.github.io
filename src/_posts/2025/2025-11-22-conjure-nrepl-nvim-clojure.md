---
title: Code Clojure in NeoVim (with LazyVim and Conjure)
layout: post
---

You should have your clojure setup and running:

1. Have a modern Java version installed (Temurin 23)
2. Clojure is installed
3. Config clojure/nrepl https://nrepl.org/nrepl/usage/server.html

### Configure LazyVim

When using lazyvim setup all clojure/conjure in lazyvim extras

### Coding

Start nrepl in another terminal at project root

```
$ clj -M:nREPL -m nrepl.cmdline
```

Start the project in nvim `nvim .`, when opening a `.clj` file all should be good.

Learn conjure running `:ConjureSchool` 😉
