'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockAPI } from '@/__mocks__/data';

export default function InvestorProfilePage() {
  // const $varName  = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First try to get user name from localStorage (from real authentication)
        const storedUserName = localStorage.getItem('user_name');
        const storedUserEmail = localStorage.getItem('user_email');
        
        // Use mock API to get user data for demonstration
        const userResponse = await mockAPI.getCurrentUser();
        
        if (userResponse.success && userResponse.data) {
          const user = userResponse.data;
          
          // Format user data for display
          const formattedData = {
            id: user.id,
            name: storedUserName || user.name || (storedUserEmail || user.email).split('@')[0], // Use stored name or email prefix
            email: storedUserEmail || user.email,
            phone: "+1 (555) 123-4567", // Phone not in user object, using default
            accountType: user.role === 'investor' ? "Accredited Investor" : user.role.charAt(0).toUpperCase() + user.role.slice(1),
            memberSince: user.createdAt || "January 15, 2023",
            totalInvestments: "$125,000", // Would be calculated from actual investments
            totalReturns: "$24,500", // Would be calculated from actual returns
            portfolioSize: 8, // Would be calculated from portfolio data
            kycStatus: "Verified", // Would come from KYC verification status
            notificationPreferences: {
              email: true,
              sms: false,
              push: true
            }
          };
          
          setUserData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Set up default user data in case of error
        setUserData({
          id: 'default',
          name: 'Investor',
          email: 'investor@example.com',
          phone: '+1 (555) 123-4567',
          accountType: 'Accredited Investor',
          memberSince: 'January 15, 2023',
          totalInvestments: '$0',
          totalReturns: '$0',
          portfolioSize: 0,
          kycStatus: 'Pending',
          notificationPreferences: {
            email: true,
            sms: false,
            push: true
          }
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investor Profile</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your investor profile and settings
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{userData?.name || 'Loading...'}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{userData?.accountType || 'Loading...'}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-3">account_circle</span>
                  Profile Overview
                </span>
              </button>
              
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-3">settings</span>
                  Account Settings
                </span>
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'security' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-3">lock</span>
                  Security
                </span>
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-3">notifications</span>
                  Notifications
                </span>
              </button>
              
              <button 
                onClick={() => setActiveTab('documents')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'documents' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-3">folder</span>
                  Documents
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTab === 'overview' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Investments</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData?.totalInvestments || '$0'}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Returns</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{userData?.totalReturns || '$0'}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">Portfolio Size</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData?.portfolioSize || 0} Events</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">KYC Status</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{userData?.kycStatus || 'Pending'}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <p className="text-gray-900 dark:text-white">{userData?.name || 'Loading...'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <p className="text-gray-900 dark:text-white">{userData?.email || 'Loading...'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <p className="text-gray-900 dark:text-white">{userData?.phone || 'Loading...'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Member Since</label>
                    <p className="text-gray-900 dark:text-white">{userData?.memberSince || 'Loading...'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userData?.name || ''}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={userData?.email || ''}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={userData?.phone || ''}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Type</label>
                  <select 
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={userData?.accountType || 'Accredited Investor'}
                  >
                    <option className="text-black" value="Accredited Investor">Accredited Investor</option>
                    <option className="text-black" value="Institutional Investor">Institutional Investor</option>
                    <option className="text-black" value="Family Office">Family Office</option>
                    <option className="text-black" value="Corporate Investor">Corporate Investor</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Update your password regularly to keep your account secure</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Add an extra layer of security to your account</p>
                  
                  <div className="flex items-center">
                    <span className="mr-4 text-green-600 dark:text-green-400 material-symbols-outlined">check_circle</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Enabled</span>
                    <button className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                      Disable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Receive updates and alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.email}
                      onChange={(e) => setNotificationPreferences({...notificationPreferences, email: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Receive critical updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.sms}
                      onChange={(e) => setNotificationPreferences({...notificationPreferences, sms: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Receive app notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.push}
                      onChange={(e) => setNotificationPreferences({...notificationPreferences, push: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      // In a real app, this would save preferences to backend
                      alert('Notification preferences saved successfully!');
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'documents' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Documents</h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <div className="flex items-center">
                    <span className="mr-4 text-blue-600 dark:text-blue-400 material-symbols-outlined">description</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">KYC Documentation</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Submitted on January 15, 2023</p>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Verified</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <div className="flex items-center">
                    <span className="mr-4 text-green-600 dark:text-green-400 material-symbols-outlined">receipt_long</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Tax Documentation</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Submitted on February 3, 2023</p>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Verified</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <div className="flex items-center">
                    <span className="mr-4 text-amber-600 dark:text-amber-400 material-symbols-outlined">account_balance_wallet</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Investment Agreement</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Signed on March 12, 2023</p>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">Completed</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                  <div className="flex items-center">
                    <span className="mr-4 text-purple-600 dark:text-purple-400 material-symbols-outlined">folder_shared</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Portfolio Reports</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Latest report: December 2023</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}