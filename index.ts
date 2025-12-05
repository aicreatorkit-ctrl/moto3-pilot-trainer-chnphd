
// CRITICAL: Load polyfills FIRST before ANY other imports
// This must happen synchronously before expo-router or any other code runs

console.log('[Index] Starting app initialization...');

// Comprehensive polyfill setup
if (typeof window === 'undefined') {
  console.log('[Index] Creating global.window');
  // @ts-expect-error - Create window object
  global.window = global as any;
}

// Ensure window has all necessary event methods
if (typeof window !== 'undefined') {
  if (!window.addEventListener) {
    console.log('[Index] Adding window.addEventListener');
    // @ts-expect-error - Polyfill
    window.addEventListener = () => {};
  }
  
  if (!window.removeEventListener) {
    console.log('[Index] Adding window.removeEventListener');
    // @ts-expect-error - Polyfill
    window.removeEventListener = () => {};
  }

  if (!window.dispatchEvent) {
    console.log('[Index] Adding window.dispatchEvent');
    // @ts-expect-error - Polyfill
    window.dispatchEvent = () => true;
  }
}

// Document polyfill
if (typeof document === 'undefined') {
  console.log('[Index] Creating global.document');
  // @ts-expect-error - Polyfill
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
  };
}

// localStorage polyfill
if (typeof localStorage === 'undefined') {
  console.log('[Index] Creating global.localStorage');
  // @ts-expect-error - Polyfill
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

// sessionStorage polyfill
if (typeof sessionStorage === 'undefined') {
  console.log('[Index] Creating global.sessionStorage');
  // @ts-expect-error - Polyfill
  global.sessionStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

// location polyfill
if (typeof location === 'undefined') {
  console.log('[Index] Creating global.location');
  // @ts-expect-error - Polyfill
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
  };
}

// navigator polyfill
if (typeof navigator === 'undefined') {
  console.log('[Index] Creating global.navigator');
  // @ts-expect-error - Polyfill
  global.navigator = {
    userAgent: 'ReactNative',
    product: 'ReactNative',
    platform: 'ReactNative',
    language: 'en-US',
    languages: ['en-US'],
    onLine: true,
  };
}

// CustomEvent polyfill
if (typeof CustomEvent === 'undefined') {
  console.log('[Index] Creating global.CustomEvent');
  // @ts-expect-error - Polyfill
  global.CustomEvent = function CustomEvent(event: string, params?: any) {
    return {
      type: event,
      detail: params?.detail,
      bubbles: params?.bubbles || false,
      cancelable: params?.cancelable || false,
    };
  };
}

// Event polyfill
if (typeof Event === 'undefined') {
  console.log('[Index] Creating global.Event');
  // @ts-expect-error - Polyfill
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
  };
}

console.log('[Index] ✅ All polyfills loaded');
console.log('[Index] window:', typeof window);
console.log('[Index] window.addEventListener:', typeof window?.addEventListener);

// Now import expo-router entry
import 'expo-router/entry';
