+++
title = "Copy Arrays and Lists"
+++

# This is how you copy an Array / a List correctly.

Let's create an Array / List first:

```
a = ["Simon", "Laura"]
```

Then copy it properly!

**in Python**

```python
b = a[:]
```

**in Ruby**

```ruby
b = a.map(&:clone)
```

# The following example shows the "false friend declaration"

By simply declaring the array variable **a** to a new variable **b**, then **b**
points to **a**. So every change of **a** means change in **b** and vice versa.

Now add a new value to **a**:

**Python**

```python
a = ["Simon", "Laura"]
b = a
a.append("Willi")
print(b)
```

**Ruby**

```ruby
a = ["Simon", "Laura"]
b = a
a.push("Willi")
put b
```

In both cases **b** will return `["Simon", "Laura", "Willi"]`
