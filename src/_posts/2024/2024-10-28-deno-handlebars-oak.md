---
title: Building a Simple Deno App with Handlebars and Oak
layout: post
---

Deno is all the rage these days — and for good reason!

After building a basic interactive CLI app with [Deno](https://deno.com), I wanted to try creating a simple web app.

For this project, I decided to use [Oak](https://oakserver.org) as the web framework. Don’t ask me why I chose [HandlebarsJS](https://handlebarsjs.com) for templating - I just Googled “Handlebars with Oak” and started building. 🤷‍♂️

## Initial Release

<style>
#screenshot {
    max-width: 90%;
    height: auto;
    max-height: 480px;
}
</style>
<img src="/images/2024/utme.webp" id="screenshot" alt="Screenshot of the app"/>

> Screenshot of the app upon its initial release.

## What I Wanted to Achieve

The app is designed for outdoor enthusiasts to “collect” map tiles/areas. My goals included:

- Rendering a mapbox map.
- Allowing users to click on the map to add/remove a square.
- Using a JSON file as the database.
  - Preloaded with areas that are inaccessible to the public.
- Enabling data export in JSON format.

## Lessons Learned

This was a rewarding (and sometimes unexpected) learning experience. 🥲

### Genesis

The proof-of-concept app came together quickly. I used Node’s `http-server` to serve static files, along with a simple `.html` file, Bootstrap, `mapbox GL JS`, and vanilla JavaScript.

### Challenges

Making this a public, hostable project required some changes:

- Tracking the API key in plain HTML 😵‍💫 was a no-go.
- The app was a single file. Not very maintainable.
- Privacy concerns with CDNs required user consent before loading resources.

### Choosing Deno and Oak

I knew Deno was the way forward, but finding the right framework took time. Based on my experience with Express and Fastify, I wanted a lightweight alternative.

[Fresh](https://fresh.deno.dev) seemed promising but felt like overkill. Deno’s documentation then suggested:

> We recommend `oak` as a middleware framework for Deno.

Setting up Oak for a "hello world" app was straightforward. But I needed a templating engine. Should I use `ejs`, `pug`, or `handlebars`? 🤔 For reasons I can’t fully recall, I went with Handlebars, and after some trial and error, things started rendering.

I kept the JavaScript vanilla, avoiding bundlers and transpilers—just plain JS and MDN as my guide.

### Building and Deploying

The app started to come together: I added vendor CSS/JS files, served static files via Oak, and implemented basic cookie logic for external resources (mapbox). Now, users need to confirm external resource use to access the app.

Finally, I dockerized it, wrote a README, and pushed everything to GitHub.

## Wrap-Up

Deno was a joy to work with, though Oak’s documentation felt a bit sparse. The examples were helpful, but I needed some extra resources to understand it fully.

Handlebars… it’s aptly named; it was a bit "hairy" to navigate without StackOverflow.

I learned `deno serve --parallel` would utilize all cores for maximum throughput. 🚀

All in all, I’m happy with the result. The app is simple but effective. It lacks tests, but given the limited feature set, I learned a lot along the way.

## What Would I Do Differently?

Next time, I might try [Hono](https://hono.dev/) as the backend solution and consider JSX for templating, as Hono supports it natively.

## Project on GitHub

The project is available on GitHub: [simonneutert/unreachable_tiles_map_editor](https://github.com/simonneutert/unreachable_tiles_map_editor).
