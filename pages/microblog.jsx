// deno-lint-ignore-file verbatim-module-syntax no-import-prefix no-unversioned-import
import React from "npm:@preact/compat";
import { render } from "jsr:@deno/gfm";
import { parse } from "jsr:@std/yaml";

// in the yaml file, we have a list of links with their url and content/summary.
// no parent key was used, so we can directly parse the file and get the list of links as an array.
const collection = parse(Deno.readTextFileSync("./pages/microblog.yml"));

export const config = {
  title: "My MicroBlog - a collection of weblinks"
}

// this is a helper function that accepts the links and formats them in markdown
function formatItem(item) {
  // format properly and with care for markdown B-)
  return `### ${item.url}  
${item.content || ""}

---`;
}

export default function Microblog() {
  return (
    <div>
      <h1>My Link Collection</h1>
      <p>
        Here is all the stuff I find interesting, but I haven't had the time to
        write full blog posts about. Or sometimes things, I think are worth
        sharing, or will help me later on, but I don't want to forget about
        them. So I just put them in a YAML file and render them here. 😬
      </p>

      {/* Search input */}
      <div style="margin-bottom: 20px;">
        <input
          type="text"
          id="link-search"
          placeholder="Search link collection..."
          style="width: 93%; max-width: 500px; padding: 8px 12px; font-size: 16px; border: 1px solid #ccc; border-radius: 4px;"
        />
      </div>

      {/* Render all items with data attributes for filtering */}
      <div id="search-container">
        {collection.map((item) => (
          <div
            key={item.url}
            class="searchable-item"
            data-url={item.url?.toLowerCase()}
            data-content={(item.content ?? "").toLowerCase()}
            dangerouslySetInnerHTML={{
              __html: render(formatItem(item)),
            }}
          />
        ))}
      </div>

      <p
        id="no-results"
        style="display: none; color: #666; font-style: italic;"
      >
        No links found
      </p>

      {/* Client-side search with 300ms debounce */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function() {
          const searchInput = document.getElementById('link-search');
          const linkItems = document.querySelectorAll('.searchable-item');
          const noResults = document.getElementById('no-results');
          let debounceTimer;
          
          function filterLinks(query) {
            const lowerQuery = query.toLowerCase().trim();
            let visibleCount = 0;
            
            linkItems.forEach(item => {
              const url = item.getAttribute('data-url');
              const content = item.getAttribute('data-content');
              
              if (lowerQuery === '' || url.includes(lowerQuery) || content.includes(lowerQuery)) {
                item.style.display = '';
                visibleCount++;
              } else {
                item.style.display = 'none';
              }
            });
            
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
          }
          
          searchInput.addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              filterLinks(e.target.value);
            }, 300);
          });
        })();
      `,
        }}
      />
    </div>
  );
}
