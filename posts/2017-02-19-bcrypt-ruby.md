+++
layout = "post"
title = "BCrypt in Ruby"
categories = ["ruby"]
tags = ["ruby", "bcrypt"]
description = "How to you use BCrypt"
+++

I stumbled across this
[post from Kieran](http://stackoverflow.com/a/39526561/6601963), that explains
bang on how BCrypt works.

```ruby
# Create hash of password
pass = BCrypt::Password.create('TestPassword') => "$2a$10$3.D6D2htbiRrezmZUhePV.gaQlc3ZjFYD9hv43khN5eWP5y8BGUXG"

# Pass the hash you have stored to Password.new
db_hash = BCrypt::Password.new("$2a$10$3.D6D2htbiRrezmZUhePV.gaQlc3ZjFYD9hv43khN5eWP5y8BGUXG")

# Compare the input from the user to the password stored
db_hash == "TestPassword" => true
db_hash == "NotRealPassword" => false
```

[Additionally check out the gem's excellent docs on github.](https://github.com/codahale/bcrypt-ruby#how-to-use-bcrypt-ruby-in-general)
