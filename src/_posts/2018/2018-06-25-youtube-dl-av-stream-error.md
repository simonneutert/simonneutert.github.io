---
layout: post
title: "youtube-dl 'ERROR: av_interleaved_write_frame(): Invalid argument'"
categories: [bash]
tags: [media]
description: fix that file
---
When the famous youtube-dl stumbles, because of something like this:

```
ERROR: av_interleaved_write_frame(): Invalid argument
```

Then brew some:

```
$ brew install libav

$ brew install ffmpeg
```

Then try downloading again and add `--prefer-ffmpeg`

You are welcome.
