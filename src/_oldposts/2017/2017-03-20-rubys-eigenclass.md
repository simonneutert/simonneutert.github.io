---
layout: post
title: Working with Ruby's magical Eigenclass
categories: [ruby]
tags: [ruby]
description: How to define Class Methods
---

I stumbled upon this nice blog article written by [Philip Brown on culttt.com](# http://culttt.com/2015/06/10/understanding-class-methods-verses-instance-methods-in-ruby/) and had to check it out for myself.

``` ruby
class God
    def hello
        puts "Hello World!"
    end
    class << self
      # this creates "class methods"
      # those can be run without creating an instance first
      def hello
          puts "Let's make gods and other stuff, like a universe."
      end
    end
end

God.hello # => "Let's make gods and other stuff, like a universe."

# vs. hello as an instance method

god = God.new
god.hello # => "Hello World!"
```

No instance of a god needed ;-)
