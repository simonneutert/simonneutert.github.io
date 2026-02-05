+++
layout = "post"
title = "Ruby, Watir and Chrome on Heroku"
categories = ["ruby"]
tags = ["ruby"]
description = "It runs."
fullview = false
+++

Newest [Watir](http://watir.com) /
[Selenium](https://rubygems.org/gems/selenium-webdriver/) Combo had a
deprecation warning for PhantomJS. I didn't want to get caught, so it was about
time to tackle this.

Heroku is a relatively closed and proprietary PaaS, yet my favourite one. In the
past, I added a compiled PhantomJS executable in a `bin` directory
[(read more)](/blog/2017/scrape-js-powered-websites-with-ruby-and-selenium/).

## Buildpacks for your heroku project

go to your heroku dashboard, select the project and add these buildpacks:

- [https://github.com/heroku/heroku-buildpack-google-chrome](https://github.com/heroku/heroku-buildpack-google-chrome)

- [https://github.com/heroku/heroku-buildpack-chromedriver](https://github.com/heroku/heroku-buildpack-chromedriver)

but running Watir still fails:

```ruby
# runs on local machine just fine
browser = Watir::Browser.new :chrome
```

## heroku bash to the rescue

```bash
# in your terminal
$ cd /your/project/path

$ heroku run bash

# on heroku bash
# save the returned paths for future use
$ which google-chrome

$ which chromedriver
```

## Setup Selenium (on production)

[Selenium Chrome Documentation](http://seleniumhq.github.io/selenium/docs/api/rb/Selenium/WebDriver/Chrome.html)

remember to wrap the Watir code in an if clause, so only your heroku project
uses the new Selenium settings. I like to set a custom ENV variable on heroku
for such things.

```ruby
Selenium::WebDriver::Chrome.path = "path/to/google-chrome"
Selenium::WebDriver::Chrome.driver_path = "path/to/chromedriver"
browser = Watir::Browser.new :chrome
```

You now have [Watir](http://watir.com) /
[Selenium](https://rubygems.org/gems/selenium-webdriver/) running a headless
Chrome browser on heroku.
