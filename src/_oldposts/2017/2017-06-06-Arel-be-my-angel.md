---
layout: post
title: Arel to the rescue
categories: [ruby, rails]
tags: [ruby, rails, arel, activerecord]
description: AREL and Activerecord play nicely together
---

Let's say you can clean up some queries. Use [AREL](https://github.com/rails/arel)'s magic by utilizing Rails' [arel_table](https://apidock.com/rails/ActiveRecord/Core/ClassMethods/arel_table) method.

``` ruby
scope :ids_greater_than_five, -> {
  where(arel_table[:id].gt(5))
}
```

Or snipe queries without scopes!
``` ruby
per = Period.arel_table
Period.where(
              per[:id].gt(5).or(per[:id].eq(1))
            )
```

Do not forget: [Scopes](http://guides.rubyonrails.org/active_record_querying.html#scopes) can make your code cleaner and easier to maintain.
