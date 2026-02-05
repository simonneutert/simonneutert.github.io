+++
layout = "post"
title = "Download all images from a page!"
categories = ["bash"]
tags = ["script"]
description = "like in no time?"
+++

You need [htmlq](https://github.com/mgdm/htmlq) and
[wget](https://formulae.brew.sh/formula/wget)

Few easy steps:

1. visit the website you want the picture from
2. copy the source code into a index.html file
3. `$ cat index.html | htmlq --attribute src img | grep jpg | wget -i-`

of course whether and what you `grep` is up to you 😎
