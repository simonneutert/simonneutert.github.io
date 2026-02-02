---
layout: post
title: Base64 image encoding / decoding in ruby
categories: [ruby]
tags: [ruby]
description: How to you use Base64
---

__convert an image to Base64 data:__

``` ruby
require "base64"

base64_image =
  File.open("path/to/file.jpg", "rb") do |file|
    # why strict_encode64
    # https://ruby-doc.org/stdlib-2.3.1/libdoc/base64/rdoc/Base64.html#method-i-strict_encode64
    Base64.strict_encode64(file.read)
  end

# now save to db or whatever you wish :)
```

__convert Base64 image data to an image file:__

``` ruby
require "base64"

# decode64
img_from_base64 = Base64.decode64(base64_image)
# => "\x89PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\xAA\x00\x00\x00\xAA\b\x06\x00\x00\x00=v\xD4\x82\x00\x00\x00IDATx\x9C\xEC\xBDi\x98%Wy\xE7\xF9;[D\xDC-3++k\xDF\xF7U\xA2T\x92J*\xAD\xA5}A`\ff\xB1\xB11\ ..."

# cut the data where it seems to hold the filetype
img_from_base64[0,8]
# => "\x89PNG\r\n\x1A\n"

# find file type
filetype = /(png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/.match(img_from_base64[0,16])[0]
# name the file
filename = "image_name"

# write file
file = filename << '.' << filetype
File.open(file, 'wb') do|f|
  f.write(img_from_base64)
end
```
