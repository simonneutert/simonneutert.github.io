---
published: false
title: Does everyone sit in a windowless room eventually?
layout: post
---

After my first little experience with RabbitMQ (powered by Erlang), I got back to an experiment I did years ago:  
this ⚗️ [Elixir tutorial](https://howistart.org/posts/elixir/1/)

It is still mindblowing how easy a distributed system could be setup 🤯  
in the most basic example, of course.

### The "Actor Model" and Clojure 🤔 

I had to google a little, to find the quote that stuck in the back of my mind.

> It reduces your flexibility in modeling - this is a world in which everyone sits in a windowless room and communicates only by mail. Programs are decomposed as piles of blocking switch statements. You can only handle messages you anticipated receiving. Coordinating activities involving multiple actors is very difficult. You can’t observe anything without its cooperation/coordination - making ad-hoc reporting or analysis impossible, instead forcing every actor to participate in each protocol.<br /><span>[Rich Hickey in the Clojure Docs](https://clojure.org/about/state#actors)</span>

And yes it sounds reasonable, but he continues with:

> Clojure may eventually support the **actor model** for distributed programming, paying the price only when distribution is required, but I think it is quite cumbersome for same-process programming. YMMV of course.<br /><span>Rich Hickey</span>

As with all things, nothing comes without a price tag. If distributed software requires a very strict data contract and in regards to Erlang's success - it may be the best abstraction to make distributed systems work.

Having to have a precise idea of what data goes where (and why), is never a bad thing.
