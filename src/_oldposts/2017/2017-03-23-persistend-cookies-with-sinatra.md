---
layout: post
title: Persistent cookies with Sinatra
categories: [ruby]
tags: [coding, mvc, sinatra, ruby, framework]
description: Set persistent cookies in a Sinatra app
---

**Simple example**
``` ruby
# in app.rb

require "sinatra/cookies"
require 'rack/contrib'
# require ...

class MyApp < Sinatra::Base
    enable :sessions
    use Rack::Cookies
    helpers Sinatra::Cookies

    get '/' do
        response.set_cookie("test_cookie", {
            :value => "This is a random test cookie",
            :expires => Time.new(2019,6,15),
            :path => '/'
            })
        haml :index
    end

    get '/test/cookie/reader'
        @cookieval = request.cookies['test_cookie']
        haml @cookieval
        # => "This is a random test cookie"
    end
end
```

---
_You can find the implementation in the Sinatra MVC App i put together on my github account._

Badosus Example worked nearly out of the box in my Sinatra App (Username/Password auth already - [read more](https://github.com/sklise/sinatra-warden-example)). I had to modify the code just a little. Make sure to set your cookies like in my example above and provide a proper `fail!` in your [Warden strategies](https://github.com/hassox/warden/wiki/Strategies).

### Git some of my [Sinatra MVC skeleton on github](https://github.com/simonneutert/sinatras-skeleton)

I pulled off a customized "remember me" login option with a cookie-based user authentication option, thanks to these wonderful docs, blogs and gists.
* [badosu's example](https://github.com/badosu/Yogurt/wiki/Example:-Adding-Remember-Me-option)
* [Pothibo.com](http://pothibo.com/2013/07/authentication-with-warden-devise-less/)
* [rubymonstas.org - Sessions in Sinatra](http://webapps-for-beginners.rubymonstas.org/sessions/sinatra_sessions.html)
* [Smulligan85 - building CRUD with Sinata](http://smulligan85.github.io/tutorial/2016/04/30/building-a-CRUD-app-with-sinatra.html)
* [Sinatra Docs Accessing Response Object](http://www.sinatrarb.com/intro.html#Accessing%20the%20Request%20Object)
* [Sinatra Docs Contrib/Cookies](http://www.sinatrarb.com/contrib/cookies.html)
* [Craig Russel](http://craig-russell.co.uk/2013/01/31/persistent-cookies-sinatra.html#.WLQQ9xiX_-n)
* [Warden Wiki](https://github.com/hassox/warden/wiki)
