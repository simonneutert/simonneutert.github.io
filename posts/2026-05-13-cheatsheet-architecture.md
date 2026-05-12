---
title: Software Architect Cheat Sheet
layout: post
---

https://news.ycombinator.com/item?id=48106024

Here’s a synthesized list of the **best advice** from the discussion, distilled into actionable principles for software architecture and design:

---

### **Core Principles**
1. **Single Responsibility, Single Idea**
   - Good design revolves around *one clear idea* pervading the entire system.
   - Minimize surprise: Users and developers should intuitively understand how the system behaves.

2. **Assume the Worst (Murphy’s Law for Software)**
   - *If your system allows it, people will do it.* Design for misuse, not just ideal use.
   - Avoid solutions that start with *“If everyone will just…”*—they’re doomed to fail.

3. **Decouple Everything**
   - *Coupling is the root of most evil.* Isolate components that transform data from those that use it.
   - Data models outlive code—prioritize their stability and clarity.

4. **State and Truth**
   - *Make state explicit.* Avoid implicit or hidden state.
   - *Single source of truth:* Every piece of information should live in exactly one place.
   - *Don’t duplicate state.* Synchronizing state across systems is a recipe for bugs, performance issues, and complexity.

5. **Versioning and Change**
   - *Versioning is inevitable.* Plan for backward/forward compatibility from day one.
   - *Data migrations are inevitable.* Design schemas and APIs to accommodate future changes.

6. **Naming and Clarity**
   - *Spend more time naming things.* Clear, precise names reduce cognitive load and miscommunication.

7. **Testability as a Design Metric**
   - *If testing is difficult, the design is wrong.* Prioritize architectures that are easy to test.

8. **Documentation as a Non-Negotiable**
   - *You will regret every undocumented decision.* Document the “why,” not just the “what.”

---

### **Practical Guidelines**
9. **Communication Overhead**
   - *Communication is a tax—justify it before paying it.*
     - Avoid unnecessary meetings, syncs, or cross-team dependencies.
     - Example: Involving 5 people in a feature may improve it theoretically but will *always* slow it down due to coordination costs.

10. **Cost Awareness**
    - *Everything costs money.* Design with budget constraints in mind (e.g., cloud costs, team size, maintenance).

11. **Start Simple**
    - *Start with a modular monolith.* Avoid premature distribution (e.g., microservices) unless absolutely necessary.
    - *Genius-level engineering is inventing the zipper:* Solve problems with the fewest moving parts possible.

12. **Embrace Experimentation**
    - *Planning is good, but sometimes you just have to try things out.* Prototyping can reveal flaws in assumptions.

13. **Avoid Dogma**
    - No single architecture (e.g., Hexagonal, Clean, MVC) fits all problems. Adapt patterns to the context, not the other way around.
    - *Conway’s Law is real:* Organizational structure often dictates architecture—be aware of its influence.

14. **Learn from Legacy Systems**
    - *Work in legacy codebases.* The best lessons come from maintaining or rewriting messy systems.
    - *Rewrite a project 3 times* to explore counterfactuals and understand trade-offs.

15. **Mental Models Matter**
    - Build mental models of your systems (e.g., “business apps as compilers” transforming JSON).
    - Study case studies (e.g., [Architecture of Open Source Applications](http://aosabook.org/)) to see real-world constraints and solutions.

---
### **Philosophical Insights**
16. **Subtraction > Addition**
    - *Mastery is subtraction:* Remove unnecessary abstraction, ceremony, and control. Simplify relentlessly.
    - *Residuality Theory:* Focus on what *remains* after simplifying—this is often the core of good architecture.

17. **Architecture is Social**
    - *Architecture is what survives contact with the organization.* It must align with team incentives, constraints, and culture.
    - *You can’t teach architecture—you can only sensitize people to its problems.* Experience is the best teacher.

18. **Polyglot Perspective**
    - *Be a polyglot.* Learn multiple languages, paradigms (e.g., functional vs. OOP), and deployment models (e.g., cloud vs. bare metal).
    - *Avoid language/framework lock-in.* If the toolchain is a barrier, it may not be worth your time.

19. **Emotional Resilience**
    - *No project is perfect.* Accept warts and focus on what you can improve.
    - *If the language/framework is unbearable, consider jumping ship.* Life’s too short for dull tools.

20. **The Tao of Engineering**
    - *Confucian approach:* Learn by doing, reflecting, and iterating.
    - *Taoist approach:* Strip away the non-essential. Complexity should serve a purpose, not exist for its own sake.

---
### **Anti-Patterns to Avoid**
- **Over-engineering:** Adding complexity “just in case.”
- **Ignoring costs:** Assuming infinite resources (time, money, team size).
- **Silos of truth:** Letting the same data live in multiple places.
- **Premature optimization:** Especially premature *distribution* (e.g., microservices before they’re needed).
- **Following trends blindly:** Microservices, Kubernetes, or Serverless aren’t always the answer.

---
### **Key Resources Mentioned**
- **Books:**
  - *A Philosophy of Software Design* (Ousterhout)
  - *Software Architecture: Perspectives on an Emerging Discipline* (Shaw/Garlan)
  - *Release It!* (Nygard)
  - *Architecture of Open Source Applications* ([aosabook.org](http://aosabook.org/))
  - *Simplify IT* ([nocomplexity.com](https://nocomplexity.com/documents/reports/SimplifyIT.pdf))
  - *Residuality Theory* ([architecture-weekly.com](https://www.architecture-weekly.com/p/residuality-theory-a-r...))
- **Talks:**
  - Gary Bernhardt’s talks on boundaries and functional core.
- **Practices:**
  - Study Unix pipes/filters, REST, and Hexagonal Architecture.
  - Work with mentors or teams skilled in architecture.

---
**Final Thought:**
> *“The job of an engineer is to use rules of thumb to solve problems with incomplete information.”*
> — **matklad**

Would you like me to expand on any of these points or tailor them to a specific context (e.g., web apps, embedded systems, startups)?