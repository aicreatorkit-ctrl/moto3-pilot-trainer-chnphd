
/**
 * Polyfills for React Native environment
 * This ensures compatibility with libraries that expect browser APIs
 * IMPORTANT: This file must be imported before any other imports that might use these APIs
 */

// Polyfill for window object in React Native
if (typeof window === 'undefined') {
  // @ts-ignore - Create a minimal window object
  global.window = global as any;
}

// Polyfill for document object
if (typeof document === 'undefined') {
  // @ts-ignore
  global.document = {
    createElement: () => ({}),
    createElementNS: () => ({}),
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
  } as any;
}

// Polyfill for localStorage if needed
if (typeof localStorage === 'undefined') {
  // @ts-ignore
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

// Polyfill for sessionStorage if needed
if (typeof sessionStorage === 'undefined') {
  // @ts-ignore
  global.sessionStorage = {
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
  // @ts-ignore
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
  } as any;
}

// Polyfill for navigator object
if (typeof navigator === 'undefined') {
  // @ts-ignore
  global.navigator = {
    userAgent: 'ReactNative',
    product: 'ReactNative',
  } as any;
}

export {};
