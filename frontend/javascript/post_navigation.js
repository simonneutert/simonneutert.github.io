import * as Turbo from "@hotwired/turbo";

// Navigate between posts using arrow keys
function handleKeyNavigation(event) {
  // Don't navigate if user is typing in an input field
  const activeElement = document.activeElement;
  if (activeElement && (
    activeElement.tagName === 'INPUT' || 
    activeElement.tagName === 'TEXTAREA' || 
    activeElement.isContentEditable
  )) {
    return;
  }

  // Only get button references if relevant arrow key is pressed (works with Turbo)

  // Navigate to next post with right arrow
  if (event.key === "ArrowRight") {
    const btnNext = document.getElementById("btn-next");
    if (btnNext) {
      event.preventDefault();
      Turbo.visit(btnNext.href);
    }
  }
  
  // Navigate to previous post with left arrow
  if (event.key === "ArrowLeft") {
    const btnPrevious = document.getElementById("btn-previous");
    if (btnPrevious) {
      event.preventDefault();
      Turbo.visit(btnPrevious.href);
    }
  }
}

// Add single global keydown listener (works across all pages)
// Note: This listener is intentionally global and persistent across Turbo navigations.
// It doesn't cause memory leaks because:
// 1. It's attached to document, which persists across Turbo page transitions
// 2. It queries DOM elements dynamically on each relevant keypress
// 3. There's only ever one instance of this listener in the application
document.addEventListener("keydown", handleKeyNavigation);
