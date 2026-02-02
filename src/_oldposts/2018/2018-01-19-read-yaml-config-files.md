---
layout: post
title: Reading Yaml Config Files for Ruby Scripts
categories: [ruby]
tags: [ruby, yaml, admin, config]
description: Setup for dynamic scripts
---

Again, Ruby makes this easy as pie.

``` yaml
# config.yml
user_data: hello world
level_one:
  level_two: level two world
```

``` ruby
# config.rb
require 'yaml'

config = YAML.load_file('./config.yml')
puts config['user_data']
# => 'hello world'
puts config['level_one']['level_two']
# => 'level two world'
puts config['level_one']
# => {"level_two" => "level two world"}
```
