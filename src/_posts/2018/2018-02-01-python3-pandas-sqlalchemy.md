---
layout: post
title: Load Database into a Pandas DataFrame using sqlAlchemy
categories: [python]
tags: [python, datascience]
description: Query like a boss
---


``` python
# Import packages
from sqlalchemy import create_engine
import pandas as pd

# Create engine: engine
engine = create_engine('sqlite:///Sample_SQLite_DB_Name.sqlite')

# Open engine in context manager
# Perform query and save results to DataFrame: df
with engine.connect() as connection:
    query_result = connection.execute('SELECT LastName, Title FROM Employee')

    # fetch first 3 elements in db
    df = pd.DataFrame(query_result.fetchmany(3))
    # or fetch all?
    # df = pd.DataFrame(query_result.fetchall())

    # Set the DataFrame's column names
    df.columns = rs.keys()

# Print the length of the DataFrame df
print(len(df))

# Print the head of the DataFrame df
print(df.head())
```
