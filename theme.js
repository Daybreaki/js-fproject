const themeStorageKey = 'bookendTheme';
const themeClass = 'dark-mode';

function getStoredTheme() {
  return localStorage.getItem(themeStorageKey);
}

function getPreferredTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateThemeButton(theme) {
  const button = document.getElementById('themeToggleBtn');
  if (!button) return;
  button.textContent = theme === 'dark' ? '☀️' : '🌙';
  button.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add(themeClass);
  } else {
    document.body.classList.remove(themeClass);
  }
  updateThemeButton(theme);
  localStorage.setItem(themeStorageKey, theme);
}

function toggleTheme() {
  const current = document.body.classList.contains(themeClass) ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function createThemeToggleButton() {
  const button = document.createElement('button');
  button.id = 'themeToggleBtn';
  button.className = 'theme-toggle-btn';
  button.type = 'button';
  button.addEventListener('click', toggleTheme);
  document.body.appendChild(button);
}

function initTheme() {
  createThemeToggleButton();
  applyTheme(getPreferredTheme());
}

document.addEventListener('DOMContentLoaded', initTheme);