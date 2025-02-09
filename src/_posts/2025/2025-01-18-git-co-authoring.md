---
layout: post
title: Find your possible co-authors for your next commit using ripgrep and babashka
---

When it comes to fairness, acknowledging the help or time your colleagues
contribute is crucial. One simple way to ensure proper attribution is by adding
co-authors to your commits.

To add co-authors, include one or more `Co-authored-by` trailers at the end of
your commit message, like this:

```text
Commit message

Co-authored-by: Joel Califa <602352+califa@users.noreply.github.com>
Co-authored-by: Matt Clark <44023+mclark@users.noreply.github.com>
```

## With basic Unix tools

No fire, no flames, just the basic Unix tools you already have on your system:

```bash
$ alias git-co-authored-by="git log &> /dev/null && git log --shortstat | grep \"Author:\" | sed \"s/Author: //\" | sort -u | sed \"s/^/Co-authored-by: /\""
```

## With ripgrep and babashka 🚀

Make sure to include these trailers after at least one blank line at the end of
your commit message.

For added convenience, you can set up a helpful alias in your shell environment
(e.g., .bash_aliases, .zsh_aliases, or similar). Here’s a quick example:

```bash
$ git log &> /dev/null && git log --shortstat | head -n 10000 | rg "Author:" | bb -i -o '(map #(clojure.string/replace % #"Author: " "Co-authored-by: ") (set *input*))'
```

## Requirements

Here are the two tools you need to have installed, check out their official
documentation:

[babshka](https://babashka.org)\
[ripgrep on Github](https://github.com/BurntSushi/ripgrep)

## Explanation of the clojure code

Let's break down the babashka command
`bb -i -o '(map #(clojure.string/replace % #"Author: " "Co-authored-by: ") (set *input*))'`:

1. `bb` - This is the babashka CLI command
2. `-i` - Flag that tells babashka to read from standard input
3. `-o` - Flag that tells babashka to write to standard output
4. The main expression consists of several nested operations:
   - `(set *input*)` - Converts the input lines into a set, removing duplicates
   - `(map ...)` - Applies a function to each element in the set
   - The function `#(clojure.string/replace % #"Author: " "Co-authored-by: ")`
     does the following:
     - Uses `clojure.string/replace` to perform string replacement
     - `%` is a placeholder for each input item
     - `#"Author: "` is a regex pattern matching "Author: "
     - `"Co-authored-by: "` replaces for the matched pattern

In plain English: This command reads lines from standard input, removes
duplicates, and then removes the text "Author: " from the beginning of each
remaining line.

Example usage:

```bash
$ echo -e "Author: John\nAuthor: Jane\nAuthor: John" | bb -i -o '(map #(clojure.string/replace % #"Author: " "Co-authored-by: ") (set *input*)))'
```

Output:

```text
Co-authored-by: John
Co-authored-by: Jane
```

## Wrapping the script up

Running `git log &> /dev/null` first ensures you avoid system errors when
executing the command.

To make sure you have the necessary tools, install them using Homebrew or
Linuxbrew with the following command:

```bash
$ brew install borkdude/brew/babashka ripgrep
```

Happy Pair-Programming!
