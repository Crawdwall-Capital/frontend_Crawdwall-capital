'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authAPI } from '@/lib/api';
import { AuthResponse } from '@/types';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { useErrorHandler } from '@/hooks/useErrorHandler';

// Define validation schema
const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['organizer', 'investor']),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { error, setError, clearError, handleApiError, isLoading, setIsLoading } = useErrorHandler();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-redirect after successful registration
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        const role = localStorage.getItem('user_role')?.toLowerCase();
        console.log('🔄 Auto-redirect triggered for role:', role);
        
        try {
          if (role === 'organizer') {
            router.push('/organizer/dashboard');
          } else if (role === 'investor') {
            router.push('/investor/dashboard');
          } else {
            router.push('/');
          }
        } catch (error) {
          console.error('Auto-redirect failed, using window.location:', error);
          if (role === 'organizer') {
            window.location.href = '/organizer/dashboard';
          } else if (role === 'investor') {
            window.location.href = '/investor/dashboard';
          } else {
            window.location.href = '/';
          }
        }
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, [successMessage, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: 'investor',
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    clearError();
    setSuccessMessage(null);

    console.log('Attempting registration with data:', {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      role: data.role,
      // Don't log password for security
      hasPassword: !!data.password
    });

    try {
      let response;
      if (data.role === 'organizer') {
        console.log('Calling registerOrganizer API...');
        response = await authAPI.registerOrganizer({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        });
      } else {
        console.log('Calling registerInvestor API...');
        response = await authAPI.registerInvestor({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        });
      }
      
      console.log('API response received:', response.data);
      
      // More flexible response handling
      if (response.data.success && response.data.data) {
        console.log('✅ Registration successful - processing response...');
        
        // Handle the response data
        const authResponse = response.data.data as AuthResponse;
        const token = authResponse.token;
        const userData = authResponse.user;
        
        console.log('Auth response details:', {
          hasToken: !!token,
          hasUserData: !!userData,
          tokenPreview: token ? token.substring(0, 20) + '...' : 'No token',
          userRole: userData?.role || 'No role in userData'
        });
        
        if (token && userData) {
          // Store the received token and user info
          localStorage.setItem('crawdwall_auth_token', token);
          localStorage.setItem('user_role', data.role);
          localStorage.setItem('user_email', data.email || userData.email);
          
          console.log('✅ Auth data stored successfully');
          console.log('Stored role:', data.role);
          console.log('Attempting navigation...');
          
          // Show success message briefly before navigation
          setSuccessMessage('Registration successful! Redirecting to your dashboard...');
          
          // Redirect based on selected role (case-insensitive)
          const normalizedRole = data.role.toLowerCase();
          
          // Immediate navigation without delay
          try {
            if (normalizedRole === 'organizer') {
              console.log('🚀 Navigating to organizer dashboard');
              router.push('/organizer/dashboard');
            } else if (normalizedRole === 'investor') {
              console.log('🚀 Navigating to investor dashboard');
              router.push('/investor/dashboard');
            } else {
              console.log('🚀 Navigating to home');
              router.push('/');
            }
          } catch (redirectError) {
            console.error('❌ Router navigation failed, using window.location:', redirectError);
            // Fallback to window.location if router.push fails
            if (normalizedRole === 'organizer') {
              window.location.href = '/organizer/dashboard';
            } else if (normalizedRole === 'investor') {
              window.location.href = '/investor/dashboard';
            } else {
              window.location.href = '/';
            }
          }
        } else {
          console.error('❌ Missing token or user data:', { hasToken: !!token, hasUserData: !!userData });
          setError('Registration successful but authentication data is incomplete. Please try logging in.');
        }
      } else if (response.data.success) {
        // Handle case where success is true but data structure is different
        console.log('✅ Registration successful but unexpected data structure:', response.data);
        
        // Try to extract token and user data from different possible structures
        const token = response.data.token || response.data.data?.token;
        const userData = response.data.user || response.data.data?.user;
        
        if (token) {
          localStorage.setItem('crawdwall_auth_token', token);
          localStorage.setItem('user_role', data.role);
          localStorage.setItem('user_email', data.email);
          
          console.log('🚀 Navigating with alternative data structure');
          const normalizedRole = data.role.toLowerCase();
          
          if (normalizedRole === 'organizer') {
            router.push('/organizer/dashboard');
          } else if (normalizedRole === 'investor') {
            router.push('/investor/dashboard');
          } else {
            router.push('/');
          }
        } else {
          setError('Registration successful but no authentication token received. Please try logging in.');
        }
      } else {
        console.error('❌ Registration failed:', response.data);
        setError(response.data.message || response.data.error || 'Registration failed');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // More detailed error handling
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.status === 500) {
        setError('Server error. Please check if the backend is running and try again.');
      } else if (err.response?.status === 400) {
        setError('Invalid registration data. Please check your inputs.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your connection and backend availability.');
      } else {
        setError('Registration failed. Please try again.');
      }
      
      // Log detailed error for debugging
      console.error('Full error details:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url
      });
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
              Create Account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
              Create your account to get started with Crawdwall Capital
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
              </div>

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
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phoneNumber"
                    type="tel"
                    {...register('phoneNumber')}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.phoneNumber ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>
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

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    {...register('role')}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.role ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                    } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
                  >
                    <option value="">Select a role</option>
                    <option value="organizer">Organizer</option>
                    <option value="investor">Investor</option>
                  </select>
                  {errors.role && (
                    <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>
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
                  <div className="mt-3 flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        const role = localStorage.getItem('user_role')?.toLowerCase();
                        if (role === 'organizer') {
                          router.push('/organizer/dashboard');
                        } else if (role === 'investor') {
                          router.push('/investor/dashboard');
                        } else {
                          router.push('/');
                        }
                      }}
                      className="text-sm font-medium text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200 underline"
                    >
                      Go to Dashboard →
                    </button>
                  </div>
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
                      Creating Account...
                    </span>
                  ) : (
                    'Register'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}