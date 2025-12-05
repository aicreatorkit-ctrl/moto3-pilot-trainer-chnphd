
import { SafeAsyncStorage } from './asyncStoragePolyfill';
import { Platform } from 'react-native';

const STORAGE_PREFIX = '@moto3_trainer:';

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      const fullKey = `${STORAGE_PREFIX}${key}`;
      return await SafeAsyncStorage.getItem(fullKey);
    } catch (error) {
      console.error('[Storage] getItem error:', error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      const fullKey = `${STORAGE_PREFIX}${key}`;
      await SafeAsyncStorage.setItem(fullKey, value);
    } catch (error) {
      console.error('[Storage] setItem error:', error);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      const fullKey = `${STORAGE_PREFIX}${key}`;
      await SafeAsyncStorage.removeItem(fullKey);
    } catch (error) {
      console.error('[Storage] removeItem error:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      const keys = await SafeAsyncStorage.getAllKeys();
      const appKeys = keys.filter(key => key.startsWith(STORAGE_PREFIX));
      await SafeAsyncStorage.multiRemove(appKeys as string[]);
    } catch (error) {
      console.error('[Storage] clear error:', error);
    }
  },

  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await SafeAsyncStorage.getAllKeys();
      return keys
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .map(key => key.replace(STORAGE_PREFIX, ''));
    } catch (error) {
      console.error('[Storage] getAllKeys error:', error);
      return [];
    }
  },

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const value = await this.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('[Storage] getObject error:', error);
      return null;
    }
  },

  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      await this.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('[Storage] setObject error:', error);
    }
  },

  async exportData(): Promise<Record<string, any>> {
    try {
      const keys = await this.getAllKeys();
      const data: Record<string, any> = {};

      for (const key of keys) {
        const value = await this.getItem(key);
        if (value !== null) {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        }
      }

      return data;
    } catch (error) {
      console.error('[Storage] exportData error:', error);
      return {};
    }
  },

  async importData(data: Record<string, any>): Promise<void> {
    try {
      for (const [key, value] of Object.entries(data)) {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        await this.setItem(key, stringValue);
      }
    } catch (error) {
      console.error('[Storage] importData error:', error);
    }
  },
};

export default storage;
