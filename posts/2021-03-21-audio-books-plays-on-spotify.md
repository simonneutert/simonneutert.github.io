+++
layout = "post"
title = "Make spotify useful for your favourite audio books and audio plays"
categories = ["api", "javascript"]
tags = ["javascript", "json", "api"]
description = "code asmr"
+++

It took me quite some nerves, because Spotify made a zero effort attempt linking
audio books and plays.

## get the source data from the API

- make dev account for api access on spotify
- visit
  https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/
  then scroll around until you find the "try it" button, it will generate a key,
  which in turn allows you to curl what you need (pipe to file 😉)
- extract json using JSONata

## JSONata

I always wondered how on earth I could put JSONata to use.

> Lightweight query and transformation language for JSON data Inspired by the
> location path semantics of XPath 3.1 Sophisticated query expressions with
> minimal syntax Built in operators and functions for manipulating and combining
> data Create user-defined functions Format query results into any JSON output
> structure

#### JSONata Example for Sherlock Holmes (German)

```json
{
    "items": $sort(items[$contains(name, 'Die Originale')].{
        "name": name,
        "uri": uri,
        "images": images,
        "spotifyUrl": external_urls.spotify,
        "case": $number($split($match(name, /[Folge|Fall] \d+/).match, " ")[-1])
    }, function($l, $r) {
        $l.case > $r.case
    }
    )
}
```

### Code / Result

Here's what I smashed together in two very simple NuxtJS apps.

[Sherlock Holmes on Spotify](https://github.com/simonneutert/sherlock-holmes-on-spotify)

[Bibi Blocksberg on Spotify](https://github.com/simonneutert/bibi-blocksberg-on-spotify)
