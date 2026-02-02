---
title: 'Clojure Error on REPL start: Failed to load class "org.slf4j.impl.StaticLoggerBinder"'
layout: post
---

Here are the bits, as I am very tired of regoogling it all the time 😅

> Failed to load class "org.slf4j.impl.StaticLoggerBinder"

What brought me to what exactly to add on Slack:  
https://clojurians-log.clojureverse.org/clojure/2016-10-23

On Maven:  
https://mvnrepository.com/artifact/org.slf4j/slf4j-simple

This is what your `deps.edn` could look like, making the error disappear!

```clojure
{:deps {org.slf4j/slf4j-simple {:mvn/version "1.7.36"}}}
```