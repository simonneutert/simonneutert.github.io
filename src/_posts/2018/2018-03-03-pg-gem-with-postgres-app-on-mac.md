---
layout: post
title: Install pg gem on Mac with Postgres.app
categories: [ruby, mac]
tags: []
description: see, understand, learn
fullview: false
---

```bash
# .bashrc or .zshrc
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
```

pg gem and Postgres.App on Mac can be a bit picky when running bundler. Well, this gets you going on Monterey:

``` text
# replace version to taste
$ gem install pg -v '1.4.3' -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/latest/bin/pg_config 
```

*OPTIONAL*

``` text
# replace version to taste
$ gem install sequel_pg -v '1.16.0'

# or

$ gem install sequel_pg -v '1.16.0' -- --with-pg-dir=/Applications/Postgres.app/Contents/Versions/latest/
```
