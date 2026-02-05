+++
title = "Combine two ActiveRecord::Relation objects"
+++

Read more in the
[Ruby documentation](http://ruby-doc.org/core-1.9.3/Hash.html#method-i-merge).

#### Okay let's get to work:

_**merge(other_hash) → new_hash**_

```ruby
h1 = { "a" => 100, "b" => 200 }
h2 = { "b" => 254, "c" => 300 }
h1.merge(h2)   #=> {"a"=>100, "b"=>254, "c"=>300}
```

in this case:

> Returns a new hash containing the contents of h2 and the contents of h1. If no
> block is specified, the value for entries with duplicate keys will be that of
> h2.

#### Of course Ruby allows you to use blocks

in this case:

> Otherwise the value for each duplicate key is determined by calling the block
> with the key, its value in h1 and its value in h2.

```ruby
h1 = { "a" => 100, "b" => 200 }
h2 = { "b" => 254, "c" => 300 }

h1.merge(h2){|key, oldval, newval| newval - oldval}
# the operated block is of "key, oldval, newval"
# so, for a nothing changes
# b is 254 - 200 => 54
# c is untouched
#=> {"a"=>100, "b"=>54,  "c"=>300}
```

### What is that for in real (internet) life?

I use it in ActiveRecord Relations for building objects.

```ruby
# subgroups_controller.rb
# this requires nested routes
private
  def subgroup_params
    params.require(:subgroup)
      .permit(:name, :description, :image, :project_id, :group_id)
      .merge(project_id: @project.id, group_id: @group.id)
  end
```

more about
[nested routes](http://guides.rubyonrails.org/routing.html#nested-resources)
