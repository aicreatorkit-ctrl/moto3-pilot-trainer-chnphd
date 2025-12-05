
// CRITICAL: Load polyfills FIRST before ANY other imports
// This must happen synchronously before expo-router or any other code runs

// Polyfill for window object in React Native
if (typeof window === 'undefined') {
  // @ts-expect-error - Create a minimal window object
  global.window = global as any;
  console.log('[Index] Created global.window');
}

// Add addEventListener and removeEventListener to window if they don't exist
if (typeof window !== 'undefined') {
  if (typeof window.addEventListener === 'undefined') {
    // @ts-expect-error - Add addEventListener polyfill
    window.addEventListener = () => {
      // Silent polyfill
    };
    console.log('[Index] Added window.addEventListener');
  }
  
  if (typeof window.removeEventListener === 'undefined') {
    // @ts-expect-error - Add removeEventListener polyfill
    window.removeEventListener = () => {
      // Silent polyfill
    };
    console.log('[Index] Added window.removeEventListener');
  }

  if (typeof window.dispatchEvent === 'undefined') {
    // @ts-expect-error - Add dispatchEvent polyfill
    window.dispatchEvent = () => {
      return true;
    };
    console.log('[Index] Added window.dispatchEvent');
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
    body: {},
    head: {},
  } as any;
  console.log('[Index] Created global.document');
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
  console.log('[Index] Created global.localStorage');
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
  console.log('[Index] Created global.sessionStorage');
}

// Polyfill for location object
if (typeof location === 'undefined') {
  // @ts-expect-error - Create a minimal location object
  global.location = {
    href: '',
    origin: '',
    protocol: 'https:',
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
  console.log('[Index] Created global.location');
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
  console.log('[Index] Created global.navigator');
}

// Polyfill for CustomEvent if needed
if (typeof CustomEvent === 'undefined') {
  // @ts-expect-error - Create a minimal CustomEvent constructor
  global.CustomEvent = function CustomEvent(event: string, params?: any) {
    const evt = {
      type: event,
      detail: params?.detail,
      bubbles: params?.bubbles || false,
      cancelable: params?.cancelable || false,
    };
    return evt;
  } as any;
  console.log('[Index] Created global.CustomEvent');
}

// Polyfill for Event if needed
if (typeof Event === 'undefined') {
  // @ts-expect-error - Create a minimal Event constructor
  global.Event = function Event(type: string, eventInitDict?: any) {
    return {
      type,
      bubbles: eventInitDict?.bubbles || false,
      cancelable: eventInitDict?.cancelable || false,
      composed: eventInitDict?.composed || false,
      target: null,
      currentTarget: null,
      preventDefault: () => {},
      stopPropagation: () => {},
      stopImmediatePropagation: () => {},
    };
  } as any;
  console.log('[Index] Created global.Event');
}

console.log('[Index] ✅ All polyfills loaded successfully');

// Now import expo-router entry
import 'expo-router/entry';
