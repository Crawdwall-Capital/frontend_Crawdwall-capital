'use client';

import { useState, useCallback } from 'react';
import { formatErrorMessage, showErrorToast, logger } from '@/lib/errorHandler';

interface UseErrorHandlerResult {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleApiError: (error: unknown) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function useErrorHandler(): UseErrorHandlerResult {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleApiError = useCallback((error: unknown) => {
    const errorMessage = formatErrorMessage(error);
    
    // Log the error
    logger.error('API error in component', {
      message: error.message,
      status: error.status,
      url: error.url,
      formattedMessage: errorMessage,
      timestamp: new Date().toISOString()
    });

    // Set error state
    setError(errorMessage);
    
    // Show user-friendly toast
    showErrorToast(errorMessage);
    
    // Clear loading state
    setIsLoading(false);
  }, []);

  return {
    error,
    setError,
    clearError,
    handleApiError,
    isLoading,
    setIsLoading
  };
}