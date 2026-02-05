+++
layout = "post"
title = "Set hreflang for SEO in a globalized Rails App"
categories = ["ruby", "rails"]
tags = ["ruby", "rails", "seo", "html5"]
description = "There is one line you need to add!"
+++

In your app's head (this usually is in `application.html.erb`).

```erb
<link rel="alternate" hreflang="<%= locale %>">
```

The variable `locale` is representing, the requests current value of
[I18n in Rails](http://guides.rubyonrails.org/i18n.html#managing-the-locale-across-requests).
