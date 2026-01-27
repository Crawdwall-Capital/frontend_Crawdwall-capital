'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { ReactNode } from 'react';

import AdminNavbar from '@/components/ui/AdminNavbar';
import Footer from '@/components/ui/Footer';
import AuthGuard from '@/components/AuthGuard';

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  return (
    <AuthGuard allowedRoles={['admin']} redirectTo='/login'>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-1 gap-8">
          <AdminNavbar />
          <main className="w-full lg:w-3/4 ml-0 md:ml-64 px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
}