+++
layout = "post"
title = "Write closures with Python"
categories = ["python"]
tags = ["python"]
description = "Closures for the DRY writer"
+++

It is not the easiest bit to grasp, but really worth it.

A closure is a function that returns a function.

```python
def multiplier_of(x):
    def multiply(y):
        return x * y

    return multiply


multiplywith5 = multiplier_of(5)
# multiplywith5 is equal to:
#
# def multiply(y):
#   return 5 * y
#
print(multiplywith5(9)) # => 45
```

In Rubyland one usually uses blocks (yield) instead of closures.
