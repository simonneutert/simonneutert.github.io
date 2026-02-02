---
layout: post
title: Basic Array Operations in Ruby
categories: [ruby]
tags: [ruby]
description: Short list of handy operators for Arrays in Ruby World.
fullview: false
---

Handling Arrays is key, and this can make things really simple.

``` ruby
x = [1,2,3]
y = [2,3,4,5]

#intersection
x & y
# => [2,3]

# union
x | y
# => [1,2,3,4,5]

# difference
x - y
# => [1]

# combination
x + y
# => [1,2,3,2,3,4,5]
```
