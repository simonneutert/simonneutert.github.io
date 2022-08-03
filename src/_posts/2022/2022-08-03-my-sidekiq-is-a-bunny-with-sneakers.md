---
title: My Sidekiq may be a bunny with sneakers
layout: post
---

[Ruby-on-Rails](https://rubyonrails.org) and [Sidekiq](https://sidekiq.org).  
[Roda](https://roda.jeremyevans.net) and a "[Bunny](http://rubybunny.info) with [Sneakers](https://github.com/jondot/sneakers)"?

What got me thinking and in an experimental mood was [Stanko.io - RabbitMQ is more than a Sidekiq Replacement](https://stanko.io/rabbitmq-is-more-than-a-sidekiq-replacement-b730d8176fb). And I highly encourage you to at least look at the nice gifs the author made to clear things up.

Let's build on this quote:

> The biggest difference between the two implementations is the ack! on line 10. That line enables Sneakers and RabbitMQ to guarantee that a job has been processed. This is a feature of RabbitMQ's communication protocol — AMQP. In AMQP a message can be popped from a queue in two modes — ack mode and no-ack mode.
>
> In ack mode the consumer must specify the maximum amount of time for it to process the message. When the consumer pops a message from the queue it's virtually removed from it, but RabbitMQ still keeps a copy of it. If the consumer fails to send an "ack" signal in the specified time period the message is put back at the front of the queue so that another consumer can process it. If the consumer sends an "ack" signal in the specified time period the message is fully removed from RabbitMQ. In no-ack mode no guarantees are given, no time window has to be specified, and no "ack" signal has to be sent.

### ACK! - Work done! Job done! FREE THE QUEUE!

Let' have a nice and clean job queue over two terminals 💻⚡️💻

#### Prerequisities

- You need Docker
- run RabbitMQ in Docker:  
`$ docker run -d --hostname my-rabbit --name some-rabbit -p15672:15672 -p5672:5672 rabbitmq:3-management`
- open your browser at `localhost:15672` and login with `guest:guest`
- `$ gem install sneakers bunny pry`

We will now put two simple ruby scripts to use.

**‼️ If you get weird errors from RabbitMQ, try deleting all queues first**

First the consumer:

```ruby
# easy_consumer.rb
require 'pry'
require 'bunny'
require 'prettyprint'

begin
  # Start a communication session with RabbitMQ
  conn = Bunny.new
  conn.start

  # open a channel
  ch = conn.create_channel
  ch.confirm_select

  # declare a queue
  q = ch.queue('test1')
  q.subscribe(manual_ack: true) do |delivery_info, _metadata, payload|
    puts "This is the message: #{payload}"

    # acknowledge the delivery so that RabbitMQ can mark it for deletion
    ch.ack(delivery_info.delivery_tag)
  end
  while true
    # yo
  end

  # binding.pry
rescue SignalException => e
  pp 'Closing ...'
  ch.close
  # close the connection
  conn.close
end
```

run `$ ruby easy_consumer.rb`

The producer is just as simple:

```ruby 
# easy_producer.rb
require 'pry'
require 'bunny'
require 'json'
require 'prettyprint'

begin
  # Start a communication session with RabbitMQ
  conn = Bunny.new
  conn.start

  # open a channel
  ch = conn.create_channel
  ch.confirm_select

  # declare a queue
  q = ch.queue('test1')

  # publish a message to the default exchange which then gets routed to this queue
  q.publish({ type: 'error', message: 'HALP!', error: 'CODE001' }.to_json)

  # publish to your heart's content
  binding.pry
ensure
  puts 'Closing ...'
  ch.close
  # close the connection
  conn.close
end

```

Now in a second terminal run: `$ ruby easy_producer`

and use pry to send messages - good times 👏

## What's with the sneakers?

Time to put the worker to work 🤓

```ruby
# bunny_sneaker_worker.rb
require 'pry'
require 'bunny'
require 'sneakers'
require 'prettyprint'
require 'json'

class Processor
  include Sneakers::Worker
  from_queue :testsneaker

  def work(msg)
    err = JSON.parse(msg)

    pp 'OUTPUT:'
    pp err
    ack!
  end
end
```

run it according to the *sneakers docs*  
`$ sneakers work Processor --require bunny_sneaker_worker.rb`

THEN fire up a producer!

```ruby 
require 'pry'
require 'bunny'
require 'json'

def quick_publish(ch, message = 'HALP!')
  json_message = { type: 'error',
                   message: message,
                   error: 'CODE001' }.to_json

  ch.default_exchange.publish(json_message, routing_key: 'testsneaker')
end

begin
  # Start a communication session with RabbitMQ
  conn = Bunny.new
  conn.start

  ch = conn.create_channel
  ch.default_exchange.publish({ type: 'error', message: 'HALP!', error: 'CODE001' }.to_json, routing_key: 'testsneaker')

  # publish to your heart's content
  binding.pry # quick_publish(ch, "What's going on here?")
ensure
  ch.close
  # close the connection
  conn.close
end
```

Wow, that was easy and somehow just as mindblowing as finishing this ⚗️ [Elixir tutorial](https://howistart.org/posts/elixir/1/)!

### But ... you know, Clojure ... like ... Rich said:

> It reduces your flexibility in modeling - this is a world in which everyone sits in a windowless room and communicates only by mail. Programs are decomposed as piles of blocking switch statements. You can only handle messages you anticipated receiving. Coordinating activities involving multiple actors is very difficult. You can’t observe anything without its cooperation/coordination - making ad-hoc reporting or analysis impossible, instead forcing every actor to participate in each protocol.<br /><span>Rich Hickey - https://clojure.org/about/state#actors</span>