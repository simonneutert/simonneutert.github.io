---
layout: post
title: "use minimagick convert pdf frontpage to png"
---

Use your majestic brain waves to figure out how where to get the pdf content from. Then refactor the code to your needs. This is just a snippet.

```ruby
def to_pdf_preview_png_base64
  begin
    base64string = ""
    Tempfile.create(["filename_randomized", '.png'], binmode: true) do |temp_png_file|
      Tempfile.create(["filename_randomized", '.pdf'], binmode: true) do |temp_pdf_file|
        temp_pdf_file.write(pdf_content) # << you know where to get this from
        pdf = MiniMagick::Image.open(temp_pdf_file.path)

        png_file = MiniMagick::Tool::Convert.new do |convert|
          convert.background "white"
          convert.flatten
          convert.density 150
          convert.quality 100
          convert.format "png"
          convert << pdf.pages.first.path
          convert << temp_png_file.path
        end
        png_contents = File.binread(temp_png_file.path)
        base64string = "data:image/png;base64,#{Base64.encode64(png_contents)}"
      end
    end
    base64string
  rescue => e
    puts e
    # empty pixel https://png-pixel.com/
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg== "
  end
end
```
