---
layout: post
title: "Ruby 2.5 by example: Hash.slice"
categories: [ruby]
tags: [ruby]
description: Slice, slice, baby!
fullview: false
---

[BigBinary](https://blog.bigbinary.com/2018/02/06/ruby-2-5-added-hash-slice-method.html?utm_source=rubyweekly&utm_medium=email) shouted it out loud.

``` ruby
pizza = { id: 1, name: 'Big Cheezy', description: 'Big Chezzy Pizza, pure happiness!' }

pizza.slice(:name, :description)
# => {:name => 'Big Cheezy', :description => 'Big Chezzy Pizza, pure happiness!'}
```

BigBinary have a neat collection of articles about Ruby 2.5

[http://blog.bigbinary.com/categories/Ruby-2-5](http://blog.bigbinary.com/categories/Ruby-2-5)
