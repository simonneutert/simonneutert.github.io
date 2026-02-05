+++
layout = "post"
title = "Rails Console for Sinatra"
categories = ["rails", "ruby", "sinatra"]
tags = ["ruby", "rails", "sinatra", "bash", "irb", "console"]
description = "Easy Console Maintenance Even on Heroku"
+++

Simply navigate via console to your app's directory, then enter:

`bundle exec irb -I. -r app.rb` where `app.rb` is the entrypoint to your
Sinatra.rb App.

On Heroku things do not get complicated, too. Make sure heroku is configured and
you are in the directory of your app. Run `heroku run bash` and wait for the
bash to load - you should enter in your app's root directory. Confirm this by
typing `pwd` or `ls -lha`, else navigate to the entrypoint of your Ruby App.

`bundle exec irb -I. -r app.rb` where `app.rb` is the entrypoint to your
Sinatra.rb App and you are good to hack away.
