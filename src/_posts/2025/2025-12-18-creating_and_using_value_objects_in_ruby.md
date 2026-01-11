---
layout: post
title: "Creating and Using Value Objects in Ruby"
---

## Creating and Using Value Objects in Ruby

Value objects in Ruby are a powerful way to encapsulate multiple values into a single, meaningful object. They are particularly useful for reducing boilerplate code and enhancing the clarity and maintainability of your codebase. Here's a streamlined guide on how to create and use value objects in Ruby using the `Data` class, which is the idiomatic way since Ruby 2022.

### What is a Value Object?

A value object is an immutable object that is comparable by type and value. It groups related values together under a meaningful name, making your code more readable and easier to refactor. Value objects are useful for carrying around multiple related values and responding to simple messages like property values or representations.

### Why Use a Value Object?

1. **Immutability**: Ensures that the object's state cannot be altered once it is created, providing safety and predictability.
2. **Greppability**: Easily find and refactor all instances of the object in your codebase.
3. **Naming**: Provides a meaningful name for a group of related values.
4. **Flexibility**: Allows you to add utility methods, computed properties, or predicates.

### Creating Value Objects with the `Data` Class

The `Data` class in Ruby provides a convenient way to define simple classes for value-alike objects. Here's how you can use it:

#### Basic Example

```ruby
Price = Data.define(\:amount, \:currency)

price = Price.new(amount: 50, currency: "USD")
# => #<data Price amount=50, currency="USD">
```

### Properties of the Data Object

1\. Immutability: Once created, the attributes of a Data object cannot be changed.

```ruby
price = Price.new(amount: 50, currency: "USD")
price.amount = 100 # Raises an exception
```

2\. Comparability: Two Data objects are equal if they have the same type and values.

```ruby
price1 = Price.new(amount: 50, currency: "USD")
price2 = Price.new(amount: 50, currency: "USD")
price1 == price2 # => true
```

### Changing Values

To change one or more values, use the with method to create a new instance:

```ruby
price_a = Price.new(amount: 50, currency: "USD")
price_b = price_a.with(amount: 100)
# => #<data Price amount=100, currency="USD">
```

### Defining Custom Methods

You can define custom methods by passing a block to define:

```ruby
Price = Data.define(\:amount, \:currency) do
  def to_s
    "#{currency} #{amount}"
  end
end

price = Price.new(amount: 50, currency: "USD")
price.to_s # => "USD 50"
```

### Default Values

You can set default values by overriding the initializer:

```ruby
Price = Data.define(\:amount, \:currency) do
  def initialize(amount:, currency: "USD")
    super
  end
end
```

### Checking Attribute Types

Use pattern matching to check the types of attributes:

```ruby
Price = Data.define(\:amount, \:currency) do
  def initialize(amount:, currency:)
    amount => Integer
    currency => String
    super
  end
end
```

## Practical Examples

Example 1: Removing Boilerplate Constructor Code

Instead of writing a class with an initializer and getters, you can simplify it using the ** Data class**: 

```ruby
class Link < Data.define(\:url, \:source)
end
```

Example 2: Handling API Responses

When calling an external API, you can create a Response object to handle the response:

```ruby
class Response < Data.define(\:body, \:status, \:headers)
  HTTP_SUCCESS_STATUS_CODES = (200..299)

  def success? = HTTP_SUCCESS_STATUS_CODES.include?(status)
  def parsed_body = JSON.parse(body, symbolize_names: true)
  def failed? = !success?
end
```

Example 3: Global List of Objects

You can define a global list of objects, such as reasons for flagging content:

```ruby
class Flag < ApplicationRecord
  Reason = Data.define(\:name, \:description, \:value)

  REASONS = [
    { name: \:broken, description: 'Link does not work', value: 10 },
    { name: \:insecure, description: 'Link is not secure or safe', value: 20 },
    { name: \:spam, description: 'Spam or misleading', value: 30 },
    { name: \:inappropriate, description: 'Inappropriate imagery or language', value: 40 },
    { name: \:other, description: 'Other', value: 50 }
  ].map { |reason| Reason.new(**reason) }
end
```

## Conclusion

Using the Data class to create value objects in Ruby is a modern, idiomatic approach that enhances code clarity, maintainability, and safety. By leveraging immutability and comparability, you can create robust and predictable objects that simplify your codebase. For more advanced use cases and examples, refer to the official Ruby documentation and additional resources on value objects.