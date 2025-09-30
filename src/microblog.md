---
layout: page
title: Micro Blog
---

<ul>
  {% site.data.microblog.each do |post| %}
    <li>
      <p><a href="{{ post.url }}" rel="noopener">{{ post.url }}</a><br>{{ post.content&.gsub("\n", "<br>")&.html_safe }}</p>
    </li>
  {% end %}
</ul>

<!-- If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)! -->
