---
layout: post
title: Send a custom flash notice via a link_to helper in Rails
categories: [ruby, rails]
tags: [coding, rails, ui]
description: Sending a custom notification with the link_to method in Rails
---

I assume you already put your *sanitized* notifications in `app/views/layouts/application.html.erb`:
```
<% if notice %>
  <div id="notice">
    <%= notice.html_safe %>
  </div>
<% end %>

<%= yield %>
```

if not, you did this now. Now you can make use of them in all views - I guess it's best practice. All what's left to do is to send a special param with your link_to method, when needed, here the param name is `flash_notice`:

```
<%= link_to 'New Unit', estate_owners_path(@estate, flash_notice: "please keep in mind ...") %>
```

Simply catch the param in the approriate view (or globally) :)
I use `flash.now` instead of `flash` as this shows the message only one time and only for the page you were sending the link to.

```
<% flash.now[:notice] = params[:flash_notice] if params[:flash_notice] %>
```

With this method you can make your users' interactions much better, with a few lines of code.

*Read more in the official docs: [The Flash (flash vs flash.now)](http://guides.rubyonrails.org/action_controller_overview.html#the-flash)*
