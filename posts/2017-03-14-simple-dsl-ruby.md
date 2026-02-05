+++
layout = "post"
title = "Simple Internal DSL with Ruby"
categories = ["ruby"]
tags = ["coding", "array", "list", "ruby"]
description = "Write your own Internal DSL"
+++

I may write up or comment out the code in detail in the future. For the curious,
here is a very good post from
[Gabe Berke-Williams on thoughtbot.com](https://robots.thoughtbot.com/writing-a-domain-specific-language-in-ruby).

To further sharpening your skills, I recommend googling **"ruby how to use
method_missing"** and **"instance_eval vs class_eval ruby"** - those are key in
meta programming Ruby.

```ruby
# to not pollute the global namespace, wrap your DSL in a module and class
module DslWrapper
    class Post
        def initialize(user)
            @user = user
            @post = []
            @extras = {}
        end
        def text(str)
            @post << str
            self
        end
        def hashtag(*strs)
            strs.each {|str| @post << '#' + str}
            self
        end
        def link(str)
            @post << str
            self
        end
        def post_on_facebook
            fb_text = @post.join(' ')
            begin
                if fb_text.length <= 440
                    puts "#{@user}: #{fb_text}"
                    puts @extras.inspect unless @extras.empty?
                else
                    raise 'Your post is too long.'
                end
            rescue
                puts "I can't tweet this, your tweet is too long, sorry."
            end
        end
        def method_missing(method, *args)
            @extras[method] = args.join(', ')
        end
    end
end
```

this is your exposed dsl method

```ruby
# your exposed DSL method
def post_as(user, text = nil, &block)
    post = DslWrapper::Post.new(user)
    post.text(text) if text
    # by passing the block to instance_eval your
    # passed in methods are now run in the scope of Post Class
    post.instance_eval(&block) if block_given?
    post.post_on_facebook
end
```

now, let's see your DSL in action!

```ruby
# granular style
post_as 'Mark_Z' do
    text """
            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
        """
    hashtag 'ruby'
    hashtag 'dsl'
    link 'http://www.simon-neutert.de'
    sexy 'objects'
end
# multiple hashtags in one line
post_as 'Mark_Z' do
    text 'my dsl works'
    hashtag 'ruby', 'dsl'
    link 'http://www.simon-neutert.de'
    sexy 'classy'
end
# method chaining (possible, because Post's methods return "self")
post_as 'Mark_Z' do
    text("Mic check...").hashtag("one", "two").link('http://www.simon-neutert.de')
    sexy 'bit'
end
# in a one liner
post_as 'Mark_Z', 'Hi, I am Mark_Z!'
```
