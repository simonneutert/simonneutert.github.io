+++
layout = "post"
title = "Sexy Submit Buttons in Rails 4+"
categories = ["ruby", "rails"]
tags = ["ruby", "rails"]
description = "Forms are an essential part of user interaction. Yet styling Rails’ form submit is not working as easy as you might think."
+++

Forms are an essential part of user interaction. Yet styling Rails’ _form
submit_ is not working as easy as you might think.

```erb
<%= f.submit 'save', class: "btn btn-primary pull-xs-right" %>
```

use `f.button` with a block instead…

```erb
<!-- pass an id, add confirm warning and an icon (via a gem) -->
<%= f.button type: 'submit',
  class: "btn btn-primary pull-xs-right",
  id: "register-button",
  data: { confirm: "Bitte die Eingaben kontrollieren, eine Änderung ist im Nachhinein nicht mehr möglich!" } do
%>
<%= icon('check') << ' übernehmen' %>
<% end %>
```
