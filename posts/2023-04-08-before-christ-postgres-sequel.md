+++
title = "Ruby: Sequel and Dates BC (Before Christ) - Cheesus Chwist, I nearly went mad 🤪"
layout = "post"
+++

When fiddling with date ranges, I stumbled about an error which caused my
application to break.

```text
PG::DatetimeFieldOverflow: ERROR:  date/time field value out of range: "0000-12-31 23:00:00.000000+0000"
LINE 1: ..." WHERE (("action" = 'deposit') AND ("realized" > '0000-12-3...
                                                             ^: SELECT sum(cast(amount_cents as int)) as saldo  FROM "bookings" WHERE (("action" = 'deposit') AND ("realized" > '0000-12-31 23:00:00.000000+0000')) LIMIT 1
```

I configured Sequel (and the database) to use UTC all the way down, causing my
testsuite to brake 🥲\
https://sequel.jeremyevans.net/rdoc/classes/Sequel/Timezones.html

## Enhancing PostgreSQL Date Support with `pg_extended_date_support` Sequel extension

PostgreSQL is a powerful and versatile open-source relational database
management system. Its robust feature set has made it a popular choice for
developers and businesses worldwide. One area where PostgreSQL has some
limitations is in handling dates and timestamps, specifically infinite and BC
dates/timestamps. I

What is Sequel's `pg_extended_date_support` extension?

The `pg_extended_date_support` extension adds support for infinite and BC
dates/timestamps in PostgreSQL. While the postgres adapter already had a
convert_infinite_timestamps setting, it wasn't supported in the jdbc/postgresql
adapter, and it didn't handle BC dates/timestamps. This new extension resolves
these issues and ensures better compatibility with various adapters.

How to Use the `pg_extended_date_support` Extension:

To use the pg_extended_date_support extension, you will need to load it into
your application and configure it according to your needs. By default, the
extension only fixes the handling of BC dates/timestamps. To enable it to handle
infinite timestamps, you need to choose the appropriate setting for your
application. Here's how to do it:

1. Load the extension for your database:

```ruby
DB.extension :pg_extended_date_support
```

2. Configure the convert_infinite_timestamps setting:

```ruby
DB.convert_infinite_timestamps = :string # or :float or :nil
```

Choose the appropriate setting based on your application's requirements. The
available options are:

:string - Infinite timestamps will be converted to strings. :float - Infinite
timestamps will be converted to floating-point numbers. :nil - Infinite
timestamps will not be converted and will be returned as nil. Additional
Benefits of the pg_extended_date_support Extension:

### Bonus / Conclusion

Apart from handling infinite and BC dates/timestamps, the
pg_extended_date_support extension also enables the handling of timezone offsets
with seconds. This feature is not natively supported by Ruby's Time class in
versions earlier than 2.5. By using this extension, you can now work with
timezones that have a non-minute offset, making your application more flexible
and adaptable to various timezones.

The pg_extended_date_support extension is a valuable addition to PostgreSQL, as
it improves the handling of dates and timestamps, particularly infinite and BC
dates/timestamps. Additionally, it enables support for timezone offsets with
seconds, further enhancing PostgreSQL's capabilities. If you're working with
PostgreSQL, consider integrating this extension into your application to make
the most of its robust date and timestamp handling features.
