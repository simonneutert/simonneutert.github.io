---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<h1 class="rotate">👋 Hi, I'm Simon! <img src="https://www.gravatar.com/avatar/9ee19244c2d149385a7f1ca3a4844b6c?s=100" style="border-radius:5px" /></h1>

I share my code on [GitHub](https://github.com/simonneutert) and I
sometimes [blog](/posts) about what made me smile/stumble/humble/moan.
{:style="text-align:center"}

And you can follow my [telegram channel](https://t.me/stuffaboutcoding), where I share what I find interesting in the tech world.
{:style="text-align:center"}

My passion is Ruby, yet I enjoy exploring what other languages bring to the table.  
I (con(j))currently explore the [land of LISP/parentheses](https://www.youtube.com/watch?v=HM1Zb3xmvMc&t=64s) 🥰
{:style="text-align:center"}

View the photos I share on [flickr](https://www.flickr.com/photos/simonneutert/).
{:style="text-align:center"}

Get in touch with me on [Telegram](https://t.me/simonneutert) or via [Linkedin](https://www.linkedin.com/in/simon-neutert/)! 🍻
{:style="text-align:center"}

## I blog from time to time

Mostly about code I wrote, sometimes pet projects or about things that should never slow me down no more.  
That's right, I am pointing at you, [pg gem on Mac](/2018/pg-gem-with-postgres-app-on-mac/) (but it seems to be a thing of the past 🙌)!

#### Latest posts

<ul>
  {% collections.posts.resources.take(10).each do |post| %}
    <li>
      <span style="font-family: monospace">{{post.data.date.to_date}}</span> <a href="{{ post.relative_url }}">
        {{ post.data.title }}
      </a>
    </li>
  {% end %}
</ul>

<div class="d-grid gap-2">
  <a href="/posts" class="myButton">read more ...</a>
</div>

---

> The difference between masters and beginners is that masters have failed more times than beginners have even tried.
>
> \- Stephen McCranie

---

## WORDCLOUD! Buzzwords!

{:style="text-align:center; transform: rotate(2.5deg)"}

<div class="cloud-wrap">
<ul class="cloud" role="navigation" aria-label="Webdev tag cloud">
  <li><span data-weight="6">Postgres</span></li>
  <li><span data-weight="9">Ruby</span></li>
  <li><span data-weight="3">CSS</span></li>
  <li><span data-weight="6">HTTP</span></li>
  <li><span data-weight="8">VueJS</span></li>
  <li><span data-weight="6">HTML</span></li>
  <li><span data-weight="5">Sass</span></li>
  <li><span data-weight="7">Rails</span></li>
  <li><span data-weight="6">Clojure</span></li>
  <li><span data-weight="7">JavaScript</span></li>
  <li><span data-weight="9">API</span></li>
  <li><span data-weight="4">Interactive Maps</span></li>
  <li><span data-weight="7">Docker</span></li>
  <li><span data-weight="3">SSH</span></li>
  <li><span data-weight="1">Python</span></li>
</ul>
</div>
