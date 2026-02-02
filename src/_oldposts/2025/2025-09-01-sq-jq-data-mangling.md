---
title: "sq + jq: The Dynamic Duo for Data Mangling"
layout: post
---

When it comes to transforming data on the command line, `sq` and `jq` make a powerful combination. While `jq` is the gold standard for JSON manipulation, `sq` brings SQL-like querying to structured data formats.

Visit [sq.io](https://sq.io) to learn more about `sq`.

## Why This Combo Rocks

> sq is a free/libre open-source data wrangling swiss-army knife to inspect, query, join, import, and export data. You could think of sq as jq for databases and documents, facilitating one-liners like:
>
> `sq '@postgres_db | .actor | .first_name, .last_name | .[0:5]'`

`sq` excels at querying databases and converting between formats, while `jq` shines at transforming JSON structures. Together, they form a pipeline that can handle complex data transformations with elegance.

## The Sweet Spot

The magic happens when you need to:
- Extract data from databases/Excel/CSV in specific formats
- Transform complex nested structures
- Chain operations that leverage each tool's strengths
- Work with mixed data sources (SQL → JSON → processed output)

## Real-World Example

Check out this [gist](https://gist.github.com/simonneutert/f71a507d67142a2d59152f917bff9654) for practical examples with a CSV file of `sq` and `jq` working together to tackle common data processing tasks.

The combination transforms what would be complex multi-step processes into concise, readable pipelines. 
