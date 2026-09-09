/**
 * theme.js
 * Handles light/dark theming
 */

const STORAGE_KEY = "portfolio-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    // localStorage can throw in private-browsing / disabled-storage contexts
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (err) {
    /* non-fatal — theme just won't persist */
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

function initThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current);

  toggle.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    applyTheme(next);
    setStoredTheme(next);
  });

  // Follow system changes only if the user hasn't made an explicit choice
  if (window.matchMedia && !getStoredTheme()) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        applyTheme(event.matches ? "dark" : "light");
      });
  }
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
