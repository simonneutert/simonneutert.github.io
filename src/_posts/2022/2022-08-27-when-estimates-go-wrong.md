---
published: false
title: Who's to blame, when estimates go wrong?
layout: post
---

> <figure><a href="https://www.youtube.com/watch?v=m5A1Wg8hYGo"><img src="/2022/estimates_gone_wrong.jpg" width="100%" /><figcaption>Are Programmers Really To Blame For BAD Estimates?</figcaption></a></figure>

Jayme Edwards shared some really valuable thoughts about why estimations might go off the charts. Leaving everybody who is involved unhappy. And in the worst case a blaming culture evolves.

## Problems of estimations when developing software

Industry is trying to pretend that Software Development runs like every other producing industry. In the ways of a fully graspable assembly line. Input, process yields an output.

> Treating development like it's **NOT** knowledge work.  
> Like it's **NOT** dependent on teamwork.  
> Like it's **NOT** unpredictable.

### Non-repeatable work

Most of a developer's work is reading, wrapping one's head around the problem. Then matching it with the known universe of the already existing code.

And if it's done it's done, usually you needn't solve the same problem ever again. Or if so, different project, different rules.

### It's complicated

The successful implementation of a feature depends on so many different things.

The biggest ones being:

- what state is the project in?
- Does the team

All the other factors or variables are mostly related to the task given:

- is the existing data suited?
- is the problem understood correctly?
- how many components of the existing projects need to be touched/changed?
- what pattern to choose?

Then there's people related:

- is the developer/team *good enough*™?
- does the teams work well together?

And the killer part:

- unofficial team leaders' gut feelings (aka expected but unforseen problems)

---

### Surface understanding of the problem

- not enough time to get one head around the full scope, instead just the user interface on top level perspective (most easy to understand by the business people)

### Unique Integration

- trying to combine stuff/libraries for a solution that is unique to the problem, without knowing the shortcomings of the combination

### Low diagnostic

- not enough diagnostic tools that help monitoring / error handling / troubleshooting

### Knowledge Work Mismatch

- not assembly worker with repeatable tasks, but user stories have unique aspects

- one needs to think through deeply and properly

- time constraints force devs to build bad software

- every developer is different, not a single correct solution

### Undervalued Teamwork

- Calling "Team team team", for team spirit, but measuring everybody independently

- make teams work together dynamically, instead forcing them into waiting mode until they're unblocked (mostly with a surprise factor)

## Solutions or Ideas to be less impacted by wrong estimates

- don't treat story points as hours

- varying sprint lengths

- recipe for disaster: cramming as much in a sprint as possbile

- estimates are worker bound, none can be held accountable for the estimate of another. an estimate of one developer is impossible to transfer to another, the one stepping in cannot not know what the other knew

- break things into very small components and if possible share the work, especially think of "invisible work" to the business people

- build with or on a stable stack of tech, choose proven languages/packages

