---
layout: post
title: Prevent Double Clicks in Forms
categories: [rails, javascript]
tags: [ux, forms]
description: In order to prevent users from creating double posts in your web form, simply change...
fullview: false
---

In order to prevent users from creating double posts in your web form, simply change your form's ***submit*** method from:
~~~ ruby
submit "Save"
~~~
to:
~~~ ruby
submit "Save", data: { disable_with: "saving..." }
~~~
