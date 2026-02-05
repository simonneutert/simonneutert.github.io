+++
layout = "post"
title = "Install and run Docker on a Raspberry Pi"
categories = ["RaspberryPi"]
tags = ["Raspberry", "docker"]
description = "let the whales sing"
+++

I installed a fresh copy of Raspbian (2018-03-13-raspbian-stretch.img) and added
an empty file named **ssh** to the root of the SD to enable ssh by default.

Fire up the Pi connect to your network via cable, then ssh into it and set a new
password with

`$ sudo raspi-config`, config the rest and reboot.

## Install Docker

`$ sudo apt update && sudo apt upgrade`

`$ curl -sSL https://get.docker.com | sh`

After a succesful installation, Docker prints:

```text
If you would like to use Docker as a non-root user, you should now consider
adding your user to the "docker" group with something like:

  sudo usermod -aG docker pi

Remember that you will have to log out and back in for this to take effect!

WARNING: Adding a user to the "docker" group will grant the ability to run
         containers which can be used to obtain root privileges on the
         docker host.
         Refer to https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface
         for more information.
```

So, you need to `$ sudo usermod -aG docker pi` (as long as pi is your current
username) and **reboot**.

In my case Docker service starts by default, if your's doesn't then:

`$ sudo systemctl enable docker` and cold start Docker daemon

`$ sudo systemctl start docker`.

## Install Docker Compose

`$ sudo pip install docker-compose` that's it, that's all :-)

## A word on Architectures

**ARM vs x86**

Do not forget to use packages/containers/builds that support both architectures
in order to run platform independent.
