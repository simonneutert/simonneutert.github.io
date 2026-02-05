+++
layout = "post"
title = "Refactor like a boss with Sandi Metz"
categories = ["ruby"]
tags = ["ruby"]
description = "Sandi knows!"
fullview = false
+++

This post is inspired by:

[RailsConf 2014 - All the Little Things by Sandi Metz](https://www.youtube.com/watch?v=8bZh5LMaSmE)

The code is on my
[GitHub: GildedRose Kata](https://github.com/simonneutert/gilded_rose_kata)

in essence, here is how the code transforms:

from this infinite if clause inferno:

```ruby
class GildedRose
  # ...

  def tick
    # 16 if statements
    # 7 !=
    # 2 != with &&
    # 3 magic strings
    # ? magic numbers
    if @name != 'Aged Brie' && @name != 'Backstage passes to a TAKFAL80ETC concert'
      if @quality > 0
        if @name != 'Sulfuras, Hand of Ragnaros'
          @quality -= 1
        end
      end
    else
      if @quality < 50
        @quality += 1
        if @name == 'Backstage passes to a TAKFAL80ETC concert'
          if @days_remaining < 11
            if @quality < 50
              @quality += 1
            end
          end
        end
      end
    end
    if @name != 'Sulfuras, Hand of Ragnaros'
      @days_remaining -= 1
    end
    if @days_remaining < 0
      if @name != 'Aged Brie'
        if @name != 'Backstage passes to a TAKFAL80ETC concert'
          if @quality > 0
            if @name != 'Sulfuras, Hand of Ragnaros'
              @quality -= 1
            end
          end
        else
          @quality = @quality - @quality
        end
      else
        if @quality < 50
          @quality += 1
        end
      end
    end
  end
end
```

to:

```ruby
class GildedRose
  # ...
  def tick
    # pass Item's Subclass name as String to factory
    case @name
    when 'normal'
      item_factory "Normal"
    when 'Aged Brie'
      item_factory "Brie"
    when 'Sulfuras, Hand of Ragnaros'
      item_factory "Sulfuras"
    when 'Backstage passes to a TAKFAL80ETC concert'
      item_factory "Backstage"
    end
  end

  private
  def item_factory(name)
    @item = Object.const_get(name).new(self)
    @item.tick
  end
end

class Item
  attr_accessor :parent
  def initialize(parent)
    @parent = parent
  end

  def tick
  end

  private
  def limit_quality_at(limit)
    @parent.quality = limit if @parent.quality >= limit
  end
  def lower_quality_by(amount)
    @parent.quality -= amount
  end
  def raise_quality_by(amount)
    @parent.quality += amount
  end
end

# Classes of Brie, Sulfuras and Backstage are skipped for brevity
class Normal < Item
  def tick
    @parent.days_remaining -= 1
    return if @parent.quality == 0
    lower_quality_by 1
    lower_quality_by 1 if @parent.days_remaining <= 0
  end
end
```

The total lines of code may grow, but the units and inner logic is much easier
to reason about. The former in If-clauses encapsulated logic bred
interdependencies. By implementing roles and classes, the code is logically
grouped.
