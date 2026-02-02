---
layout: post
title: download a pdf as blob and show it to the user in ionic (vue) 
---

Ionic Vue and Cordova and Capacitor and the framework you ended to pick for the frontend can be pretty overwhelming to google...

Here's how I managed to download a pdf as a blob and show it to the user.

### Dependencies

begin by adding the following dependencies to your ionic project

- https://ionicframework.com/docs/native/file-opener
- https://capacitorjs.com/docs/apis/filesystem

### Library Code

here's what you need as a scaffold to manage blob handling

```javascript
// lib file managing blob to write to open
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

const blobToBase64 = (entry) => {
  const reader = new FileReader();
  reader.readAsDataURL(entry.data);
  return reader;
};

const openPdfFile = (filename) => {
  Filesystem.getUri({
    directory: Directory.Cache,
    path: filename,
  }).then(
    (getUriResult) => {
      const path = getUriResult.uri;
      window.cordova.plugins.fileOpener2.open(path);
      console.log(`File ${filename} written to ${path}`);
    },
    (error) => {
      console.log(error);
    }
  );
};

const writeTempFileThenOpenPdf = (filename, base64data) => {
  Filesystem.writeFile({
    path: filename,
    data: base64data,
    directory: Directory.Cache,
  })
    .then((writeFileResult) => {
      openPdfFile(filename);
      console.log(`File ${filename} written`);
    })
    .catch((e) => {
      console.error(e);
    });
};

export const convertBlobThenOpenPdf = (entry, filename = "filename.pdf") => {
  const reader = blobToBase64(entry);
  reader.onloadend = function () {
    const base64data = reader.result;
    writeTempFileThenOpenPdf(filename, base64data);
  };
};
```

### Use in your Components (taken from a Vue Composition API in this case)

in your component you should add two methods, covering the platforms web (for debugging) and app platforms

```javascript
// for the web platform
const showPDFFile = () => {
  const api = new ApiV1PDFFileService();
  api.download().then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
  });
};

const downloadPDFFile = () => {
  if (isPlatform("desktop") || isPlatform("mobileweb")) {
    showPDFFile();
    return;
  }

  /*
   * // PEAKING INTO ApiV1PDFFileService
   * //
   * return this.axios.get("/downloads/pdf/demo", {
   *    responseType: "blob", // important for download
   *    headers: {
   *      Authorization: "Bearer " + token,
   *     },
   * });
   */
  const api = new ApiV1PDFFileService();
  api.download().then((entry) => {
    convertBlobThenOpenPdf(entry);
  });
};
```

get in touch if you struggle 🍻