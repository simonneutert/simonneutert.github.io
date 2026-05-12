---
title: Software Architecture Cheat Sheet
layout: post
---

Source: https://news.ycombinator.com/item?id=48106024

---

[CSMastermind](https://news.ycombinator.com/user?id=CSMastermind) wrote a cheat
sheet for software architects. I think it's pretty good, so I'm reposting it
here. So I can refer to it in the future without having to search for it.

> - Good design is a single idea pervaded throughout.
> - More generally, your goal should be to minimize surprise.
> - If your system allows it, people will do it.
> - Everyone will not just. If your solution starts with "if everyone will
>   just..." then you don't have a solution.
> - Isolate the parts of your system that transform data from the ones that use
>   it. Data models outlive code.
> - Coupling is the root of most evil.
> - Versioning is inevitable.
> - Make state explicit.
> - Every piece of information should have a single source of truth.
> - You should spend more time thinking about naming things correctly.
> - If testing is difficult, the design is wrong.
> - You will regret every undocumented decision.
> - Communication is a tax that you should justify before paying it.
>
> Remember that the job of an engineer at any level is to use rules of thumb to
> solve problems for which there is incomplete information.
>
> \- [CSMastermind](https://news.ycombinator.com/user?id=CSMastermind)

---

[laszlojamf](https://news.ycombinator.com/user?id=laszlojamf) added:

> - data migrations are inevitable and should be planned for (corollary of
>   versioning)
> - planning is good, sometimes you just have to try things out
> - everything costs money. Designing without costs in mind will force hard
>   choices down the line
>
> \- [laszlojamf](https://news.ycombinator.com/user?id=laszlojamf)

---

## Checklist

Here’s a **feature checklist** inspired by the principles in the cheat sheet.

### **1. Design & Clarity**

- [ ] **Single Responsibility**: Does the feature have one clear, well-defined
      purpose?
- [ ] **Minimize Surprise**: Are the behavior and side effects intuitive and
      documented?
- [ ] **Naming**: Are the APIs named clearly and consistently?
- [ ] **State Management**: Is state explicit, predictable, and easy to reason
      about?

### **2. System Architecture**

- [ ] **Decoupling**: Is the feature isolated from other components (low
      coupling)?
- [ ] **Versioning**: Is the feature designed to handle future changes (e.g.,
      API versions, schema migrations)?

### **3. Robustness & Maintainability**

- [ ] **Testing**: Are unit, integration, and end-to-end tests easy to write and
      maintain?
- [ ] **Documentation**: Are all decisions, assumptions, and edge cases
      documented?
- [ ] **Performance**: Are there performance benchmarks or estimates for
      critical paths?

### **4. Operational Readiness**

- [ ] **Monitoring**: Are metrics, logs, and alerts in place for observability?
- [ ] **Deployment**: Is the feature deployable independently (e.g., feature
      flags, rollback plans)?
- [ ] **Data Migrations**: If applicable, is there a plan for backward/forward
      compatibility?
- [ ] **Cost Awareness**: Are the computational, storage, and third-party costs
      accounted for?

### **5. Human Factors**

- [ ] **Communication**: Is the feature’s purpose and usage communicated to
      stakeholders?
- [ ] **User Feedback**: Are there mechanisms to gather feedback (e.g.,
      analytics, surveys)?
- [ ] **Accessibility**: Does the feature comply with accessibility standards
      (e.g., WCAG)?

---

## **Bonus: Pre-Launch and Review Questions**

- **What could go wrong?** Have you stress-tested failure scenarios (e.g.,
  network issues, invalid inputs)?
- **Is this the simplest solution?** Could the feature be simplified without
  losing functionality? How would the preferred solution look like if you could
  make any assumptions?
- **What are the trade-offs?** Have you considered the trade-offs between
  performance, maintainability, and scalability?
