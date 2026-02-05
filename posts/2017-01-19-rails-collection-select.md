+++
layout = "post"
title = "Custom fields in collection_select"
categories = ["ruby", "rails"]
tags = ["rails", "ruby", "form"]
description = "custom value field in collection_select app"
+++

Setup a custom select option text field in collection_select

_Contact_ **belongs_to** _Company_

add a public method to your model, in this case **Contact** Contact.rb ( Model )

```ruby
def name_and_company
self.name + " - " + self.company.name
end
```

Usage ( note the use of :name_and_company )

```ruby
<%= form.collection_select(:contact_id, Contact.all, :id, :name_and_company ) %>
```
