---
title: TruffleRuby goes brrrr 🥳
layout: post
---

My super unscientific lab has fresh results in ...

After releasing [Joda 🖖](https://github.com/simonneutert/Joda) (Roda + JRuby), I dabbled a little more ...

And tada 🥁

```ruby 
threads = []

10.times do
  threads << Thread.new do
    10_000.times do
      (1..1_000).map { |x| x * 10 }
    end
  end
end

p threads.each(&:join).map(&:value)
```

shooting `$ ruby main.rb`

| Version                    | Measurement                                    |
|----------------------------|------------------------------------------------|
| MRI                        | `4,26s user 0,17s system 99% cpu 4,436 total`  |
| JRuby 9.3.6.0 (cold start) | `7,43s user 0,87s system 463% cpu 1,794 total` |
| Truffleruby 22.2.0         | `0,97s user 0,11s system 431% cpu 0,250 total` |
