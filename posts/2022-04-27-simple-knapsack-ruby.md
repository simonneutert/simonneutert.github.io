+++
layout = "post"
title = "Super Simple Knapsack Ruby"
categories = ["ruby"]
tags = ["ruby"]
+++

Knapsack? What sack?

Wikipedia says:

> The knapsack problem is a problem in combinatorial optimization: Given a set
> of items, each with a weight and a value, determine the number of each item to
> include in a collection so that the total weight is less than or equal to a
> given limit and the total value is as large as possible. It derives its name
> from the problem faced by someone who is constrained by a fixed-size knapsack
> and must fill it with the most valuable items. The problem often arises in
> resource allocation where the decision makers have to choose from a set of
> non-divisible projects or tasks under a fixed budget or time constraint,
> respectively.

**main.rb**

```ruby
# main.rb

require_relative 'simple_knapsack'

input_data = [
  {
    l: 12,
    v: 4
  },
  {
    l: 2,
    v: 2
  },
  {
    l: 1,
    v: 2
  },
  {
    l: 1,
    v: 1
  },
  {
    l: 4,
    v: 10
  }
]

limit = 15

ksack = SimpleKnapsack.new(limit, input_data)
result = ksack.calculate
puts result[:result][:score_v] == 15
puts result[:result][:score_l] == 8

input_data = [
  {
    l: 75,
    v: 76
  },
  {
    l: 50,
    v: 50
  },
  {
    l: 50,
    v: 50
  }
]

limit = 100

ksack = SimpleKnapsack.new(limit, input_data, debug: true)
result = ksack.calculate
puts result[:result][:score_v] == 100
puts result[:result][:score_l] == 100
```

**simple_knapsack.rb**

```ruby
# simple_knapsack.rb

class SimpleKnapsack
  def initialize(limit, data, debug: false)
    @limit = limit
    @data = data
    validate_data_structure! if debug
    @data_with_ratios = calc_ratios
    @results = []
  end

  def validate_data_structure!
    puts 'Debug mode: ON!, raising error when receiving malformed data!'
    raise ArgumentError('Please format your input data!') unless @data.all? do |item|
      Integer(item[:v]) && Integer(item[:l])
    end
  end

  def calculate
    return calculate_relative_value if in_sacks_limits?(score_item_key(:l, @data))

    best_combination_score = calculate_combinations
    @results.max { |r| r[:result][:score_v] }
  end

  private

  def track_result(method_name, result)
    @results.push({ method: method_name.to_sym, result: })
    result
  end

  def calculate_combinations
    best_results = nil
    current_v_score = 0
    current_l_score = 0

    (1..(@data_with_ratios.count - 1)).each do |i|
      @data_with_ratios.combination(i).each do |combination|
        v_score = score_item_key(:v, combination)
        l_score = score_item_key(:l, combination)

        next unless v_score > current_v_score && l_score <= @limit

        current_v_score = v_score
        current_l_score = l_score
        best_results = combination.map(&:dup)
      end
    end

    track_result(:calculate_combinations, build_result_hash(items: best_results))
  end

  def calculate_relative_value
    result = []
    rich_data = @data_with_ratios.sort_by { |d| d[:ratio] }.map(&:dup)
    result.push(rich_data.pop) while sum_up_while_in_given_limit(result)
    result.pop while in_sacks_limits?(score_item_key(:l, result))

    track_result(:calculate_relative_value, build_result_hash(items: result))
  end

  def score_item_key(k, result)
    result.sum { |entry| entry[k] }
  end

  def calc_ratios
    @data.map do |d|
      ddup = d.dup
      ddup[:ratio] = Rational(ddup[:v], ddup[:l])
      ddup
    end
  end

  def build_result_hash(items:)
    {
      items:,
      score_v: score_item_key(:v, items),
      score_l: score_item_key(:l, items)
    }
  end

  def sum_up_while_in_given_limit(result_data)
    return true if result_data.empty? || in_sacks_limits?(score_item_key(:l, result_data))
  end

  def in_sacks_limits?(val)
    val < @limit
  end
end
```
