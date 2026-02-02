---
layout: post
title: Ruby's Safe Navigation Operator
categories: [ruby]
tags: [ruby]
description: Ruby's Good Mood Manager
---

> Ruby 2.3.0 added a safe navigation operator (&.) that checks for nil before calling a method.
>
> It will return nil if str is nil, rather than raising a NoMethodError.

-- [Learned on StackOverflow](https://stackoverflow.com/a/34626154)

``` ruby
str = "   Simon   "
stripper = str&.strip
puts stripper
# => "Simon" 
```

Somehow what ActiveSupport offers with its `try` method.
