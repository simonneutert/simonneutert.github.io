---
layout: post
title: Count Intersections of a list with a 2D-Array
categories: [python]
tags: [python, numpy, data]
description: Sophisticated 2D Array Occurance Counting
---


``` python
import numpy as np
import pandas as pd

uniques = [[1, 3], [5, 9]]
df_values = [[2,5,7,1,3,6,0,5],
            [1,3,4,5,6,7,8,9],
            [3,9,9,9,9,9,9,9],
            [1,3,4,5,6,7,8,9]]


df = pd.DataFrame([])
for combi in uniques:
    a, b = combi[0], combi[1]
    x = len([1 for row in df_values if a in row and b in row])
    res = pd.DataFrame([a, b, x])
    df = pd.concat([df, res], axis=0, ignore_index=True)

print(df)
```

Please note, that [numpy.isin](https://docs.scipy.org/doc/numpy-1.13.0/reference/generated/numpy.isin.html) may come up with different results.
