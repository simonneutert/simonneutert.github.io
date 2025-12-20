---
layout: post
title: "Quality Over Velocity: Rethinking How We Work"
---

You might know that feeling of drowning in meetings, juggling sprint ceremonies, and wondering why your "agile" process feels anything but? 

Yeah, me too. This week YouTube somehow sent [this article](https://runitbare.com/why-finnish-devs-outperform-silicon-valley-long-term-the-nordic-way-of-code/) in my feed. I enjoy diving into alternative work philosophies, as I get the feeling we might be missing something fundamental in the modern IT landscape.

This isn't about throwing shade at anyone—it's about finding better ways to work. 

Let's explore ways that don't lead to: 
- brutal onboarding experiences
- degrading code quality
- exploding fix times
- cynicism
- and scattered documentation nobody can keep up to update and stay sane. 

Ways that actually deliver value and, maybe, just maybe, bring back the joy in what we once loved to do.

## The Goal of This Article

This article moves down from the "why" through the "how" to **actions** you can take tomorrow (the "now").

Let's explore what we can learn from concepts and philosophies that prioritize calm, quality, and sustainability—from African Itutu, to Japanese Kaizen and Wabi-Sabi to Finnish Sisu and Metsä Rhythm.

## TL;DR<!-- omit in toc -->

**The Problem:** Modern IT culture may lead to cynicism in teams, degrading code quality, deep exhaustion, and chaos—not because we're bad at coding, but because we're optimizing for the wrong things (velocity over durability, output over outcomes).

Pressure to fulfill sprint commitments instead of focusing on building maintainable, high-quality software undercuts the strive to make the best possible work, that is [deeply anchored within human nature](https://en.wikipedia.org/wiki/Self-determination_theory).

**A possible solution:** Learn from Quality-focused concepts, that prove sustainable productivity beats heroic sprints. Where the system is designed to fix itself, not just its symptoms.

## Sources and Further Reading<!-- omit in toc -->

### Articles and Blog Posts<!-- omit in toc -->
- [Why Finnish Devs Outperform Silicon Valley Long-Term: The Nordic Way of Code](https://runitbare.com/why-finnish-devs-outperform-silicon-valley-long-term-the-nordic-way-of-code/) - The primary inspiration for this article

### Books and Methodologies<!-- omit in toc -->
- [Shape Up: Stop Running in Circles and Ship Work that Matters](https://basecamp.com/shapeup) by Ryan Singer (Basecamp) Free online book about an alternative to Scrum
- [Hammock Driven Development](https://www.youtube.com/watch?v=f84n5oFoZBc) - Rich Hickey's talk on the importance of thinking time in software development

### Concepts Referenced<!-- omit in toc -->
- **Itutu** - Yoruba philosophy of patience and emotional balance
- **Kaizen** - Japanese philosophy of continuous improvement
- **Wabi-Sabi** - Japanese aesthetic philosophy embracing imperfection
- **SISU** - Finnish concept of resilience and determination
- **Metsä Rhythm** - Finnish seasonal work approach

## Table of Contents<!-- omit in toc -->

- [The Goal of This Article](#the-goal-of-this-article)
- [First and foremost: Not everything about modern software development is broken](#first-and-foremost-not-everything-about-modern-software-development-is-broken)
- [Part I: Pivoting from Focusing on Velocity to Quality — The "Why"](#part-i-pivoting-from-focusing-on-velocity-to-quality--the-why)
  - [The Long Game: 10× Sustainable vs 10× Velocity](#the-long-game-10-sustainable-vs-10-velocity)
  - [Pragmatic Workflows](#pragmatic-workflows)
  - [Well-being](#well-being)
  - [Continuous Learning Without the Overwhelm](#continuous-learning-without-the-overwhelm)
- [Part II: Tactical Practices — The "How"](#part-ii-tactical-practices--the-how)
- [How I love my workday to be structured](#how-i-love-my-workday-to-be-structured)
- [Part III: Urgent Actions — The "Now"](#part-iii-urgent-actions--the-now)
- [Scrum and Sprints - An Alternative: Shape Up](#scrum-and-sprints---an-alternative-shape-up)
  - [What Is Shape Up?](#what-is-shape-up)
- [Measuring What Actually Matters](#measuring-what-actually-matters)

---

## First and foremost: Not everything about modern software development is broken

**Agile as a mindset** is powerful—being open to change, embracing feedback, improving step by step. That core philosophy of adaptability over rigid planning? Gold. The problem isn't Agile itself; it's when we mistake the ceremonies for the substance.

**Scrum can foster genuine team spirit—but daily standups alone cannot replace it.** Helping each other, sharing knowledge, and building trust are what truly create a cohesive team. There's value in having regular touchpoints to align and achieve goals together. Meaningful collaboration is essential. 

**SAFe and large-scale frameworks solve real problems.** In organizations with hundreds of developers/projects, you need *some* way to orchestrate efforts, align roadmaps, and maintain architectural coherence. SAFe provides that visibility and context, helping teams understand how their work fits into the bigger picture.

Modern work is still evolving, the silver bullet hasn't been found yet.

We are used to the rush of excitement, deadlines, and "crunch time" sprints. But what if we slowed down? What if we prioritized quality, sustainability, and well-being?

## Part I: Pivoting from Focusing on Velocity to Quality — The "Why"

Before you continue, ask yourself: **Do I believe that a marathon is won by sprinting the first mile?**

And then ask yourself: **Would I want my castle to be built by someone rushing from task to task, cutting corners to meet deadlines? Or do I want a solid foundation that will stand the test of time?**

I know this sounds obvious. But in practice, many companies fall for the trap "it can't be that hard" or "we'll fix it later"—only to find themselves buried under technical debt.

> We cannot plan everything perfectly upfront. Changes are inevitable.

I hear you. And I know you're right with that.

Yet, **sprinting towards stakeholder happiness** often leads to cutting corners—and ultimately suffocating quality.

### The Long Game: 10× Sustainable vs 10× Velocity

Silicon Valley obsesses over "10× developers" and "10× speed". I'd argue that the rockstar developer myth is harmful and sure some developers are more productive than others.

Instead of that one "10× developer" who you absolutely depend on, try to build a team that is collectively 10× more sustainable. The speed of the team will increase as a side effect over time.

A team that writes maintainable code, documents decisions, and learns to builds systems that can evolve without collapsing under their own weight.

Make problems smaller, aim to reduce complexity and follow the gnu/linux philosophy of "do one thing and do it well".

This echoes what Rich Hickey (creator of [Clojure](https://clojure.org/)) calls **"Hammock Driven Development"**—the idea that the most important work happens *away from the keyboard*. Hickey argues that problems of misconception (not understanding what we're building) are far more expensive than problems of implementation (bugs in code). You can't test your way out of building the wrong thing.

His philosophy: **load up the problem, step away from the computer, let your background mind work on it**. Sometimes for hours. Sometimes for days. The "cake in the oven" approach—you've done the hard work of understanding the problem deeply, now wait for your brain to synthesize a solution. This isn't laziness; it's recognizing that tactical thinking (the waking mind) finds local maxima, while strategic thinking (the background mind) finds actual solutions.

---

The **Linux kernel** is one of the longest-running open-source ecosystems without collapsing under technical debt.

The longer your code stays maintainable, the less technical debt compounds. That alone makes every future sprint cheaper, every refactor faster, and every onboarding smoother.

Optimize for the decade, not the next quarter.

### Pragmatic Workflows

Forget death by ceremony:

- Develop a common vision
- Shared goals and metrics
- Central Documentation with product focus
- Automate the communication of status

### Well-being

In quality-focused work cultures, well-being isn't a ping-pong table in the break room or mandatory "fun" team events. 

It's things like:

- Psychological safety to say "I don't know" or "I need help"
- No micromanagement, but enabling autonomy
- Make space and time for people to take shared ownership of parts of the system

### Continuous Learning Without the Overwhelm

The tech world moves fast. Keeping up is a career in itself.

- Playgrounds with a structured presentation of the results
- Make sure to provide a safe environment for experimentation

"We'll figure it out together." is the mindset.

Bigger Problems can be recalled postmortems systematically, without blame, continually improve their architecture. Companies like Google's SRE culture echo this (see their [postmortem guide](https://sre.google/sre-book/postmortem-culture/)).

---

## Part II: Tactical Practices — The "How"

With the background philosophy in place, let's get tactical.

## How I love my workday to be structured

Different times, different measures. But I try to have as much Focus Time in the morning as possible. After lunch is the time for meetings, collaboration, and learning.

---

## Part III: Urgent Actions — The "Now"

If you feel exhausted, overwhelmed, or deeply unsatisfied, your team and the project are struggling, you can't wait for organizational transformation. 

Here's what you can do tomorrow.

**1\. Keep a success journal**

Every week, take 10 minutes to reflect on your wins. What went well? What are you proud of? Write it down. This practice boosts morale and helps you reflect on progress, even when things feel tough.

**2\. The Kaizen Minute: Your Daily Practice**

Every day, before logging off, ask yourself one question:

> **"What slowed me down today?"**

**3\. Setup Focus Time**

Open your calendar right now.

**Expect pushback.** People will try to book over your focus time. Hold the line. Say: "I'm available from 12 PM onwards—does that work?" Most "urgent" things can wait three hours.

All of this above takes less than 10 minutes. It requires zero permission.

---

## Scrum and Sprints - An Alternative: Shape Up

Let's talk about project management. If you're tired of Scrum ceremonies eating your week, you're not alone. Enter **Shape Up**—Basecamp's approach to software development that's been gaining traction for good reason.

### What Is Shape Up?

Shape Up ditches sprints for **cycles**—fixed 6-week periods where teams work on shaped projects. But here's the kicker: there's no backlog grooming, no daily standups, no story point poker. Instead:

**Shaping work upfront.** Before a cycle starts, someone (usually senior) shapes the work—defining the problem, the boundaries, and the rough solution. Not specs, not detailed requirements. Just enough to get started.

**Betting, not planning.** Leadership "bets" on which shaped projects to tackle in the next cycle. No promises, no commitments for more than 6 weeks ahead. This is liberating.

**Uninterrupted time.** Once a cycle starts, teams are left alone to work. No drive-bys, no "quick questions," no scope changes. Just focus.

**Cool-down periods.** After each 6-week cycle, there's a 2-week cool-down. Time to fix bugs, explore ideas, or just breathe. No one assigns work during cool-down.

## Measuring What Actually Matters

Here's a radical idea: **stop measuring velocity.**

But **measure:**

- **Code Quality (via Tools like [qlty](https://github.com/qltysh/qlty))** — Automated code quality metrics that track maintainability over time.
- **Ask Developers to identify pain points** — Then make a plan to fix them.
- **Time to recovery** — When things break, how fast can we fix the *system*?
- **Pivoting occasions** — How often do we have to change direction and why?

These metrics tell you if you're building sustainably or just creating future technical debt. They're harder to gamify and actually correlate with long-term success.
