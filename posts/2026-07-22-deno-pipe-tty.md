---
title: DenoJS - Read from stdin and detect a TTY
layout: post
---

This single file, is great to understand the underlying concept.

Run code when something is piped in, and run another branch to consume input
another way.

```typescript
// run this, when the file containing this code is the entrypoint
if (import.meta.main) {
  let input: string;

  if (Deno.stdin.isTerminal()) {
    // prompts the user for input/interaction
    input = prompt("Enter some text:") ?? "";
  } else {
    input = await new Response(Deno.stdin.readable).text();
  }

  console.log(`Got ${input.trim().length} characters`);
}
```

Code on GitHub: https://github.com/simonneutert/deno-pipe-tty-example

On GitHub, you will find detailed instructions. An example to compile this into
a single executable binary and to even containerize it (with podman, but docker
will work, too).

Deno Docs:
https://docs.deno.com/runtime/cli_apps/#read-from-stdin-and-detect-a-tty
