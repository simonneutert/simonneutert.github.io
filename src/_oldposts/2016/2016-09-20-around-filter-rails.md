---
layout: post
title: Around Filter in Rails Controllers
categories: [rails]
tags: [data, routing, SEO, controller, hooks]
description: Catch 404 errors when an ID is missing and then route to custom controller.
---

#### What is this all about?
Say you auto-delete old posts (snapchat-like), then a user might get an url that does not exist anymore. Without an "around_filter" a 404 Error is rendered, resulting a penalty in SEO.
You can catch missing IDs in your controller and redirect_to a page of your desire, maybe throw in a flash message, too.

```ruby
# in models_controller.rb

around_filter :catch_not_found #right after controller initialization

private

def catch_not_found
  yield
rescue ActiveRecord::RecordNotFound
  redirect_to root_url, :flash => { :error => "Record not found." }
  return
end
```
