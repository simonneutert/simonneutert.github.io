+++
layout = "post"
title = "Set standard date and time format in a rails app"
categories = ["ruby", "rails"]
tags = ["ruby", "rails"]
description = "Do not hustle my friend, set your default date format with two lines of code."
+++

create a new file **called datetime_format.rb** in **config/initializers**

```ruby
# Date
Date::DATE_FORMATS[:default] = "%d/%m/%Y"
# Time
Time::DATE_FORMATS[:default] = "%d/%m/%Y %H:%M"
```

Restart Rails. Boom.
[show some love for 732 on stackoverflow](http://stackoverflow.com/a/27365610/6601963)
