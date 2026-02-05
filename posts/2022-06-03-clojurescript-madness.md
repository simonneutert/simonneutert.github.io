+++
layout = "post"
title = "clojurescript for the brave! omg 😳"
+++

tldr:
[Code on GitHub](https://github.com/simonneutert/clojurescript-web-app-demo)\
I WANT MORE BRACKETS!

---

#### My friends say, I went mad.

> A JVM based LISP, that compiles JavaScript for the browser? 🤯\
> You sure you're alright?\
> \- the whole world except a few brave men and women out there

First and foremost, I am feeling fine, thank you very much.

To most JavaScript is nothing they would envy one for.\
Having the brackets surrounding code 🤯\
whoa, this needs to stop!

#### LISP

<img src="https://imgs.xkcd.com/comics/lisp_cycles.png" max-width="100%" /><br />
<a >https://xkcd.com/297/</a>

#### JavaScript

And, as the whole web knows, you gotta know your way round types in JavaScript.\
The elephant in the room:

<img src="https://imgs.xkcd.com/comics/types.png" max-width="100%" /><br />
<a >https://xkcd.com/1537</a>

#### So here we are. For an experiment I went brackets all the way. Which are then compiled to JS 🥹

Who would have guessed, it was both delightful and tough to do.

Clojure excels when it comes to logic, data mangling and ease of development. So
this was true for most of what I did.

But what did I do exactly? Well, I wanted to see if I could setup an ugly
one-page-app that would show events and lets me filter them.

- firing and receiving a http json request
  - json extraction
  - process data, extract information
- dynamic data binding / state management
- DOM creation/manipulation
- state management
- very basic Browser Event Management
  - user interaction
  - filtering
- parameterized build for dev/prod scenarios

Was it worth it? Absolutely. The data is a real big chunk, so speed was crucial
and well, without any optimization (memoization or a lookup table) it turned out
usable.

Being all functional, a implemented a basic state engine utilizing clojure's
[atom](https://clojuredocs.org/clojure.core/atom). This was nice. What wasn't
nice was the interactive JS part, but it gave me a nice little practise around
event based programming and async promises. I skipped building a more
sophisticated bus, it had hurt a little first, but it was absolutely worth it.

I made this little project the most simple way, with the least dependencies
possible. Yet, almost everybody else in bracket-land seems to use
[shadow-cljs](https://github.com/thheller/shadow-cljs)
([Source](https://clojure.org/news/2022/06/02/state-of-clojure-2022))

### Code

Go, check out the code. Yes there are brackets, you can grow past that fact,
can't you?

[clojurescript-web-app-demo on GitHub](https://github.com/simonneutert/clojurescript-web-app-demo)
