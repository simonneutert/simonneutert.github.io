---
title: Wilson - CLI for OpenAI's multistepped assistants
layout: post
---

Wilson is a prototype CLI for OpenAI's multisteps assistants. 

It is a simple CLI that is built with [Deno](https://www.deno.com) and uses [ink](https://github.com/vadimdemedes/ink) for the CLI.

> Ink provides the same component-based UI building experience that React offers in the browser, but for command-line apps. It uses Yoga to build Flexbox layouts in the terminal, so most CSS-like props are available in Ink as well. If you are already familiar with React, you already know Ink.
>
> Since Ink is a React renderer, it means that all features of React are supported. Head over to React website for documentation on how to use it. Only Ink's methods will be documented in this readme.
> \- [Docs (2024-11-08)](https://github.com/vadimdemedes/ink)

## Rationale

Do you find yourself in a situation, where you ask the AI questions in a thread-like manner?\
Are you tired of coming up with the same questions over and over again?\
Or worse, you forget to ask the most important questions?

Give your thoughts a place to live and breathe.\
Store processes as recipes and never forget a question again.

## Demo

<img src="/images/2024/wilson-demo.gif">

## Data first approach

In order to use Wilson, you need to provide a JSON file that contains the recipe for the assistant.

Here's the template of a recipe:

```json
{
  "assistant": {
    "id": "",
    "name": "Name of the ASSISTANT",
    "instruction": "HERE SHOULD BE THE INSTRUCTION FOR THE ASSISTANT.",
    "threads": [
      "REPLACE THIS A LIST OF THREADS THE ASSISTANT SHOULD RUN THROUGH ONE AFTER ANOTHER."
    ]
  },
  "recipe": [
    {
      "attr": "uniqueAttributeNameForASelectInput",
      "inputType": "select",
      "details": {
        "selectOptions": [
          {
            "label": "a1",
            "value": "a1"
          },
          {
            "label": "b1",
            "value": "b1"
          },
          {
            "label": "c1",
            "value": "c1"
          }
        ],
        "defaultValue": "IF A DEFAULT VALUE MAKES SENSE, PUT IT HERE, BUT EMPTY STRING IS ABSOLUTELY FINE.",
        "text": "PLACE THE COMMAND FOR THE USER INTERACTION HERE.",
        "summaryText": "THIS FIELD WILL BE USED TO ADD CONTEXT TO THE USER'S RESPONSE."
      }
    },
    {
      "attr": "uniqueAttributeNameForAnInput",
      "inputType": "input",
      "details": {
        "defaultValue": "",
        "text": "PLACE THE COMMAND FOR THE USER INTERACTION HERE.",
        "summaryText": "THIS FIELD WILL BE USED TO ADD CONTEXT TO THE USER'S RESPONSE."
      }
    }
  ]
}
```

☝️ this recipe is used to create further assistants using AI itself. Inception, right? 😵‍💫

## Source Code on GitHub

The source code is available on GitHub: [wilson](https://github.com/simonneutert/wilson).