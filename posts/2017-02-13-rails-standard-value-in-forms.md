+++
layout = "post"
title = "Set a standard value for a form element"
categories = ["ruby", "rails"]
tags = ["ruby", "rails", "forms"]
description = "Level up your game by prepopulate some fields in your forms."
+++

When you want a field to be used and a standard value is to be expected - you
could prepopulate some fields beforehand. No need to evaluate expressions in
your view, as this quickly makes a mess. Leave the logic to the controller.

All we need to do is edit the corresponding "**new** method" in our controller.
This comes in especially handy, when you use a JavaScript datepicker and need to
change your form's date_field to a text_field e.g. and today's date is likely to
be selected. In the following snip we preselect a checkbox element.

```ruby
# friends_controller.rb
def new
  @friend = Friend.new
  @friend.is_on_facebook = true
end
```

```erb
<%= nested_form_for(friend) do |f| %>
  <div class="field form-group">
    <%= f.label :is_on_facebook %>
    <%= f.check_box :is_on_facebook, class: "form-control" %>
  </div>
  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>
```

All done by simply setting the model's corresponding attribute in the
appropriate controller. The view remains untouched.
