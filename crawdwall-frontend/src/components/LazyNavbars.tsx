'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Loading spinner for navbars
const NavbarLoading = () => (
  <div className="h-16 bg-[#111822]/90 backdrop-blur-md flex items-center justify-center">
    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
  </div>
);

// Lazy load navbar components
export const LazyNavbar = lazy(() => 
  import('./ui/Navbar')
);

export const LazyAdminNavbar = lazy(() => 
  import('./ui/AdminNavbar')
);

export const LazyInvestorNavbar = lazy(() => 
  import('./ui/InvestorNavbar')
);

export const LazyOfficerNavbar = lazy(() => 
  import('./ui/OfficerNavbar')
);

export const LazyOrganizerNavbar = lazy(() => 
  import('./ui/OrganizerNavbar')
);

// Export wrapped navbar components
export const Navbar = (props: unknown) => (
  <Suspense fallback={<NavbarLoading />}>
    <LazyNavbar {...props} />
  </Suspense>
);

export const AdminNavbar = (props: unknown) => (
  <Suspense fallback={<NavbarLoading />}>
    <LazyAdminNavbar {...props} />
  </Suspense>
);

export const InvestorNavbar = (props: unknown) => (
  <Suspense fallback={<NavbarLoading />}>
    <LazyInvestorNavbar {...props} />
  </Suspense>
);

export const OfficerNavbar = (props: unknown) => (
  <Suspense fallback={<NavbarLoading />}>
    <LazyOfficerNavbar {...props} />
  </Suspense>
);

export const OrganizerNavbar = (props: unknown) => (
  <Suspense fallback={<NavbarLoading />}>
    <LazyOrganizerNavbar {...props} />
  </Suspense>
);