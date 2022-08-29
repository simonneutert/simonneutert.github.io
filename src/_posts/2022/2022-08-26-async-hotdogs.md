---
layout: post
title: Clojures core.async Hot Diggity Dogs
---

read [Clojure for the Brave and True - Chapter about "core.async"](https://www.braveclojure.com/core-async/) with detailed behind the scenes content, or ...

fire up a repl and experminent with the given Clojure code yourself - but then read the article

```clojure
(ns example.core
  (:require [clojure.core.async
             :as a
             :refer [>! <! >!! <!! go chan buffer close! thread
                     alts! alts!! timeout]]))

;; simple example with sleep between channel reads
;; opens a channel
;; send 3 types of ketchup to channel
;; reads 3 times from channel
(do (def echo-chan (chan))
    (go (println (<! echo-chan)))
    (go (>! echo-chan "ketchup!"))
    (go (>! echo-chan "ketchup!!"))
    (go (>! echo-chan "ketchup!!!"))
    (Thread/sleep 1000)
    (go (println (<! echo-chan)))
    (Thread/sleep 2000)
    (println (<!! echo-chan)))

;; closed channels allow main process to proceed and not block, waiting
(let [c (chan 2)]
  (>!! c 1)
  (>!! c 2)
  (close! c)
  (println (<!! c)) ; 1
  (println (<!! c)) ; 2
  ;; since we closed the channel this will return false,
  ;; we can no longer add values
  (>!! c 1) ; false
  (<!! c) ; nil
  (<!! c) ; nil
  )

;; example of a non-blocking hot-dog-machine
;; each step is followed by some preparation time
(defn hot-dog-machine
  []
  (let [in (chan)
        out (chan)]
    (go (prn (str (<! in) " was thrown in"))
        (prn (str "processing: '" (<! in) "'"))
        (Thread/sleep 2000)
        (prn (str "preparing hot dog ..."))
        (Thread/sleep 2000)
        (prn (str "handing out string: 'hot dog'"))
        (>! out "hot dog"))
    [in out]))

;; sleep between paying and ordering ketchup
(defn make-hot-dog
  [money]
  (let [[in out] (hot-dog-machine)]
    (>!! in money)
    (Thread/sleep 2000)
    (>!! in "ketchup, please!")
    (<!! out)))

(go (prn (str "pocket lint: " (make-hot-dog "pocket lint"))))
(prn (str "result is: " (+ 1 2 3)))
(Thread/sleep 1000)
(prn (str "i received a " (make-hot-dog "big moneys") " for my big moneys"))
```
