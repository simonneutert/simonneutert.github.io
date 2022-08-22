---
title: Who's to blame, when estimates go wrong?
layout: post
---

> <figure><a href="https://www.youtube.com/watch?v=m5A1Wg8hYGo"><img src="/2022/estimates_gone_wrong.jpg" width="100%" /><figcaption>Are Programmers Really To Blame For BAD Estimates?</figcaption></a></figure>

Jayme Edwards shared some really valuable thoughts about why estimations might go off the charts. Leaving everybody who is involved unhappy. And in the worst case a blaming culture evolves.

## Producing Goods != Producing Software

Management has it's historical roots in planning ahead, thinking through, supervising.

Working at the assembly line means carrying out orders, strictly following the rules.  
Working at the producing side means being 100 % measurable, too.  
Goals are set, expectations are set - so every action counts.

_For an assembly line, a defined input, produces an expected output (most of the time)._

Simplifying software development to an assembly line, means:

> Treating development like it's **NOT** knowledge work.  
> Like it's **NOT** dependent on teamwork.  
> Like it's **NOT** unpredictable.

No, of course some work is repetitive, but it's always to be put in perspective of the current project/company/framework.

Let's look at the [definition of "assembly line"](https://www.oxfordlearnersdictionaries.com/definition/english/assembly-line?q=assembly+line):

> a line of workers and machines in a factory, along which a product passes, having parts made, put together or checked at each stage until the product is finished

If we assume, that **data is the product**, i.e. something as common as an HTTP request 🤯

The [Oxford dictionary defines "software"](https://www.oxfordlearnersdictionaries.com/definition/english/software?q=software) as:

> the programs used by a computer for doing particular jobs

and a ["program" is defined](https://www.oxfordlearnersdictionaries.com/definition/english/program_1?q=program) as:

> a set of instructions in code that control the operations or functions of a computer

Then I draw the conclusion that writing a script, a program or software is by definition very, very close to the work that's required for setting up an assembly line 🤓

## IT-Management

If software development is closer to engineering work, doesn't that mean managment needs to adapt?

It does.

For as long as a company exists, environments will change. In order to gain/maintain a competitive advantage, the software needs to adapt. Adapt quick.  
Agile - in a nutshell.

Yet, agile frameworks fail making good estimates, too - at least to my knowledge.

## Estimates Guestimates

Because of changing environments, a lack of standardization and the sheer novelty of software development at scale, estimating means guessing.

- **Unique efforts**

  What's done is done. Usually you needn't solve the same problem ever again. Or if so, different project, with a different set of limitations.

- **Invisible Monsters**

  There are unlimited memes around about bugs, that somebody turned into a feature. Code that works, but mustn't be touched. Stumbling into one of these pits, may easily force you to start all over, coming up with a different solution.

- **Forced shortcuts**

  Shortcuts or hacks in order to hold a deadline, will slow down everybody sooner or later.

- **Mind Grind**

  Most of the time a developer's work is reading. Gaining sense of the problem and the influence a solution contributes can take up more time than you think. Draining energy and concentration at a rate Sudoku can dream of.

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
