---
title: '"Activate" POROs (in a Rails app)'
layout: post
---

Basic example on [including ActiveModel](https://api.rubyonrails.org/classes/ActiveModel/Model.html)

```ruby
class Person
  include ActiveModel::Model
  attr_accessor :name, :age
end

person = Person.new(name: 'bob', age: '18')
person.name # => "bob"
person.age  # => "18"
```

And in order to make use of the magical serializers with [ActiveModel::Serialization](https://api.rubyonrails.org/classes/ActiveModel/Serialization.html):

```ruby
class Person
  include ActiveModel::Serialization

  attr_accessor :name, :age

  def attributes
    {'name' => nil, 'age' => nil}
  end

  def capitalized_name
    name.capitalize
  end
end

person = Person.new
person.name = 'bob'
person.age  = 22
person.serializable_hash                # => {"name"=>"bob", "age"=>22}
person.serializable_hash(only: :name)   # => {"name"=>"bob"}
person.serializable_hash(except: :name) # => {"age"=>22}
person.serializable_hash(methods: :capitalized_name)
# => {"name"=>"bob", "age"=>22, "capitalized_name"=>"Bob"}
```

Easy peasy pumping out the the good ol' railsy stuff 🛤
