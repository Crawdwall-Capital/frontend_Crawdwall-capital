'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error | undefined }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // In a real app, you might log this to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultFallback = ({ error }: { error: Error | undefined }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
    <div className="max-w-md text-center">
      <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      {error && (
        <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <summary className="cursor-pointer font-medium">Error details</summary>
          <pre className="text-sm text-red-600 dark:text-red-400 mt-2 overflow-auto">
            {error.toString()}
          </pre>
        </details>
      )}
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
      >
        Reload Page
      </button>
    </div>
  </div>
);

export default ErrorBoundary;