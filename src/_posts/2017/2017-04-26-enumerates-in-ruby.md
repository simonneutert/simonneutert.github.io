---
layout: post
title: Do NOT enumerate Enumerators
categories: [ruby]
tags: [ruby]
description: It can make a difference
---

During a take on a [Euler Problem](https://projecteuler.net/problem=10), I stumbled upon a quirky behaviour:

``` ruby
(3..100).step(2)
=> #<Enumerator: ...>
```

so you can do something like this, neglecting `.each`:

``` ruby
(3..100).step(2) { |e| e.nil? }
```

which is __a tiny bit__ faster than using each for iterating.
