---
title: Dockering a shadow-cljs app
layout: post
---

I'd say there are two ways of doing it, either install Java or install Node.

I prefer installing Java and Clojure.

Here's a very minimal two staged example:

```Dockerfile
FROM node:16-buster AS build

RUN apt-get update && apt-get -q -y install \
    openjdk-11-jre-headless \
    curl

RUN curl -s https://download.clojure.org/install/linux-install-1.11.1.1165.sh | bash \
    && rm -rf /var/lib/apt/lists/*

RUN npm i -g shadow-cljs

WORKDIR /app
COPY shadow-cljs.edn /app/
COPY src /app/src
COPY public/index.html /app/public/index.html

RUN npx shadow-cljs release frontend

FROM nginx:1-alpine

COPY --from=build /app/public/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/public/js/main.js /usr/share/nginx/html/js/main.js
```

Make sure you have your release pipeline ready to roll!

From the shadow-cljs [documentation](https://shadow-cljs.github.io/docs/UsersGuide.html#release):

Adjust your `shadow-cljs.edn` to your taste.

```clojure
;; shadow-cljs configuration
{:source-paths
 ["src/dev"
  "src/main"
  "src/test"]

 :dependencies [[hiccups/hiccups "0.3.0"]]
 :dev-http {8080 "public"}
 :builds {:frontend
          {:target :browser
           :modules {:main {:init-fn app.core/init}} ;; adjust here
           :release {:compiler-options {:optimizations :advanced}}}
          :test
          {:target    :node-test
           :output-to "out/node-tests.js"
           :ns-regexp "-test$"
           :autorun   true}}}

```

For more inspiration checkout my demo project on GitHub [pizza-dough-calculator](https://github.com/simonneutert/pizza-dough-calculator).
