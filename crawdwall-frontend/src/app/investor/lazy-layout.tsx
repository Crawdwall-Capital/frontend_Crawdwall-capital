'use client';

import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { InvestorNavbar } from '@/components/LazyNavbars';
import Footer from '@/components/ui/Footer';

// Loading component for the layout
const LayoutLoading = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
    <div className="h-16 bg-[#111822]/90 backdrop-blur-md flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      <span className="ml-3 text-white">Loading investor portal...</span>
    </div>
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Preparing your dashboard</p>
      </div>
    </div>
  </div>
);

// Lazy load the investor dashboard
const LazyInvestorDashboard = lazy(() => 
  import('./dashboard/page')
);

// Lazy Investor Layout Component
export default function LazyInvestorLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white flex flex-col">
      <InvestorNavbar />
      
      <main className="flex-grow">
        <Suspense fallback={<LayoutLoading />}>
          {children}
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

// Export the lazy dashboard component
export const LazyInvestorDashboardPage = () => (
  <Suspense fallback={<LayoutLoading />}>
    <LazyInvestorDashboard />
  </Suspense>
);