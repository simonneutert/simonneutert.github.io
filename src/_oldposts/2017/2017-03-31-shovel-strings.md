---
layout: post
title: Hit Strings with the Shovel
categories: [ruby]
tags: [ruby]
description: concatenating strings the best way possible
---

I wondered what is quicker for concatenating strings in ruby. Is it the scientific looking "plus" `+` or the "shovel" `<<` ? **Turns out the shovel.**

``` ruby
a = "Simon"
a.object_id
=> 70246893339820

a = "Simon" + "1"
=> "Simon1"
a.object_id
=> 70246887673100

a = "Simon" << "1"
=> "Simon1"
a.object_id
=> 70246887499720

a << "1"
=> "Simon11"
a.object_id
=> 70246887499720
```

The shovel doesn't create new objects, making it much less memory hungry and quicker.
