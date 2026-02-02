---
layout: post
title: Active Record and dup vs clone
categories: [ruby]
tags: [ruby, oop]
description: What's the difference between Ruby's dup vs clone
---

Look what I stumbled across [on StackOverflow](http://stackoverflow.com/a/24650062/6601963), there they say that:

> When dealing with ActiveRecord there's a significant difference too:
> dup creates a new object without its id being set,
> so you can save a new object to the database by hitting `.save`

> ``` ruby
 category2 = category.dup
#=> #<Category id: nil, name: "Favorites">
```

> clone creates a new object with the same id, so all the changes made to that new object will overwrite the original record if hitting .save

> ``` ruby
category2 = category.clone
#=> #<Category id: 1, name: "Favorites">
```
