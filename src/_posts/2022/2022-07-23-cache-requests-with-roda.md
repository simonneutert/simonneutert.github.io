---
title: Caching requests in Roda using etags
layout: post
---

This short post describes how using SHA1 Hashing for etags can be used.

> Both last_modified or etag will immediately halt processing if there have been no modifications since the last time the client requested the resource, assuming the client uses the appropriate HTTP 1.1 request headers.

[Roda Plugin: Caching Documentation](https://roda.jeremyevans.net/rdoc/classes/Roda/RodaPlugins/Caching.html)

```ruby
r.on(param!: 'filter') do |filter|
  unless filter.nil? || filter == 'startedhome' || filter == 'finishedhome' || filter == 'startedandfinishedhome'
    r.halt # abort early, stops users from fiddling around
  end

  # where the magic happens 🔥 and the cache is set/matched
  r.etag cache_etag(user)

  polylines = nil
  user_db.connect(:user_strava_activities) do |ds|
    filter_query = 
      ApiV1Filters::HomeTileFilterPolyline.new.apply_home_tile_filter(ds, filter)

    activity_types = 
      ApiV1Filters::ActivityType.new.identify_activity_type(r.params['activity_type'])

    filter_query = get_with_activity_type(ds: filter_query, activity_types:)
    polylines = filter_query.all
  end

  return polylines
end
```

In the implementation, a user's gps polylines only change after importing new data. Then, a new leaderboard is being calculated, which touches a user's `updated_at` attribute when finished, resulting in a changed SHA1 Hashing. 

```ruby
def cache_etag(user)
  minified_user_data = { user_id: user.id,
                          strava_user_id: user.strava_user_id,
                          updated_at: user.updated_at }
  
  Digest::SHA1.hexdigest(Oj.dump(minified_user_data))
end
```
