/**
 * @file theme.js
 * Dark Mode controller respecting system preferences, localStorage, and accessibility
 */

import { storage } from './storage.js';

const THEME_STORAGE_KEY = 'ziad_portfolio_theme';

export function initTheme() {
  const themeToggleBtn = document.querySelector('#theme-toggle');
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * Determine the current preferred theme
   * @returns {'light' | 'dark'}
   */
  function getPreferredTheme() {
    const saved = storage.get(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return mediaQuery.matches ? 'dark' : 'light';
  }

  /**
   * Apply theme to DOM and update toggle accessibility
   * @param {'light' | 'dark'} theme 
   */
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-pressed', String(isDark));
      themeToggleBtn.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );

      const iconSpan = themeToggleBtn.querySelector('.theme-icon');
      const textSpan = themeToggleBtn.querySelector('.theme-label');

      if (iconSpan) {
        iconSpan.textContent = isDark ? '☀️' : '🌙';
      }
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light' : 'Dark';
      }
    }
  }

  // Initial theme application
  applyTheme(getPreferredTheme());

  // Toggle button event listener
  themeToggleBtn?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    applyTheme(next);
    storage.set(THEME_STORAGE_KEY, next);
  });

  // Listen to OS preference changes if no manual preference has been stored
  mediaQuery.addEventListener('change', (e) => {
    const saved = storage.get(THEME_STORAGE_KEY);
    if (!saved) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}
