
import { extractToml } from "@std/front-matter";
import { CSS, render } from "@deno/gfm";

import "prismjs/components/prism-clojure.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-javascript.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-ruby.js";
import "prismjs/components/prism-elixir.js";
import "prismjs/components/prism-elm.js";
import "prismjs/components/prism-erlang.js";
import "prismjs/components/prism-pug.js";
import "prismjs/components/prism-haml.js";
import "prismjs/components/prism-dot.js";
import "prismjs/components/prism-dart.js";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-css-extras.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-go.js";
import "prismjs/components/prism-rust.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-csharp.js";
import "prismjs/components/prism-sql.js";
import "prismjs/components/prism-php-extras.js";
import "prismjs/components/prism-yaml.js";
import "prismjs/components/prism-toml.js";
import "prismjs/components/prism-xml-doc.js";
import "prismjs/components/prism-regex.js";
import "prismjs/components/prism-docker.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-json5.js";
import "prismjs/components/prism-jsonp.js";
import "prismjs/components/prism-jq.js";
import "prismjs/components/prism-makefile.js";
import "prismjs/components/prism-log.js";
import "prismjs/components/prism-jsx.js";
import { renderToString } from "preact-render-to-string";

type PostInfo = [string, string, string, string, string | null, string | null];

function checkLangSupport(): string {
  const lang = Deno.env.get("DENO_QUICKBLOG_LANG") ?? "en";
  const supportedLangs = Object.keys(i18n());
  if (!supportedLangs.includes(lang)) {
    console.warn(
      `Warning: Language "${lang}" is not officially supported. Defaulting to English for navigation links. Supported languages are: ${
        supportedLangs.join(", ")
      }.`,
    );
    return "en";
  }
  return lang;
}

function htmlBodyTemplate(
  title: string,
  content: string,
  footer: string,
): string {
  const buildVersion = Date.now();
  return `
<!DOCTYPE html>
<html lang="${Deno.env.get("DENO_QUICKBLOG_LANG") ?? "en"}">
  <head>
    <title>${title}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="build-version" content="${buildVersion}">
    <style>
      main {
        max-width: 800px;
        margin: 0 auto;
      }
      ${CSS}
    </style>
  </head>
  <body data-color-mode="auto" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
  <main>
  <nav style="text-align: right; margin-top: 20px; margin-bottom: 20px;">
  ${renderNav()}
  </nav>
    ${content}
    <hr>
    ${footer}
    </main>
  </body>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      const body = document.body;
      const darkModeToggle = document.getElementById("dark-mode-toggle");
        
      // Load saved preference
      const savedMode = localStorage.getItem('colorMode');
      if (savedMode) {
        body.setAttribute("data-color-mode", savedMode);
      }
        
      function isDarkMode() {
        const colorMode = body.getAttribute("data-color-mode");
        if (colorMode === "dark") return true;
        if (colorMode === "light") return false;
        // auto mode - check system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
        
      function updateToggleText() {
        darkModeToggle.textContent = isDarkMode() ? "Light Mode" : "Dark Mode";
      }
        
      darkModeToggle.addEventListener("click", function(e) {
        e.preventDefault();
        const newMode = isDarkMode() ? "light" : "dark";
        body.setAttribute("data-color-mode", newMode);
        localStorage.setItem('colorMode', newMode);
        updateToggleText();
      });
        
      updateToggleText();
    });
  </script>
</html>
`;
}

function renderMarkdownFileToHtml(filePath: string): string {
  if (Deno.readFileSync(filePath)) {
    return render(Deno.readTextFileSync(filePath), {
      baseUrl: Deno.env.get("BASE_URL") ?? "",
    });
  } else {
    return ``;
  }
}

function renderNav(): string {
  return renderMarkdownFileToHtml("nav.md");
}

function createHtmlPageFromMarkdown(
  title: string,
  markdown: string,
): string {
  const body = render(markdown, {
    baseUrl: Deno.env.get("BASE_URL") ?? "",
  });

  const content = `<h1>${title}</h1>  
${body}`;
  return htmlBodyTemplate(title, content, renderFooter());
}

function i18n(): { previous: string; next: string } {
  const lang = Deno.env.get("DENO_QUICKBLOG_LANG") ?? "en";
  const translations: Record<string, { previous: string; next: string }> = {
    cz: { previous: "Předchozí Příspěvek", next: "Následující Příspěvek" },
    de: { previous: "Vorheriger Beitrag", next: "Nächster Beitrag" },
    en: { previous: "Previous Post", next: "Next Post" },
    es: { previous: "Publicación Anterior", next: "Siguiente Publicación" },
    fi: { previous: "Edellinen Postaus", next: "Seuraava Postaus" },
    fr: { previous: "Article Précédent", next: "Article Suivant" },
    it: { previous: "Post Precedente", next: "Post Successivo" },
    ja: { previous: "前の記事", next: "次の記事" },
    lb: { previous: "Virdrunge Post", next: "Nächste Post" },
    lt: { previous: "Ankstesnis Įrašas", next: "Kitas Įrašas" },
    nl: { previous: "Vorige Post", next: "Volgende Post" },
    no: { previous: "Forrige Post", next: "Neste Post" },
    pl: { previous: "Poprzedni Post", next: "Następny Post" },
    pt: { previous: "Post Anterior", next: "Próximo Post" },
    ro: { previous: "Postare Anterioară", next: "Postare Următoare" },
    ru: { previous: "Предыдущая Статья", next: "Следующая Статья" },
    sk: { previous: "Předchozí Příspěvek", next: "Následující Příspěvek" },
    sv: { previous: "Föregående Inlägg", next: "Nästa Inlägg" },
    tr: { previous: "Önceki Gönderi", next: "Sonraki Gönderi" },
    uk: { previous: "Попередня Стаття", next: "Наступна Стаття" },
    vi: { previous: "Bài Trước", next: "Bài Tiếp Theo" },
    zh: { previous: "上一篇", next: "下一篇" },
  };
  const translated = {
    previous: translations[lang]?.previous ?? translations["en"].previous,
    next: translations[lang]?.next ?? translations["en"].next,
  };

  return translated;
}

function createHtmlPostFromMarkdown(
  title: string,
  markdown: string,
  year: string,
  month: string,
  day: string,
  nextUrl?: string,
  prevUrl?: string,
): string {
  const body = render(markdown, {
    baseUrl: Deno.env.get("BASE_URL") ?? "",
  });

  const content = `<p><em>${year}-${month}-${day}</em></p>
    <h1>${title}</h1>  
    ${body}
    <hr>
    ${prevUrl ? `<a href="${prevUrl}">&#8592; ${i18n().previous}</a>` : ""}${
    prevUrl && nextUrl ? " | " : ""
  }${nextUrl ? `<a href="${nextUrl}">${i18n().next} &#8594;</a>` : ""}`;

  return htmlBodyTemplate(title, content, renderFooter());
}

function renderFooter(): string {
  const markdown = renderMarkdownFileToHtml("footer.md");
  if (Deno.env.get("DENO_QUICKBLOG_HIDE_FOOTER") === "true") {
    return "";
  }

  return `<footer>
  ${markdown}
</footer>
`;
}

function readContentAndFrontMatter(filePath: string) {
  try {
    const fileContent = Deno.readTextFileSync(filePath);
    // deno-lint-ignore no-unused-vars
    const { frontMatter, body, attrs } = extractToml(fileContent) as {
      frontMatter?: unknown;
      body: string;
      attrs?: Record<string, unknown>;
    };
    return { content: body, frontMatter: attrs };
  } catch (e) {
    console.error(`Error reading file "${filePath}":`, e);
    return { content: "", frontMatter: undefined };
  }
}

function extractTitle(
  frontMatter: Record<string, unknown> | undefined,
): string {
  const title: string = frontMatter && typeof frontMatter === "object" &&
      typeof (frontMatter as Record<string, unknown>).title === "string"
    ? (frontMatter as Record<string, unknown>).title as string
    : "Untitled Post";
  return title;
}

function postList() {
  const postsList: Array<[string, string]> = [];
  for (const dirEntry of Deno.readDirSync("posts")) {
    if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
      const [year, month, day, ...slugParts] = dirEntry.name.split("-");
      const slug = slugParts.join("-").replace(".md", "");
      const url = `/posts/${year}/${month}/${day}/${slug}/`;
      const k = [year, month, day].map(String).join("");
      postsList.push([k, url]);
    }
  }
  postsList.sort((a, b) => b[0].localeCompare(a[0]));
  return postsList;
}

export async function createPages(posts: PostInfo[]) {
  const pages = Deno.readDirSync("pages");
  for (const dirEntry of pages) {
    if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
      const pageName = dirEntry.name.replace(".md", "");
      const { content, frontMatter } = readContentAndFrontMatter(
        `pages/${dirEntry.name}`,
      );
      const fullContent = createPostList(content, posts);
      const title: string = extractTitle(frontMatter);
      Deno.mkdirSync("dist", { recursive: true });
      Deno.writeTextFileSync(
        `dist/${pageName}.html`,
        createHtmlPageFromMarkdown(title, fullContent),
      );
    } else if (dirEntry.isFile && dirEntry.name.endsWith(".jsx")) {
      const pageName = dirEntry.name.replace(".jsx", "");
      const module = await import(`./pages/${dirEntry.name}`);
      const PageComponent = module.default;
      const pageJsx = PageComponent({ posts });
      const pageHtml = renderToString(pageJsx);
      Deno.mkdirSync("dist", { recursive: true });
      Deno.writeTextFileSync(
        `dist/${pageName}.html`,
        htmlBodyTemplate(
          pageName,
          pageHtml,
          renderFooter(),
        ),
      );
    }
  }
}

function limitPostList(
  content: string,
  postsListRegex: RegExp,
  posts: PostInfo[],
): PostInfo[] {
  const match = content.match(postsListRegex);
  let limit = undefined;
  if (match && match[0]) {
    const numMatch = match[0].match(/\(\d{1,3}\)/);
    if (numMatch) {
      limit = parseInt(numMatch[0].slice(1, -1));
    }
  }
  if (limit !== undefined) {
    posts = posts.slice(0, limit);
  }
  return posts;
}

function createPostList(content: string, posts: PostInfo[]) {
  let fullContent = "";
  const postsListRegex = /\{\{\s*POSTS_LIST(?:\(\d{1,3}\))?\s*\}\}/;
  if (postsListRegex.test(content)) {
    // if a number is specified, the number of posts listed will be limited to that number
    posts = limitPostList(content, postsListRegex, posts);
    let postList = "";
    // deno-lint-ignore no-unused-vars
    for (const [postKey, postDate, title, url] of posts) {
      postList += `- <small>${postDate}</small> [${title}](${url})\n`;
    }
    fullContent = content.replace(postsListRegex, postList);
  } else {
    fullContent = content;
  }
  return fullContent;
}

export function createPosts() {
  const postsList = postList(); // for navigation links
  const posts: PostInfo[] = [];
  for (const dirEntry of Deno.readDirSync("posts")) {
    if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
      const [year, month, day, ...slugParts] = dirEntry.name.split("-");
      const slug = slugParts.join("-").replace(".md", "");
      const url = `/posts/${year}/${month}/${day}/${slug}/`;
      const outputDir = `dist/posts/${year}/${month}/${day}/${slug}`;
      Deno.mkdirSync(outputDir, { recursive: true });

      const { content, frontMatter } = readContentAndFrontMatter(
        `posts/${dirEntry.name}`,
      );
      const title: string = extractTitle(frontMatter);

      const postKey = [year, month, day].map(String).join("");
      const postDate = `${year}-${month}-${day}`;
      const currentIndex = postsList.findIndex(([k]) => k === postKey);
      const nextUrl = postsList[currentIndex - 1]?.[1] ?? null;
      const prevUrl = postsList[currentIndex + 1]?.[1] ?? null;

      // write content to output file
      Deno.writeTextFileSync(
        `${outputDir}/index.html`,
        createHtmlPostFromMarkdown(
          title,
          content,
          year,
          month,
          day,
          nextUrl,
          prevUrl,
        ),
      );
      posts.push([postKey, postDate, title, url, nextUrl, prevUrl]);
    }
  }
  return posts;
}

function writeIndex(posts: PostInfo[]) {
  let indexContent = Deno.readTextFileSync("index.md");
  Deno.mkdirSync("dist", { recursive: true });
  // deno-lint-ignore no-unused-vars
  const { frontMatter, body, attrs } = extractToml(indexContent) as {
    frontMatter?: unknown;
    body: string;
    attrs?: Record<string, unknown>;
  };
  const title: string = extractTitle(attrs);
  indexContent = body;
  indexContent = createPostList(indexContent, posts);
  Deno.writeTextFileSync(
    "dist/index.html",
    createHtmlPageFromMarkdown(title, indexContent),
  );
}

function copyPublicFolder() {
  try {
    Deno.mkdirSync("dist", { recursive: true });
    copyDirRecursive("public", "dist");
  } catch (e) {
    console.error("Error copying public folder:", e);
  }
}

function copyDirRecursive(src: string, dest: string) {
  for (const dirEntry of Deno.readDirSync(src)) {
    const srcPath = `${src}/${dirEntry.name}`;
    const destPath = `${dest}/${dirEntry.name}`;

    if (dirEntry.isFile) {
      Deno.copyFileSync(srcPath, destPath);
    } else if (dirEntry.isDirectory) {
      Deno.mkdirSync(destPath, { recursive: true });
      copyDirRecursive(srcPath, destPath);
    }
  }
}

function cleanUpDirectories() {
  [
    "dist/posts",
    "dist/pages",
    "dist/public",
  ].forEach((dir) => {
    try {
      Deno.removeSync(dir, { recursive: true });
    } catch (_e) {
      // ignore error
    }
  });
  // this removes any remaining html files in dist/
  try {
    for (const dirEntry of Deno.readDirSync("dist")) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".html")) {
        Deno.removeSync(`dist/${dirEntry.name}`);
      }
    }
  } catch (_e) {
    // ignore error
  }
}

function createNewPost() {
  if (Deno.args.includes("new-post")) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const slug = "new-post";
    const fileName = `posts/${year}-${month}-${day}-${slug}.md`;
    try {
      Deno.statSync(fileName);
      console.error(`Error: Post "${fileName}" already exists.`);
      Deno.exit(1);
    } catch {
      // File does not exist, continue
    }
    Deno.writeTextFileSync(
      fileName,
      `+++
title = "New Post"
+++

Write your post content here!`,
    );
    console.log(`New post created: ${fileName}`);
    Deno.exit(0);
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  createNewPost();
  console.log("Deno-QuickBlog - Building blog...\n");
  checkLangSupport();
  cleanUpDirectories();
  console.log("Cleaned up files.");
  const posts = createPosts();
  posts.sort((a, b) => b[0].localeCompare(a[0]));
  console.log("Read posts.");
  console.log("Writing blog posts.");
  createPages(posts);
  console.log("Writing pages.");
  writeIndex(posts);
  console.log("Writing index page.");
  copyPublicFolder();
  console.log("Copied public folder.");
  console.log("\nBlog build complete!");
}
