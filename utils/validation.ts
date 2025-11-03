
/**
 * Data validation utilities for form inputs and data integrity
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true };
}

/**
 * Validate number range
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string = 'Value'
): ValidationResult {
  if (isNaN(value)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }
  
  if (value < min || value > max) {
    return { isValid: false, error: `${fieldName} must be between ${min} and ${max}` };
  }
  
  return { isValid: true };
}

/**
 * Validate required field
 */
export function validateRequired(value: any, fieldName: string = 'Field'): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
}

/**
 * Validate HRV value (typical range: 20-200ms)
 */
export function validateHRV(hrv: number): ValidationResult {
  return validateNumberRange(hrv, 10, 300, 'HRV');
}

/**
 * Validate heart rate (typical range: 40-220 bpm)
 */
export function validateHeartRate(hr: number): ValidationResult {
  return validateNumberRange(hr, 30, 250, 'Heart Rate');
}

/**
 * Validate weight (kg)
 */
export function validateWeight(weight: number): ValidationResult {
  return validateNumberRange(weight, 30, 200, 'Weight');
}

/**
 * Validate rating scale (1-10)
 */
export function validateRating(rating: number): ValidationResult {
  return validateNumberRange(rating, 1, 10, 'Rating');
}

/**
 * Validate date is not in future
 */
export function validatePastDate(date: Date): ValidationResult {
  const now = new Date();
  
  if (date > now) {
    return { isValid: false, error: 'Date cannot be in the future' };
  }
  
  return { isValid: true };
}

/**
 * Sanitize text input
 */
export function sanitizeText(text: string): string {
  return text.trim().replace(/[<>]/g, '');
}

/**
 * Validate and parse number input
 */
export function parseNumberInput(input: string): number | null {
  const cleaned = input.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? null : parsed;
}
