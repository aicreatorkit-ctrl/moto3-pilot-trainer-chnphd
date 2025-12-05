
/**
 * Comprehensive polyfills for React Native environment
 * This ensures compatibility with libraries that expect browser APIs
 * IMPORTANT: This file must be imported before any other imports
 */

console.log('[Polyfills] Initializing...');

// Window polyfill
if (typeof window === 'undefined') {
  console.log('[Polyfills] Creating global.window');
  // @ts-expect-error - Create window
  global.window = global as any;
}

// Window event methods
if (typeof window !== 'undefined') {
  if (!window.addEventListener) {
    console.log('[Polyfills] Adding window.addEventListener');
    // @ts-expect-error - Polyfill
    window.addEventListener = (event: string, handler: any, options?: any) => {
      // Silent polyfill
    };
  }
  
  if (!window.removeEventListener) {
    console.log('[Polyfills] Adding window.removeEventListener');
    // @ts-expect-error - Polyfill
    window.removeEventListener = (event: string, handler: any, options?: any) => {
      // Silent polyfill
    };
  }

  if (!window.dispatchEvent) {
    console.log('[Polyfills] Adding window.dispatchEvent');
    // @ts-expect-error - Polyfill
    window.dispatchEvent = (event: any) => {
      return true;
    };
  }
}

// Document polyfill
if (typeof document === 'undefined') {
  console.log('[Polyfills] Creating global.document');
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
  console.log('[Polyfills] Creating global.localStorage');
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
  console.log('[Polyfills] Creating global.sessionStorage');
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
  console.log('[Polyfills] Creating global.location');
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
  console.log('[Polyfills] Creating global.navigator');
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
  console.log('[Polyfills] Creating global.CustomEvent');
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
  console.log('[Polyfills] Creating global.Event');
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

console.log('[Polyfills] ✅ All polyfills loaded');
console.log('[Polyfills] window:', typeof window);
console.log('[Polyfills] window.addEventListener:', typeof window?.addEventListener);

export {};
