---
layout: post
title:  "The sass gem is dead, long live: sass-embedded-host-ruby"
---

I had this deprecation warning in my template sinatra project on GitHub for a while now.

The project should have ActiveRecord and Sass support, with sprockets and a few other things.

And man was this sass topic a rabbit hole in one way or another. Because the hint in the deprecation warning didn't work out of the box.

And with most people being on Rails, or when on Sinatra not very interested in Sass, or they know how to fix it, I had mostly trial and error to go on.

Here is how I setup my project's/app's environment from day one:

```ruby
class MyApp < Sinatra::Base
  # initialize new sprockets environment
  set :environment, Sprockets::Environment.new
  # append assets paths
  environment.append_path 'assets/stylesheets'
  environment.append_path 'assets/javascripts'
  # compress assets
  environment.js_compressor  = :uglify
  environment.css_compressor = :scss # << here's the problem
  # get assets
  get '/assets/*' do
    env['PATH_INFO'].sub!('/assets', '')
    settings.environment.call(env)
  end
end
```

I highlighted the problem line. It's the `:scss` compressor. This simply doesn't work anymore. And all the deprecation warning says is:

`switch to the sassc ruby gem`

well, I did that, and it is part of the solution, but the glue was missing.

`$ bundle add sass-embedded sassc`

https://github.com/sass-contrib/sass-embedded-host-ruby

Then require both gems, remove `sass` from the Gemfile, and remove the `:scss` compressor line.

```ruby
class MyApp < Sinatra::Base
  # initialize new sprockets environment
  set :environment, Sprockets::Environment.new
  # append assets paths
  environment.append_path 'assets/stylesheets'
  environment.append_path 'assets/javascripts'
  # compress assets
  environment.js_compressor  = :uglify

  # 👇 remove any css compressor settings you might stumble upon, be it sinatra, roda or rails
  # environment.css_compressor = :scss # << here's the problem

  # get assets
  get '/assets/*' do
    env['PATH_INFO'].sub!('/assets', '')
    settings.environment.call(env)
  end
end
```
Checkout the pull request for the full diff:  
https://github.com/simonneutert/sinatras-skeleton/pull/84/files

And that's it. I hope this helps someone else out there.
