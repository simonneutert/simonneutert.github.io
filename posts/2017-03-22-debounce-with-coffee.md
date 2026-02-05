+++
layout = "post"
title = "Debounce functions with coffeescript"
categories = ["javascript", "coffeescript"]
tags = ["javascript", "coffeescript"]
description = "bind an event, but fire function only once"
+++

#Debounce Functions

You want to execute a function only once, coalescing multiple sequential calls
into a single execution at the beginning or end.

**Solution** example taken from
[coffeescript cookbook](http://coffeescript-cookbook.github.io/chapters/functions/debounce)
With a named function:

```coffeescript
debounce: (func, threshold, execAsap) ->
  timeout = null
  (args...) ->
    obj = this
    delayed = ->
      func.apply(obj, args) unless execAsap
      timeout = null
    if timeout
      clearTimeout(timeout)
    else if (execAsap)
      func.apply(obj, args)
    timeout = setTimeout delayed, threshold || 100
```

so you can use it like this:

```coffeescript
mouseMoveHandler: (e) ->
  @debounce((e) ->
    # Do something here, but only once 300 milliseconds after the mouse cursor stops.
  300)

someOtherHandler: (e) ->
  @debounce((e) ->
    # Do something here, but only once 250 milliseconds after initial execution.
  250, true)
```
