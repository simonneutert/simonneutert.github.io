---
layout: post
title: Fibonacci in Python
categories: [python]
tags: [python]
description: Sophisticating a Fibonacci Calculation with Python
---

Why not practice some Python?

Calculating Fibonacci numbers should be a perfect grinder :-)

first 5 fib => 0, 1, 1, 2, 3
first 10 fib => 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

A naive implementation would look like this:

``` python
def naive_fib(x):
    if x== 0 or x == 1:
        return 0

    if x == 2:
        return 1

    a, b = 0, 1

    while x > 2:
        a, b = b, a + b
        x -= 1

    return b

print(naive_fib(5)) #=> 3
```

You need a list of the results? No Problem, but watch out for a explosion of memory:

``` python
def list_fib(x):
    fibs = [0, 1]

    if x == 1 or x == 0:
        return [fibs[0]]
    if x == 2:
        return fibs

    while x > 2:
        fibs.append(fibs[-2] + fibs[-1])
        x -= 1

    return fibs


print(list_fib(5)) #=> [0, 1, 1, 2, 3]
```

Iterating over the results is made easy by Python's built-in Generators. This goes easy on your memory and should run quite fast :-)

``` python
def yield_fib(x):
    if x == 1:
        print(0)
        return 0

    if x == 2:
        print(1)
        return 1

    a, b = 0, 1
    for i in range(x):
        yield a
        a, b = b, a + b


[print(i) for i in yield_fib(5)]
#=> 0
#=> 1
#=> 1
#=> 2
#=> 3
```
