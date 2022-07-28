---
layout: post
title: Tail-Call optimized Fibonacci Calculation in Elixir
categories: [elixir]
tags: [elixir, math]
description: Easy and clean Fibonacci implementation in Elixir.
---

Joel Grus's presentation [Learning Data Science Using Functional Python](https://www.youtube.com/watch?v=ThS4juptJjQ
) on YouTube made me think: "I wonder how this can be done in Elixir land...?"

Tail-called optimization ftw. Code on [GitHub](https://github.com/simonneutert/elixir_fibonacci)

``` elixir
defmodule Iexfib do
  def fib(limit \\ 10) do
    case limit do
      0 -> IO.inspect 0
      1 -> IO.inspect 1
      2 -> IO.inspect [1, 1]
      n when n > 2 and n < 100000 -> IO.inspect calcfib(limit)
      x when x < 0 -> IO.puts "Number must be positive and smaller than 100000"
      _ -> IO.puts "Impossible operation."
    end
  end

  defp calcfib(limit, runs \\ 2, arr \\ [1, 1]) do
    cond do
      runs != limit ->
        [head|tail] = arr
        [h|_] = tail
        calcfib(limit, runs+1, [head+h|arr])
      runs == limit -> arr
    end
  end
end

```
