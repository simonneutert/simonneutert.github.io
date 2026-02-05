+++
layout = "post"
title = "Scrape JS Rendered Websites with Ruby and PhantomJS"
categories = ["ruby"]
tags = ["ruby", "scraping", "web"]
description = "Render dirty"
+++

Before Angular and its trillions of lookalikes a _simple html request_™ worked
just fine. Nowadays, things have changed. More and more websites unconditionally
require a working JavaScript Engine to be rendered readable. This disqualifies a
_simple html request_™ to get what you need.

## PhantomJS to the recue

1. Please **install PhantomJS** first.
   [http://phantomjs.org/](http://phantomjs.org/).

2. **Install Watir**, this allows you to interact with urls, just like your
   favourite browser would do. `$ gem install watir` In our case it will be
   PhantomJS. Read more about the concept on Watir's official Website
   [http://watir.com](http://watir.com) and see also
   [Watir on GitHub](https://github.com/watir/watir).

3. **OPTIONAL** Download the binary from
   [http://phantomjs.org/](http://phantomjs.org/) and extract the package. Then
   copy the **/bin** folder (with the file called `phantomjs` in it) into your
   Rails™ or Sinatra™ project's **/bin** folder to make this work on **heroku**.

## Get your scrape on

```ruby
require 'watir'
require 'nokogiri'

# go to url
url = 'https://www.youtube.com/'
puts "Loading: #{url}"

# set up a watir browser session with phantomjs
browser = Watir::Browser.new :phantomjs

# make watir visit the url
browser.goto(url)

# this is crucial!
# give it some time to render :)
# 4 seconds might be too long - find your own sweet spot
sleep(4)

# time for some Nokogiri™ magic
html_doc = Nokogiri::HTML(browser.html)
puts 'Received Website\'s rendered HTML'
puts html_doc.css('h1').text

# close watir session! be kind.
browser.close
```
