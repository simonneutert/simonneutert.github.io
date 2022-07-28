---
layout: post
title: XML Sitemap in Rails without using a Gem
categories: [rails]
tags: [data, routing, SEO, sitemap]
description: Render your sitemap.xml as a view - without any hustle or gem.
---

#### Why not using a gem?
Because it is so easy doing this yourself.

```ruby
# in models_controller.rb
def sitemap
  # set your url base path
  @url = "http://www.example.com"

  # return your desired Records
  @offers = Offer.where(active: true).pluck(:id, :updated_at)
  @fboffers = FbOffer.where(active: true).pluck(:id, :updated_at)

  # pluck returns a list what it far less memory hungry than
  # returning loads of objects :)

  respond_to do |format|
    format.xml { render layout: false }
    format.txt { render layout: false }
  end
end
```

After the controller has been set, create sitemap.xml.builder in your correspondent view dir.

```ruby
# sitemap.xml.builder
xml.instruct! :xml, :version => "1.0"
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  xml.url do
    xml.loc @url
    xml.lastmod Time.now.to_date
    xml.changefreq "weekly"
    xml.priority "0.3"
  end

  for id,updated_at in @offers do
    xml.url do
      xml.loc @url + offers_mitfahrgelegenheit_path(id)
      xml.lastmod updated_at.to_date
      xml.changefreq "daily"
      xml.priority "0.9"
    end
  end

  for id,updated_at in @fboffers do
    xml.url do
      xml.loc @url + fb_offers_mitfahrgelegenheit_path(id)
      xml.lastmod updated_at.to_date
      xml.changefreq "daily"
      xml.priority "0.9"
    end
  end
end
```

Now setup a route to your sitemap and off you go!
e.g.

```ruby
get 'sitemap', to: 'home#sitemap'
```