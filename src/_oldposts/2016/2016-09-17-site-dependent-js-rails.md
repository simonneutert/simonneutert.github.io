---
layout: post
title: Per Page JavaScript in a Rails App
categories: [rails, javascript]
tags: [ux, ui]
description: How to easily setup your app for page dependent JavaScript support - making turbolinks even better.
---

I know, some of you might find turbolinks a bit odd. Well, read this on how to make it work properly.

Well, you now know a bit more about turbolinks. So, let's get started.
First you need to prepare you layout and add some classes to the DOM.

```ruby
# application.html.erb
<!-- modify the body element to have class attributes like: -->
<body class="<%= controller_name %> <%= action_name %>">
```

now in your desired .js or .coffee file:

```javascript
// file.js
$(document).on('turbolinks:load', function() {
  // .welcome.index controller_name = welcome, action_name = index
  if (!($(".welcome.index").length > 0)) {
    return;
  } else {
    // do something
  };
});
```

```coffeescript
# file.coffee
$(document).on 'turbolinks:load', ->
  # .welcome.index controller_name = welcome, action_name = index
  return unless $(".welcome.index").length > 0

  # do something
```

Simple as that :)
