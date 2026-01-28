'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authAPI } from '@/lib/api';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

// Define validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Debug: Log API configuration on component mount
  useEffect(() => {
    console.log('🔧 Login Page Configuration:', {
      backendUrl: process.env.NEXT_PUBLIC_API_URL,
      fullBaseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
      loginEndpoint: '/auth/login',
      fullLoginUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });



  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    console.log('🔄 Attempting login with data:', {
      email: data.email,
      hasPassword: !!data.password,
      backendUrl: process.env.NEXT_PUBLIC_API_URL,
      fullApiUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`
    });

    try {
      const response = await authAPI.login({
        email: data.email,
        password: data.password,
      });
      
      console.log('✅ Login API response received:', {
        status: response.status,
        data: response.data
      });
      
      // Handle the actual API response structure - flat response with token and message
      if (response.data && typeof response.data === 'object' && 'token' in response.data && 'message' in response.data) {
        console.log('✅ Login successful - processing flat response...');
        
        const responseData = response.data as any; // Type assertion for the actual response structure
        const token = responseData.token;
        const userRole = responseData.role;
        
        console.log('Auth response details:', {
          hasToken: !!token,
          userRole: userRole,
          tokenPreview: token ? token.substring(0, 20) + '...' : 'No token',
          message: responseData.message
        });
        
        // Store the token and user info
        localStorage.setItem('crawdwall_auth_token', token);
        localStorage.setItem('user_role', userRole.toLowerCase());
        localStorage.setItem('user_email', data.email);
        
        // Try to get user name from API response or use email as fallback
        if (responseData.name) {
          localStorage.setItem('user_name', responseData.name);
        } else {
          // Use email prefix as name fallback
          localStorage.setItem('user_name', data.email.split('@')[0]);
        }
        
        // Log for debugging
        console.log('Login successful, attempting redirect...');
        console.log('Role:', userRole);
        
        // Show success message
        setSuccessMessage('Login successful! Redirecting to your dashboard...');
        
        // Redirect based on user's role (case-insensitive)
        const normalizedRole = userRole.toLowerCase();
        
        // Immediate navigation
        try {
          if (normalizedRole === 'organizer') {
            console.log('Redirecting to organizer dashboard');
            router.push('/organizer/dashboard');
          } else if (normalizedRole === 'investor') {
            console.log('Redirecting to investor dashboard');
            router.push('/investor/dashboard');
          } else if (normalizedRole === 'admin') {
            console.log('Redirecting to admin dashboard');
            router.push('/admin/dashboard');
          } else if (normalizedRole === 'officer') {
            console.log('Redirecting to officer dashboard');
            router.push('/officer/dashboard');
          } else {
            console.log('Redirecting to home');
            router.push('/');
          }
        } catch (redirectError) {
          console.error('Navigation failed, falling back to window.location:', redirectError);
          // Fallback to window.location if router.push fails
          if (normalizedRole === 'organizer') {
            window.location.href = '/organizer/dashboard';
          } else if (normalizedRole === 'investor') {
            window.location.href = '/investor/dashboard';
          } else if (normalizedRole === 'admin') {
            window.location.href = '/admin/dashboard';
          } else if (normalizedRole === 'officer') {
            window.location.href = '/officer/dashboard';
          } else {
            window.location.href = '/';
          }
        }
      } else if (response.data.success && response.data.data) {
        // Handle the expected API response structure (fallback)
        const authData = response.data.data;
        const token = 'token' in authData ? authData.token : undefined;
        const userData = 'user' in authData ? authData.user : undefined;
        
        if (token && userData) {
          // Store the token and user info
          localStorage.setItem('crawdwall_auth_token', token);
          localStorage.setItem('user_role', userData.role);
          localStorage.setItem('user_email', userData.email);
          
          // Store user name
          if (userData.name) {
            localStorage.setItem('user_name', userData.name);
          } else {
            // Use email prefix as name fallback
            localStorage.setItem('user_name', userData.email.split('@')[0]);
          }
          
          // Log for debugging
          console.log('Login successful, attempting redirect...');
          console.log('Role:', userData.role);
          
          // Show success message
          setSuccessMessage('Login successful! Redirecting to your dashboard...');
          
          // Redirect based on user's role (case-insensitive)
          const normalizedRole = userData.role.toLowerCase();
          
          // Immediate navigation
          try {
            if (normalizedRole === 'organizer') {
              console.log('Redirecting to organizer dashboard');
              router.push('/organizer/dashboard');
            } else if (normalizedRole === 'investor') {
              console.log('Redirecting to investor dashboard');
              router.push('/investor/dashboard');
            } else if (normalizedRole === 'admin') {
              console.log('Redirecting to admin dashboard');
              router.push('/admin/dashboard');
            } else if (normalizedRole === 'officer') {
              console.log('Redirecting to officer dashboard');
              router.push('/officer/dashboard');
            } else {
              console.log('Redirecting to home');
              router.push('/');
            }
          } catch (redirectError) {
            console.error('Navigation failed, falling back to window.location:', redirectError);
            // Fallback to window.location if router.push fails
            if (normalizedRole === 'organizer') {
              window.location.href = '/organizer/dashboard';
            } else if (normalizedRole === 'investor') {
              window.location.href = '/investor/dashboard';
            } else if (normalizedRole === 'admin') {
              window.location.href = '/admin/dashboard';
            } else if (normalizedRole === 'officer') {
              window.location.href = '/officer/dashboard';
            } else {
              window.location.href = '/';
            }
          }
        } else {
          console.error('❌ Login failed - unexpected response structure:', response.data);
          setError(response.data.message || 'Login failed - invalid response format');
        }
      } else {
        console.error('❌ Login failed:', response.data);
        setError(response.data.message || response.data.error || 'Login failed');
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      console.error('Full error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url
      });
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 503) {
        setError('Backend service is currently unavailable. Please try again later.');
      } else if (err.response?.status === 401) {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err.response?.status === 404) {
        setError('Login endpoint not found. Please check backend configuration.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection and backend availability.');
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Navbar />
      
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <div className="h-16 w-20 text-primary mx-auto">
              <img src="/image/C capital logo 2.svg" alt="Crawdwall Capital Logo" className="h-full w-full object-contain" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
              Access your organizer or investor account
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    {...register('password')}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>



              {error && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              {successMessage && (
                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
                  <p className="text-sm text-green-700 dark:text-green-300">{successMessage}</p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-medium text-primary hover:text-primary-dark">
                    Register as organizer or investor
                  </Link>
                </p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Admin?{' '}
                  <Link href="/admin-login" className="font-medium text-primary hover:text-primary-dark">
                    Admin login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}