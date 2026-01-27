'use client';

import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Loading spinner component
const LoadingSpinner = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{message}</span>
  </div>
);

// Lazy load heavy components
export const LazyFileUpload = lazy(() => 
  import('./FileUpload')
);

export const LazyHeroSection = lazy(() => 
  import('./sections/HeroSection')
);

export const LazyServicesCard = lazy(() => 
  import('./sections/ServicesCard')
);

export const LazyWhyCrawdwallFeaturesSection = lazy(() => 
  import('./sections/WhyCrawdwallFeaturesSection')
);

// Export wrapped components with suspense
export const FileUpload = (props: unknown) => (
  <Suspense fallback={<LoadingSpinner message="Loading file uploader..." />}>
    <LazyFileUpload {...props} />
  </Suspense>
);

export const HeroSection = (props: unknown) => (
  <Suspense fallback={<LoadingSpinner message="Loading hero section..." />}>
    <LazyHeroSection {...props} />
  </Suspense>
);

export const ServicesCard = (props: unknown) => (
  <Suspense fallback={<LoadingSpinner message="Loading services..." />}>
    <LazyServicesCard {...props} />
  </Suspense>
);

export const WhyCrawdwallFeaturesSection = (props: unknown) => (
  <Suspense fallback={<LoadingSpinner message="Loading features..." />}>
    <LazyWhyCrawdwallFeaturesSection {...props} />
  </Suspense>
);