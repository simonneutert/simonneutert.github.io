---
layout: post
title: Enforce Error Callback in an AJAX Call from controller method in Rails
categories: [ruby, rails, javascript]
tags: [ruby, rails, ajax]
description: Save the extra logic in your views, return Status400 and let JavaScript do its work.
---

When hitting the controller with an AJAX request, maybe some DB requests run and some data is processed. Now let's assume you are getting content with that AJAX call. Wouldn't it be much cleaner for your views to only render if your controller returns the desired data and otherwise make the AJAX call error out? Sometimes, absolutely!

``` ruby
# welcome_controller.rb
def someroute
  @friend = Friend.find(params[:id])
  return head :bad_request unless @friend
end
```

The AJAX call fails and runs its error callback, due to the Status 400 that was sent. [More details in the Rails Docs](http://guides.rubyonrails.org/layouts_and_rendering.html#using-head-to-build-header-only-responses)
