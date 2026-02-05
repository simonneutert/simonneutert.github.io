+++
layout = "post"
title = "Use Go To Definition in Atom"
categories = ["ide", "editor"]
tags = ["editor", "ide"]
description = "Easy as pie go to definition like it's 2018"
+++

- install [symbol-gen](https://atom.io/packages/symbol-gen) for Atom

- restart Atom, enter your project and hit "cmd-alt-g"

- add `.tags` to `.gitignore`

- enter settings and add `.tags` to the **Ignored Names**

- edit keybings of Atom:

  ```yaml
  # add this to Atom's keymap.cson file:
  "atom-text-editor":
    "ctrl-alt-r": "symbols-view:go-to-declaration"
  ```

### Voila, click on a function, hit `cmd-alt-r` and jump the definition in a new tab
