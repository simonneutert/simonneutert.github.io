---
layout: post
title: Login to a CSRF-Token Secured Website Using Mechanize
categories: [ruby, rails]
tags: [script, ruby, devise, security]
description: Login to your csrf-token secured Rails App
---

Ruby Ruby Ruby

```ruby
# this is what you need to gem install in the first place
require 'mechanize'
require 'nokogiri'
require 'open-uri'

class EasyLogin
  def initialize(email, password)
    @email = email
    @password = password
    # generate a mechanize agent object for persistent "browsing"
    @browser = Mechanize.new do |agent|
      agent.user_agent_alias = 'Mac Safari'
      agent.follow_meta_refresh = true
    end
  end

  def login(login_url)
    # get the desired page with the login form
    get(login_url) do |page|
      # search the current csrf token in the head of the document
      csrf_token = page.search('//meta[@name="csrf-token"]/@content')
      # now let's dive into the form (authenticity_token is a hidden field)
      login_form = page.form_with(:id => 'new_admin') do |login|
        login.field_with(:name => 'admin[email]').value = @email
        login.field_with(:name => 'admin[password]').value = @password
        login.field_with(:name => 'authenticity_token').value = csrf_token
        # check output in console
        puts login.values
        # submit the form
        login.submit
      end
    end
  end

  def post(post_url, title, content)
    # get the token
    csrf_token = @browser.get(post_url).search('//meta[@name="csrf-token"]/@content')
    # define the data for the form
    payload = { 'article[title]' => title, 'article[content]' => content }
    # post to your controller
    @browser.post(post_url, payload, {})
  end

  def shutdown
    @browser.shutdown
  end
end

# ready to rock!
email = "email@emailprovider.com"
password = "your-password"
easy_login = EasyLogin.new(email, password)

login_url = 'http://localhost:3000/admins/sign_in'
easy_login.login(login_url)

post_url = 'http://localhost:3000/articles/new'
title = "Title of Post"
content = <<~MESSAGE
            "Lorem ipsum bacon gin tonic"
          MESSAGE
easy_login.post(post_url, title, content)

easy_login.shutdown


```