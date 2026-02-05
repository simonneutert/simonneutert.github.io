+++
layout = "post"
title = "Use Modules to boost your OOP"
categories = ["ruby"]
tags = ["ruby", "oop"]
description = "Make more of OOP by using modules with your classes"
+++

There are two ways of using **modules**, you can either _extend_ or _include_
them in a class.

```ruby
module Speed
  def accelerate
    puts "I am faster now"
  end
end

class Car
  include Speed
end

car1 = Car.new
car1.accelerate # => I am faster now
Car.accelerate # NoMethodError: undefined method `accelerate' for Car:Class

class Ebike
  extend Speed
end

bike1 = Ebike.new
bike1.accelerate # NoMethodError: undefined method `accelerate' for Object
Ebike.accelerate # => I am faster now
```

**include** makes the module's method instance methods, while **extend** really
is extending your class with its methods.
