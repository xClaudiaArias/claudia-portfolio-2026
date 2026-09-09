/**
 * navigation.js
 */

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  function closeMenu() {
    links.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openMenu() {
    links.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.getAttribute("data-open") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  links.addEventListener("click", (event) => {
    if (event.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && links.getAttribute("data-open") === "true") {
      closeMenu();
      toggle.focus();
    }
  });

  // Keep menu state sane if the viewport crosses the desktop breakpoint
  const desktopQuery = window.matchMedia("(min-width: 761px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", initMobileNav);
