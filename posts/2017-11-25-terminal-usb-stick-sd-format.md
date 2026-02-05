+++
layout = "post"
title = "Format USB-Stick from Terminal in Mac OS X"
categories = ["mac", "terminal"]
tags = ["terminal", "usb", "sd", "format"]
description = "Format USB-Stick from Terminal in Mac OS X"
+++

Fire up a terminal.

```bash
diskutil list
```

Read the output carefully. You sure will identify the right device
**/dev/diskX**, where **X** corresponds to the number of the device on your
system. Then format it to FAT32 by typing:

```bash
sudo diskutil eraseDisk FAT32 MYUSBDRIVENAME MBRFormat /dev/diskX
```

Easy as Pie :-)
