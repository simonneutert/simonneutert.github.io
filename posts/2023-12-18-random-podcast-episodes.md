+++
layout = "post"
title = "Elevate Your Podcast Experience: Using Apple Shortcuts to Play Random Episodes (and NGINX)"
+++

Podcasts have become an integral part of my daily routine, and accessing them
seamlessly is crucial for a smooth listening experience. In this guide, I'll
explore how you can leverage Nginx to offer a JSON file containing links to
podcast episodes.

Additionally, I'll demonstrate how iPhone users can use the Shortcuts app to
load the JSON file, extract a random entry, and open the URL for their preferred
podcast service.

## The following is one of many ways / tldr

It's up to you as a user or the podcaster to host your episodes in a way that
allows you to access them via a JSON file. Then load this via the **Shortcut**
app and use the **Get Dictionary Value** action to extract a random entry from
the JSON file. Finally, use the **Open URLs** action to open the URL in your
preferred podcast app.

**The following code will be pseudo code and just guide you a little.**

### Setting Up Nginx to Serve JSON

Nginx is a powerful web server that can be used to serve static files, including
JSON. Here's a quick example of an Nginx configuration to serve a podcast.json
file:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /podcasts {
        alias /path/to/your/json/files;
        index podcast.json;
    }
}
```

Replace yourdomain.com with your actual domain and adjust the path accordingly.
Make sure the JSON file contains an array of podcast entries, each with a title
and url pointing to the podcast episode.

### Creating the Podcast JSON File

Here's an example of how your podcast.json file might look:

```json
[
  {
    "title": "Podcast Episode 1",
    "url": "https://spotify.com/episode1"
  },
  {
    "title": "Podcast Episode 2",
    "url": "https://applepodcasts.com/episode2"
  }
  // Add more entries as needed
]
```

An Array of objects.

#### Using Shortcuts on iPhone

1. Get the [Shortcuts app](https://apps.apple.com/us/app/shortcuts/id915249334)
   from the App Store.
2. Setup a new shortcut

Then, add the following actions to your shortcut:

1. Get contents of `https://yourdomain.com/podcasts/podcast.json`
2. Get `Random Item` from `Get Contents of URL`
3. Get `Dictionary` from `Item from List`
4. Get `Random Item` from `Dictionary`
5. Get `Value` for `your-key-in-the-json` from `Dictionary`
6. Open `Dictionary Value`

---

<style>
#shuffle-gag-screenshot {
    max-width: 90%;
    height: auto;
    max-height: 480px;
}
</style>
<img src="/images/2023/shuffle-gag.jpeg" id="shuffle-gag-screenshot" alt="Shortcuts App showing an example workflow to load and extract a sample podcast from an array of dictionaries"/>

Tada 🥳🪄✨
