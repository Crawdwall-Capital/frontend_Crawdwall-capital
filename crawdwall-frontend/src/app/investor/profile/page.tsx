'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function InvestorProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching profile data');
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Investor Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <a 
                  href="/investor/dashboard" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a 
                  href="/investor/portfolio" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Portfolio
                </a>
                <a 
                  href="/investor/profile" 
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium bg-blue-100"
                >
                  Profile
                </a>
              </nav>
              <span className="text-gray-700">Investor Account</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 text-gray-900">{user?.name || 'N/A'}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 text-gray-900">{user?.email || 'N/A'}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <div className="mt-1 text-gray-900 capitalize">{user?.role || 'N/A'}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <div className="mt-1 text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-md font-medium text-gray-900 mb-4">Account Security</h3>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Change Password
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}