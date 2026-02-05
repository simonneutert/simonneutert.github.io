+++
layout = "post"
title = "Special treatment for last element in an Array"
categories = ["ruby"]
tags = ["ruby"]
description = "Iterate over an array or a list and treat the last element differently"
fullview = false
+++

This example only needs a list and a function to _DRY_ it all up. Depending on
the expected size of the list, one could set variable that stores the count
value.

```ruby
arr = [1, 2, 3, 4, 5]

def power(x)
    puts x**x
    yield if block_given?
end

arr.take(arr.count - 1).each {|x| power(x) }
# 1
# 4
# 27
# 256

power(arr.last) { puts "last element" }
# 3125
# last element
```

"What's that **yield**?", you might ask.

[Mastering Ruby blocks in 5 minutes](https://mixandgo.com/blog/mastering-ruby-blocks-in-less-than-5-minutes)
