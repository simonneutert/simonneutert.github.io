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

  // Get current button references dynamically (works with Turbo)
  const btnNext = document.getElementById("btn-next");
  const btnPrevious = document.getElementById("btn-previous");

  // Navigate to next post with right arrow
  if (event.key === "ArrowRight" && btnNext) {
    event.preventDefault();
    Turbo.visit(btnNext.href);
  }
  
  // Navigate to previous post with left arrow
  if (event.key === "ArrowLeft" && btnPrevious) {
    event.preventDefault();
    Turbo.visit(btnPrevious.href);
  }
}

// Add single global keydown listener (works across all pages)
document.addEventListener("keydown", handleKeyNavigation);
