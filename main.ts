import { extractToml, extractYaml } from "@std/front-matter";
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

type PostIDUrl = [string, string];
type PostInfo = [string, string, string, string, string | null, string | null];
type ExtractedMarkdownWithFrontMatter = {
  frontMatter?: unknown;
  body: string;
  attrs?: Record<string, unknown>;
};

const dictionary: Record<string, { previous: string; next: string }> = {
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

function i18n(
  dict: Record<string, { previous: string; next: string }> = dictionary,
): { previous: string; next: string } {
  const lang = Deno.env.get("DENO_QUICKBLOG_LANG") ?? "en";

  const translated = {
    previous: dict[lang]?.previous ?? dict["en"].previous,
    next: dict[lang]?.next ?? dict["en"].next,
  };

  return translated;
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
    <script>
      // Apply saved theme immediately to prevent flicker
      (function() {
        const savedMode = localStorage.getItem('colorMode');
        if (savedMode) {
          document.documentElement.setAttribute('data-color-mode', savedMode);
        }
      })();
    </script>
    <style>
      main {
        max-width: 920px;
        margin: 2rem auto;
      }
      ${CSS}
    </style>
  </head>
  <body data-color-mode="auto" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
  <script>
    // Sync body with documentElement immediately
    if (document.documentElement.hasAttribute('data-color-mode')) {
      document.body.setAttribute('data-color-mode', document.documentElement.getAttribute('data-color-mode'));
    }
  </script>
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
        
      // Apply saved preference (already set in head, now sync with body)
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

function checkLangSupport(): string {
  const lang = Deno.env.get("DENO_QUICKBLOG_LANG") ?? "en";
  const supportedLangs = Object.keys(dictionary);
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

function createNewPost() {
  if (Deno.args.includes("new-post")) {
    const now = new Date();
    const year = `${now.getFullYear()}`;
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const slug = "new-post";
    const fileName = `posts/${formatDateString(year, month, day)}-${slug}.md`;
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

function formatDateString(
  year: string,
  month: string,
  day: string,
  joiner = "-",
): string {
  return [year, month, day].join(joiner);
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
  const content = `<p><em>${formatDateString(year, month, day)}</em></p>
    <h1>${title}</h1>  
    ${body}
    <hr>
    ${prevUrl ? `<a href="${prevUrl}">&#8592; ${i18n().previous}</a>` : ""}${
    prevUrl && nextUrl ? " | " : ""
  }${nextUrl ? `<a href="${nextUrl}">${i18n().next} &#8594;</a>` : ""}`;

  return htmlBodyTemplate(title, content, renderFooter());
}

function readContentAndFrontMatter(filePath: string) {
  try {
    const fileContent = Deno.readTextFileSync(filePath);
    if (fileContent.trim().startsWith("---")) {
      // deno-lint-ignore no-unused-vars
      const { frontMatter, body, attrs } = extractYaml(
        fileContent,
      ) as ExtractedMarkdownWithFrontMatter;
      return { content: body, frontMatter: attrs };
    } else if (fileContent.trim().startsWith("+++")) {
      // deno-lint-ignore no-unused-vars
      const { frontMatter, body, attrs } = extractToml(
        fileContent,
      ) as ExtractedMarkdownWithFrontMatter;
      return { content: body, frontMatter: attrs };
    } else {
      return fallbackTitleNoFrontMatter(fileContent);
    }
  } catch (e) {
    console.error(`Error reading file "${filePath}":`, e);
    return { content: "", frontMatter: undefined };
  }
}

function fallbackTitleNoFrontMatter(fileContent: string) {
  // grab either first "# string ..." or first "## string ..." or first "### string ..." as title if front matter is not provided or as a fallback first line trimmed to 80 characters, and return content as is
  const lines = fileContent.split("\n");
  let title = "Untitled Post";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^#{1,3}\s+(.+)$/)) {
      // Extract text after # (1-3 hashes)
      title = trimmed.replace(/^#{1,3}\s+/, "");
      break;
    }
  }

  // Fallback to first line with text if no heading found
  if (title === "Untitled Post" && lines.length > 0) {
    // find first non-empty line and use it as title, trimmed to a specified number of characters
    // if the line is longer than the specified number of characters, it will be truncated and "..." will be added to the end
    const firstNonEmptyLine = lines.find((line) => line.trim().length > 0);
    if (firstNonEmptyLine) {
      const maxLength = Deno.env.get("DENO_QUICKBLOG_TITLE_MAX_LENGTH")
        ? parseInt(Deno.env.get("DENO_QUICKBLOG_TITLE_MAX_LENGTH")!)
        : 40;
      title = firstNonEmptyLine.trim().length > maxLength
        ? firstNonEmptyLine.trim().slice(0, maxLength) + "..."
        : firstNonEmptyLine.trim();
    }
  }

  return {
    content: fileContent,
    frontMatter: { title, noFrontmatter: true },
  };
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

function findMarkdownFiles(dir: string, relativePath = ""): Array<string> {
  const files: string[] = [];
  for (const dirEntry of Deno.readDirSync(dir)) {
    const fullPath = `${dir}/${dirEntry.name}`;
    const relPath = relativePath
      ? `${relativePath}/${dirEntry.name}`
      : dirEntry.name;

    if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
      files.push(relPath);
    } else if (dirEntry.isDirectory) {
      files.push(...findMarkdownFiles(fullPath, relPath));
    }
  }
  return files;
}

function postList(): PostIDUrl[] {
  const postsList: Array<[string, string]> = [];
  const postFiles = findMarkdownFiles("posts");

  for (const filePath of postFiles) {
    const fileName = filePath.split("/").pop()!;
    const [year, month, day, ...slugParts] = fileName.split("-");
    const slug = slugParts.join("-").replace(".md", "");
    const url = `/posts/${year}/${month}/${day}/${slug}/`;
    const postKey = [year, month, day].map(String).join("");
    postsList.push([postKey, url]);
  }
  postsList.sort((a, b) => b[0].localeCompare(a[0]));
  return postsList;
}

export async function createPages(posts: PostInfo[]) {
  await processPageDirectory("pages", "", posts);
}
function writePageFromMarkdown(
  sourcePath: string,
  dirEntry: Deno.DirEntry,
  relativePath: string,
  posts: PostInfo[],
) {
  const pageName = dirEntry.name.replace(".md", "");
  const { content, frontMatter } = readContentAndFrontMatter(sourcePath);
  const fullContent = includePostListPartial(content, posts);
  const title: string = extractTitle(frontMatter);

  const outputDir = relativePath ? `dist/${relativePath}` : "dist";
  Deno.mkdirSync(outputDir, { recursive: true });
  Deno.writeTextFileSync(
    `${outputDir}/${pageName}.html`,
    createHtmlPageFromMarkdown(title, fullContent),
  );
}

async function writePageFromJSX(
  sourcePath: string,
  dirEntry: Deno.DirEntry,
  relativePath: string,
  posts: PostInfo[],
) {
  const pageName = dirEntry.name.replace(".jsx", "");
  const module = await import(`./${sourcePath}`);
  const PageComponent = module.default;
  const pageJsx = PageComponent({ posts });
  const pageHtml = renderToString(pageJsx);

  const outputDir = relativePath ? `dist/${relativePath}` : "dist";
  Deno.mkdirSync(outputDir, { recursive: true });
  Deno.writeTextFileSync(
    `${outputDir}/${pageName}.html`,
    htmlBodyTemplate(
      pageName,
      pageHtml,
      renderFooter(),
    ),
  );
}

async function processPageDirectory(
  sourceDir: string,
  relativePath: string,
  posts: PostInfo[],
) {
  for (const dirEntry of Deno.readDirSync(sourceDir)) {
    const sourcePath = `${sourceDir}/${dirEntry.name}`;
    const newRelativePath = relativePath
      ? `${relativePath}/${dirEntry.name}`
      : dirEntry.name;

    // Skip posts directory
    if (dirEntry.name === "posts") continue;
    // Process directories and markdown/jsx files, ignore others
    if (dirEntry.isDirectory) {
      // Recursively process subdirectories
      await processPageDirectory(sourcePath, newRelativePath, posts);
    } else if (dirEntry.isFile && dirEntry.name.endsWith(".md")) {
      writePageFromMarkdown(sourcePath, dirEntry, relativePath, posts);
    } else if (dirEntry.isFile && dirEntry.name.endsWith(".jsx")) {
      await writePageFromJSX(sourcePath, dirEntry, relativePath, posts);
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

function createPostListMarkdown(posts: PostInfo[]): string {
  let postList = "";
  for (const [_postKey, postDate, title, url] of posts) {
    postList += `- <small>${postDate}</small> [${title}](${url})\n`;
  }
  return postList;
}

function includePostListPartial(content: string, posts: PostInfo[]): string {
  let fullContent = "";
  const postsListRegex = /\{\{\s*POSTS_LIST(?:\(\d{1,3}\))?\s*\}\}/;
  if (postsListRegex.test(content)) {
    // if a number is specified, the number of posts listed will be limited to that number
    posts = limitPostList(content, postsListRegex, posts);
    fullContent = content.replace(
      postsListRegex,
      createPostListMarkdown(posts),
    );
  } else {
    fullContent = content;
  }
  return fullContent;
}

export function createPosts() {
  const postsList = postList(); // for navigation links
  const posts: PostInfo[] = [];
  const postFiles = findMarkdownFiles("posts");
  // posts must be in the format YYYY-MM-DD-title.md to be properly parsed,
  // and the URL will be generated based on that
  for (const filePath of postFiles) {
    const fileName = filePath.split("/").pop()!;
    const [year, month, day, ...slugParts] = fileName.split("-");
    const slug = slugParts.join("-").replace(".md", "");
    const url = `/posts/${year}/${month}/${day}/${slug}/`;
    const outputDir = `dist/posts/${year}/${month}/${day}/${slug}`;
    const { content, frontMatter } = readContentAndFrontMatter(
      `posts/${filePath}`,
    );
    const title: string = extractTitle(frontMatter);
    const postKey = [year, month, day].map(String).join("");
    const postDate = formatDateString(year, month, day);
    const currentIndex = postsList.findIndex(([k]) => k === postKey);
    const nextUrl = postsList[currentIndex - 1]?.[1] ?? null;
    const prevUrl = postsList[currentIndex + 1]?.[1] ?? null;

    // write content to output file
    Deno.mkdirSync(outputDir, { recursive: true });
    Deno.writeTextFileSync(
      `${outputDir}/index.html`,
      createHtmlPostFromMarkdown(
        frontMatter?.noFrontmatter ? "" : title,
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
  return posts;
}

function writeIndex(posts: PostInfo[]) {
  let indexContent = Deno.readTextFileSync("index.md");
  // deno-lint-ignore no-unused-vars
  const { frontMatter, body, attrs } = extractToml(
    indexContent,
  ) as ExtractedMarkdownWithFrontMatter;
  const title: string = extractTitle(attrs);
  indexContent = body;
  indexContent = includePostListPartial(indexContent, posts);
  Deno.writeTextFileSync(
    "dist/index.html",
    createHtmlPageFromMarkdown(title, indexContent),
  );
}

function copyPublicFolderToDist() {
  try {
    copyDirRecursive("public", "dist");
  } catch (e) {
    console.error("Error copying public folder:", e);
  }
}

function cleanUpDistDirectory() {
  try {
    for (const dirEntry of Deno.readDirSync("dist")) {
      Deno.removeSync(`dist/${dirEntry.name}`, { recursive: true });
    }
  } catch (_e) {
    // ignore error if dist/ doesn't exist
  }
}

function checkCollisionsBetweenPublicAndPages(
  publicNames: Set<string>,
  pageNames: Set<string>,
) {
  for (const name of publicNames) {
    if (pageNames.has(name)) {
      console.error(
        `Error: Naming collision detected for "${name}" in "public" and "pages" directories. Please rename one of the files to avoid conflicts.`,
      );
      Deno.exit(1);
    }
  }
}

function checkReservedPostsName(
  entries: Deno.DirEntry[],
  directoryName: string,
) {
  for (const entry of entries) {
    if (entry.name === "posts") {
      console.error(
        `Error: Reserved name "${entry.name}" found in "${directoryName}" directory. The "posts" name pattern is reserved for blog posts. Please rename this file/directory.`,
      );
      Deno.exit(1);
    }
  }
}

function checkNamingCollisionsPublicAndPages() {
  try {
    const publicEntries = Array.from(Deno.readDirSync("public"));
    const pageEntries = Array.from(Deno.readDirSync("pages"));

    const publicNames = new Set(publicEntries.map((e) => e.name));
    const pageNames = new Set(pageEntries.map((e) => e.name));
    const allowedFiles = new Set([".gitkeep"]);
    allowedFiles.forEach((name) => {
      publicNames.delete(name);
      pageNames.delete(name);
    });
    // Check for naming collisions between public/ and pages/
    checkCollisionsBetweenPublicAndPages(publicNames, pageNames);
    // Check for "posts" pattern in public/ and pages/ directories
    checkReservedPostsName(publicEntries, "public");
    checkReservedPostsName(pageEntries, "pages");
  } catch (e) {
    // If directories don't exist, that's okay
    if (!(e instanceof Deno.errors.NotFound)) {
      throw e;
    }
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  createNewPost();
  checkNamingCollisionsPublicAndPages();
  console.log("Deno-QuickBlog - Building blog...\n");
  checkLangSupport();
  cleanUpDistDirectory();
  console.log("Cleaned up files.");
  Deno.mkdirSync("dist", { recursive: true });
  const posts = createPosts();
  posts.sort((a, b) => b[0].localeCompare(a[0]));
  console.log("Read posts.");
  console.log("Writing blog posts.");
  createPages(posts);
  console.log("Writing pages.");
  writeIndex(posts);
  console.log("Writing index page.");
  copyPublicFolderToDist();
  console.log("Copied public folder.");
  console.log("\nBlog build complete!");
}
