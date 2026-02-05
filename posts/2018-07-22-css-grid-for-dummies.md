+++
layout = "post"
title = "CSS Grid Layout in 3 lines of code"
categories = ["css", "html"]
tags = ["css", "html"]
description = "Easy as pie css grid"
+++

Source (German) here:
https://blog.kulturbanause.de/2018/07/css-grid-auto-fill-responsive-layouts-ohne-media-queries/

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```
