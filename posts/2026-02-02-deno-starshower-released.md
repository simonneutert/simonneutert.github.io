+++
layout = "post"
title = "Deno Starshower Released: Browse you GitHub Stars prettily formatted in Markdown"
+++

I am super excited about the release of
[Deno Starshower](https://github.com/simonneutert/deno-starshower), a Deno-based
CLI tool that allows you to browse your GitHub stars in a beautifully formatted
Markdown style.

This project was born out of my personal need to have a better way to view and
manage my starred repositories on GitHub.

**I am a star hoarder!** I have starred over 600 repositories, and finding
specific ones or just browsing through them on GitHub's web interface was not
the best experience. With Starshower, you can easily generate a Markdown file
that lists all your starred repositories with relevant details like description,
language, stars, and last updated date. After all, I hooked it up to this blog
via a GitHub Action. As a bonus, the stars are now versioned in Git, so I can
track changes over time.\
And maybe, **just maybe**, I will finally unstar some repos I no longer need.

## Technical Bits

For the communication with GitHub, Starshower uses the official client:
[@octokit/rest](https://github.com/octokit/rest.js), ensuring reliable and
efficient API interactions.

It uses Deno's powerful features, including TypeScript support, built-in
tooling, and a robust standard library, making it a modern and efficient choice
for CLI development.

And [zod](https://zod.dev/) is used for schema validation, ensuring that the
data fetched from GitHub is correctly structured and validated before
processing.

All is packaged into a single executable using Deno's `deno compile` feature,
making it easy to distribute and run without requiring users to have Deno
installed.

## See for Yourself

[My starred repositories on this blog.](/starred-repos/)
