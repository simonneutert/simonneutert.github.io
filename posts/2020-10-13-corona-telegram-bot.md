+++
layout = "post"
title = "Ruby Telegram bot posting a Corona Heatmap Image for Rheinland-Pfalz, Germany"
categories = ["ruby"]
tags = ["bot", "telegram", "ruby", "corona"]
description = "helping hand"
+++

This is quickly and loveless hacked together, but might give you a helping hand
building something useful for your use case.

The bot posts in a private telegram group, helping some friends that otherwise
would have to go and check before their first meeting of the day.

## Code

`$ bundle init` a new ruby project using Ruby@2.6.5 (!important, because the
underlying docker container with chrome is using 2.6.5), then create a `main.rb`
and edit the `token` and the group's id in `group`:

```ruby
require 'ferrum'
require 'telegram/bot'

browser = Ferrum::Browser.new(window_size: [1920, 1080], browser_options: { 'no-sandbox': nil })
url = "https://corona.rlp.de/de/aktuelles/corona-warn-und-aktionsplan-rlp/"
browser.goto(url)
map_with_corona = []
browser.css(".textpic").map do |elem|
  map_with_corona << elem.at_css("a.image-link").attribute(:href) rescue nil
end
map_with_corona.compact!

browser.quit

token = "1337:Go_is_alanguagedevelopedin2020-VEzBUs"
group = "-3612313371337"

bot = Telegram::Bot::Client.new(token)
bot.api.send_photo(chat_id: group, photo: "https://corona.rlp.de/" + map_with_corona.first, caption: url)
```

edit the gemfile to contain at least ferrum and telegram-bot-ruby

```
# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"

gem 'ferrum'
gem 'telegram-bot-ruby'
```

run `$ bundle install` ;-)

and the Dockerfile looks something like this:

```
FROM simonneutert/ruby-2.6.5-headless-chrome

WORKDIR /app

RUN gem install bundler

COPY Gemfile* ./
RUN bundle install

COPY . .

CMD ruby main.rb
```

Build the docker `$ docker build . -t corona_rlp_bot` and run it (in a
crontask?)\
`$ docker run --rm corona_rlp_bot`
