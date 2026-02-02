---
layout: post
title: Cluster Computing with some Raspberry Pis
categories: [python, RaspberryPi]
tags: [python, iot, raspberrypi]
description: Make a Python worker node
---

__Please, skim the whole article first, at least read the headers. Work your way through, step by step, reading the next chapter once before you continue :)__

**What you need:**

* two or more Raspberry Pis + SD Cards + Power + Ethernet Cables

* a Router and/or a Switch

## Preparing a Master Image

Current Raspbian (2017-11) ships with Python 3.5. All we need to do now, is set up an [MPI](https://de.wikipedia.org/wiki/Message_Passing_Interface). [Download Raspbian](https://www.raspberrypi.org/downloads/raspbian/)

Set some time aside for the following - if concurrency isn't your thing and you need to sit in front of your screen ;-) (a quality, class 10 SD card can plough through the setup process)

* __Setup a fresh SD with Raspbian Lite.__

  when finished, enable SSH by navigate to the SD and add a plain file called `ssh`.

* boot and ssh into your Raspberry Pi

  * `$ sudo apt update && sudo apt upgrade`

  * `$ sudo raspi-config` set localization and stuff if you want

  * optional/fyi: limiting the dumped image size when using dd can be done by passing the __count__ argument.

    `dd`: limit image size with `count=3700`__.

    In my case dumping looks like: ([how to backup your Raspberry Pi](https://www.raspberrypi.org/documentation/linux/filesystem/backup.md)):

    `sudo dd bs=1m if=/dev/rdiskX of=RaspbianLitePresetImageDE_8GB_PiMaster.img count=3700`

  * __Install mpich and python3-dev__

    * `$ sudo apt update && sudo apt upgrade && sudo reboot now`

    * `$ sudo apt-get install libssl-dev libcr-dev python3-dev python3-pip mpich libatlas-base-dev libatlas-dev libatlas3-base cython && sudo apt update --fix-missing && sudo reboot now`

  * __Download the mpi4py package and unpack.__

    * `$ wget https://bitbucket.org/mpi4py/mpi4py/downloads/mpi4py-3.0.0.tar.gz`

    * if the download link is broken google ([this: mpi4py source](http://lmgtfy.com/?q=mpi4py+source))

    * `$ tar zxf mpi4py-3.0.0.tar.gz`

    * `$ cd mpi4py-3.0.0/`

    * `$ sudo python3 setup.py build --mpicc=/usr/bin/mpicc`

    * `$ sudo python3 setup.py install`

  * __Add Pandas. It's more fun with Pandas. Pandas brings Numpy.__

    * `$ python3 -m pip install --user pandas && sudo reboot now`

  * set a new password, so your cluster will be protected and has the same one over all:

    `$ passwd`

## Cloning

* shutdown and clone the SD Card to your workstation ([help](https://www.raspberrypi.org/documentation/linux/filesystem/backup.md))

* load the image to a second SD card, then cable up and boot both Raspberry Pis

## Master

__ssh into one of the Pi - this will be your master node from now on.__

  * change hostname from raspberrypi to pimaster: `$ sudo nano /etc/hostname`

  * reboot, reconnect (with new hostname)

  * create an ssh key without password (default path, no password)

    `$ ssh-keygen -t rsa -b 4096`

  * copy your public key `$ cat ~/.ssh/id_rsa.pub` and save it temporarily in a word file on your workstation

  * optional: shutdown and backup SD card (you might need to replace your master when something breaks)

## Slave/Node

__ssh into your slave machine__

  * `$ mkdir .ssh`

  * paste your master's public keys into `/home/pi/.ssh/authorized_keys`:

    `$ nano .ssh/autorized_keys`

  * change hostname to pinode00

    `$ sudo nano /etc/hostname`

  * shutdown and backup SD card, as this is the "master clone" for all nodes/slaves to come

  * put the SD back in the Slave Raspberry and boot up

  * change hostname to pinode01

    `$ sudo nano /etc/hostname`

## Connect Master and Slave

ssh to master then run `$ ssh pi@pinode01` making the machines known to each other

## Adding Nodes

You can add further slaves, using the node image you created earlier. Be sure to add the nodes one by one.

* ssh into master, and from there ssh to pi@pinode00

* rename your new slave's hostname from pinode00 to the next number that makes sense :-)

  `$ sudo nano /etc/hostname`

* reboot slave

## Run Your Cluster

to utilize all members of the cluster, ssh to your master and add a hostfile to the directory your script is in, looking like this for one master and one slave:

``` bash
# content of hostfile
pimaster
pinode01

# add all cluster member with their hostname
```

## Demo / Test

* navigate to `/home/pi/mpi4py-3.0.0/demo` on your master

* create your hostfile (as above)

* `$ mpiexec --hostfile hostfile python3 helloworld.py`

__all your nodes should say hello :D__

## Errors / Help / Network

If mpiexec throws proxy or connection errors, you might need to check your router for duplicate hostnames in its network settings. This caused major hickups in my run network (AVM Fritz Box 7490).
