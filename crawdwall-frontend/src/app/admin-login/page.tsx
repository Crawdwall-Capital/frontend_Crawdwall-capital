'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Footer from '@/components/ui/Footer';

import { authAPI } from '@/lib/api';
import Navbar from '@/components/ui/Navbar';

// ====================
// Schema
// ====================
const otpLoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  otp: z.string().min(6, 'OTP must be 6 digits').optional(),
});

type OtpLoginFormData = z.infer<typeof otpLoginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();

  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    setValue,
  } = useForm<OtpLoginFormData>({
    resolver: zodResolver(otpLoginSchema),
    defaultValues: { email: '', otp: '' },
  });

  // ====================
  // SEND OTP
  // ====================
  const sendOtp = async () => {
    const isValid = await trigger('email');
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const email = getValues('email');
      
      // Call the API to request OTP
      const response = await authAPI.sendOtp({ email: email || '' });
      
      if (response.data.success || response.status === 200) {
        setOtpSent(true);
        setMessage('OTP sent to your email.');
      } else {
        setError(response.data.message || response.data.error || 'Failed to send OTP');
      }
    } catch (err: any) {
      console.error('Error sending OTP:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while sending OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ====================
  // VERIFY OTP
  // ====================
  const verifyOtp = async () => {
    const isValid = await trigger('otp');
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const email = getValues('email');
      const otp = getValues('otp');
      
      // Call the API to verify OTP
      const response = await authAPI.verifyOtp({ 
        email: email || '', 
        otp: otp || '' 
      });
      
      if (response.data.success && response.data.data) {
        // Handle the response data
        const authData = response.data.data;
        const token = 'token' in authData ? authData.token : undefined;
        const userData = 'user' in authData ? authData.user : undefined;
        
        if (token && userData) {
          localStorage.setItem('crawdwall_auth_token', token);
          localStorage.setItem('user_role', (userData.role || 'ADMIN').toUpperCase());
          localStorage.setItem('user_email', userData.email || email);
          router.push('/admin/dashboard');
        } else {
          setError(response.data.message || 'Authentication failed - invalid response format');
        }
      } else {
        setError(response.data.message || response.data.error || 'Invalid OTP');
      }
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while verifying OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white flex flex-col">
        <Navbar/>
      
      <div className="flex-grow flex items-center justify-center m-0 p-0">
        <div className="w-full max-w-md m-0 p-0">
          <div className="text-center mb-8 mt-0">
            <div className="h-16 w-20 text-primary mx-auto">
              <img src="/image/C capital logo 2.svg" alt="Crawdwall Capital Logo" className="h-full w-full object-contain" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
              Secure OTP-based access
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 py-8 px-6 shadow rounded-lg border border-slate-200 dark:border-slate-700 w-full">
            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                {...register('email')}
                disabled={otpSent}
                className={`mt-1 w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* OTP */}
            {otpSent && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  inputMode="numeric"
                  {...register('otp')}
                  className={`mt-1 w-full px-3 py-2 border ${
                    errors.otp ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'
                  } rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-slate-900 dark:text-white dark:bg-slate-700`}
                  placeholder="Enter 6-digit OTP"
                />
                {errors.otp && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.otp.message}
                  </p>
                )}
              </div>
            )}

            {/* MESSAGES */}
            {message && (
              <div className="mb-4 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                {message}
              </div>
            )}
            {error && (
              <div className="mb-4 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            {/* BUTTONS */}
            {!otpSent ? (
              <button
                onClick={sendOtp}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : 'Send OTP'}
              </button>
            ) : (
              <>
                <button
                  onClick={verifyOtp}
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : 'Verify OTP'}
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setValue('otp', '');
                    setMessage(null);
                  }}
                  className="w-full mt-4 text-sm text-primary hover:text-primary-dark font-medium"
                >
                  Change email
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}