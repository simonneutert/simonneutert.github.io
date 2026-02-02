---
layout: post
title: Clojure kondo config for keyword overrides like promesa's let macro
---

I keep forgetting it, but once I blog it... 

What is clj-kondo, you ask? It is:

> A linter for Clojure code that sparks joy.

This is how you make kondo shut up about faulty `let` declarations, in specific [nbb](https://github.com/babashka/nbb) and [promesa](https://github.com/funcool/promesa)

What is [promesa](https://github.com/funcool/promesa)? Glad you ask:

> A lightweight promise/future library for Clojure & ClojureScript built on top of native primitives (js/Promise on JS, and `CompletableFuture` on JVM).<span>https://github.com/funcool/promesa</span>

[clj-kondo documentation](https://github.com/clj-kondo/clj-kondo/blob/master/doc/config.md#lint-a-custom-macro-like-a-built-in-macro)

1. create a `config.edn` in your projects `.clj-kondo` directory
2. set for key `:lint-as` the following: `{promesa.core/let clojure.core/let}`

```clojure
;; ./clj-kondo/config.edn
{:lint-as 
 {promesa.core/let clojure.core/let}}
```

no more red squirly lines in your code 👏
