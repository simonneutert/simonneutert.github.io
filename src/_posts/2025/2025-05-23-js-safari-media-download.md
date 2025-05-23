---
layout: post
title: Force iOS Safari to download media file
---

# 💡 How to Force File Downloads in Safari Using JavaScript (JS-Only Solution)

Safari has a mind of its own when it comes to downloading media files. Even if your server correctly sets `Content-Disposition: attachment` and `Content-Type: application/octet-stream`, Safari might **still display** files like PDFs, MP4s, or images instead of downloading them.

If you’re a frontend developer looking for a **JS-only workaround that actually works**, this post is for you.

---

## 🧠 Why Safari Ignores `Content-Disposition`

Safari uses its own internal logic to decide whether to show or download a file. If it recognizes the MIME type (like `video/mp4`, `application/pdf`, `image/jpeg`), it often overrides your server headers and opens the file inline.

That’s frustrating — especially when all you want is a reliable **download button**.

---

## ✅ The Reliable JavaScript Solution

By using the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to grab the file as a **Blob**, and then simulating a click on a dynamically created `<a>` element with a `download` attribute, you can **bypass Safari’s preview behavior entirely**.

### 🧪 Code Example

```html
<button id="download-btn">Download File</button>

<script>
  function forceDownload(url, filename) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error("Download failed:", error);
        alert("Download failed.");
      });
  }

  document.getElementById("download-btn").addEventListener("click", () => {
    // Adjust the URL and filename as needed
    forceDownload("/download/video.mp4", "my_video.mp4");
  });
</script>
```
