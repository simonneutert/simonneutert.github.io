---
layout: post
title: Destructuring with Ruby
categories: [ruby]
tags: [coding, array, list, ruby]
description: Use destructuring in ruby
---

If a method returns an array, you can use destructuring for variable assignment.

``` ruby
def foods
    ['pancake', 'sandwich', 'quesadilla']
end

breakfast, lunch, dinner = foods

breakfast #=> 'pancake'
dinner #=> 'quesadilla'
```
