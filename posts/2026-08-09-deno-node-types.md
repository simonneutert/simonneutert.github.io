---
title: "Using JSDOM with Deno and TypeScript"
layout: post
---

# Using JSDOM with Deno and TypeScript

Sometimes you have a chunk of HTML in Deno and want to query it with familiar
browser APIs such as `querySelectorAll()`.

[JSDOM](https://github.com/jsdom/jsdom) is a convenient way to do that. The only
slightly non-obvious part is getting its TypeScript types working nicely in
Deno.

## Install JSDOM and its types

Add both `jsdom` and its TypeScript definitions to your Deno project:

```bash
deno add jsdom @types/jsdom
```

This records both dependencies in your project configuration instead of relying
on ad-hoc imports.

Then import JSDOM like this:

```ts
// @ts-types="@types/jsdom"
import { JSDOM } from "jsdom";
```

The important line is:

```ts
// @ts-types="@types/jsdom"
```

`jsdom` uses the separate `@types/jsdom` package for its TypeScript definitions.

Installing `@types/jsdom` makes the types available to the project, while the
`@ts-types` directive tells Deno that those types belong to the following
`jsdom` import.

## A simple example

Suppose we fetch a page and want to find table rows with two different CSS
classes:

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

JSDOM parses the HTML and gives us a `window` containing a familiar DOM:

```ts
const dom = new JSDOM(html);
const document = dom.window.document;
```

From there, APIs such as `querySelector()`, `querySelectorAll()`, `textContent`,
and `innerHTML` work much like they do in the browser.

## Typing queried elements

TypeScript cannot know that a CSS class belongs specifically to a `<tr>`
element.

By default:

```ts
document.querySelectorAll(".searchlistgreyrow");
```

the result is typed broadly as `Element`.

If you know those elements are table rows, provide the element type explicitly:

```ts
const rows = document.querySelectorAll<HTMLTableRowElement>(
  ".searchlistgreyrow",
);
```

Now TypeScript knows that each row has table-row-specific properties such as:

```ts
row.cells;
row.rowIndex;
```

The same idea works for other element types:

```ts
document.querySelectorAll<HTMLAnchorElement>("a");
document.querySelectorAll<HTMLDivElement>(".card");
document.querySelectorAll<HTMLInputElement>("input");
```

## One small JSDOM detail

There is no need to `await` the document:

```ts
const document = dom.window.document;
```

`dom.window.document` is already available synchronously after creating the
`JSDOM` instance.

## The takeaway

A clean Deno setup looks like this:

```bash
deno add jsdom @types/jsdom
```

and then:

```ts
// @ts-types="@types/jsdom"
import { JSDOM } from "jsdom";
```

After that, you can use familiar DOM APIs while keeping Deno's TypeScript
checker and your editor happy.
