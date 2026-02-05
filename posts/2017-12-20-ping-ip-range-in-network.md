+++
layout = "post"
title = "Find all devices in network"
categories = ["network"]
tags = ["terminal", "usb", "sd", "format"]
description = "Gotta find em all!"
+++

Do not try, just say hi :)

for linux users

```bash
# ping then show
$ for i in {1..254} ;do (ping 192.168.178.$i -c 1 -w 5  >/dev/null && echo "192.168.1.$i" &) ;done
$ arp -a | grep -v "?"
```
