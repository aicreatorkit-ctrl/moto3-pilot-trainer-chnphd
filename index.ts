
// CRITICAL: Load polyfills FIRST before ANY other imports
// This must happen synchronously before expo-router or any other code runs

console.log('[Index] Starting polyfill initialization...');

// Polyfill for window object in React Native
if (typeof window === 'undefined') {
  console.log('[Index] window is undefined, creating global.window');
  // @ts-expect-error - Create a minimal window object
  global.window = global as any;
} else {
  console.log('[Index] window already exists');
}

// Add addEventListener and removeEventListener to window if they don't exist
if (typeof window !== 'undefined') {
  if (typeof window.addEventListener === 'undefined') {
    console.log('[Index] Adding window.addEventListener');
    // @ts-expect-error - Add addEventListener polyfill
    window.addEventListener = () => {
      // Silent polyfill
    };
  }
  
  if (typeof window.removeEventListener === 'undefined') {
    console.log('[Index] Adding window.removeEventListener');
    // @ts-expect-error - Add removeEventListener polyfill
    window.removeEventListener = () => {
      // Silent polyfill
    };
  }

  if (typeof window.dispatchEvent === 'undefined') {
    console.log('[Index] Adding window.dispatchEvent');
    // @ts-expect-error - Add dispatchEvent polyfill
    window.dispatchEvent = () => {
      return true;
    };
  }
}

// Polyfill for document object
if (typeof document === 'undefined') {
  console.log('[Index] Creating global.document');
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
}

// Polyfill for localStorage if needed
if (typeof localStorage === 'undefined') {
  console.log('[Index] Creating global.localStorage');
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
  console.log('[Index] Creating global.sessionStorage');
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
  console.log('[Index] Creating global.location');
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
}

// Polyfill for navigator object
if (typeof navigator === 'undefined') {
  console.log('[Index] Creating global.navigator');
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

// Polyfill for CustomEvent if needed
if (typeof CustomEvent === 'undefined') {
  console.log('[Index] Creating global.CustomEvent');
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
}

// Polyfill for Event if needed
if (typeof Event === 'undefined') {
  console.log('[Index] Creating global.Event');
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
}

console.log('[Index] ✅ All polyfills loaded successfully');
console.log('[Index] window type:', typeof window);
console.log('[Index] window.addEventListener type:', typeof window?.addEventListener);

// Now import expo-router entry
import 'expo-router/entry';
