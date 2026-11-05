+++
layout = "post"
title = "From deno-nbb to dbb: ClojureScript on Deno, shipped as a single binary 🦕"
+++

A few weeks ago I pushed [deno-nbb](https://github.com/simonneutert/deno-nbb) to
GitHub. It was a small experiment with a simple question: **what if nbb ran on
Deno instead of Node?**

It was mostly a process of wrapping my head around nbb and Deno, and figuring
out how to make them work together. I dabbled with
[borkdude/bebo](https://github.com/borkdude/bebo) some time ago, and I wanted to
see if I could leverage Deno's built-in tooling to make a tiny, self-contained
binary that runs ClojureScript. Most importantly, I wanted to see if I could
ship a single binary that runs anywhere, without requiring Node or Deno to be
installed.

What started as a template repository is growing into its own tool. It is not
public yet, but it is close enough that I want to give you a glimpse of what's
coming. 🚀

## Where it started: deno-nbb

I love [Babashka](https://babashka.org/). Writing a quick script in Clojure,
poking at it in the REPL and being done with it is just delightful. And I love
[Deno](https://deno.com/) for its permissions, JSR, the built-in tooling and,
above all, `deno compile`.

[nbb](https://github.com/babashka/nbb) is Babashka's little sibling for the
JavaScript world. It interprets ClojureScript with SCI, on Node. So why not
bring the three together?

deno-nbb split the work like this:

- **nbb** evaluates ClojureScript, reads `nbb.edn` and bundles the code into
  `main.bundle.js`
- **Deno** launches nbb, handles permissions, resolves JSR imports, runs the
  tests and compiles everything into a native executable

It worked! A tiny CLI with a JSR import for CSV parsing, an nREPL for Calva, and
`deno task compile` spitting out one binary. No Node installation needed.

But it was a template. Every new project meant copying `runtime.ts`, a
`deno.json` full of tasks, an `nbb.edn` and a good amount of glue. You can guess
my next thought: **what if I could make this a tool that does all the glue for
me?**

## Turning the template into a tool

I needed a **tiny wrapper around nbb**. Same SCI, same built-in libraries, same
REPLs. Nothing about the language changes, only what you can ship does.

Two rules guided me all the way:

1. **Deno is the northstar.** Whenever dbb has to decide how files, permissions
   or warnings behave, it does what Deno does and passes Deno's own messages
   through. No invented rules.
2. **Re-use what nbb brings to the table.** If nbb can do it, my tool
   doesn't/shouldn't reimplement it.

## One file to rule them all: `dbb.edn`

If you know `bb.edn`, you will feel right at home:

```clojure
{:paths ["src"]
 :test {:paths ["test"]}
 :deps {dev.weavejester/medley {:mvn/version "1.10.0"}}
 :deno {:imports {"kleur" "npm:kleur@4.1.5"}}
 :tasks {:greet hello.tasks/greet}
 :compile {:main hello.main
           :output "hello"
           :permissions [:env]}}
```

`dbb.edn` is the source of truth, and `deno.json` is generated from it. Familiar
keys keep their Clojure meaning (`:deps` is resolved by `bb` itself), and native
Deno settings live under `:deno`. A setting defined in two places is an error,
never a silent merge.

## Compile it, run it anywhere

This is the feature I wanted most from the start:

```sh
dbb compile
./hello Ada
```

You get **one file** with nbb, your code, your `:deps` libraries, your npm/JSR
modules and any data files you include. Your users need nothing. No Deno, no
Node, no `bb`.

For development, commands run with `--allow-all`; only compiled executables are
restricted to the permissions you list in `:compile :permissions`.
Cross-compiling for another OS is a Deno flag away:

```sh
dbb compile -- --target x86_64-unknown-linux-gnu
```

## Single executable as a release artifact

The release binaries bundle the Deno runtime and nbb, and are available for
every platform Deno supports: macOS (Intel and Apple Silicon), Linux (x86_64 and
arm64), and Windows (x64 and arm64).

Grab the `dbb` binary for your platform. Scripts and REPLs can run without Deno,
unless they use `:deno :imports` or npm-backed nbb libraries such as `reagent`;
projects using `:deps` also need `bb`:

```sh
dbb hello.cljs Ada
dbb -e '(+ 1 2)'
dbb repl
```

## The REPL you already know

All of nbb's REPLs are passed straight through. Fire up an nREPL server and jack
in from Calva, CIDER or
[Conjure](/posts/2025/11/24/conjure-nrepl-nvim-clojure/):

```sh
dbb nrepl-server :port 1337
```

## App style or lib style? Publish to JSR

JSR only takes JavaScript and TypeScript modules. So how does ClojureScript get
there? `dbb bundle` does it in three steps:

1. **nbb bundles.** dbb hands your entry namespace to nbb's own `nbb bundle`,
   which collects every namespace you require (your code and your `:deps`) into
   one JavaScript file. Your ClojureScript is not compiled. It travels along as
   source and nbb interprets it when the module loads, exactly as it does during
   development.
2. **dbb makes it a Deno module.** The bundle has to run far away from your
   project, so dbb pins the nbb version it runs on, swaps your `:deno :imports`
   aliases for their real `npm:` and `jsr:` specifiers, and adds a small
   resource module so files from `:include` are found next to the bundle.
3. **dbb writes the entry point.** It lands at the path your `:deno :exports`
   names, so the generated `deno.json` lists exactly what JSR will publish.

What the entry point looks like depends on the style you pick. You can go two
ways, or both at once in one package:

```clojure
{:name "@your-scope/greet"
 :version "0.1.0"
 :license "MIT"
 :paths ["src"]
 ;; the package's entry points, exactly as JSR expects them in deno.json
 :deno {:exports {"."     "./dist/cli.ts"
                  "./lib" "./dist/lib.js"}}
 ;; builds by id, like shadow-cljs's :builds;
 ;; `dbb bundle` builds both, `dbb bundle lib` only one
 :bundle {;; app style: runs greet.cli/-main with the command line args
          :cli {:main greet.cli
                :export "."}          ; written to ./dist/cli.ts
          ;; lib style: JavaScript name -> Clojure var
          :lib {:kind :library
                :export "./lib"       ; written to ./dist/lib.js
                :exports {greet greet.api/greet}
                ;; your hand-written TypeScript declarations
                :types "types/lib.d.ts"}}}
```

- **App style:** the entry point calls your `-main` only when it runs as the
  main module (`import.meta.main`), so importing it has no side effects. Deno
  users run your command with `deno run -A jsr:@your-scope/greet Ada`.
- **Lib style:** the entry point starts nbb, looks up the vars you listed and
  exports them under their JavaScript names. With the `.d.ts` file next to it,
  TypeScript folks `import { greet } from "jsr:@your-scope/greet/lib"` as if it
  were written in TypeScript. Because nbb probes the filesystem on load,
  consumers need `--allow-read` or `--ignore-read`. Just make sure your exported
  functions take and return plain JavaScript values.

If this reminds you of shadow-cljs's `:esm` target, that is on purpose. Then it
is only `deno publish` away from JSR.

## And and and …

- **`dbb test`** runs your `js/Deno.test`s through `deno test`
- **`dbb task`** runs qualified Clojure functions as bb-style function tasks,
  not through Babashka's task engine; `:deno :tasks` stays plain `deno task`
  (syntax sugar for Deno users)
- **`dbb deps outdated`** tells you what to bump
- **`dbb sync`** keeps `deno.json` and `deno.lock` in line with `dbb.edn`
- **`dbb sync --from-deno`** updates `dbb.edn` from `deno.json` and `deno.lock`
  (dependabot-friendly)
- CI runs every test on Linux, macOS and Windows

## What's in the making

Right now I'm polishing the rough edges for an open source release. The docs are
being written, the example project is growing, and dbb will land on JSR as
`@simonneutert/dbb`, so Deno users can install it with a one-liner.

Huge thanks to [borkdude](https://github.com/borkdude) for nbb and Babashka. If
dbb turns out to be useful, it's because of the work he has done.

Fun fact: when experimenting, I tried to pull `weavejester/medley` in. But it
threw an error, because `array-list` was not part of nbb's ClojureScript
runtime. We added it in [PR #424](https://github.com/babashka/nbb/pull/424).

Stay tuned!
