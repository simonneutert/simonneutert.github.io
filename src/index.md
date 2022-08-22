---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

<h1 class="rotate">👋 Hi, I'm Simon! <img src="https://www.gravatar.com/avatar/9ee19244c2d149385a7f1ca3a4844b6c?s=100" style="border-radius:5px" /></h1>



What I'm currenty coding on is uploaded on [GitHub](https://github.com/simonneutert) and  
sometimes [blog](/posts) about what made me smile/stumble/humble/moan.
{:style="text-align:center"}

I (con(j))currently explore the [land of LISP/parentheses](https://www.youtube.com/watch?v=HM1Zb3xmvMc&t=64s) 🥰
{:style="text-align:center"}

Other than that, I really do enjoy spending time on my bike in [Rheinhessen](https://www.rennrad-rheinhessen.de).
{:style="text-align:center"}

On [flickr](https://www.flickr.com/photos/simonneutert/) you will find my photo gallery.
{:style="text-align:center"}

Get in touch with me via [Linkedin](https://www.linkedin.com/in/simon-neutert/)! 🍻
{:style="text-align:center"}

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
  <li><span data-weight="4">Interactive Maps</span></li>
  <li><span data-weight="6">Clojure</span></li>
  <li><span data-weight="7">JavaScript</span></li>
  <li><span data-weight="9">API</span></li>
  <li><span data-weight="7">Docker</span></li>
  <li><span data-weight="3">SSH</span></li>
  <li><span data-weight="1">Python</span></li>
</ul>
</div>

## Latest posts

<ul>
  {% collections.posts.resources.take(10).each do |post| %}
    <li>
      <span style="font-family: monospace">{{post.data.date.to_date}}</span> <a href="{{ post.relative_url }}">
        {{ post.data.title }}
      </a>
    </li>
  {% end %}
</ul>