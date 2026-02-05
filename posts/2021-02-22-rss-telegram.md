+++
layout = "post"
title = "Telegram RSS Feed"
categories = ["javascript"]
tags = ["rss"]
description = "telegram does it all"
+++

What is the cheapest way to make a bot send me rss feed news on telegram?

If you wonder how to setup bots on telegram. They have @botfather, he will help
you.

## npm dependencies

- "rss-parser": "^3.9.0",
- "sequelize": "^6.3.5",
- "sqlite3": "^5.0.0",
- "telegraf": "^3.38.0"

```javascript
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  // The `host` parameter is required for other databases
  // host: 'localhost'
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Article = sequelize.define("Article", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  contentSnippet: DataTypes.TEXT,
  creator: DataTypes.STRING,
  guid: {
    type: DataTypes.STRING,
    unique: true,
  },
  link: DataTypes.STRING,
});

// sequelize.sync({ force: true }) will be useful if you need to start from scratch
sequelize
  .sync()
  .then(() => {});

const { Telegraf } = require("telegraf");
const Parser = require("rss-parser");

const bot = new Telegraf(YOUR - TELEGRAM - BOT - KEY);
const parser = new Parser();
const rssUrl = "https://www.sensor-magazin.de/feed/";
const telegramChannel = "@sensormainz_inoffiziell"(async () => {
  const feed = await parser.parseURL(rssUrl);
  feed.items.forEach((item) => {
    Article.create({
      title: item.title,
      content: item.content,
      contentSnippet: item.contentSnippet,
      creator: item.creator,
      guid: item.guid,
      link: item.link,
    })
      .then(function (item) {
        bot.telegram
          .sendMessage(telegramChannel, item.link)
          .then((_msg) => {
            console.log(item.link);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  });
})();
```
