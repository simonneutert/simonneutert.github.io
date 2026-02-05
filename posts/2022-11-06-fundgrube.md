+++
title = "Crawl MediaMarkts Fundgrube using Babashka (and telegram bots)"
layout = "post"
+++

While browsing through my GitHub Feed, I stumbled across
[Roman Ness' fundgrube-crawler](https://github.com/RomanNess/fundgrube-crawler)
and thought this to be a nice little code exercise.

My [fundgrube code on GitHub](https://github.com/simonneutert/fundgrube).

## What is MediaMarkt/Saturn Fundgube and what is the problem with it?

The Fundgrube is a collection of products in a sub-webshop you can visit in
MediaMarkt/Saturn's main webshop. The products listed there usually are reduced
in price, reduced drastically. These products were maybe used for displaying in
the shop or may have some cosmetic issues, like scratches. Here's the twist:
customers need to collect the product from the store, shipping is not an option
and another customer might be quicker than you.

The "problem" with how the Fundgrube is offered as a webshop is the lack of
filters or proper search tools. Just as they want you to come to the store to
pick the product up, they want you to check the Fundgrube regularly (I guess).

The data/products API is public and when opening the dev tools in your browser,
you will find a custom header, wanting you to send in your resume and apply for
a job. Fair play, MediaMarkt and Saturn.

## My script, my babashka

What I've come up with in an adrenalin rush, is not (yet) a script i would show
my mother-in-law and brag about it..., but ..., well ..., it does the job 😅

My script crawls through MediaMarkts public
[Fundgrube](https://www.mediamarkt.de/de/data/fundgrube) API and posts new
products on offer via a
[telegram bot](https://core.telegram.org/bots/faq#how-do-i-create-a-bot) in a
secret channel for me and some friends.

#### Technicals

The tool is parameterised using ENV Vars, to iterate over the local product
postings, then collecting unique items, aggregating the results. Before storing
the data to disk, the last time created file is being copied and renamed,
allowing the tool to detect changes. I decided to use Clojure's
[edn data notation](https://github.com/edn-format/edn).

Here's an example what a post to telegram of a detected product entry would look
like:

```text
Markt: Wiesbaden-Hasengarten
Produkt: PHILIPS 58PUS8546/12 LED TV (Flat, 58 Zoll / 146 cm, UHD 4K, SMART TV, Ambilight, Android TV™ 10 (Q))

Preis: 700.00 €

Artikel 2734789
-
LED TV / 146cm/58Zoll / UHD 4K,
Ultra Resolution, Dolby Vision, HDR10+, Micro Dimming Pro, ISF-Farbmanagement,
2 x 10 W Full-Range-Lautsprecher,
Ausschalt-Timer, Lichtsensor, Bildabschaltung (bei Radiobetrieb), Eco-Modus
https://assets.mmsrg.com/is/166325/12975367df8e182e57044734f5165e190/c3/-/29336490249241a3925bcb97e235b830
```

What started as a quick experiment using httpie and jq, escalated quickly to an
exercise in Clojure 🥰
