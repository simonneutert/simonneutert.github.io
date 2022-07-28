---
layout: post
title: Clean up your branch, before submitting a Pull Request
categories: [git]
tags: [git]
description: commit to a story 
---

When working on a difficult issue it can happen, that you generate loads of commits. Some of them may be a complete waste of time reading, while other might contain useful information for your future team or reviewer.

__There must be a better way!__

1. You do not need to alter your workflow.
2. Commit as much as you like and what makes sense to you - and just you.

## Retell your commit story

__When finished, shift your perspective.__ What information would make your reviewer(s) happy?

Your reviewer can work best through your code base, when the commit history tells a concise story about the steps it took to build the solution.

``` bash
# Open a new branch based on master or develop
$ git checkout -b new_clean_branch
```

``` bash
$ git merge old_mumble_branch --squash
```

## Cut off old branches

You can now stage and commit files or code samples and write a clean, logical commit message.

When finished push the clean branch and delete the *old_mumble_branch*.

Enjoy Zen.
