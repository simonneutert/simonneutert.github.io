+++
layout = "post"
title = "Generate PDFs with wkhtmltopdf, wicked_pdf in Rails without breaking your layout (tables)"
categories = ["ruby", "rails"]
tags = ["ruby", "rails", "html5", "export", "print", "pdf", "webkit"]
description = "Fellows listen! This is how you do it (works on heroku, too)"
+++

I needed a pdf export really bad. And this took some time, so fasten your
seatbelt and get ready to print on your server. This works on my Debian /
elementary OS / Ubuntu based Linux Development Machine and on Heroku (at least
today :P).

The only wkhtmltopdf Version that was working for me is: 0.12.1 and **nothing
else**! And by _working_ I mean proper page breaks.
[Credits to Ben Hitchcock on StackOverflow](https://stackoverflow.com/a/38911752/6601963)

Check out
[wkhtmltopdf original repo on GitHub](https://github.com/wkhtmltopdf/wkhtmltopdf/releases)
and navigate to your destiny version 0.12.1 and download
"wkhtmltox-0.12.1_linux-wheezy-amd64.deb"

Open a terminal and navigate to your file.

```bash
$ ar t wkhtmltox-0.12.1_linux-wheezy-amd64.deb
$ ar x wkhtmltox-0.12.1_linux-wheezy-amd64.deb data.tar.xz
$ tar xf data.tar.xz
```

This finally creates the following directories `usr/local/bin/` for you and
inside **bin** there is our needed file **wkhtmltopdf**. Copy it into your Rails
app's `bin` directory.

`$ sudo cp /usr/local/bin/wkhtmltopdf /home/YOURUSER/path/to/your/railsapp/bin/`

In case you have a Rails Server running, stop it. Stop it right now, will you
;-)

All you need in your Gemfile is to add `gem wicked_pdf` and run
`bundle install`.

Next, create `wicked_pdf.rb` inside `app/config/initializers/` if not
automagically preexistend and add this line:

```ruby
WickedPdf.config = { :exe_path => "#{Rails.root}/bin/wkhtmltopdf" }
```

In my controller, I can now render my PDFs happily and save them in my Postgres
DB on heroku in a **binary column**.

Imagine something like this:

```ruby
pdf = WickedPdf.new.pdf_from_string(
                    render_to_string('periods/close.pdf', layout: 'layouts/pdf'),
                    header: {
                      content: render_to_string(
                        'periods/pdf_header',
                        layout: 'layouts/pdf'
                      )
                    },
                    footer: {
                      content: render_to_string(
                        'periods/pdf_footer',
                        layout: 'layouts/pdf'
                      )
                    })
```

To enable a sophisticated rescue for page breaks in tables add these css
instructions:

```css
#content {
  padding-top: 20px;
}
div.alwaysbreak {
  page-break-before: always;
}
div.nobreak:before {
  clear: both;
}
div.nobreak {
  page-break-inside: avoid;
}
.avoidbreak {
  break-inside: avoid;
  page-break-inside: avoid;
}
table, tbody, td, tfoot, th, thead, tr {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}
```

Read all about, what the **wicked_pdf gem** can do for you:
[wicked_pfg gem on GitHub](https://github.com/mileszs/wicked_pdf/blob/master/README.md)
