const STORAGE_PREFIX = 'campusprep_';

/** Save data to LocalStorage with prefix */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_PREFIX + key, serialized);
  } catch (error) {
    console.error(`Error saving to LocalStorage [${key}]:`, error);
  }
}

/** Load data from LocalStorage */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const serialized = localStorage.getItem(STORAGE_PREFIX + key);
    if (serialized === null) return defaultValue;
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error(`Error loading from LocalStorage [${key}]:`, error);
    return defaultValue;
  }
}

/** Remove data from LocalStorage */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error(`Error removing from LocalStorage [${key}]:`, error);
  }
}

/** Clear all CampusPrep data from LocalStorage */
export function clearAllStorage(): void {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
  } catch (error) {
    console.error('Error clearing LocalStorage:', error);
  }
}
