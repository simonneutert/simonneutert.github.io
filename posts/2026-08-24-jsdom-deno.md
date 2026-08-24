---
layout: post
title: "Using JSDOM with Deno and TypeScript"
---

Sometimes you need to parse HTML in Deno and query it with familiar DOM APIs
such as `querySelectorAll()`.

[JSDOM](https://github.com/jsdom/jsdom) works well for this, but there is one
TypeScript gotcha: its types live in the separate `@types/jsdom` package.

## Install JSDOM and its types

```bash
deno add jsdom @types/jsdom
```

Then import it like this:

```ts
// @ts-types="@types/jsdom"
import { JSDOM } from "jsdom";
```

The `@ts-types` directive tells Deno which declarations belong to the `jsdom`
import. This is especially useful when your project is not using a local
`node_modules` directory (i.e. when using Deno).

## Example

```ts
// @ts-types="@types/jsdom"
import { JSDOM } from "jsdom";

const res = await fetch("https://example.com");
const html = await res.text();

const dom = new JSDOM(html);
const document = dom.window.document;

const rows = document.querySelectorAll<HTMLTableRowElement>(
  ".searchlistgreyrow, .searchlistwhiterow",
);

for (const row of rows) {
  console.log(row.innerHTML);
}
```

JSDOM gives you a `window` and `document`, so APIs such as `querySelector()`,
`textContent`, and `innerHTML` work much like they do in the browser.

The generic on `querySelectorAll()` is useful here:

```ts
document.querySelectorAll<HTMLTableRowElement>("tr");
```

A CSS selector does not tell TypeScript which HTML element it matches. Supplying
`HTMLTableRowElement` gives each result the correct type, including properties
such as `cells` and `rowIndex`.

That's it: install `jsdom` and its types, connect them with `@ts-types`, and you
get a familiar DOM API with proper TypeScript checking in Deno.
