---
title: "Adventures in Golang: Organizing My Strava Data 🚴‍♂️"
layout: post
---

I recently dove into an interesting project where I exported my Strava data to do some GPS visualization. I thought I'd share my experience, especially for those who might be new to Go.

## tldr; just show me the product 🚀

[strava-export-organizer](https://github.com/simonneutert/strava-export-organizer/) on GitHub

## The Challenge 🎯

I had a directory full of activity files from Strava - mostly `.fit` files with some `.gpx` mixed in. My goal? Organize these files into a clean directory structure based on activity type (running, cycling, etc.) and year. The activity metadata was tucked away in an `activities.csv` file.

This is a part of the export strava.com provides. You can download your data in a zip file.

## The Game Plan 📋

Being a Golang newbie, I thought this would be a straightforward project:

1. Parse the `activities.csv` file
2. Create a fresh directory for the organized files
3. Make subdirectories for each activity type
4. Within those, create year-based subdirectories (prefixed with activity type)
5. Move files to their new homes
6. Optional: `gunzip` gzipped files

Simple enough, right? Well... 😅

## The Plot Twist: Go's Date Parsing 🤔

Here's where things got interesting. If you're coming from other programming languages, Go's approach to date parsing might surprise you. Instead of using traditional format strings like `YYYY-MM-DD`, Go uses what I like to call "the magic reference date":

```go
"2006-01-02T15:04:05Z07:00"
```

You could think of this as Go's "zero date" - the reference point for parsing and formatting dates. Each part of the string corresponds to a specific date component:

2006 = YYYY\
01 = MM\
02 = DD\
15 = hh (24-hour)\
04 = mm\
05 = ss\

## A Real-World Example 💡
Here's how I parsed a date like 2022-03-23T07:00:00+01:00:

```go
func main() {
    s := "2022-03-23T07:00:00+01:00"
    loc, _ := time.LoadLocation("Europe/Berlin")
    t, err := time.ParseInLocation(time.RFC3339, s, loc)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(t)
}
```

**Pro tip**: While this format might seem quirky at first, Go provides several predefined formats like time.RFC3339 that can save you some headaches!

## Wrapping Up 🎉

Despite the initial learning curve, this project turned out to be a fun way to dabble with Go. The date parsing might seem unusual at first, but it's just one of those Go quirks that makes the language unique.

## Links & Resources 📚

Want to dive deeper into Go's date formatting? Check out this super helpful cheat sheet: https://gosamples.dev/date-time-format-cheatsheet/

More on Stack Overflow: https://stackoverflow.com/a/20234207
