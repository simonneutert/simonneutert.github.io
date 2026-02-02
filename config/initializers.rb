Bridgetown.configure do |_config|
  init :"bridgetown-feed"

  url '' # the base hostname & protocol for your site, e.g. https://example.com

  permalink 'pretty'
  template_engine 'serbea'
  timezone 'Europe/Berlin'

  collections do
    # Old posts collection to handle legacy URLs
    oldposts do
      output true
      permalink '/:year/:slug/'
    end

    posts do
      permalink '/:year/:month/:day/:slug/'
      redirect_from '/:year/:slug/'
    end
  end
end
