
/**
 * AsyncStorage polyfill that ensures window exists before any operations
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ensure window exists
const ensureWindow = () => {
  if (typeof window === 'undefined') {
    console.warn('[AsyncStorage Polyfill] window undefined, creating it');
    // @ts-expect-error - Create window
    global.window = global as any;
  }
  
  if (typeof window !== 'undefined') {
    if (!window.addEventListener) {
      // @ts-expect-error - Polyfill
      window.addEventListener = () => {};
    }
    if (!window.removeEventListener) {
      // @ts-expect-error - Polyfill
      window.removeEventListener = () => {};
    }
    if (!window.dispatchEvent) {
      // @ts-expect-error - Polyfill
      window.dispatchEvent = () => true;
    }
  }
};

export const SafeAsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      ensureWindow();
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('[SafeAsyncStorage] getItem error:', error);
      return null;
    }
  },
  
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      ensureWindow();
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('[SafeAsyncStorage] setItem error:', error);
    }
  },
  
  removeItem: async (key: string): Promise<void> => {
    try {
      ensureWindow();
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('[SafeAsyncStorage] removeItem error:', error);
    }
  },
  
  clear: async (): Promise<void> => {
    try {
      ensureWindow();
      await AsyncStorage.clear();
    } catch (error) {
      console.error('[SafeAsyncStorage] clear error:', error);
    }
  },
  
  getAllKeys: async (): Promise<readonly string[]> => {
    try {
      ensureWindow();
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('[SafeAsyncStorage] getAllKeys error:', error);
      return [];
    }
  },
  
  multiGet: async (keys: string[]): Promise<readonly [string, string | null][]> => {
    try {
      ensureWindow();
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('[SafeAsyncStorage] multiGet error:', error);
      return [];
    }
  },
  
  multiSet: async (keyValuePairs: [string, string][]): Promise<void> => {
    try {
      ensureWindow();
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('[SafeAsyncStorage] multiSet error:', error);
    }
  },
  
  multiRemove: async (keys: string[]): Promise<void> => {
    try {
      ensureWindow();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('[SafeAsyncStorage] multiRemove error:', error);
    }
  },
};

export default SafeAsyncStorage;
