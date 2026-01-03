'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ROUTES } from '@/constants';
import { authAPI } from '@/lib/api';

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
      
      // Call the API to validate admin credentials
      const response = await authAPI.sendOtp({ email: email || '' });
      
      if (response.data.success) {
        setOtpSent(true);
        setMessage('OTP sent to your email.');
      } else {
        setError(response.data.message || 'Invalid admin credentials');
      }
    } catch (err) {
      setError('An error occurred while sending OTP');
      console.error('Error sending OTP:', err);
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
        localStorage.setItem('crawdwall_auth_token', response.data.data.token);
        localStorage.setItem('user_role', (response.data.data.user.role || 'ADMIN').toUpperCase());
        router.push(ROUTES.ADMIN_DASHBOARD);
      } else {
        setError(response.data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred while verifying OTP');
      console.error('Error verifying OTP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-center text-sm text-gray-900 mb-6">
          Secure OTP-based access
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            {...register('email')}
            disabled={otpSent}
            className={`mt-1 w-full px-3 py-2 border rounded-md ${
              errors.email ? 'border-red-400' : 'border-gray-300'
            } text-gray-900`}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* OTP */}
        {otpSent && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">OTP</label>
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              {...register('otp')}
              className={`mt-1 w-full px-3 py-2 border rounded-md ${
                errors.otp ? 'border-red-400' : 'border-gray-300'
              } text-gray-900`}
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
          <div className="mb-3 text-sm text-green-700 bg-green-50 p-2 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-3 text-sm text-red-700 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* BUTTONS */}
        {!otpSent ? (
          <button
            onClick={sendOtp}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        ) : (
          <>
            <button
              onClick={verifyOtp}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              onClick={() => {
                setOtpSent(false);
                setValue('otp', '');
                setMessage(null);
              }}
              className="w-full mt-3 text-sm text-blue-600 hover:underline"
            >
              Change email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
