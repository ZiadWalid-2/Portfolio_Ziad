/**
 * @file storage.js
 * Safe LocalStorage wrapper with error handling and in-memory fallback
 */

const memoryStore = new Map();

export const storage = {
  /**
   * Get an item from localStorage with safe fallback
   * @param {string} key 
   * @param {any} defaultValue 
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`[storage] Error reading "${key}" from localStorage. Using fallback:`, error);
    }
    return memoryStore.has(key) ? memoryStore.get(key) : defaultValue;
  },

  /**
   * Set an item in localStorage
   * @param {string} key 
   * @param {any} value 
   * @returns {boolean} Success status
   */
  set(key, value) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      }
    } catch (error) {
      console.warn(`[storage] Error saving "${key}" to localStorage. Falling back to memory:`, error);
    }
    memoryStore.set(key, value);
    return true;
  },

  /**
   * Remove an item from localStorage
   * @param {string} key 
   */
  remove(key) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`[storage] Error removing "${key}":`, error);
    }
    memoryStore.delete(key);
  }
};
