
/**
 * Polyfills for React Native environment
 * This ensures compatibility with libraries that expect browser APIs
 * IMPORTANT: This file must be imported before any other imports that might use these APIs
 */

// Polyfill for window object in React Native
if (typeof window === 'undefined') {
  // @ts-expect-error - Create a minimal window object
  global.window = global as any;
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

// Polyfill for sessionStorage if needed
if (typeof sessionStorage === 'undefined') {
  // @ts-expect-error - Create a minimal sessionStorage object
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
  } as any;
}

// Polyfill for navigator object
if (typeof navigator === 'undefined') {
  // @ts-expect-error - Create a minimal navigator object
  global.navigator = {
    userAgent: 'ReactNative',
    product: 'ReactNative',
  } as any;
}

export {};
