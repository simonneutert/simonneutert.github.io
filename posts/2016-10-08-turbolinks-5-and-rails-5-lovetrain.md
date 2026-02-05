+++
title = "Turbolinks is misunderstood"
+++

Take a lunch break and watch this beautiful talk about why Turbolinks is good
for you. And how you can build a hybrid app with less than 50 lines of code with
it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/SWEts0rlezA" frameborder="0" allowfullscreen></iframe>

# So please, look up their documentation, it is very good

## Unbreak your jQuery document.ready:

_**I guess this can't be repeated often enough :-)**_

To unbreak your jQuery code in an rails app with Turbolinks simply change your
faulty document.ready functions:

```javascript
// this does not work with Turbolinks
$(document).ready(function () {
  // do something
});
```

```javascript
// BUT THIS DOES WORK:
$(document).on("turbolinks:load", function () {
  // do something
});
```

and for your Coffeescript + Turbolinks use this:

```javascript
$(document).on 'turbolinks:load', ->
```
