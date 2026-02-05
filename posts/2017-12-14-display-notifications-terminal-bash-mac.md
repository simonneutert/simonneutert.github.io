+++
layout = "post"
title = "Pop a Display Notification from a Bash Script on Mac"
categories = ["mac"]
tags = ["coding", "git", "shell", "terminal", "bash"]
description = "Pop a Display Notification from a Bash Script on Mac"
+++

Thanks to AppleScript, this is done so easily. Take this example:

```bash
#!/bin/bash
user="username"
host="mywebsite.de"
port=22
site_folder="_site"
remote_folder="/httpdocs/mysite/"

scp -P $port -r ${site_folder}/* ${user}@${host}:${remote_folder}
# after copying a popup let's you know :-)
osascript -e 'display notification "Please proceed." with title "Upload finished!"'
```
