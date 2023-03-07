---
layout: post
title: Install Python 3.6 on a Raspberry Pi 2 or 3
categories: [python, RaspberryPi]
tags: [python, iot, raspberrypi]
description: Make a Python worker node
---

I usually use Raspbian Lite.
SSH is turned off by default, so I `touch ssh` in the boot directory of the SD after flashing.

I then `sudo apt update && sudo apt upgrade` before running this line by line:

```bash
sudo apt-get install libssl-dev
wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tgz
tar xzvf Python-3.6.4.tgz
cd Python-3.6.4/
./configure
make -j4
sudo make install
python3.6 -m pip install --upgrade pip
python3.6 -m pip install --user pandas
```

[pip user installs](https://pip.pypa.io/en/stable/user_guide/#user-installs)
