---
layout: post
title: Optional Command-Line Arguments for Python
categories: [python]
tags: [python]
description: Pass Command-Line Arguments to your scripts
---

Sometimes one would like to run a function straight from the terminal. Passing command-line arguments do make it possible. See the [Python Documentation](https://docs.python.org/3.6/library/argparse.html) for further details.

This is the content of a demo file call __fib.py__:

```python
# fib.py
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('-n', '--n', help='calc the nth fib number', default=5)
args = parser.parse_args()
x = int(args.n)

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

print(naive_fib(x))
```

Navigate to the file's directory and run: `$ python fib.py -n 5`
