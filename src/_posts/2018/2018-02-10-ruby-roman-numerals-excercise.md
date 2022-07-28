---
layout: post
title: "Roman Numerals with Ruby"
categories: [ruby]
tags: [ruby]
description: Ruby String Gladiator
fullview: false
---

Another coding excercise.

See all details on: [excercism.io](http://exercism.io/exercises/ruby/roman-numerals/readme)

My solution:

``` ruby
class Integer
  def to_roman
    # 1993.to_roman
    # target == ["1000", "900", "90", "3"]
    # => ["M", "CM", "XC", "III"].join => "MCMXCIII"
    target = []
    to_s.split('').reverse.each_with_index { |e, i| target << e + '0' * i }
    target.reverse.map { |e| roman_string(e) }.join
  end

  private

  def roman_string(number_in)
    num = number_in[0].to_i
    number = number_in.to_i
    # set boundaries for roman counting
    lower, middle, upper =
      if number >= 1000
        %w[M M M]
      elsif number >= 100
        %w[C D M]
      elsif number >= 10
        %w[X L C]
      else
        %w[I V X]
      end

    roman_string = ''
    if num >= 5
      roman_string << middle
      roman_string << lower * (num % 5) if num % 5 > 0
    else
      roman_string << lower * num
    end

    # computationally substitues:
    # "IIII" with "IV" and "VIIII" with "IX", etc.
    roman_string.gsub!(middle + lower * 4, lower + upper)
    roman_string.gsub!(lower * 4, lower + middle)
    roman_string
  end
end
```
