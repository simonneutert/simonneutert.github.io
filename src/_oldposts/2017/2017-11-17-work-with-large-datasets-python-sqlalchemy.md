---
layout: post
title: Plough Through Large Datasets From a Database with Python's SQLAlchemy
categories: [python, datascience]
tags: [python, data, sql]
description: Plough Through Large Datasets From a Database with Python's SQLAlchemy
---

``` python
# assume:
# more_results = True
# results_proxy is a predefined call to the database

# Start a while loop checking for more results
while more_results:
    # Fetch the first 50 results from the ResultProxy: partial_results
    partial_results = results_proxy.fetchmany(50)

    # if empty list, set more_results to False
    if partial_results == []:
        more_results = False

    # Loop over the fetched records and increment the count for the state
    for row in partial_results:
        if row.state in state_count:
            state_count[row.state] += 1
        else:
            state_count[row.state] = 1

# Close the ResultProxy, and thus the connection
results_proxy.close()

# Print the count by state
print(state_count)
```
