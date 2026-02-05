+++
layout = "post"
title = "Mixed Content Warning in your favourite Web Framework (it's Rails)"
categories = ["ruby", "rails", "web"]
tags = ["ruby", "rails"]
description = "🍎"
+++

Upgrading to Rails v7 with esbuild wasn't a real joy.

But when in production everything went off the rails - pun intended - a
`mixed active content` error had me struggling.

Thankfully it was really easy to fix, by adding:

`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`

to the `application.html.erb` 😅
