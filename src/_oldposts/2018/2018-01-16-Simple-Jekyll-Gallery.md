---
layout: post
title: Simple Jekyll Gallery
categories: [ruby]
tags: [ruby, jekyll, static]
description: Iterate over images in a folder with Jekyll
template_engine: none
---

[Jekyllrb.com](https://jekyllrb.com)

Please put your images in subfolders under `$jekyllroot/img/` e.g.

```bash
jekyllroot
|_ img
  |_ gallery
    |_ 2018
      |_ 01
        |_ 16
          |_ origami_festival
            |_ 01.jpg
            |_ 02.jpg
            |_ ...
            |_ 99.jpg
```

Jekyll runs [Liquid templates](http://shopify.github.io/liquid/) and relies on [Front Matter](https://jekyllrb.com/docs/frontmatter/), which is represented by the first block in between the `---`. And this is where the gallery's path is set. The _if-statement_ in the loop, looks like it doesn't belong, but due to the nature of how Jekyll iterates and builds, we have to live with it.

```liquid
---
layout: post
title: Origami Festival
tags: [album, paper]
gallery_path: "/img/gallery/2018/01/16/origami_festival/"
---

{% comment %} file: jekyllroot/_posts/2018-01-16-origami-festival.html {% endcomment %}
{% for image in site.static_files %}
  {% if image.path contains page.gallery_path %}
    <p><img src="{{ site.url }}{{ site.baseurl }}{{ image.path }}" alt=""></p>
  {% endif %}
{% endfor %}
```

You can of course turn this into an [__include__ or __jekyll inclusion module__](https://jekyllrb.com/docs/includes/), with a little more work.

__Caution!__ Please adapt your code according to your settings in `_config.yml` of `url` and `baseurl` settings.
