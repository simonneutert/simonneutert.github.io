---
title: Stream Database Rows with sequel_pg
layout: post
---

Reading the docs (thoroughly, maybe twice) can be a good thing.

As the haiku goes:

> Pages filled with light,  
> Guiding hands through code's maze,  
> Errors fade away.

## TIL

I've been using Sequel for a while now. But up until today, I didn't know that I could stream database rows with `sequel_pg`. This will reduce memory usage when working with large datasets and if I understand correctly, it will also speed up the processing of the data.

If your database is postgres, [sequel_pg](https://github.com/jeremyevans/sequel_pg) should be already your go-to gem.  
Yet, you might not know that you can stream database rows with it.


```markdown
== Streaming

If you are using PostgreSQL 9.2+ on the client, then sequel_pg
should enable streaming support.  This allows you to stream returned
rows one at a time, instead of collecting the entire result set in
memory (which is how PostgreSQL works by default).  You can check
if streaming is supported by:

  Sequel::Postgres.supports_streaming?

If streaming is supported, you can load the streaming support into the
database:

  DB.extension(:pg_streaming)

Then you can call the Dataset#stream method to have the dataset use
the streaming support:

  DB[:table].stream.each{|row| ...}

If you want to enable streaming for all of a database's datasets, you
can do the following:

  DB.stream_all_queries = true
```

In my project, I set up the streaming like this (the most basic way, I guess):

```ruby
DB.extension(:pg_streaming)
DB.stream_all_queries = true
```

And voilà, free speed and memory savings. 🚀

## Side Note

If you were using `use_cursor` in your project, make sure to benchmark it against the streaming feature. It can be faster than using a cursor (in a rare circumstance). In my case, streaming was the clear winner.
