
/**
 * Error logging utility
 */

export const setupErrorLogging = () => {
  // Setup global error handler
  const originalErrorHandler = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.log('Global error:', error);
    console.log('Is fatal:', isFatal);
    
    // Call original handler
    if (originalErrorHandler) {
      originalErrorHandler(error, isFatal);
    }
  });

  // Log unhandled promise rejections
  if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
      console.log('Unhandled promise rejection:', event.reason);
    });
  }
};

export const logError = (error: Error, context?: string) => {
  console.log(`Error${context ? ` in ${context}` : ''}:`, error);
};

export const logWarning = (message: string, context?: string) => {
  console.log(`Warning${context ? ` in ${context}` : ''}:`, message);
};

export const logInfo = (message: string, context?: string) => {
  console.log(`Info${context ? ` in ${context}` : ''}:`, message);
};
