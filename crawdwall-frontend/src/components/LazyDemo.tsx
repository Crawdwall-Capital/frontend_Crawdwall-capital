'use client';

import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Demo lazy component
const HeavyComponent = lazy(() => 
  Promise.resolve({
    default: () => (
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">Lazy Loaded Component</h3>
        <p className="text-blue-600">This component was loaded lazily!</p>
      </div>
    )
  })
);

export function LazyDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Lazy Loading Demo</h2>
      <Suspense fallback={
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading heavy component...</span>
        </div>
      }>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}