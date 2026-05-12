---
title: Software Architect Cheat Sheet
layout: post
---

https://news.ycombinator.com/item?id=48106024

I used Mistral AI to synthesize the key insights from a long Hacker News
discussion on software architecture and design. The original discussion is rich
with practical advice, philosophical insights, and anti-patterns to avoid. Below
is a distilled cheat sheet that captures the essence of the conversation.

---

### **Core Principles**

1. **Single Responsibility, Single Idea**

- Good design revolves around _one clear idea_ pervading the entire system.
- Minimize surprise: Users and developers should intuitively understand how the
  system behaves.

2. **Assume the Worst (Murphy’s Law for Software)**

- _If your system allows it, people will do it._ Design for misuse, not just
  ideal use.
- Avoid solutions that start with _“If everyone will just…”_—they’re doomed to
  fail.

3. **Decouple Everything**

- _Coupling is the root of most evil._ Isolate components that transform data
  from those that use it.
- Data models outlive code—prioritize their stability and clarity.

4. **State and Truth**

- _Make state explicit._ Avoid implicit or hidden state.
- _Single source of truth:_ Every piece of information should live in exactly
  one place.
- _Don’t duplicate state._ Synchronizing state across systems is a recipe for
  bugs, performance issues, and complexity.

5. **Versioning and Change**

- _Versioning is inevitable._ Plan for backward/forward compatibility from day
  one.
- _Data migrations are inevitable._ Design schemas and APIs to accommodate
  future changes.

6. **Naming and Clarity**

- _Spend more time naming things._ Clear, precise names reduce cognitive load
  and miscommunication.

7. **Testability as a Design Metric**

- _If testing is difficult, the design is wrong._ Prioritize architectures that
  are easy to test.

8. **Documentation as a Non-Negotiable**

- _You will regret every undocumented decision._ Document the “why,” not just
  the “what.”

---

### **Practical Guidelines**

9. **Communication Overhead**

- _Communication is a tax—justify it before paying it._
- Avoid unnecessary meetings, syncs, or cross-team dependencies.
- Example: Involving 5 people in a feature may improve it theoretically but will
  _always_ slow it down due to coordination costs.

10. **Cost Awareness**

- _Everything costs money._ Design with budget constraints in mind (e.g., cloud
  costs, team size, maintenance).

11. **Start Simple**

- _Start with a modular monolith._ Avoid premature distribution (e.g.,
  microservices) unless absolutely necessary.
- _Genius-level engineering is inventing the zipper:_ Solve problems with the
  fewest moving parts possible.

12. **Embrace Experimentation**

- _Planning is good, but sometimes you just have to try things out._ Prototyping
  can reveal flaws in assumptions.

13. **Avoid Dogma**

- No single architecture (e.g., Hexagonal, Clean, MVC) fits all problems. Adapt
  patterns to the context, not the other way around.
- _Conway’s Law is real:_ Organizational structure often dictates
  architecture—be aware of its influence.

14. **Learn from Legacy Systems**

- _Work in legacy codebases._ The best lessons come from maintaining or
  rewriting messy systems.
- _Rewrite a project 3 times_ to explore counterfactuals and understand
  trade-offs.

15. **Mental Models Matter**

- Build mental models of your systems (e.g., “business apps as compilers”
  transforming JSON).
- Study case studies (e.g.,
  [Architecture of Open Source Applications](http://aosabook.org/)) to see
  real-world constraints and solutions.

---

### **Philosophical Insights**

16. **Subtraction > Addition**

- _Mastery is subtraction:_ Remove unnecessary abstraction, ceremony, and
  control. Simplify relentlessly.
- _Residuality Theory:_ Focus on what _remains_ after simplifying—this is often
  the core of good architecture.

17. **Architecture is Social**

- _Architecture is what survives contact with the organization._ It must align
  with team incentives, constraints, and culture.
- _You can’t teach architecture—you can only sensitize people to its problems._
  Experience is the best teacher.

18. **Polyglot Perspective**

- _Be a polyglot._ Learn multiple languages, paradigms (e.g., functional vs.
  OOP), and deployment models (e.g., cloud vs. bare metal).
- _Avoid language/framework lock-in._ If the toolchain is a barrier, it may not
  be worth your time.

19. **Emotional Resilience**

- _No project is perfect._ Accept warts and focus on what you can improve.
- _If the language/framework is unbearable, consider jumping ship._ Life’s too
  short for dull tools.

20. **The Tao of Engineering**

- _Confucian approach:_ Learn by doing, reflecting, and iterating.
- _Taoist approach:_ Strip away the non-essential. Complexity should serve a
  purpose, not exist for its own sake.

---

### **Anti-Patterns to Avoid**

- **Over-engineering:** Adding complexity “just in case.”
- **Ignoring costs:** Assuming infinite resources (time, money, team size).
- **Silos of truth:** Letting the same data live in multiple places.
- **Premature optimization:** Especially premature _distribution_ (e.g.,
  microservices before they’re needed).
- **Following trends blindly:** Microservices, Kubernetes, or Serverless aren’t
  always the answer.

---

### **Key Resources Mentioned**

- **Books:**
- _A Philosophy of Software Design_ (Ousterhout)
- _Software Architecture: Perspectives on an Emerging Discipline_ (Shaw/Garlan)
- _Release It!_ (Nygard)
- _Architecture of Open Source Applications_
  ([aosabook.org](http://aosabook.org/))
- _Simplify IT_
  ([nocomplexity.com](https://nocomplexity.com/documents/reports/SimplifyIT.pdf))
- _Residuality Theory_
  ([architecture-weekly.com](https://www.architecture-weekly.com/p/residuality-theory-a-r...))

- **Talks:**
  - Gary Bernhardt’s talks on boundaries and functional core.

- **Practices:**
  - Study Unix pipes/filters, REST, and Hexagonal Architecture.
  - Work with mentors or teams skilled in architecture.

---

**Final Thought:**

> _“The job of an engineer is to use rules of thumb to solve problems with
> incomplete information.”_ — **matklad**

Would you like me to expand on any of these points or tailor them to a specific
context (e.g., web apps, embedded systems, startups)?
