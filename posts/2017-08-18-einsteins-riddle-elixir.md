+++
layout = "post"
title = "Solving Einsteins Riddle with Elixir"
categories = ["elixir"]
tags = ["elixir", "math", "puzzle"]
description = "Using Permutation ftw."
+++

Sean Handley has solved Einstein's riddle in a remarkable way using Ruby. I
stand on his shoulders and forced his code through Elixir.

Please checkout out his amazing blog post on Medium:
[Sean Handley: Solving Einstein’s Riddle with Ruby](https://medium.com/@sean.handley/solving-einstein-s-riddle-with-ruby-e78ba9ebabe)
and/or the corresponding
[repository on GitHub](https://github.com/seanhandley/einstein)

# How to run?

- [Install Erlang and Elixir on your system](https://elixir-lang.org/)

- Clone the code from
  [github](https://github.com/simonneutert/einsteins_riddle_elixir)

- `$ iex einstein.exs` then enter `Einstein.solve`

```elixir
defmodule Permutations do
  # Nathan Long showed up with this
  # http://stackoverflow.com/a/33756397/6601963
  def of([]), do: [[]]
  def of(list), do: for h <- list, t <- of(list -- [h]), do: [h | t]
end

defmodule Einstein do
  def solve do
    solve_colors()
  end
  def left_of?(set_a, val_a, set_b, val_b) do
    (0..4)
    |> Enum.any?(fn(x) -> Enum.at(set_a, x) == val_a && Enum.at(set_b, x+1) == val_b end)
  end
  def next_to?(set_a, val_a, set_b, val_b) do
    left_of?(set_a, val_a, set_b, val_b) || left_of?(set_b, val_b, set_a, val_a)
  end
  def implies?(set_a, val_a, set_b, val_b) do
    (0..4)
    |> Enum.any?(fn(x) -> Enum.at(set_a, x) == val_a && Enum.at(set_b, x) == val_b end)
  end
  def solve_colors do
    all_colors = Permutations.of [:white, :yellow, :blue, :red, :green] |> Enum.shuffle()
    for colors <- all_colors,
      left_of?(colors, :green, colors, :white),
      do: solve_nationalities(colors)
  end
  def solve_nationalities(colors) do
    all_nationalities = Permutations.of [:german, :swedish, :british, :norwegian, :danish,] |> Enum.shuffle()
    for nationalities <- all_nationalities,
      implies?(nationalities, :british, colors, :red) &&
      Enum.at(nationalities, 0) == :norwegian &&
      next_to?(nationalities, :norwegian, colors, :blue),
      do: solve_pets(colors, nationalities)
  end
  def solve_pets(colors, nationalities) do
    all_pets = Permutations.of [:birds, :cats, :horses, :fish, :dogs] |> Enum.shuffle()
    for pets <- all_pets,
      implies?(nationalities, :swedish, pets, :dogs),
      do: solve_drinks(colors, nationalities, pets)
  end
  def solve_drinks(colors, nationalities, pets) do
    all_drinks = Permutations.of [:beer, :water, :tea, :milk, :coffee] |> Enum.shuffle()
    for drinks <- all_drinks,
      Enum.at(drinks,2) == :milk &&
      implies?(colors, :green, drinks, :coffee) &&
      implies?(nationalities, :danish, drinks, :tea),
      do: solve_cigars(colors, nationalities, pets, drinks)
  end
  def solve_cigars(colors, nationalities, pets, drinks) do
    all_cigars = Permutations.of [:blends, :pall_mall, :prince, :bluemasters, :dunhill] |> Enum.shuffle()
    for cigars <- all_cigars,
      next_to?(pets, :horses, cigars, :dunhill) &&
      implies?(cigars, :pall_mall, pets, :birds) &&
      next_to?(cigars, :blends, drinks, :water) &&
      next_to?(cigars, :blends, pets, :cats) &&
      implies?(nationalities , :german, cigars, :prince) &&
      implies?(colors, :yellow, cigars, :dunhill) &&
      implies?(cigars, :bluemasters,  drinks, :beer)
      do
        IO.inspect([colors, nationalities, pets, drinks, cigars])
        List.zip([colors, nationalities, pets, drinks, cigars])
        |> Enum.each(fn({color, nat, pet, drink, cigar}) ->
            IO.puts("The #{nat} lives in the #{color} house, has a #{pet}, drinks #{drink} and prefers #{cigar} when smoking.")
          end)
        System.halt(0)
    end
  end
end
```
