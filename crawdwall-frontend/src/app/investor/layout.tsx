import type { Metadata } from 'next';
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Investor Dashboard | Crawdwall Capital',
  description: 'Access your event investment portfolio and opportunities on Crawdwall Capital',
};

import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';
import AuthGuard from '@/components/AuthGuard';

export default function InvestorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['investor']} redirectTo='/login'>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
        <div className="flex flex-1 gap-8">
          <InvestorNavbar />
          <main className="w-full lg:w-3/4 ml-0 md:ml-64 px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
}