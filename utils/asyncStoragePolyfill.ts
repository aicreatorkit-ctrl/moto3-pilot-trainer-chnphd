
/**
 * AsyncStorage polyfill wrapper
 * Ensures window is defined before AsyncStorage is used
 * This file should only be imported AFTER polyfills are loaded
 */

console.log('[AsyncStorage Polyfill] Module loading...');
console.log('[AsyncStorage Polyfill] window type:', typeof window);

// Double-check that window exists (should be created by index.ts polyfills)
if (typeof window === 'undefined') {
  console.warn('[AsyncStorage Polyfill] window is undefined, creating it now');
  // @ts-expect-error - Create minimal window
  global.window = global as any;
}

// Add required window methods if they don't exist
if (typeof window !== 'undefined') {
  if (typeof window.addEventListener === 'undefined') {
    console.log('[AsyncStorage Polyfill] Adding window.addEventListener');
    // @ts-expect-error - Add addEventListener
    window.addEventListener = () => {};
  }
  if (typeof window.removeEventListener === 'undefined') {
    console.log('[AsyncStorage Polyfill] Adding window.removeEventListener');
    // @ts-expect-error - Add removeEventListener
    window.removeEventListener = () => {};
  }
  if (typeof window.dispatchEvent === 'undefined') {
    console.log('[AsyncStorage Polyfill] Adding window.dispatchEvent');
    // @ts-expect-error - Add dispatchEvent
    window.dispatchEvent = () => true;
  }
}

// Now safely import AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('[AsyncStorage Polyfill] AsyncStorage imported successfully');

export default AsyncStorage;
