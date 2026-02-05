+++
layout = "post"
title = "Obfuscate email addresses for Spambots and Crawlers"
categories = ["css", "html"]
tags = ["css", "html"]
description = "Secure your content simply by adding a CSS class"
+++

By utilizing css text-direction property text can be transformed into useless
jibberish for crawlers and spambots.

```css
.obfuscate {
  unicode-bidi: bidi-override;
  direction: rtl;
  text-align: left;
}
```

This will make the content appear reverted.

```html
<span class="obfuscate">Hello</span>
```

"Hello" will be displayed as "olleH".

To make the text appear correct for your users, you either enter the text
reversed, or make use of a programming language.

Example for Rails, output will be readable by humans as expected:

```erb
<span class="obfuscate">
  <%= "Really sensitive data".reverse %>
</span>
```

also known as _text reverse inception_ :)
