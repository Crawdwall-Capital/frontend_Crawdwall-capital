'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { ReactNode, ErrorInfo } from 'react';
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
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
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