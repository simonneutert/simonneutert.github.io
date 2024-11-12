---
title: "Today I learned about postgres with clause"
layout: post
---

A `with` clause can be used to create a temporary table that can be used in the query. This is useful when you want to use the same subquery multiple times in the main query.

```sql
WITH total_activities AS (
  SELECT a.profile_id, count(a.id) AS activity_count 
  FROM activities a
  GROUP BY profile_id
)
SELECT * FROM total_activities 
UNION ALL
SELECT 0, sum(activity_count) FROM total_activities
ORDER BY profile_id
```

In the above query, `total_activities` is a temporary table that is created using the `with` clause. This temporary table is then used in the main query to get the total count of activities for each profile and also the sum of all activities.
