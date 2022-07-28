---
layout: page
title: Posts
---

<ul>
  {% collections.posts.resources.each do |post| %}
    <li>
    <span style="font-family: monospace">
      {{post.data.date.to_date}}
      </span> <a href="{{ post.relative_url }}">{{ post.data.title }}</a>
    </li>
  {% end %}
</ul>

<!-- If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)! -->
