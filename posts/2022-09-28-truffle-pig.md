+++
title = "TruffleRuby homelab worker pool experiment"
layout = "post"
+++

TruffleRuby, the mythical beast. I never dared to lay hands upon. Yet, ASDF-VM
ploughed through the else tedious installation.

What's better than having code snip you can run on MRI and on Truffle and get a
feel for it yourself? Right?!

Clone https://github.com/simonneutert/truffle_pig from GitHub\
add a `main.rb` at project root and run `$ time ruby main.rb` using MRI, then
run again with Truffle22

```ruby
# frozen_string_literal: true

require 'pry'
require 'prettyprint'
require 'etc'

require_relative 'lib/truffle_pig'

cpu_processors = Etc.nprocessors
p cpu_processors #=> Number of (virtual) CPU Processors

piggy = TrufflePig.new(workers: cpu_processors)

piggy.add_job do
  1 / 0
end

(1..24).each do |i|
  piggy.add_job do
    sleep 1

    result = 0
    10_000.times do
      result = i**i
    end
    puts "job_id ##{i}, result: #{result}"
    { job_id: i, result: result }
  end
end

puts "#{piggy.queue.size} jobs added"

results = piggy.perform(reject_errors: true, custom_logger: ->(e) { pp e })
puts "\n\n\n\n"
puts 'The results are in:'
puts "\n\n\n\n"

pp results
```
