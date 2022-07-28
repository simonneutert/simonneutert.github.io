---
layout: post
title: Install pg gem on Mac with Postgres.app
categories: [ruby, mac]
tags: []
description: see, understand, learn
fullview: false
---

pg gem and Postgres.App on Mac can be a bit picky when running bundler. Well, this gets you going on High Sierra:

``` text
$ gem install pg -v '0.21.0' -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/latest/bin/pg_config 
```
