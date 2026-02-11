/*
This file is part of Deno-QuickBlog, a simple static site generator built with Deno.
It is a showcase of how to use Deno-QuickBlog to create a page from a YAML file and render it as markdown.
In other Static Site Generators, this features is usually labeled as "collections" or "artists files".
In Deno-QuickBlog, we can simply import a YAML file and use Deno's built-in JSX to render a page.

Use this as a template for creating pages from YAML files.

Take it easy with JSX, it's just a syntax sugar for creating HTML elements.
Not a react component, so you don't need to worry about state or props.
If you want to learn more about precompiled JSX in Deno, you can check out the official documentation:
https://docs.deno.com/runtime/reference/jsx/#using-preact-with-rendertostring
*/

// deno-lint-ignore-file verbatim-module-syntax no-import-prefix no-unversioned-import
import React from "npm:@preact/compat";
import { render } from "jsr:@deno/gfm";
import { parse } from "jsr:@std/yaml";

// in the yaml file, we have a list of artists with their name and description.
// no parent key was used, so we can directly parse the file and get the list of artists as an array.
const collection = parse(Deno.readTextFileSync("./pages/microblog.yml"));

// this is a helper function that accepts the artists and formats them in markdown
function formatLinks(collection) {
  return collection.map((item) => {
    // format properly and with care for markdown B-)
    return `### ${item.url}  
${item.content}

---`;
  }).join("\n\n");
}

// the Artists component renders the list of artists as checkboxes to markdown and
// then uses the render function from @deno/gfm to convert it to HTML
export default function Artists() {
  return (
    <div>
      <h1>My Link Collection</h1>
      <p>
        Here is all the stuff I find interesting, but I haven't had the time to
        write full blog posts about. Or sometimes things, I think are worth
        sharing, or will help me later on, but I don't want to forget about
        them. So I just put them in a YAML file and render them here. 😬
      </p>

      <hr />

      {/* Render the list of artists as checkboxes to markdown */}
      <div
        dangerouslySetInnerHTML={{
          __html: render(formatLinks(collection)),
        }}
      />
    </div>
  );
}
