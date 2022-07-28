---
layout: post
title: A simple and easy NodeJS Telegram bot
categories: [node, javascript, telegram, bot]
tags: [js]
description: Bots. For. Human. Happiness.
---

Bots, they are everywhere, right? Why not have a bot, that's doing some fancy work for you?

Telegrams 'BotFather' is the way to get you started: [see the docs](https://core.telegram.org/bots#6-botfather)

It is as easy as open telegram, search @botfather and send him `/newbot` as a message, few more steps like naming aaaand boom - bot is up!

__DISCLAIMER__ The following code is a quick and dirty solution! It is simply sending me memes from subreddit 'ProgrammerHumor'.  
Checkout my [reddit-api-image-getter](https://www.npmjs.com/package/reddit-api-image-getter) package on npm.

Want to know what [telegraf](https://github.com/telegraf/telegraf/blob/develop/docs/examples/media-bot.js) does?  
Telegraf does not explicitely tell, but adding a caption to a photo is added in the code example below.

All what's left to do now is create a new Node project:

``` bash
$ mkdir reddit-image-telegraf && cd reddit-image-telegraf
$ yarn init
$ yarn add telegraf reddit-api-image-getter@1.0.5 select-random-file
```

~~~ javascript
// content of your entrypoint file, usually index.js

const fs = require('fs')
const path = require('path')
const randomFile = require('select-random-file')
const Telegraf = require('telegraf')

// use the key Botfather gave you here
const bot = new Telegraf('YOUR-SECRET-TOKEN')

const redditApiImageGetter = require('reddit-api-image-getter')
getter = new redditApiImageGetter()

bot.start((ctx) => ctx.reply('This is here to make me happy.'))

bot.command('makemehappy', (ctx) => {
  // limit to your own chat.id 
  // (you can get it by using a debugger and inspecting ctx object)
  // use a telegraf middleware for limiting if you are really fancy
  //
  // if you do not need limitation, drop the conditional!
  if (ctx.chat.id != 00013370001) {
    ctx.reply('Your ID is not whitelisted, I am sorry. Not sorry!')
  } else {
    const channelOrders = ['hot', 'top']
    const hotOrTop = channelOrders[Math.floor(Math.random() * channelOrders.length)];
    const dir = path.resolve(__dirname, 'images', hotOrTop, 'ProgrammerHumor')
    randomFile(dir, (err, file) => {
      console.log(`The random file is: ${file}.`)
      const pathToFile = path.resolve(dir, file)
      ctx.replyWithPhoto({
        source: fs.readFileSync(pathToFile)
      },
      {caption: 'Send with telegraf bot'}) // add a caption/text to your media (< 1024 signs)
    })
  }
})

bot.command('refresh', function (ctx) {
  // limit to your own chat.id 
  // (you can get it by using a debugger and inspecting ctx object)
  // use a telegraf middleware for limiting if you are really fancy
  //
  // if you do not need limitation, drop the conditional!
  if (ctx.chat.id != 00013370001) {
    ctx.reply('Your ID is not whitelisted, I am sorry. Not sorry!')
  } else {
    // gets hot images
    getter.getHotImagesOfSubReddit('ProgrammerHumor').then(function (result) {
      for (let imageEntry of result) {
        console.log(`top ${imageEntry.formattedFilename}`)
        getter.saveRedditImageEntryToDisk(imageEntry, path.resolve(__dirname, 'images', 'hot'))
      }
      ctx.reply('refreshed hot images')
    }).catch(function (error) {
      console.log(error)
    })
    // gets top images
    getter.getTopImagesOfSubReddit('ProgrammerHumor').then(function (result) {
      for (let imageEntry of result) {
        console.log(`top ${imageEntry.formattedFilename}`)
        getter.saveRedditImageEntryToDisk(imageEntry, path.resolve(__dirname, 'images', 'top'))
      }
      ctx.reply('refreshed top images')
    }).catch(function (error) {
      console.log(error)
    })
  }
})

bot.launch()
~~~

### Run

~~~ bash
$ node index.js
~~~

Grab your phone, start your bot and send `/refresh` watch the picture pop up on your filesystem, then send `/makemehappy` and have a laugh.

Send me a message on telegram and chat with me, best let me know what kind of bot you brought to life: [https://t.me/simonneutert](https://t.me/simonneutert)