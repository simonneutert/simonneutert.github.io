+++
title = "Passwordless restart of systemd services"
layout = "post"
+++

Before anything else, you need to edit the rights, do this as your sudo/admin
user:

```bash
$ sudo EDITOR=vim visudo
```

Adapt the line to your needs, first is the user, you want to give the
passwordless permission to restart the service, last entry of the line is the
name of the service.

```text
# allow deployuser to restart the web services without needing a password
deployuser ALL=(ALL) NOPASSWD: /bin/systemctl restart myapponsystemd-worker.service
deployuser ALL=(ALL) NOPASSWD: /bin/systemctl restart myapponsystemd.service
```

Then log into your VPS/Server as your deployuser and restart your app 🚀

```bash
$ sudo systemctl restart myapponsystemd.service
```

Source on YouTube [@Dreams of Code](https://www.youtube.com/watch?v=DmbBgXK8M5M)
