---
title: Save a file (like png or jpg) from web using clojure / babashka
layout: post
---

babashka scripting is the way to go:

```clojure
(io/copy
  (:body (curl/get "http://your-URL.test"
    {:as :stream}))
  (io/file "icon.png"))
```

or do it in Clojure, named with current date:

```clojure
(import '(java.time.format DateTimeFormatter) '(java.time LocalDateTime)) 

(let [date-str (.format (DateTimeFormatter/ofPattern "yyyy-MM-dd") (LocalDateTime/now))]
    (io/copy
        (:body (curl/get (str *input*) {:as :bytes}))
        (io/file 
            (str "date-" date-str ".png"))))
```

#### use pmap to leech concurrently 🤓

> for more web-hackiness you can pipe/chain:  
> httpie, jq, htmlq, bb, awk