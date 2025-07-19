import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Cross-platform secure storage utility
 * Uses expo-secure-store on mobile and localStorage on web
 */
class CrossPlatformStorage {
  private isWeb = Platform.OS === 'web';

  private isLocalStorageAvailable(): boolean {
    try {
      return (
        typeof window !== 'undefined' &&
        window.localStorage !== undefined &&
        window.localStorage !== null
      );
    } catch {
      return false;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (this.isWeb) {
        // Web: Use localStorage
        if (this.isLocalStorageAvailable()) {
          return localStorage.getItem(key);
        }
        console.warn('localStorage is not available');
        return null;
      } else {
        // Mobile: Use SecureStore
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      // Accept any value and always stringify
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      if (this.isWeb) {
        // Web: Use localStorage
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem(key, stringValue);
        } else {
          console.warn('localStorage is not available, unable to store item');
        }
      } else {
        // Mobile: Use SecureStore
        await SecureStore.setItemAsync(key, stringValue);
      }
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  }

  async deleteItem(key: string): Promise<void> {
    try {
      if (this.isWeb) {
        // Web: Use localStorage
        if (this.isLocalStorageAvailable()) {
          localStorage.removeItem(key);
        }
      } else {
        // Mobile: Use SecureStore
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`Error deleting item ${key}:`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      if (this.isWeb) {
        // Web: Clear app-specific localStorage keys
        if (this.isLocalStorageAvailable()) {
          const keys = Object.keys(localStorage);
          const appKeys = keys.filter(
            key =>
              key.includes('access_token') ||
              key.includes('refresh_token') ||
              key.startsWith('tani_pintar_') // Use app prefix if you have one
          );
          appKeys.forEach(key => localStorage.removeItem(key));
        }
      } else {
        // Mobile: SecureStore doesn't have a clear all method
        // Manually delete known keys
        await this.deleteItem('access_token');
        await this.deleteItem('refresh_token');
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  /**
   * Check if storage is available and working
   */
  async isAvailable(): Promise<boolean> {
    try {
      const testKey = '__storage_test__';
      const testValue = 'test';

      await this.setItem(testKey, testValue);
      const retrieved = await this.getItem(testKey);
      await this.deleteItem(testKey);

      return retrieved === testValue;
    } catch {
      return false;
    }
  }
}

export const crossPlatformStorage = new CrossPlatformStorage();
