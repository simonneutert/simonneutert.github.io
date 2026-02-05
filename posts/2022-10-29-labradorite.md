+++
title = "I made my own little selfhostable flat-file notebook"
layout = "post"
+++

Most Notetaking apps do either too much (Notion), too less (Apple Notes) or
locked me in (Evernote).

<img src="/images/2022/labradorite.jpg" width="50%" style=" display: block; margin-left: auto; margin-right: auto; width: 50%;" />

I wanted something that does **just-enough**™, in the spirit of a _flat file
cms_. Let me try and wrap it up in a few bullets:

- **ownership** of the notes (flat files)\
  markdown, yaml, attachments all in one place in directories
- **easy** on the eyes/mind\
  I don't want to see all the old stuff I may not need anymore
- a search that shows me **snips** in the notes\
  not just the notes in a sidebar
- a very simple **tagging** support
- basic **file uploads**\
  keeping the originals side by side with notes

I like to keep things simple, so I once again fell for
[Roda](https://roda.jeremyevans.net) as the Web Layer.
[Tantiny](https://github.com/baygeldin/tantiny) is the kicker for this project.
I was curious, if I could come up with something useful quickly, not having to
deal with a complicated setup or Postgres as a requirement.

You can find the
[source code on GitHub](https://github.com/simonneutert/labradorite-notebook).
Give it a spin and contribute if you are missing something.
