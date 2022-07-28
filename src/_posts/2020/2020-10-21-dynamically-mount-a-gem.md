---
layout: post
title: Dynamically mount a Ruby gem in a Rails Docker Project 
categories: [ruby, docker]
tags: [ruby, docker]
description: feed the whale
---

in order to work from local, do the following steps:
start docker with the gem from git, or skip it alltogether.

THEN change the gems and run `bundle install` in the container make sure your path's of the mount match with the docker-compose!

``` bash
gem 'my_dirty_little_gem', path: '/path_to_gem' # when mounted as volume in docker
```
