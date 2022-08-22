---
published: false
title: Manage Postgres Materialized Views with sequel 🚀
layout: post
---

Rails/ActiveRecord needs something like [Scenic](https://github.com/scenic-views/scenic).

Save the following files, then `bundle install` and

`$ pry -I . -r main.rb`

and try with what you have 🥳  
(it's `DB`, the Sequel Docs, the methods around `..._materialized_view`)

```ruby
# main.rb
require 'rubygems'
require 'bundler'
Bundler.require

db_connection = 'postgres://postgres:postgres@localhost/mat_view_local_test'
DB = Sequel.connect(db_connection)

begin
  DB.create_table :items do
    primary_key :id
    String :name, unique: true, null: false
    TrueClass :active, default: true
    DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP, index: true
    DateTime :updated_at, default: Sequel::CURRENT_TIMESTAMP, index: true

    index [:active]
  end
rescue StandardError => e
  puts e
end

class Item < Sequel::Model
  # https://sequel.jeremyevans.net/rdoc/files/doc/object_model_rdoc.html#label-Sequel-3A-3AModel
end

# http://sequel.jeremyevans.net/rdoc-plugins/classes/Sequel/Plugins/Timestamps.html
Item.plugin :timestamps, update_on_create: true


def create_materialized_view
  begin
    DB.create_view(:active_items, DB[:items].where(active: true), materialized: true)
    DB.add_index(:active_items, :name, unique: true)
  rescue StandardError => e
    puts e
  end
end

def drop_materialized_view
  DB.drop_view(:active_items, materialized: true)
end

def refresh_materialized_view(concurrently = true)
  DB.refresh_view(:active_items, concurrently:)
end
```

### Dependencies

Here's your `Gemfile`:

```ruby
# Gemfile
source 'https://rubygems.org'

gem 'sequel_pg', '~> 1.15', require: 'sequel'

group :development do
  gem 'debug', '~> 1.6'
  gem 'reek', '~> 6.1'
  gem 'rubocop', '~> 1.35'
  gem 'solargraph', '~> 0.45.0'
end
```

### Problems installing pg related stuff on a Mac?

Use [Postgres.app](https://postgresapp.com) and then:

`$ gem install pg -v '1.4.3' -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/latest/bin/pg_config `

`$ gem install sequel_pg -v '1.15.0' -- --with-pg-dir=/Applications/Postgres.app/Contents/Versions/latest/`

Replace the versions with what you need. `$ bundle install` AGAIN!
