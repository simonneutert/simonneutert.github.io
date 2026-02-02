---
layout: post
title: ActiveRecord Find By Year, Day or Month on a Date field
categories: [ruby, rails, mysql]
tags: [ruby, rails]
description: filter by date like a boss
---

[Copied from StackOverflow:](https://stackoverflow.com/a/9625690)

Assuming that your "date attribute" is a date (rather than a full timestamp) then a simple where will give you your "find by date":

Model.where(:date_column => date)
You don't want find_by_date_column as that will give at most one result.

For the year, month, and day queries you'd want to use the extract SQL function:

```ruby
Model.where('extract(year  from date_column) = ?', desired_year)
Model.where('extract(month from date_column) = ?', desired_month)
Model.where('extract(day   from date_column) = ?', desired_day_of_month)
```

Column need to be type of date and SQLite has its own rules.
