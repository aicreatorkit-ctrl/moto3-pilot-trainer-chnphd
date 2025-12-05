
// Import polyfills FIRST and SYNCHRONOUSLY before anything else
import { Platform } from 'react-native';

// Polyfill for window object in React Native
if (typeof window === 'undefined') {
  // @ts-expect-error - Create a minimal window object
  global.window = global as any;
}

// Add addEventListener and removeEventListener to window if they don't exist
if (typeof window !== 'undefined') {
  if (typeof window.addEventListener === 'undefined') {
    // @ts-expect-error - Add addEventListener polyfill
    window.addEventListener = () => {
      console.log('addEventListener polyfill called');
    };
  }
  
  if (typeof window.removeEventListener === 'undefined') {
    // @ts-expect-error - Add removeEventListener polyfill
    window.removeEventListener = () => {
      console.log('removeEventListener polyfill called');
    };
  }

  if (typeof window.dispatchEvent === 'undefined') {
    // @ts-expect-error - Add dispatchEvent polyfill
    window.dispatchEvent = () => {
      console.log('dispatchEvent polyfill called');
      return true;
    };
  }
}

// Polyfill for document object
if (typeof document === 'undefined') {
  // @ts-expect-error - Create a minimal document object
  global.document = {
    createElement: () => ({}),
    createElementNS: () => ({}),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  } as any;
}

// Polyfill for localStorage if needed
if (typeof localStorage === 'undefined') {
  // @ts-expect-error - Create a minimal localStorage object
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

// Polyfill for location object
if (typeof location === 'undefined') {
  // @ts-expect-error - Create a minimal location object
  global.location = {
    href: '',
    origin: '',
    protocol: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    hash: '',
    reload: () => {},
    replace: () => {},
    assign: () => {},
  } as any;
}

// Polyfill for navigator object
if (typeof navigator === 'undefined') {
  // @ts-expect-error - Create a minimal navigator object
  global.navigator = {
    userAgent: 'ReactNative',
    product: 'ReactNative',
    platform: 'ReactNative',
    language: 'en-US',
    languages: ['en-US'],
    onLine: true,
  } as any;
}

console.log('Polyfills loaded successfully in index.ts');

// Now import expo-router entry
import 'expo-router/entry';
