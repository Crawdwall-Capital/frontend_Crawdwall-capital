'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { ReactNode } from 'react';

import OrganizerNavbar from '@/components/ui/OrganizerNavbar';
import Footer from '@/components/ui/Footer';
import AuthGuard from '@/components/AuthGuard';

interface OrganizerLayoutWrapperProps {
  children: ReactNode;
}

export default function OrganizerLayoutWrapper({ children }: OrganizerLayoutWrapperProps) {
  return (
    <AuthGuard allowedRoles={['organizer']} redirectTo='/login'>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
        <div className="flex flex-1 md:gap-8">
          <OrganizerNavbar />
          <main className="w-full lg:w-3/4 ml-0 md:ml-64 px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
}