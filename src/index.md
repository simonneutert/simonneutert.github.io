---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<h1 class="rotate">👋 Hi, I'm Simon! <img src="https://www.gravatar.com/avatar/9ee19244c2d149385a7f1ca3a4844b6c?s=100" style="border-radius:5px" /></h1>

I share my code on [GitHub](https://github.com/simonneutert) and I
sometimes [blog](/posts) about what made me smile, stumble, humble, or moan.
{:style="text-align:center"}

I help maintain [shell-curry](https://shell-curry.simon-neutert.de/), an opinionated list of terminal tools.
{:style="text-align:center"}

Check out my [MicroBlog, here on the website](/microblog),  
where I collect and share links I find interesting.
{:style="text-align:center"}

My passion is Ruby, yet I enjoy exploring what other languages bring to the table.
I've been dabbling with Clojure, exploring the [land of LISP and parentheses](https://www.youtube.com/watch?v=HM1Zb3xmvMc&t=64s) whenever I find the time 🥰
{:style="text-align:center"}

I share my photos on [Flickr](https://www.flickr.com/photos/simonneutert/).
{:style="text-align:center"}

Get in touch with me on [Telegram](https://t.me/simonneutert) or via [LinkedIn](https://www.linkedin.com/in/simon-neutert/)! 🍻
{:style="text-align:center"}

## I blog from time to time

Mostly about code I've written, sometimes pet projects, or things that should never slow me down again.
That's right, I'm pointing at you, [pg gem for Mac](/2018/pg-gem-with-postgres-app-on-mac/) (though this is a thing of the past 🙌)!

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
  <a href="/posts" class="myButton">show all posts</a>
</div>

---

> The difference between masters and beginners is that masters have failed more times than beginners have even tried.
>
> \- Stephen McCranie

---
