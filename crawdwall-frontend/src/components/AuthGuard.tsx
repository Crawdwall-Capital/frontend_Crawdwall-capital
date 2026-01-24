'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  allowedRoles = ['admin', 'organizer', 'investor', 'officer'], 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('crawdwall_auth_token');
        const userRole = localStorage.getItem('user_role');

        if (!token || !userRole) {
          // No token or role found, redirect to login
          router.replace(redirectTo);
          setIsAuthorized(false);
          return;
        }

        // Check if user role is allowed
        const normalizedRole = userRole.toLowerCase();
        if (!allowedRoles.includes(normalizedRole)) {
          // User doesn't have permission, redirect
          router.replace(redirectTo);
          setIsAuthorized(false);
          return;
        }

        // Optionally verify token validity by calling API
        try {
          await authAPI.getCurrentUser();
          setIsAuthorized(true);
        } catch (error) {
          console.error('Token verification failed:', error);
          // Clear invalid auth data
          localStorage.removeItem('crawdwall_auth_token');
          localStorage.removeItem('user_role');
          localStorage.removeItem('user_email');
          router.replace(redirectTo);
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace(redirectTo);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles, redirectTo]);

  if (isAuthorized === null) {
    // Show loading state while checking auth
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Checking authentication...</span>
      </div>
    );
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  // Don't render anything if not authorized (redirect happens in useEffect)
  return null;
}