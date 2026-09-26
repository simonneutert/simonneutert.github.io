# SilverBullet: Upload Documents Larger Than 10 MiB

I recently stumbled over a slightly confusing limitation in
[SilverBullet](https://silverbullet.md/): uploading larger documents worked
using the **Upload: File** command, but dragging and dropping the very same file
into the editor resulted in:

```text
Document is too large, maximum is 10MiB
```

Turns out: this wasn't my configuration. It was a bug. 🤓

#### TLDR

To allow e.g. documents up to **100 MiB**, add this to your SilverBullet
`CONFIG` page:

```space-lua
config.set("maximumDocumentSize", 100)
```

And make sure you're running a SilverBullet version containing the fix from
`silverbulletmd/silverbullet#2159`.

At the time of writing, that means using the `edge` Docker image.

## The Problem

SilverBullet has a `maximumDocumentSize` configuration option.

For example:

```space-lua
config.set("maximumDocumentSize", 100)
```

The number is in **MiB**, so `100` means 100 MiB.

This is an important little detail. Do **not** use something like:

```space-lua
config.set("maximumDocumentSize", 100000000)
```

SilverBullet itself converts the configured value to bytes internally.

The confusing part was that the setting worked when using the **Upload: File**
command, but not when pasting or dragging a document into the editor.

That behavior was reported in `silverbulletmd/silverbullet#1621`: the regular
upload path read `maximumDocumentSize` from the configuration, while
drag-and-drop and paste still used a hard-coded 10 MiB limit.

## The Fix

PR `silverbulletmd/silverbullet#2159` fixes exactly this.

Drag-and-drop and paste now query `maximumDocumentSize` from the SilverBullet
configuration as well, falling back to the default limit when it isn't
configured. The PR was merged on September 24, 2026.

There's one small catch.

The current stable release while I'm writing this is **2.11.1**, released on
September 22, 2026 — two days before the fix was merged.

So, temporarily, I'm running the `edge` image.

## Docker Compose

My minimal setup looks roughly like this:

```yaml
services:
  silverbullet:
    image: ghcr.io/silverbulletmd/silverbullet:edge
    restart: unless-stopped
    volumes:
      - ./data:/data
    ports:
      - "3000:3000"
```

SilverBullet officially provides both `latest` and `edge`: `latest` tracks
stable releases, while `edge` tracks the current `main` branch.

After changing the image:

```bash
docker compose pull
docker compose up -d
```

Then open the `CONFIG` page in SilverBullet and add:

```space-lua
config.set("maximumDocumentSize", 100)
```

Reload SilverBullet and dragging a document larger than 10 MiB should now work.

## Back to Stable

I wouldn't necessarily recommend staying on `edge` forever.

Once a stable release newer than 2.11.1 contains `#2159`, I'll simply change:

```yaml
image: ghcr.io/silverbulletmd/silverbullet:edge
```

back to:

```yaml
image: ghcr.io/silverbulletmd/silverbullet:latest
```

and update again.

## One More Thing

`maximumDocumentSize` controls SilverBullet's limit.

If SilverBullet sits behind a reverse proxy, that proxy may have its **own
upload/body-size limit**. So if the SilverBullet 10 MiB message disappears but
you're suddenly greeted by an HTTP `413 Request Entity Too Large`, that's a
different layer you'll have to configure.

But for the mysterious:

```text
Document is too large, maximum is 10MiB
```

despite having configured a higher `maximumDocumentSize`:

It wasn't you. It was that hard-coded `10`. 😬
