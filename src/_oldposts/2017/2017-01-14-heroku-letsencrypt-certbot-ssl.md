---
layout: post
title: Using certbot to establish SSL in a Rails App on heroku
categories: [ruby, rails, heroku, hosting]
tags: [coding, rails, ssl, heroku, letsencrypt, homebrew, osx, certbot]
description: Use the free ssl service from letsencrypt.com for your production rails app on heroku
---


**This is an instruction for Mac OS X** _with homebrew_

primary source:

[Tomáš Vestenický on Medium - "How to set up SSL with Let’s Encrypt on Heroku for free"](https://medium.com/should-designers-code/how-to-set-up-ssl-with-lets-encrypt-on-heroku-for-free-266c185630db#.glxy3pum9)


## Please, read this guide as a whole first, as this can't be done step by step!
**Please!** donate to **[letsencrypt](https://letsencrypt.org)** for their incredible service, if you use it.

> #### Important/Update
> **heroku offers automated certificate management ([acm](https://devcenter.heroku.com/articles/automated-certificate-management)) for free with paid dynos**


* install [certbot](https://certbot.eff.org) `brew install certbot`


* set up your app in heroku
    * running on a hobby dyno at least
    * Custom domains set up and running


* modify your controller (in this example `pages_controller.rb` - make sure your setting correspond with the following route settings)
    ``` ruby
    def letsencrypt
      # second-part-of-string-random-characters
      # will be a key that certbot / letsencrypt create for you
      # you need to replace "second-part-of-string-random-characters" later
      render text: "#{params[:id]}.second-part-of-string-random-characters"
    end
    ```


* add a route for your rails app in `routes.rb`
  ``` ruby
  # Let’s encrypt
  get '/.well-known/acme-challenge/:id' => 'pages#letsencrypt'
  ```


* run certbot:

  ```
  sudo certbot certonly --manual
  ```

  the program will guide you through the setup, it needs your primary and valid contact email and urls (with and without "www").

  **Certbot** will ultimately present you a key. It will probably look like this.
  ```
  120EgkFYSSYCvSQw3TNiUolJg_mOEl5RbKsO3oNbM7U.dfzRfvDOCKOH-QqfuudgpTf-mty5h13wZTRlIIp5Kax
  ```
  **Look for the "."** in the middle.
  **Copy the part of the key after the dot and replace** _second-part-of-string-random-characters_ in your controller method for letsencrypt (see above).

  **DO NOT CONTINUE WITH CERTBOT!**

* your app is now set up properly, please **push your app to heroku**

* after your updated app is online, continue with certbot and finish the process, the certificate and all keys will be generated for you under:
  `/etc/letsencrypt/live/<your.domain>/`

* Now all what's left to do, is pushing the keys to heroku for your app. Fire up a new terminal, replace `<your.domain>` and `<your-app>` in the following line according to your setup:
  ```
  $ sudo heroku _certs:add /etc/letsencrypt/live/<your.domain>/fullchain.pem /etc/letsencrypt/live/<your.domain>/privkey.pem — app <your-app>
  ```

# Finished
I do not need automation for this process, refreshing the certificate every 3 months is fine for me.
One more time: **Please** do not forget to donate to **[letsencrypt](https://letsencrypt.org)** for their incredible service.

**More on this:**

[Tomáš Vestenický on Medium - "How to set up SSL with Let’s Encrypt on Heroku for free"](https://medium.com/should-designers-code/how-to-set-up-ssl-with-lets-encrypt-on-heroku-for-free-266c185630db#.glxy3pum9)

[linode: Install Let’s Encrypt to Create SSL Certificates](https://www.linode.com/docs/security/ssl/install-lets-encrypt-to-create-ssl-certificates)


# Bonus
In case you want your staging app not to enforce SSL:
* setup a environment variable on heroku for your production app e.g. `FORCE_SSL = true` and edit your app's `production.rb` to:
  ```
  config.force_ssl = true if ENV['FORCE_SSL'] == true
  ```
