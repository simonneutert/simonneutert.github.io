---
layout: post
title: Using class_eval
categories: [ruby]
tags: [ruby]
description: Modify objects, by assigning new attributes
fullview: false
---

Sometimes it is quite handy to add some helping attributes or instance methods to an object, i.e. for calculation purposes. This code snip is stripped and is mainly for demonstrating a use case.

``` ruby
@units = Unit.all

def calc_units_empty_not_empty_time
        @units.each do |unit|
            unit.class_eval do
                # Adding two extra attributes to the model Unit
                attr_accessor :time_empty_in_period
                attr_accessor :time_not_empty_in_period
            end
            period_tenants = get_period_tenants(unit)
            time_with_tenants = 0
            period_tenants.each do |tenant|
                time_with_tenants += calc_tenants_time_span_in_period(tenant) if tenant
            end
            unit.time_empty_in_period = (period_duration - time_with_tenants).to_i
            unit.time_not_empty_in_period = time_with_tenants
        end
    end
```

Important! These two new attributes are __not__ permanent and bound to the instance(s) you call `class_eval` on.
