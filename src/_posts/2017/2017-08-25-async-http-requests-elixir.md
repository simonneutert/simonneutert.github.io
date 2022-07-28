---
layout: post
title: Parallel Http Requests with HTTPoison in Elixir
categories: [elixir]
tags: [elixir, http, HTTPoison, concurrency]
description: Loot the web.
---

Ever wondered how to send multiple http requests using multiple processes with Elixir? Let's use Elixir glorious [Tasks](https://hexdocs.pm/elixir/Task.html#content) to map your desired website.

* install [HTTPoison](https://github.com/edgurgel/httpoison)
* install [Floki](https://github.com/philss/floki) (if you need to parse the content)

``` elixir
defmodule Looter do
  def grabber(urls \\ ["http://www.simon-neutert.de", "http://www.trojanischeresel.de", "http://www.trojanischeresel.de/blog"]) do
    Enum.map(urls, fn(url) -> Task.async(fn -> Looter.digger(url) end) end)
    |> Enum.map(fn(task) -> Task.await(task, 145000) end) # 145000 == Timeout in milliseconds
  end
  def digger(url) do
    %HTTPoison.Response{body: body, status_code: status_code} = HTTPoison.get!(url)
    case status_code do
      200 ->
        {_, _, title} = List.first(Floki.find(body, "title"))
        IO.puts title
        {:ok, title}
      _ ->
        IO.puts "Error #{status_code}"
        {:error, "Error #{status_code}"}
    end
  end
end
```

__Bonus:__ Experiment with `Enum.chunk()`, so you can setup pools of workers and limit the amount of processes created.


The key of what makes this so efficient is:
``` elixir
Enum.map(urls, fn(url) -> Task.async(fn -> Looter.digger(url) end) end)
|> Enum.map(fn(task) -> Task.await(task, 145000) end)
```

Read more about parallel maps on [elixir-recipies](http://elixir-recipes.github.io/concurrency/parallel-map/) and [holyxiaoxin article](http://holyxiaoxin.github.io/async-tasks-benchmark/) is well worth reading, too.

__Not fast enough?__ _Don't mind using Ruby?_ I came up with a solution using [EM-Synchrony](https://github.com/igrigorik/em-synchrony) and Nokogiri that is up to 4 times faster using only around 25 concurrent connections.
