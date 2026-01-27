'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
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

    try {
      let response;
      if (data.role === 'organizer') {
        response = await authAPI.registerOrganizer({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        });
      } else {
        response = await authAPI.registerInvestor({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
        });
      }
      
      if (response.data.success && response.data.data) {
        // Handle the response data
        const authResponse = response.data.data as AuthResponse;
        const token = authResponse.token;
        const userData = authResponse.user;
        
        if (token && userData) {
          // Store the received token and user info
          localStorage.setItem('crawdwall_auth_token', token);
          localStorage.setItem('user_role', data.role);
          localStorage.setItem('user_email', data.email || userData.email);
          
          // Log for debugging
          console.log('Registration successful, attempting redirect...');
          console.log('Role:', data.role);
          console.log('Token:', token.substring(0, 20) + '...'); // Log first 20 chars of token
          
          // Redirect based on selected role (case-insensitive)
          const normalizedRole = data.role.toLowerCase();
          
          // Add a small delay to ensure state is properly saved before navigation
          setTimeout(() => {
            try {
              if (normalizedRole === 'organizer') {
                console.log('Attempting redirect to organizer dashboard');
                router.push('/organizer/dashboard');
              } else if (normalizedRole === 'investor') {
                console.log('Attempting redirect to investor dashboard');
                router.push('/investor/dashboard');
              } else {
                console.log('Attempting redirect to home');
                // Default redirect for other roles
                router.push('/');
              }
            } catch (redirectError) {
              console.error('Navigation failed, falling back to window.location:', redirectError);
              // Fallback to window.location if router.push fails
              if (normalizedRole === 'organizer') {
                window.location.href = '/organizer/dashboard';
              } else if (normalizedRole === 'investor') {
                window.location.href = '/investor/dashboard';
              } else {
                window.location.href = '/';
              }
            }
          }, 100); // Small delay to ensure proper execution
        } else {
          setError(response.data.message || 'Registration failed - invalid response format');
        }
      } else {
        setError(response.data.message || response.data.error || 'Registration failed');
      }
    } catch (err: unknown) {
      handleApiError(err);
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