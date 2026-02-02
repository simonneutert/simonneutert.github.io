---
layout: post
title: ActiveRecord find where not null or empty
categories: [ruby, rails]
tags: [ruby, database]
description: They've got you covered
---

That is all you need, when using ActiveRecord:

``` ruby
.where("field_in_db <> ''")
```
