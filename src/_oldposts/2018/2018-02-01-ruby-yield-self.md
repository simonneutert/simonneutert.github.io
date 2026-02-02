---
layout: post
title: Ruby's new yield_self
categories: [ruby]
tags: [ruby]
description: Smoke the pipe!
fullview: false
---

Ever wrote some Elixir and loved what \|> a.k.a. "the pipe" does?

Then Ruby 2.5 might be what you alway waited for. [Victor Shepelev (on GitHub)](https://github.com/zverok) wrote a [genius blog post about yield_self](http://zverok.github.io/blog/2018-01-24-yield_self.html).

__[Michał Łomnicki](https://mlomnicki.com/yield-self-in-ruby-25/) article is also very good, it helps getting a bit deeper into it.__

Check out [yield_self](https://ruby-doc.org/core-2.5.0/Object.html#method-i-yield_self) in the official Ruby docs.

``` ruby
# Example taken from:
# http://zverok.github.io/blog/2018-01-24-yield_self.html

# before
url = construct_url
response = Faraday.get(url)
data = JSON.parse(response.body)
id = data.dig('object', 'id') || '<undefined>'
return "server:#{id}"
# or, short yet less readable form:
return "server:" +
  (JSON.parse(Faraday.get(construct_url)).dig('object', 'id') || '<undefined>')

# after:
construct_url
  .yield_self { |url| Faraday.get(url) }
  .yield_self { |response| JSON.parse(response) }
  .dig('object', 'id').yield_self { |id| id || '<undefined>' }
  .yield_self { |id| "server:#{id}" }
```

Of course it takes a while to get used to. But I think this can bring some light in an otherwise complex public API of an Object.
