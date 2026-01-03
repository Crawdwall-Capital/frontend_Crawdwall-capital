'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { ROUTES } from '@/constants';

export default function InvestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For testing purposes, we're bypassing authentication
        // In production, you would want to verify the token
        const token = localStorage.getItem('crawdwall_auth_token');
        const role = localStorage.getItem('user_role');
        
        if (token && role === 'investor') {
          setUserRole('investor');
        } else {
          // Redirect to login if not authenticated as an investor
          router.push(ROUTES.LOGIN);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push(ROUTES.LOGIN);
      } finally {
        setLoading(false);
      }
    };

    // Skip auth check on login page
    if (pathname !== ROUTES.LOGIN) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (userRole !== 'investor' && pathname !== ROUTES.LOGIN) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}