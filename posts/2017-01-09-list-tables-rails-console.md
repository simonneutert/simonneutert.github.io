+++
layout = "post"
title = "List and Count the Tables of your Rails App"
categories = ["ruby", "rails"]
tags = ["coding", "rails", "activerecord", "console"]
description = "List and Count the Tables of your Rails App"
+++

The following Snippet will iterate over Tables and print out their total of
elements simply navigate to your rails project and run `rails c`:

```ruby
ActiveRecord::Base.connection.tables.each do |table|
  next if table.match(/\Aschema_migrations\Z/)
  klass = table.singularize.camelize.constantize      
  puts "#{klass.name} has #{klass.count} records"
end
```

No more guesstimations ;-)

credits: [Thomas E](http://stackoverflow.com/a/14276740/6601963)
