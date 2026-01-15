import { crossPlatformStorage } from './crossPlatformStorage';

const SEARCH_HISTORY_KEY = 'tani_pintar_search_history';
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

/**
 * Get all search history items
 */
const getHistory = async (): Promise<SearchHistoryItem[]> => {
  try {
    const data = await crossPlatformStorage.getItem(SEARCH_HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

/**
 * Add a search query to history
 * Removes duplicates and keeps only the most recent MAX_HISTORY_ITEMS
 */
const addToHistory = async (query: string): Promise<void> => {
  if (!query.trim()) return;

  try {
    const history = await getHistory();

    // Remove existing entry with same query (case insensitive)
    const filteredHistory = history.filter(
      item => item.query.toLowerCase() !== query.toLowerCase()
    );

    // Add new item at the beginning
    const newHistory: SearchHistoryItem[] = [
      { query: query.trim(), timestamp: Date.now() },
      ...filteredHistory,
    ].slice(0, MAX_HISTORY_ITEMS);

    await crossPlatformStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(newHistory)
    );
  } catch {
    // Silently fail
  }
};

/**
 * Remove a specific item from history
 */
const removeFromHistory = async (query: string): Promise<void> => {
  try {
    const history = await getHistory();
    const filteredHistory = history.filter(
      item => item.query.toLowerCase() !== query.toLowerCase()
    );
    await crossPlatformStorage.setItem(
      SEARCH_HISTORY_KEY,
      JSON.stringify(filteredHistory)
    );
  } catch {
    // Silently fail
  }
};

/**
 * Clear all search history
 */
const clearHistory = async (): Promise<void> => {
  try {
    await crossPlatformStorage.deleteItem(SEARCH_HISTORY_KEY);
  } catch {
    // Silently fail
  }
};

export const searchHistory = {
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
};
