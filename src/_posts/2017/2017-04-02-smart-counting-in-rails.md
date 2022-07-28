---
layout: post
title: Count Objects in a Memory Efficient Way in Rails
categories: [ruby]
tags: [ruby, oop, rails]
description: Count the returning objects of an ActiveRecord Query without loading all objects in memory
---

Counting is key, but memory is scarce and ruby is slow, we have heard it all :)
Then simply do not count objects, count their IDs in a list instead. This can be done by calling `.pluck()`, which will return an array with the values of an attribute.

``` ruby
@user_count = User.all.pluck(:id).count
# return an array with all IDs
```

Yet, there is more to that. You can call `.size` to gain a little more speed, due to a slightly different implementation of `size` and `count` in ruby.

```ruby
# size is best with arrays
@users_count = User.all.pluck(:id).size
```

If you need the objects return by a query. Make sure to run your element query first, then use `size` to not make the database go through the rows again - using `count` will hit the database. [postgresqltutorial.com: COUNT function](http://www.postgresqltutorial.com/postgresql-count-function/)

```ruby
@active_users = User.where(active: true)
@user_count = @active_users.size
```

Once your platform is growing big, you could either setup a rake task that updates a reference table frequently and/or make use of rails' built-in  [counter_cache](http://guides.rubyonrails.org/association_basics.html#belongs-to-association-reference#4.1.2.3)
