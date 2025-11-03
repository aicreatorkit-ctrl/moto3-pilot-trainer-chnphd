
/**
 * Enhanced storage utility with offline support and data synchronization
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { cache } from './cache';

interface StorageOptions {
  useCache?: boolean;
  cacheTTL?: number;
}

class StorageManager {
  private pendingWrites: Map<string, any>;
  private syncQueue: Array<{ key: string; value: any }>;
  private isSyncing: boolean;

  constructor() {
    this.pendingWrites = new Map();
    this.syncQueue = [];
    this.isSyncing = false;
  }

  /**
   * Get data from storage with optional caching
   */
  async get<T>(key: string, options: StorageOptions = {}): Promise<T | null> {
    const { useCache = true, cacheTTL } = options;

    // Check cache first
    if (useCache) {
      const cached = cache.get<T>(key);
      if (cached !== null) {
        console.log(`Cache hit for key: ${key}`);
        return cached;
      }
    }

    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsed = JSON.parse(value) as T;
        
        // Store in cache
        if (useCache) {
          cache.set(key, parsed, cacheTTL);
        }
        
        return parsed;
      }
      return null;
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set data in storage with automatic cache update
   */
  async set<T>(key: string, value: T, options: StorageOptions = {}): Promise<boolean> {
    const { useCache = true, cacheTTL } = options;

    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      
      // Update cache
      if (useCache) {
        cache.set(key, value, cacheTTL);
      }
      
      return true;
    } catch (error) {
      console.error(`Error setting data for key ${key}:`, error);
      
      // Queue for later sync if offline
      this.syncQueue.push({ key, value });
      return false;
    }
  }

  /**
   * Remove data from storage and cache
   */
  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      cache.delete(key);
      return true;
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get multiple keys at once
   */
  async getMultiple<T>(keys: string[]): Promise<Record<string, T | null>> {
    const result: Record<string, T | null> = {};
    
    try {
      const values = await AsyncStorage.multiGet(keys);
      
      values.forEach(([key, value]) => {
        if (value !== null) {
          try {
            result[key] = JSON.parse(value) as T;
            cache.set(key, result[key]);
          } catch (error) {
            console.error(`Error parsing value for key ${key}:`, error);
            result[key] = null;
          }
        } else {
          result[key] = null;
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error getting multiple keys:', error);
      return result;
    }
  }

  /**
   * Set multiple keys at once
   */
  async setMultiple(items: Array<[string, any]>): Promise<boolean> {
    try {
      const stringItems = items.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      
      await AsyncStorage.multiSet(stringItems as [string, string][]);
      
      // Update cache
      items.forEach(([key, value]) => {
        cache.set(key, value);
      });
      
      return true;
    } catch (error) {
      console.error('Error setting multiple keys:', error);
      return false;
    }
  }

  /**
   * Clear all storage and cache
   */
  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      cache.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  /**
   * Get all keys in storage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  /**
   * Sync pending writes (for offline support)
   */
  async syncPendingWrites(): Promise<void> {
    if (this.isSyncing || this.syncQueue.length === 0) {
      return;
    }

    this.isSyncing = true;
    console.log(`Syncing ${this.syncQueue.length} pending writes...`);

    const itemsToSync = [...this.syncQueue];
    this.syncQueue = [];

    for (const { key, value } of itemsToSync) {
      try {
        await this.set(key, value);
        console.log(`Synced key: ${key}`);
      } catch (error) {
        console.error(`Failed to sync key ${key}:`, error);
        // Re-add to queue
        this.syncQueue.push({ key, value });
      }
    }

    this.isSyncing = false;
  }

  /**
   * Get storage usage statistics
   */
  async getStorageStats(): Promise<{
    totalKeys: number;
    cacheStats: any;
    pendingWrites: number;
  }> {
    const keys = await this.getAllKeys();
    return {
      totalKeys: keys.length,
      cacheStats: cache.getStats(),
      pendingWrites: this.syncQueue.length,
    };
  }
}

// Export singleton instance
export const storage = new StorageManager();
