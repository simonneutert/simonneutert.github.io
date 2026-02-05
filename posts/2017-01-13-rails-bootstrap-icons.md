+++
layout = "post"
title = "Rails Gem Bootstrap Sass, but the icons won't work"
categories = ["ruby", "rails", "frontend"]
tags = ["coding", "rails", "ui", "gems", "bootstrap"]
description = "Make Bootstrap icons work when added as a gem"
+++

If you followed the [instructions](https://github.com/twbs/bootstrap-sass)
properly for Asset Pipeline, but your glyphicons won't work, you might have set
a variable wrong. It can help to comment out the following scss bootstrap
variable definitions:

```scss
// $icon-font-path: if($bootstrap-sass-asset-helper, "bootstrap/", "../fonts/bootstrap/") !default;
//** File name for all font files.
// $icon-font-name:          "glyphicons-halflings-regular" !default;
//** Element ID within SVG icon file.
// $icon-font-svg-id:        "glyphicons_halflingsregular" !default;
```

also make sure to load bootstrap in the appropriate order in `application.sass`:

```sass
@import "bootstrap_vars"
@import "bootstrap-sprockets"
@import "bootstrap"
```
