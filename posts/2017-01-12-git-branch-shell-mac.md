+++
layout = "post"
title = "Show current git branch in Terminal"
categories = ["mac", "terminal", "git"]
tags = ["coding", "git", "shell", "terminal"]
description = "How to show current git branch in terminal in OS X (10.1x)"
+++

# Modify your .bash_profile

Open your `.bash_profile` under your userprofile's `~` directory

```shell
cd ~
nano .bash_profile
```

then copy the append the following code snip

```shell
### GIT START ###
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
### GIT END ###
```
