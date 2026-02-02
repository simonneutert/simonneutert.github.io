---
layout: post
title: Use heroku for Automated Tasks
categories: [ruby, sinatra, heroku]
tags: [ruby, sinatra, rake, heroku]
description: heroku's scheduler does wonders
---

I needed to watch a price in an online shop and I wanted to automate it. heroku offers a free scheduler add-on, that lets you run rake tasks periodically.

This is what I came up with :)

[Code on GitHub](https://github.com/simonneutert/price-notifier)

It utilizes a simple Sinatra stub, combined with rake and Ruby's built-in smtp module. Simply call the rake task with the product's url, it's html id that holds the price tag and set your email credentials. Voila!

Gems used:

* gem 'sinatra', '~> 2.0'
* gem 'thin'
* gem 'haml'
* gem 'rake'
* gem 'nokogiri'
* gem 'watir', '6.8.4'

and comes with a heroku-ready bin of PhantomJS ;-)

Here's the Rakefile:

```ruby
# Rakefile
require_relative 'app'

desc 'Check price! rake check_price URL= DOM_ELEMENT= and PRICE_LIMIT='
task :check_price do |t, args|
  url = ENV['URL']
  dom_element = ENV['DOM_ELEMENT']
  upper_price_limit = ENV['PRICE_LIMIT'].gsub(",",".").to_i

  browser = Watir::Browser.new :phantomjs
  browser.goto(url)
  sleep(4) # loads all content/scripts properly
  html_doc = Nokogiri::HTML(browser.html)
  browser.close

  begin
    price = html_doc.css(dom_element).first.text
    if /\d+[\.,]?\d+[\.,]?\d+/.match(price)
      price = /\d+[\.,]?\d+[\.,]?\d+/.match(price)[0]
      # drop cents (ugly but easy)
      price = price.gsub(",", ".").to_f.to_s.gsub(".","").to_i
    end
    if price < upper_price_limit
      puts "Price dropped to #{price} for #{url}"
      send_mail(url)
    end
  rescue StandardError
    puts "An Error Occured for #{url}"
    send_mail(url, :error)
  end

end

```
