+++
title = "The 10 Commandments of Code Review: A Developer's Guide"
layout = "post"
+++

The algorithm washed in a great YouTube video on code reviews. Here's a summary
of the video's key points, with a touch of humor and a sprinkle of wisdom.\

- [Source on YouTube](https://www.youtube.com/watch?v=ScWFHOOPPC4)

## A Note on Code Reviews

Let's be honest: we've all written code that made us cringe months later.
Whether you're a junior developer or a seasoned architect, nobody writes perfect
code all the time. That's exactly why code reviews exist – not as a platform for
showing off or criticizing others, but as a collaborative tool for improvement.
When reviewing code, remember to be direct but polite; we're all in this
together, trying to build better software.

## The 10 Commandments of Code Review

1. **Thou shalt ensure readability**, for confusing code is the Devil's
   Playground.

2. **Thou shalt consider performance and scalability**, for slow code is an
   Abomination.

3. **Thou shalt stay within scope**, and not add unnecessary complexity.

4. **Thou shalt check for edge cases**, for the unexpected shall smite thee in
   production.

5. **Thou shalt not forget test coverage**, for untested code is a sin in the
   eyes of QA.

6. **Thou shalt seek out repetitive code** and banish it from the codebase.

7. **Thou shalt not nitpick**, lest you be smited by thine own pet peeves.

8. **Thou shalt provide constructive feedback** and sing praises of good code.

9. **Thou shalt encourage discussion**, for two minds are mightier than one.

10. **Thou shalt not block changes over minor issues**, for Perfection is a
    false idol.

---

### 1. Ensure Readability

Code should be easily understood by others. Look for clear naming conventions,
appropriate comments, and well-structured functions. If you need to read the
same code multiple times to understand it, suggest improvements in organization
or clarity.

### 2. Consider Performance

Watch for potential bottlenecks and inefficient code. Look for opportunities to
optimize, such as early returns and proper algorithmic complexity. Remember:
what works on your computer might not scale well on servers.

### 3. Stay Within Scope

Understand the problem being solved and avoid suggesting changes that don't
align with the ticket's purpose. Save broader improvements for separate tickets
and discussions.

### 4. Check Edge Cases

Review how the code handles unexpected scenarios, including empty arrays, null
values, and missing data. Border cases often cause the most problems in
production.

### 5. Verify Test Coverage

Ensure adequate testing, especially for critical functionality. Tests should be
comprehensive, well-structured, and actually useful – not redundant. Don't
demand tests for trivial changes.

### 6. Eliminate Code Duplication

Look for repeated code blocks and suggest abstractions to improve
maintainability. If the same intensive operation happens multiple times,
consider caching results when appropriate.

### 7. Avoid Nitpicking

Don't get hung up on trivial formatting preferences or subjective matters.
You're not a linter – focus on what truly matters.

### 8. Provide Constructive Feedback

Frame suggestions positively and acknowledge good work. Instead of "this is
poorly written," try "consider refactoring this for clarity 😊"

### 9. Encourage Discussion

Foster collaboration and open dialogue. For complex issues, take the discussion
offline to voice or chat channels where ideas can flow more naturally.

### 10. Don't Block on Minor Issues

Differentiate between essential fixes and nice-to-haves. Not every suggestion
needs to be implemented before merging.

Remember: Perfect is the enemy of good. Sometimes "good enough" is exactly what
the project needs at that moment.
