+++
layout = "post"
title = "strftime does not localize"
categories = ["ruby", "rails"]
tags = ["rails", "ruby", "i18n", "internationalization"]
description = "strftime does not localize, let's fix this"
+++

[APIdock: strftime()](http://apidock.com/ruby/DateTime/strftime)

To make it short: strftime() does not translate or localize at all.

So in order to make things work in Rails, you need to use
[I18n localize](http://api.rubyonrails.org/classes/ActionView/Helpers/TranslationHelper.html#method-i-localize)

I assume you've set your I18n in your rails app properly
([e.g. with this gem rails-i18n](https://github.com/svenfuchs/rails-i18n)) and
the locale is **:de**

```ruby
date = Date.new(2017,01,31)
l(date, format: "%B %Y") # => Januar 2017
```

[read more on APIdock: localize](http://apidock.com/rails/ActionView/Helpers/TranslationHelper/localize)

**why not read a super detailed blog post from
[stackednotion.com](http://www.stackednotion.com/blog/2015/01/03/formatting-dates-and-times-in-rails-with-i18n-localize/)
on this topic?**
