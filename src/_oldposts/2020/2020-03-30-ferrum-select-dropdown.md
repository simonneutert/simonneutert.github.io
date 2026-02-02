---
layout: post
title: Ruby and Ferrum select option from dropdown
categories: [ruby]
tags: [ferrum, browser, scraping]
description: Select an option with Ferrum, the Ruby gem with balls.
---

I could not find something in the interwebs, no matter how hard I googled.

This does feel hacky and I guess it is a hack or maybe a bodge, but let's crack on.  
You want to select a known option using Ferrum and nothing else?

~~~ ruby
begin
  browser.at_css("select[name='SELECTNAME']").focus.click.type("SHOWNOPTIONTEXT").click
rescue => exception
  puts exception
end
~~~

You need to know the option you would like to select, but in most cases you do.

I feel sorry for this :D