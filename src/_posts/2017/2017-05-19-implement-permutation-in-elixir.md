---
layout: post
title: Implement Permutation in Elixir
categories: [elixir]
tags: [elixir, math]
description: The community on StackOverflow seems not convinced, but I wave my flag for this implementation.
---

The community on StackOverflow seems not convinced, but I wave my flag for this [implementation written by Nathan Long on StackOverflow](http://stackoverflow.com/a/33756397/6601963).

As list comprehension is [implemented in Elixir](https://hexdocs.pm/elixir/Kernel.SpecialForms.html#for/1) (with `for/1`). And list comprehension is the right logic for the job.

``` elixir
defmodule Permutations do
  def of([]), do: [[]]
  def of(list), do: for h <- list, t <- of(list -- [h]), do: [h | t]
end
```

No need for recursions and pattern matched function calls.
