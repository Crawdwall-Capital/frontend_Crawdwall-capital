import { logger } from './logger';

export class ApiError extends Error {
  public status?: number;
  public data?: unknown;
  public url?: string;

  constructor(message: string, status?: number, data?: unknown, url?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.url = url;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  public errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Retry configuration
interface RetryConfig {
  maxRetries: number;
  delay: number;
  backoffMultiplier: number;
}

const defaultRetryConfig: RetryConfig = {
  maxRetries: 3,
  delay: 1000, // 1 second
  backoffMultiplier: 2,
};

// Retry function with exponential backoff
export async function retry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = defaultRetryConfig
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on validation errors
      if (error instanceof ValidationError) {
        throw error;
      }

      // Log the error
      logger.warn(`Attempt ${attempt + 1} failed`, {
        error: (error as Error).message,
        url: (error as any)?.url,
        status: (error as any)?.status,
        attempt,
      });

      // If this was the last attempt, throw the error
      if (attempt === config.maxRetries) {
        logger.error('Max retries exceeded', {
          error: (error as Error).message,
          url: (error as any)?.url,
          status: (error as any)?.status,
          attempts: config.maxRetries + 1,
        });
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = config.delay * Math.pow(config.backoffMultiplier, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Error handling utility for API calls
export async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  options: {
    retry?: boolean;
    retryConfig?: RetryConfig;
    logError?: boolean;
  } = {}
): Promise<T> {
  const { retry: shouldRetry = true, retryConfig, logError = true } = options;

  try {
    if (shouldRetry) {
      return await retry(apiCall, retryConfig);
    } else {
      return await apiCall();
    }
  } catch (error) {
    if (logError) {
      logger.error('API call failed', {
        error: (error as Error).message,
        stack: (error as Error).stack,
        url: (error as any)?.url,
        status: (error as any)?.status,
      });
    }

    // Re-throw the error with more context
    throw error;
  }
}

// Generic error message formatter
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return 'Session expired. Please sign in again.';
    }
    if (error.status === 403) {
      return 'Access denied. You do not have permission to perform this action.';
    }
    if (error.status === 404) {
      return 'Resource not found.';
    }
    if (error.status && error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    return error.message || 'An API error occurred.';
  }

  if (error instanceof NetworkError) {
    return 'Network error. Please check your connection and try again.';
  }

  if (error instanceof ValidationError) {
    return 'Validation failed. Please check your input.';
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred.';
}

// Error toast notification helper
export function showErrorToast(message: string): void {
  // In a real app, this would integrate with a toast notification library
  console.error('Error Toast:', message);
  alert(`Error: ${message}`); // Fallback implementation
}

// Export the logger instance
export { logger } from './logger';