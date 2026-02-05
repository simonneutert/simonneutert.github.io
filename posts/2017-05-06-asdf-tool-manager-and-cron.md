+++
layout = "post"
title = "Setup a Sinatra App on your Raspberry Pi and autostart the app using asdf and cron"
categories = ["ruby", "RaspberryPi"]
tags = ["ruby", "sinatra", "asdf", "RaspberryPi", "cron"]
description = "Setup up a raspberry to host your sinatra app"
+++

This isn't a full tutorial-style write up. Please, consult google for help with
any of the following steps.

1. Grab a fresh copy of
   [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/) and `dd` it
   on your SD Card

```bash
sudo dd bs=1m if=path/to/raspbian.img of=/dev/rdiskX
```

2. Once the copying is finished add a file named **ssh** (no ending) to the root
   directory of the created sd card.
   [Here, see 3rd.](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md)

3. Now add all the glory goodness a webmachine could dream of ;-)

```bash
sudo apt-get install -y build-essential autoconf libncurses5-dev libncursesw5-dev libwxgtk2.8-dev libgl1-mesa-dev libglu1-mesa-dev libpng3 libssh-dev unixodbc-dev libpq-dev libcurl4-openssl-dev libreadline-dev gcc automake make libssl-dev libncurses-dev libyaml-dev libxslt-dev libffi-dev libtool git zlib1g-dev libbz2-dev libsqlite3-dev wget curl llvm xz-utils tk-dev m4
```

4. Install [asdf](https://github.com/asdf-vm/asdf) with plugins

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.3.0
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bashrc
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc

asdf plugin-add ruby https://github.com/asdf-vm/asdf-ruby.git

asdf plugin-add postgres https://github.com/smashedtoatoms/asdf-postgres.git

asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring
```

5. install ruby, postgres and node to get rails ready to roll

_prepare yourself for some loooong running jobs..._

_-> grind coffee, filter water, brew coffee, enjoy your coffee - **but keep that
ssh session open!**_

```bash
# choose your versions
asdf install ruby 2.3.4
asdf install postgres 9.6.1
asdf install node 7.9

# set them up
asdf global ruby 2.3.4
asdf global postgres 9.6.1
asdf global node 7.9
```

6. Setup the `pg gem` with this command (vary Versions if necessary):

```bash
gem install pg -v '0.20.0' -- --with-pg-config=/home/pi/.asdf/installs/postgres/9.6.1/bin/pg_config
```

and start the server in a new ssh session with

```bash
pg_ctl start
```

7. git clone
   [Sinatras Skeleton](https://github.com/simonneutert/sinatras-skeleton) and
   run the basic setup (bundle and rake tasks)

```bash
# in /home/pi
mkdir www
cd www
git clone https://github.com/simonneutert/sinatras-skeleton
```

8. setup a bash startup script and add a cronjob

add this skript named `start_sinatra.sh` in `/home/pi/www/sinatras-skeleton`:

```bash
#!/bin/bash
HOME=/home/pi
LOGNAME=pi
LANG=en_US.UTF-8
SHELL=/bin/bash
source $HOME/.profile
cd /home/pi/www/sinatras-skeleton
$HOME/.asdf/shims/pg_ctl start
. $HOME/.asdf/asdf.sh
thin start
```

then `chmod +x start_sinatra.sh`

9. start Postgres and Sinatra at reboot of your Raspberry Pi with a cron job:

```bash
crontab -e
```

add this - **do not** forget to add an empty line at the bottom.

```bash
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

@reboot /bin/bash /home/pi/www/sinatras-skeleton/start_sinatra.sh &
```

10. Reboot your pi and visit the app from your workstation's browser:
    `http://raspberrypi:3000`

Test on a RPi3 running `2017-04-10-raspbian-jessie-lite`. I used the ethernet
port, because the built in Wifi didn't respond reliably.
