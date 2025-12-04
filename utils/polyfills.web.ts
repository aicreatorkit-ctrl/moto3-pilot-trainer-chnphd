
/**
 * Web-specific polyfills
 * This file ensures compatibility with web APIs
 */

// Ensure window object exists
if (typeof window === 'undefined') {
  // @ts-expect-error - Create a minimal window object
  global.window = global as any;
}

// Polyfill for localStorage (should already exist in browser)
if (typeof localStorage === 'undefined') {
  console.warn('localStorage not available in this environment');
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

// Polyfill for sessionStorage (should already exist in browser)
if (typeof sessionStorage === 'undefined') {
  console.warn('sessionStorage not available in this environment');
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

// Polyfill for IndexedDB (should already exist in browser)
if (typeof indexedDB === 'undefined') {
  console.warn('IndexedDB not available in this environment');
}

// Ensure proper event handling
if (typeof window !== 'undefined') {
  if (typeof window.addEventListener === 'undefined') {
    console.warn('addEventListener not available');
  }
  
  if (typeof window.removeEventListener === 'undefined') {
    console.warn('removeEventListener not available');
  }

  if (typeof window.dispatchEvent === 'undefined') {
    console.warn('dispatchEvent not available');
  }
}

// Service Worker registration for PWA support
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

console.log('Web polyfills loaded successfully');

export {};
