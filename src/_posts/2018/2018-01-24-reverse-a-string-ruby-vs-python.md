---
layout: post
title: Ruby vs. Python reverse()
categories: [ruby, python]
tags: [ruby, python]
description: Pitfall with snakes
---

Ruby shows some true love:

``` ruby
"Simon".reverse
[1,2,3].reverse
```

Be careful Rubyists, Python bites you!

``` python
# this works, but remember list.reverse() does NOT return
a = [1,2,3]
a.reverse()
print(a)

# this returns None
print([1,2,3].reverse())
```

It is best to keep these shorthands in mind:

``` python
# list[start:stop:step]
def reverse_string(string):
    return string[::-1]


print(reverse_string("Simon"))


def reverse_list(list_):
    return list_[::-1]


print(reverse_list([1,2,3]))
```
