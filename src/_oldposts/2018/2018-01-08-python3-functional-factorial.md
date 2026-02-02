---
layout: post
title: Understand Recursion. An example in Python.
categories: [python]
tags: [python, fp]
description: Head your Wrap Around Functions?!
---

Recursive Function Calls or Functional Programming as a concept can be quite daunting for beginners.

This example shows how looping can be replaced, with a lambda. Do not fear.

* Calculating the factorial of a number by using loops

``` python
# factorial with loops

# while-loop
def while_factorial(n):
  if n <= 0:
    return 0
  else:
    num = 1
    while n >= 1:
        num = num * n
        n = n - 1
    return num

assert while_factorial(4) == 24
assert while_factorial(5) == 120


# for-loop
def for_factorial(x):
  if x == 1:
    return 1
  elif x <= 0:
    return 0
  else:
    for i in range(1, x):
      x *= i
    return x

assert for_factorial(4) == 24
assert for_factorial(5) == 120
```

* by recalling a function/method:

``` python
# traditional
def rec_factorial(x):
  if x is 1:
    return 1
  else:
    return x * rec_factorial(x - 1)


assert rec_factorial(4) == 24
assert rec_factorial(5) == 120
```

* using __lambdas__ results in code that looks something like this:

``` python
# lambda implementation
lambda_factorial = lambda x: 1 if x is 1 else x * lambda_factorial(x-1)
# pay attention to how a if-else-guard is implemented


assert lambda_factorial(4) == 24
assert lambda_factorial(5) == 120
```

Functional Programming means a function may return a function. To get an idea of what is going on behind the curtains - visualizing functions helps me.


``` python
lambda_factorial(4) ==
# lambda_factorial(4) => 4 * lambda_factorial(4-1)

  4 * lambda_factorial(4-1) ==

    4 * lambda_factorial(3) ==
    # lambda_factorial(3) => 3 * lambda_factorial(3-1)

      4 * 3 * lambda_factorial(3-1) ==

        4 * 3 * lambda_factorial(2) ==

          4 * 3 * 2 * lambda_factorial(2-1) ==

            4 * 3 * 2 * lambda_factorial(1) == #(lambda_factorial(1) returns 1)

              4 * 3 * 2 * 1
              # => 24
```
