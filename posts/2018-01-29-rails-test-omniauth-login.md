+++
layout = "post"
title = "Test OmniAuth protected Controllers (Rails)"
categories = ["ruby", "rails"]
tags = ["ruby", "rails", "tdd"]
description = "It isn't hard, but not self explanatory"
+++

[OmniAuth](https://github.com/omniauth/omniauth/wiki/Integration-Testing) offers
a good wiki about testing. I use minitest for my testing and in order to get
OmniAuth to work I had to add the following lines to
`config/environments/test.rb`

```ruby
# config/environments/test.rb

# OmniAuth test settings:
OmniAuth.config.test_mode = true
OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new({
'provider' => 'facebook',
'uid' => '123545',
'info' => {
  'email' => 'dpsk@email.ru',
  'name' => 'Mario Brothers',
  'image' => '' },
'credentials'=> {
  'token'=> '12345',
  'expires_at' => 1486718672,
  'expires' => true },
'extra' => {
  'raw_info' => {
      'email' => 'dpsk@email.ru',
      'name' => 'Mario Brothers',
      'id' => '12345' }
  }
})
```

A helper funtion will help keeping the tests clean and maintainable.

```ruby
# test/test_helper.rb
def login_user
  request.env["devise.mapping"] = Devise.mappings[:user] # If using Devise
  request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook]
  session[:expires_at] = (Time.current + 1.years)
  session[:user_id] = User.first.id # taken from a user fixture - users.yml
end
```

So a test can make use of a logged in user like this:

```ruby
test 'should create offer when logged in' do
  login_user # load the helper method
  assert_difference('Offer.count') do
    offer_params = { offer: { name: "Yolo", user_id: session[:user_id] } }
    post :create, params: offer_params
  end

  assert_redirected_to offers_mitfahrgelegenheit_path(assigns(:offer))
end
```
