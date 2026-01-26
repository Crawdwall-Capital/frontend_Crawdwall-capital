'use client';

import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Create loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    <span className="ml-3 text-gray-600 dark:text-gray-400">Loading dashboard...</span>
  </div>
);

// Lazy load all dashboard components
export const LazyInvestorDashboard = lazy(() => 
  import('../app/investor/dashboard/page')
);

export const LazyAdminDashboard = lazy(() => 
  import('../app/admin/dashboard/page')
);

export const LazyOfficerDashboard = lazy(() => 
  import('../app/officer/dashboard/page')
);

export const LazyOrganizerDashboard = lazy(() => 
  import('../app/organizer/dashboard/page')
);

// Export wrapped components with suspense
export const InvestorDashboard = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyInvestorDashboard />
  </Suspense>
);

export const AdminDashboard = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyAdminDashboard />
  </Suspense>
);

export const OfficerDashboard = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyOfficerDashboard />
  </Suspense>
);

export const OrganizerDashboard = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyOrganizerDashboard />
  </Suspense>
);