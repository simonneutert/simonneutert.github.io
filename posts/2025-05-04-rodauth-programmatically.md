+++
title = "Using Rodauth Programmatically"
layout = "post"
+++

### Programmatically Delete User Accounts in Rodauth

When working with user accounts, there's often a need to go beyond what's
exposed in the UI. Maybe you're debugging a staging environment. Maybe you're
implementing a GDPR "Right to be Forgotten" flow. Or maybe you're just tired of
clicking through modals. Either way, being able to manage Rodauth accounts
programmatically is a useful capability to have in your toolbox. See the
official
[Rodauth documentation](https://rodauth.jeremyevans.net/rdoc/files/README_rdoc.html#label-Using+Rodauth+as+a+Library)
for more details.

Here’s a practical example: deleting a user account and cleaning up related data
from the database—fully programmatically, with Rodauth at the helm.

## The Task: Delete an Account

Let’s start with the Rake task:

```ruby
desc 'Delete user account and all related data, usage example: rake "delete_account[demo@test.test]"'
task :delete_account, [:email] do |_t, args| # rubocop:disable Metrics/BlockLength
  require 'rodauth'
  DB.transaction do # rubocop:disable Metrics/BlockLength
    rodauth = Rodauth.lib do
      enable :close_account
      delete_account_on_close? true
    end

    account = DB[:accounts].where(email: args[:email]).first
    account_id = account[:id]
    account_status_id = account[:status_id]
    account_with_profile = account_status_id > 1
    raise "Account with email #{args[:email]} not found" unless account_id

    puts "Account with id #{account_id} and status_id #{account_status_id} found"
    profile = DB[:profiles].where(account_id: account_id).first

    profile_id = nil
    if account_with_profile
      profile_id = profile[:id]
      puts "Deleting profile with id #{profile_id}"
    else
      puts "No profile found for account with id: #{account_id}, status_id: #{account_status_id}"
    end

    puts 'Deleting in 3.. 2.. 1..'
    sleep 3

    rodauth_system = rodauth.new(DB) # init with DB connection as scope
    rodauth_system.account_from_id(account_id) # load account
    rodauth_system.close_account # close account
    DB[:account_remember_keys].where(id: account_id).delete # delete table: account_remember_keys
    DB[:account_verification_keys].where(id: account_id).delete # delete table: account_verification_keys
    rodauth_system.delete_account # delete account

    if account_with_profile # if account has a profile, or some other related data
      DB[:activities].where(profile_id: profile_id).delete
      DB[:import_logs].where(profile_id: profile_id).delete
      DB[:profiles].where(account_id: account_id).delete
    end
  rescue StandardError => e
    puts "Error deleting account: #{e.message}"
  end
end
```

## What’s Going On Here?

This Rake task does the job of a full account teardown. Here's a breakdown of
the key steps:

### 1. Load Rodauth in a System Context

```ruby
rodauth = Rodauth.lib do
  enable :close_account
  delete_account_on_close? true
end
```

We're setting up a Rodauth instance outside of a request context. By using
`Rodauth.lib`, you can configure a system-level Rodauth object to interact with
your accounts programmatically—perfect for background jobs or rake tasks like
this.

### 2. Look Up the Account

```ruby
account = DB[:accounts].where(email: args[:email]).first
```

We locate the user by email and bail early if no match is found. Bonus points
for verifying the account has a "profile" before diving into deletes—useful when
your app distinguishes between signed-up and fully onboarded users.

### 3. Close the Account via Rodauth

```ruby
rodauth_system = rodauth.new(DB)
rodauth_system.account_from_id(account_id)
rodauth_system.close_account
```

This is where Rodauth does what it does best. We signal the account should be
closed, and then optionally follow up with any cleanup like:

```ruby
rodauth_system.delete_account
```

The `delete_account` method ensures Rodauth’s internal bookkeeping is respected.
Think session tokens, remember keys, verification keys—you want these cleared
too.

### 4. Clean Up App-Specific Data

If the account has associated domain-specific records (like a user profile,
activities, or import logs), they’re scrubbed here:

```ruby
DB[:profiles].where(account_id: account_id).delete
DB[:activities].where(profile_id: profile_id).delete
```

This is where you plug in your own application logic to go beyond what Rodauth
manages by default.

## A Note on Transactions

The entire operation is wrapped in a `DB.transaction` block. That means if
something fails midway—say, the Rodauth call throws an exception—your database
state stays clean. Nothing’s half-deleted.

## Add a Countdown for Drama (Optional)

```ruby
puts 'Deleting in 3.. 2.. 1..'
sleep 3
```

Totally optional. Totally satisfying.

## Why This Matters

Rodauth is designed to give you fine-grained control. While its plugins work out
of the box in a request/response cycle, it’s also built to scale beyond it. By
using `Rodauth.lib`, you gain a CLI-friendly, background-job-ready interface
that plays well with whatever admin or automation scripts you need.

This pattern isn’t just for deleting users. You can use it to reset passwords,
verify accounts, revoke sessions—anything Rodauth supports.

## Final Thoughts

If you’re building serious Ruby (Rails) applications and need secure, flexible
auth, Rodauth is a solid choice. And once you're ready to automate more of your
user management, you’ll be glad it supports this kind of programmatic interface.
