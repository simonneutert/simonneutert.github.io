+++
layout = "post"
title = "List all classes of an element with jQuery"
categories = ["javascript"]
tags = ["jQuery", "javascript"]
description = "the truth is out there"
+++

Simple as:

```javascript
console.log($(item.element).attr("class").split(/\s+/));
```
