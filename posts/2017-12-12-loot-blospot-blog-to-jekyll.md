+++
layout = "post"
title = "Loot a Blogspot Blog and Save the Contents as Markdown (for a Jekyll backup)"
categories = ["ruby"]
tags = ["ruby"]
description = "nokogiri magic"
+++

This script is to be taken as an inspiration :)

If you need your content to be parsed in a sophisticated way, try this gem:
[Upmark](https://github.com/conversation/upmark). Don't forget that nokogiri's
`content` and `text` methods should therefore be changed to `inner_html`.

```ruby
require 'nokogiri' # gem install nokogiri
require 'open-uri'
require 'date'

html = Nokogiri::HTML(open('http://any_blog-you-can-think-of3.blogspot.com'))
posts = html.css('a').map { |l| l["href"] }
# RegEx for links: http://blogname.blogspot.com/year/month/name-of-post
posts = posts.select { |e| /http:\/{2}.+\/.+\/.+\/.+/ =~ e}

# iterate over posts
posts.each do |post|
  # nokogiri / content
  content = Nokogiri::HTML(open(post))
  title = content.title.gsub("Blog Title: ", "")
  clean_title = title.gsub(/[()-,.:;?$§"'\/\\]/, '').strip
  file_title = clean_title.gsub(" ", "-")
  text = content.css('.post-body').first.content.strip
  time_published = content.css('.published').first.text

  # date related operations
  date = "#{content.css('.date-header').first.content} - #{time_published}".strip
  content_date_de = date.split(",").last.split("-").first.strip
  # dates and translatations :-/
  months_en = %w(January February March April May June July August September October November December)
  months_de = %w(Januar Februar März April Mai Juni Juli August September Oktober November Dezember)
  translatations = Hash[months_de.zip(months_en)]
  months_de.each { |m| content_date_de.gsub!(m, translatations[m]) }
  file_date = DateTime.parse(content_date_de << " " << time_published)
  pub_date = file_date.strftime("%Y-%m-%d")

  # IO for Markdown Export
  File.open("#{pub_date}-#{file_title}.md", 'w') do |file|
    content = <<~CONTENT
    ---
    layout: post
    title:  "#{title}"
    ---
    __#{date} Uhr__

    #{text}
    CONTENT
    file.write(content)
  end
end
```
