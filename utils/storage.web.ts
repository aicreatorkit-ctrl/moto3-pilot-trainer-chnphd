
/**
 * Web-specific storage utilities using localStorage and IndexedDB
 */

import { errorLogger } from './errorLogger';

/**
 * Storage operation result
 */
interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

/**
 * Storage cache entry
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * In-memory cache for frequently accessed data
 */
class StorageCache {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private maxSize: number = 100;

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // Enforce max size
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new StorageCache();

/**
 * IndexedDB wrapper for large data storage on web
 */
class IndexedDBStorage {
  private dbName = 'Moto3TrainerDB';
  private storeName = 'appData';
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async getItem<T>(key: string): Promise<T | null> {
    await this.init();
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        console.error('IndexedDB get error:', request.error);
        reject(request.error);
      };
    });
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(value, key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('IndexedDB set error:', request.error);
        reject(request.error);
      };
    });
  }

  async removeItem(key: string): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('IndexedDB remove error:', request.error);
        reject(request.error);
      };
    });
  }

  async getAllKeys(): Promise<string[]> {
    await this.init();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAllKeys();

      request.onsuccess = () => {
        resolve(request.result as string[]);
      };

      request.onerror = () => {
        console.error('IndexedDB getAllKeys error:', request.error);
        reject(request.error);
      };
    });
  }

  async clear(): Promise<void> {
    await this.init();
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        console.error('IndexedDB clear error:', request.error);
        reject(request.error);
      };
    });
  }
}

const indexedDB_storage = new IndexedDBStorage();

/**
 * Web storage implementation using localStorage and IndexedDB
 */
export const storage = {
  /**
   * Get item from storage with caching
   */
  async getItem<T>(key: string, useCache: boolean = true): Promise<StorageResult<T>> {
    try {
      // Check cache first
      if (useCache) {
        const cached = cache.get<T>(key);
        if (cached !== null) {
          return { success: true, data: cached };
        }
      }

      // Try localStorage first (faster for small data)
      try {
        const value = localStorage.getItem(key);
        if (value !== null) {
          const data = JSON.parse(value) as T;
          
          // Update cache
          if (useCache) {
            cache.set(key, data);
          }

          return { success: true, data };
        }
      } catch (localStorageError) {
        console.log('localStorage not available, trying IndexedDB:', localStorageError);
      }

      // Fallback to IndexedDB for larger data
      const data = await indexedDB_storage.getItem<T>(key);
      
      if (data !== null && useCache) {
        cache.set(key, data);
      }

      return { success: true, data: data || undefined };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, `Storage getItem: ${key}`, 'medium');
      return { success: false, error: err };
    }
  },

  /**
   * Set item in storage and update cache
   */
  async setItem<T>(key: string, value: T): Promise<StorageResult<T>> {
    try {
      const jsonValue = JSON.stringify(value);
      
      // Try localStorage first
      try {
        localStorage.setItem(key, jsonValue);
      } catch (localStorageError) {
        console.log('localStorage full or not available, using IndexedDB:', localStorageError);
        // Fallback to IndexedDB
        await indexedDB_storage.setItem(key, value);
      }
      
      // Update cache
      cache.set(key, value);

      return { success: true, data: value };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, `Storage setItem: ${key}`, 'medium');
      return { success: false, error: err };
    }
  },

  /**
   * Remove item from storage and cache
   */
  async removeItem(key: string): Promise<StorageResult<void>> {
    try {
      // Remove from localStorage
      try {
        localStorage.removeItem(key);
      } catch (localStorageError) {
        console.log('localStorage error:', localStorageError);
      }

      // Remove from IndexedDB
      await indexedDB_storage.removeItem(key);
      
      cache.invalidate(key);
      return { success: true };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, `Storage removeItem: ${key}`, 'medium');
      return { success: false, error: err };
    }
  },

  /**
   * Get multiple items at once
   */
  async multiGet<T>(keys: string[]): Promise<StorageResult<Record<string, T>>> {
    try {
      const result: Record<string, T> = {};

      for (const key of keys) {
        const { data } = await this.getItem<T>(key);
        if (data !== undefined) {
          result[key] = data;
        }
      }

      return { success: true, data: result };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, 'Storage multiGet', 'medium');
      return { success: false, error: err };
    }
  },

  /**
   * Set multiple items at once
   */
  async multiSet(keyValuePairs: [string, unknown][]): Promise<StorageResult<void>> {
    try {
      for (const [key, value] of keyValuePairs) {
        await this.setItem(key, value);
      }

      return { success: true };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, 'Storage multiSet', 'medium');
      return { success: false, error: err };
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<StorageResult<void>> {
    try {
      // Clear localStorage
      try {
        localStorage.clear();
      } catch (localStorageError) {
        console.log('localStorage error:', localStorageError);
      }

      // Clear IndexedDB
      await indexedDB_storage.clear();
      
      cache.clear();
      return { success: true };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, 'Storage clear', 'high');
      return { success: false, error: err };
    }
  },

  /**
   * Get all keys
   */
  async getAllKeys(): Promise<StorageResult<string[]>> {
    try {
      const keys = new Set<string>();

      // Get keys from localStorage
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) keys.add(key);
        }
      } catch (localStorageError) {
        console.log('localStorage error:', localStorageError);
      }

      // Get keys from IndexedDB
      const indexedDBKeys = await indexedDB_storage.getAllKeys();
      indexedDBKeys.forEach(key => keys.add(key));

      return { success: true, data: Array.from(keys) };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, 'Storage getAllKeys', 'medium');
      return { success: false, error: err };
    }
  },

  /**
   * Invalidate cache for a key
   */
  invalidateCache(key: string): void {
    cache.invalidate(key);
  },

  /**
   * Clear all cache
   */
  clearCache(): void {
    cache.clear();
  },

  /**
   * Export all data as JSON (useful for backup/export)
   */
  async exportData(): Promise<StorageResult<Record<string, unknown>>> {
    try {
      const { data: keys } = await this.getAllKeys();
      if (!keys) {
        return { success: true, data: {} };
      }

      const exportData: Record<string, unknown> = {};
      
      for (const key of keys) {
        const { data } = await this.getItem(key);
        if (data !== undefined) {
          exportData[key] = data;
        }
      }

      return { success: true, data: exportData };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, 'Storage exportData', 'high');
      return { success: false, error: err };
    }
  },

  /**
   * Import data from JSON (useful for restore/import)
   */
  async importData(data: Record<string, unknown>): Promise<StorageResult<void>> {
    try {
      const entries = Object.entries(data);
      await this.multiSet(entries);
      return { success: true };
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      errorLogger.log(err, 'Storage importData', 'high');
      return { success: false, error: err };
    }
  },
};
