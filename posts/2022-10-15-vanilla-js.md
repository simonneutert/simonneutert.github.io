+++
title = "JavaScript's Fetch API is good enough for you 🤓"
layout = "post"
+++

Axios reached V1.0 few weeks ago.

Time to celebrate? I guess not.

https://youmightnotneedjquery.com was my "go to" ever since. Modern JavaScript
doesn't get the Spotlight like the npm projects that abstract what's mostly
already present.

Check out this super simple example of a form submission 🥹 🥰

```javascript
function submitInBackground(buttonId, formId, url) {
  document.getElementById(buttonId).addEventListener("click", function (e) {
    e.preventDefault();
    const form = document.getElementById(formId);
    const data = new FormData(form);
    fetch(url, {
      // signal: searchAbortController.signal,
      method: "POST",
      cache: "no-cache",
      body: new FormData(form),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    return false;
  });
}
```

[Fetch API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
