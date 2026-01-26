'use client';

import React, { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { logger } from '@/lib/errorHandler';

interface ErrorHandlerWrapperProps {
  children: ReactNode;
  onError?: (error: Error) => void;
  fallback?: ReactNode;
}

export function ErrorHandlerWrapper({ 
  children, 
  onError,
  fallback 
}: ErrorHandlerWrapperProps): ReactNode {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log the error
    logger.error('React component error', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });

    // Call custom error handler if provided
    if (onError) {
      onError(error);
    }
  };

  return (
    <ErrorBoundary 
      onError={handleError}
      fallback={fallback}
    >
      {children}
    </ErrorBoundary>
  );
}