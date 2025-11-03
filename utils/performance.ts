
/**
 * Performance monitoring and optimization utilities
 */

import { InteractionManager } from 'react-native';

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Run task after interactions complete (for better performance)
 */
export function runAfterInteractions<T>(
  task: () => T | Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    InteractionManager.runAfterInteractions(() => {
      try {
        const result = task();
        if (result instanceof Promise) {
          result.then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * Measure execution time of a function
 */
export async function measurePerformance<T>(
  name: string,
  task: () => T | Promise<T>
): Promise<T> {
  const start = Date.now();
  
  try {
    const result = await task();
    const duration = Date.now() - start;
    console.log(`⚡ Performance [${name}]: ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`❌ Performance [${name}] failed after ${duration}ms:`, error);
    throw error;
  }
}

/**
 * Batch multiple async operations
 */
export async function batchAsync<T>(
  operations: Array<() => Promise<T>>,
  batchSize: number = 5
): Promise<T[]> {
  const results: T[] = [];
  
  for (let i = 0; i < operations.length; i += batchSize) {
    const batch = operations.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(op => op()));
    results.push(...batchResults);
  }
  
  return results;
}

/**
 * Memoize function results
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy load component or data
 */
export function lazyLoad<T>(
  loader: () => Promise<T>,
  fallback?: T
): () => Promise<T> {
  let cached: T | null = null;
  let loading: Promise<T> | null = null;

  return async () => {
    if (cached !== null) {
      return cached;
    }

    if (loading !== null) {
      return loading;
    }

    loading = loader();
    
    try {
      cached = await loading;
      return cached;
    } catch (error) {
      console.error('Lazy load failed:', error);
      if (fallback !== undefined) {
        cached = fallback;
        return fallback;
      }
      throw error;
    } finally {
      loading = null;
    }
  };
}

/**
 * Request animation frame wrapper
 */
export function requestAnimationFrameAsync(): Promise<number> {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}

/**
 * Chunk array for batch processing
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
