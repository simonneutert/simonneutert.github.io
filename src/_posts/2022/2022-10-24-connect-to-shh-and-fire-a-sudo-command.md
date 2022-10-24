---
title: Connect with ssh and fire a sudo command 🚀
layout: post
---

You need the t option. That's all there is. Nothing else. [Source on StackOverflow](https://stackoverflow.com/a/10312700)

`ssh -t user@server "sudo script"`

OR

`ssh -At user@server "sudo script"`

from [man ssh](http://linuxcommand.org/lc3_man_pages/ssh1.html)

> -t  
> Force pseudo-tty allocation. This can be used to execute arbitrary screen-based programs on a remote machine, which can be very useful, e.g., when implementing menu services.  Multiple -t options force tty allocation, even if ssh has no local tty.