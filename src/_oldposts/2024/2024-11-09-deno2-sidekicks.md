---
title: Deno 2 - what you might have missed
layout: post
---

Deno 2 was released exactly one month ago (on 2024-10-09). So it's still super fresh. But, if you haven't been following the Deno news, you might have missed some of the new features. Here's a quick overview of what's new in Deno 2.

Their YouTube channel has super interesting content. I highly recommend checking it out. They have a lot of great tutorials about Deno. 🦕

## TIL

![All about Deno 2](https://www.youtube.com/watch?v=H8VLifMOBHU) on YouTube.

A ~33 minutes long video from the creator of Deno, Ryan Dahl, where he goes through some of the new features in Deno 2.

## import.meta.*

You can check if a script is being run as the main program or if it's being imported as a module. Those familiar with python might recognize the pattern.

[Docs](https://docs.deno.com/runtime/tutorials/module_metadata/)

### Example

`import.meta.main`

In Python you can do this by checking the `__name__` attribute.

```python
if __name__ == "__main__":
    print("Hello, Python!")
```


```javascript
if (import.meta.main) {
  console.log("Hello, Deno 2!");
}
```

## Jupyter notebook support

Deno 2 now supports Jupyter notebooks. You can run a Deno script in a Jupyter notebook cell. This is a great way to experiment with Deno and share your code with others.

Switch the kernel to Deno and you can run Deno code in a Jupyter notebook cell.

## @std/fmt

```javascript
// there's a change you can drop chalk and use Deno's fmt module
// to use css in the console 😱
console.log ("%c" + "This is a string!", "background-color: red");
```

## Standard library

Deno 2 comes with a standard library that includes modules for working with files, networking, and more. This makes it easier to get started with Deno and build powerful applications.

Here's a comparison of some of the modules in the Deno standard library and their (one of possibly many) Node.js equivalents:


| Deno                                                 | Node         |
| ---------------------------------------------------- | ------------ |
| [@std/testing](https://jsr.io/@std/testing)          | jest         |
| [@std/expect](https://jsr.io/@std/expect)            | chai         |
| [@std/cli](https://jsr.io/@std/cli)                  | minimist     |
| [@std/collections](https://jsr.io/@std/collections)  | lodash       |
| [@std/fmt](https://jsr.io/@std/fmt)                  | chalk        |
| [@std/encoding](https://jsr.io/@std/encoding)        | rfc4648      |
| [@std/toml](https://jsr.io/@std/toml)                | toml         |
| [@std/uuid](https://jsr.io/@std/uuid)                | uuid         |
| [@std/yaml](https://jsr.io/@std/yaml)                | yaml         |
| [@std/json](https://jsr.io/@std/json)                | json         |
| [@std/net](https://jsr.io/@std/net)                  | get-port     |
| [@std/media-types](https://jsr.io/@std/media-types)  | mime-types   |
| [@std/font-matter](https://jsr.io/@std/front-matter) | front-matter |
| [@std/csv](https://jsr.io/@std/csv)                  | csv          |
| [@std/bytes](https://jsr.io/@std/bytes)              | bytes        |
| [@std/msgpack](https://jsr.io/@std/msgpack)          | msgpack      |
| [@std/ulid](https://jsr.io/@std/ulid)                | ulid         |
| [@std/html](https://jsr.io/@std/html)                | escape-html  |
| [@std/semver](https://jsr.io/@std/semver)            | semver       |
| [@std/stream](https://jsr.io/@std/streams)           | stream       |

---

I've been really enjoying Deno 2 so far. The new ecosystem plays out great. If you haven't tried Deno yet, I highly recommend giving it a shot. It's a great alternative to Node.js and I think you'll love it. 🥰
