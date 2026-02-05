+++
title = "Pascal Triangles in Ruby with Enumerator"
layout = "post"
+++

Stumbled across [Enumerator](https://ruby-doc.org/core-3.1.2/Enumerator.html)
and somebody had an example of
[Pascal Triangles](http://rosettacode.org/wiki/Pascal%27s_triangle) ...

[Everything is a remix 🤷‍♂️](https://www.everythingisaremix.info/)

```ruby
def pascal
  Enumerator.new do |e|
    e << coll = [1]
    loop do
      e << coll = ([0] + coll).zip(coll + [0]).map(&:sum)
    end
  end
end

triangles = pascal
puts triangles.take(10)
```
