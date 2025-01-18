---
layout: post
title: Find your possible co-authors for your next commit using ripgrep and babashka
---


When it comes to fairness, acknowledging the help or time your colleagues contribute is crucial. One simple way to ensure proper attribution is by adding co-authors to your commits.

To add co-authors, include one or more `Co-authored-by` trailers at the end of your commit message, like this:

```text
Commit message

Co-authored-by: Joel Califa <602352+califa@users.noreply.github.com>
Co-authored-by: Matt Clark <44023+mclark@users.noreply.github.com>
```

 Make sure to include these trailers after at least one blank line at the end of your commit message.

For added convenience, you can set up a helpful alias in your shell environment (e.g., .bash_aliases, .zsh_aliases, or similar). Here’s a quick example:

```bash
$ git log && git log --shortstat | rg "Author:" | bb -i -o '(map #(clojure.string/replace % #"Author: " "") (set *input*)))'
```


Running git log first ensures you avoid system errors when executing the command.

To make sure you have the necessary tools, install them using Homebrew or Linuxbrew with the following command:

```bash
$ brew install babashka ripgrep
```

Want to learn more about the tools? Check out their official documentation:

[babshka](https://babashka.org) \
[ripgrep on Github](https://github.com/BurntSushi/ripgrep)
