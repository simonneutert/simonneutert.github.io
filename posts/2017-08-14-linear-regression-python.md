+++
layout = "post"
title = "Simple Linear Regression with Python"
categories = ["python", "datascience"]
tags = ["python", "data", "math", "science"]
description = "Simple linear regression using Python and SciPy"
+++

In my case I had to parse an XML first, I used
[BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-beautiful-soup)
for that. To format the data the way I needed, I stumbled across a gorgeous
feature of Python's
[.zip()](https://docs.python.org/3.6/library/functions.html#zip) function. Of
course it lets you do what you expect it to do:

```python
a = [1, 2, 3]
b = ["a", "b", "c"]
zip(a, b)
# >>> [(1, 'a'), (2, 'b'), (3, 'c')]
```

Here is what kept my code short and concise:

```python
x_y_parameters = [[1, 'a'], [2, 'b'], [3, 'c']]
x, y = zip(*x_y_parameters)
# >>> x
# (1, 2, 3)
# >>> y
# ('a', 'b', 'c')
```

Now, on to
[SciPy's linear regression](https://docs.scipy.org/doc/scipy-0.14.0/reference/generated/scipy.stats.linregress.html)
(at least)! Taken straight from the docs. `pip install scipy` - you need that
package

```python
from scipy import stats
import numpy as np
x = np.random.random(10)
y = np.random.random(10)
slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
```

Using a sexy list comprehension lets you use all results of the regression in an
instance. Just one little thing to watch out is there though.
`stats.linregress(x, y)` may need **numpy** formatted Lists/Arrays as input -
this short note may keep your sanity at level one day.
