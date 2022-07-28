---
layout: post
title: XCode Error on macOS Monterey Version 12.3 
categories: [development, os]
tags: [mac, macos]
description: 🍎
---

Shortly after upgrading I wanted to install the latest and greatest XCode version from the AppStore. And boy did it take long. First the download took hours, then the loader wouldn't stop spinning... After a few restarts and deleting the public remains of XCode.

I decided to get on with my day and use command line tools before solving the hanging XCode after all.

Neither was `git` found nor `xcode-select` (`$ code-select --install` said everything was fine).

The only solution that really helped was running:

`$ sudo xcode-select --switch /`

👨‍💻💦