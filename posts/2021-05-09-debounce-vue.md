+++
layout = "post"
title = "Debounce in Vue2"
categories = ["javascript"]
tags = ["vuejs"]
description = "bounce it!"
+++

I found this very easy and indenpendent solution on
[StackOverflow (here)](https://stackoverflow.com/a/55617228).

```javascript
// in your component
data() {
  return {
    timeoutScroll: undefined,
  }
}
methods: {
  handleScroll: function() {
    if (this.timeoutScroll) 
      clearTimeout(this.timeoutScroll); 

    this.timeoutScroll = setTimeout(() => {
      // your action here
    }, 200); // delay
  }
},

destroyed() { 
  clearInterval(this.timeout) 
}
```

No dependencies and easy to keep in mind - but I know I will get back here once
every few weeks 🤫
