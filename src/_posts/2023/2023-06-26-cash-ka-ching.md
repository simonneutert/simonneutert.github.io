---
layout: post
title: "I coded a cash register backend in Ruby backed by Postgres"
---

I've been working on a cash register backend in Ruby for the past few months after work and sometimes on weekends. It's been a fun project and I've learned a lot about Ruby, Postgres, and how to keep calm and trash the hell out of ideas.

Again, as readers of my blog will guess, I bet my horses on Roda and Sequel. I've been using them for a while now and I'm very happy with them. I've also been using Postgres for a while now and I'm very happy with it too. I'm not sure if I'll ever use MySQL again 🤭

My main idea was to play with Postgres' locking mechanisms and see if I could build a cash register backend that could handle multiple concurrent requests. I wanted to eliminate the ever so slight chance of concurrent requests messing up the cash register's state. I also wanted to see if this would slim down the logic part in the backend code.

#### TLDR

I think I've succeeded in building a cash register backend that can handle multiple concurrent requests. I've also managed to slim down the logic part in the backend code. I'm not sure if someone will ever use this in production, but it's been a fun project and I've learned a lot.

- [ka-ching-backend](https://github.com/simonneutert/ka-ching-backend)
- [ka-ching-client](https://github.com/simonneutert/ka-ching-client)

There is also a demo to showcase the API and the client in conjunction. It's a simple Roda app with [htmx](https://htmx.org/) for the frontend. It's not pretty, but it works.

[Check out the demo repository on GitHub](https://github.com/simonneutert/ka-ching-demo)!

## Table of contents<!-- omit in toc -->

- [The cash register](#the-cash-register)
  - [What this this system is not intended to be/do](#what-this-this-system-is-not-intended-to-bedo)
- [It's Architecture? A Micro-Monolith!](#its-architecture-a-micro-monolith)
- [Implementing the backend with Roda and Sequel](#implementing-the-backend-with-roda-and-sequel)
  - [My goals for the backend](#my-goals-for-the-backend)
  - [Database Lockings with Sequel](#database-lockings-with-sequel)
  - [Learning more about Roda and Sequel](#learning-more-about-roda-and-sequel)

## The cash register

The cash register is a simple machine that can handle the following operations:

- Wrap transactions of the cash register for a certain period of time
- Add money to the cash register (deposit)
- Remove money from the cash register (withdraw)
- Get the current state of the cash register (saldo)
- Get the history of the cash register (list of transactions)
- Track certain events in an audit log (e.g. when the cash register was reopened, after it was closed)

### What this this system is not intended to be/do

- The cash register is not a point of sale (POS) system.
- It's not meant to be used by a cashier to scan items and print receipts.
- It's not meant to be used by a customer to pay for their groceries.
- It's not meant to be used by a manager to get reports on the sales of the day.

## It's Architecture? A Micro-Monolith!

I've been using the term "micro-monolith" for a while now. I'm not sure if it's a thing, but I like it. It's a monolith, but it's a small one. It's a monolith that can easily serve as a base of something bigger oder act as a standalone system. Being a micro-monolith it cannot be split into smaller parts. It's a monolith, but it's a small one.

The main reason I struggle with calling it a microservice is, that I want it to be understood as a product and not as a service. It does not do a generic single thing. It does a specific set of things that together represent my interpretation of a cash register system. Maybe I am just too happy with [DHH leaving the cloud](https://world.hey.com/dhh/we-stand-to-save-7m-over-five-years-from-our-cloud-exit-53996caa) and [Amazon reverting to a monolith](https://www.reddit.com/r/aws/comments/137lyno/amazon_prime_microservices_to_monolith/) for their "Prime Video". I don't know.

## Implementing the backend with Roda and Sequel

It's been a breeze! By coincidence Jeremy Evans, the maintainer of Roda and Sequel (and many more) had been the guest in [The Rubber Duck Dev Show](https://www.youtube.com/watch?v=Hh_lqARFGcg) sharing his ideas first hand with the audience.

### My goals for the backend

- multi-tenant database architecture
- relies on database locks for critical operations
- json columns in most tables, to pass your own context
- fast, cheap, and reliable
- short and concise codebase
- lean on dependencies
- with containerization in mind
- have a client ready to use the API as a ruby gem

### Database Lockings with Sequel

In order to lock a table in Postgres you can use the `LOCK` statement. It's a very powerful tool and can be used to lock a table in different ways. I've been using the `ACCESS EXCLUSIVE` mode to lock the tables `lockings` and `bookings` in order to prevent concurrent requests from messing up the cash register's state.

Looking at the code below you can see that I'm using Sequel's `transaction` method to wrap the two `LOCK` statements and the `INSERT` statement into a single transaction. This way I can be sure that the two `LOCK` statements and the `INSERT` statement are executed in a single transaction. If one of the statements fails, the whole transaction is rolled back.

```ruby
@conn.transaction do
  @conn.run('LOCK TABLE lockings IN ACCESS EXCLUSIVE MODE')
  @conn.run('LOCK TABLE bookings IN ACCESS EXCLUSIVE MODE')
  new_booking_id = @conn_bookings.insert(id: SecureRandom.uuid,
                                          amount_cents: @booker.amount_cents,
                                          action: @booker.action,
                                          realized: @booker.realized,
                                          context: @booker.context.to_json)

  query_bookings(@conn).find_by(id: new_booking_id)
end
```

If you want to dig into what locking a table in Postgres means, I recommend reading [the Postgres Documentation on Explicit Locking](https://www.postgresql.org/docs/current/explicit-locking.html).

### Learning more about Roda and Sequel

As the two projects play well together I learned a lot about both of them. Roda's idea of the routing tree was a great opportunity to come up with a way of using and reusing database connections depending on where your requests are routed to. Sequel keeps things easy and straight by mostly acting as a wrapper around SQL, without applying custom object-relational mapping (ORM) logic. Hashes are the way to go and I really dig that.

Connecting to one of the tenant database's looks like this currenyly:

```ruby
def self.db_connection(database, &block)
  Sequel.connect(
    "postgres://#{DATABASE_URL}:#{DATABASE_PORT}/#{database}?user=#{DATABASE_USER}&password=#{DATABASE_PASSWORD}",
    logger: DB::LOGGER,
    &block
  )
end
```

Utilizing the `&block` parameter of the `Sequel.connect` method allows me to pass a block to the method. This way I can make sure that the connection is closed after the block has been executed. This is a great way to make sure that the connection is closed after the request has been processed.
