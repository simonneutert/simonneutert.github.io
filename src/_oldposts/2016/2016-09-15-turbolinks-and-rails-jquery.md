---
layout: post
title: Make jQuery and Turbolinks work together in a Rails App
categories: [rails, javascript]
tags: [ux, ui, turbolinks]
description: Let's learn why your JavaScript Code may behave oddly...
---

Sometimes your JavaScript code runs fine, but most of the time it takes a page refresh - why is that?
Well, Turbolinks modifies the way your data is loaded and the rendering is done. That is why

```javascript
$(document).ready( function() {
  // code()
})
```

does not work as you expect it to.
Here comes all it takes to make your app run smooth again:

The following line is really all you need to know:

```javascript
// jQuery needs to be in your project
$(document).on('turbolinks:load', function() {
  // run this after document is loaded
});
```

What does this mean?
In the [documentation](https://github.com/turbolinks/turbolinks) it says:
>You may be used to installing JavaScript behavior in response to the window.onload, DOMContentLoaded, or jQuery ready events. With Turbolinks, these events will fire only in response to the initial page load—not after any subsequent page changes.

>In many cases, you can simply adjust your code to listen for the turbolinks:load event, which fires once on the initial page load and again after every Turbolinks visit.

In any case check the documentation out, it is really well written and is undoubtedly useful.

If you are interested in this topic, pick one of the tags below.
