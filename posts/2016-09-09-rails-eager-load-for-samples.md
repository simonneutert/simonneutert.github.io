+++
title = "Eager Load for Samples of Data to Count Relations in Rails"
+++

Sometimes you might want to load samples (shuffled) of a related model that
matches certain criteria. For hitchi.de I wanted to display all Cities that have
offers in the next to days. In order to limit the query load I used Rails'
[includes() method](http://apidock.com/rails/ActiveRecord/QueryMethods/includes)
and hacked it a little to best match my needs.

If you need to count relations more often or you can expect your data to be
huge, better make use of Rails' built-in
[:counter_cache](http://guides.rubyonrails.org/association_basics.html#belongs-to-association-reference)

```ruby
def quickclick
  # grab all related departures from Offer
  # Offer belongs to Departure
  # Departure has many Offers
  # use only Offer.departure_id (using "pluck()")
  @tomorrowsrides = Offer.includes(:departure).where(seek: false).where("departuredate < ?", (Date.current + 3.days)).pluck(:departure_id)

  # this spits out an array with the mathing ids of Departure

  # to make use of this, I first check their uniqueness
  # then shuffle the array and grab the first 20 values
  @tomorrowsrides = @tomorrowsrides.uniq.shuffle.first(20)

  # I can now load 20 shuffled samples from the related model

  @tomorrowsrides = Departure.where(id: @tomorrowsrides).includes(:offers).shuffle

  # In the view I was then able to run
  # a low profile count operation on the objects

end
```
