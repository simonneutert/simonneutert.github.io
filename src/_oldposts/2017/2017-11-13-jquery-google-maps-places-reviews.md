---
layout: post
title: jQuery Plugin for showing google places reviews
categories: [javascript, jQuery]
tags: [seo, api, jquery, Javascript]
description: View reviews of a Place on Google Maps
---

Inspired by Steven Monson's magnificent article here:
[https://www.launch2success.com/guide/display-google-reviews-website-2017/](https://www.launch2success.com/guide/display-google-reviews-website-2017/) or check out [Steven's github](https://github.com/stevenmonson/googleReviews). Steven's code is based on [peledies jquery plugin repo](https://github.com/peledies/google-places). So, I simply remixed their work into this little gem of code poetry. *Thank you guys!*

#### Source Code on GitHub
[https://github.com/simonneutert/jquery-google-reviews](https://github.com/simonneutert/jquery-google-reviews)

## Prerequisites

* You must have jQuery in your project: [get jQuery](http://jquery.com)

* add the .js and .css [from here](https://github.com/simonneutert/jquery-google-reviews)
 to your project (see index.html for inspiration :wink:)

* ___if you do not have a working Google Maps API key already:___ create a Google API Key: [https://console.developers.google.com/apis/](https://console.developers.google.com/apis/)

* add the following line with your  Google Maps API key with **your key** as param:

  ``` html
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=YourApiKeyHere"></script>
  ```

* add an empty ***div*** element in your html template with an unique ID, where the reviews should show up. In this case:

  `<div id="google-reviews"></div>`

## Call the Plugin

[Grab your place's ID (https://developers.google.com/places/place-id) and call it as ***placeId*** parameter, when calling the plugin. ](https://developers.google.com/places/place-id)

``` html
<script>
jQuery(document).ready(function($) {
  if ($("#google-reviews").length == 0) {
    return
  }
  // Find a placeID via https://developers.google.com/places/place-id
  $("#google-reviews").googlePlaces({
    placeId: 'ChIJZa6ezJa8j4AR1p1nTSaRtuQ',
    // the following params are optional (default values)
    header: "<h3>Google Reviews</h3>", // html/text over Reviews
    footer: '', // html/text under Reviews block
    max_rows: 6, // max rows of reviews to be displayed
    min_rating: 4, // minimum rating of reviews to be displayed
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    text_break_length: "90", // length before a review box is set to max width
    shorten_names: true, // example: "Max Mustermann" -> "Max M.""
  });
});
</script>
```
