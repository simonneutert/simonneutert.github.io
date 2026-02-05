+++
title = "Prevent Double Clicks in Forms"
+++

In order to prevent users from creating double posts in your web form, simply
change your form's _**submit**_ method from:

```ruby
submit "Save"
```

to:

```ruby
submit "Save", data: { disable_with: "saving..." }
```
