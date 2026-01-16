'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import Head from 'next/head';
import { mockAPI } from '@/__mocks__/data';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorProfilePage() {
  const router = useRouter();
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
        // Get current user data
        const userResponse: any = await mockAPI.getCurrentUser();
        
        if (userResponse.success) {
          const user = userResponse.data;
          
          // Calculate investor-specific stats
          // For demo purposes, we'll use mock calculations
          // In a real system, these would come from actual investment data
          const calculatedData = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || "+1 (555) 123-4567", // Would come from user profile
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
          
          setUserData(calculatedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="flex flex-1 md:gap-8">
        <InvestorNavbar />

        <main className="w-full lg:w-3/4 ml-0 md:ml-64 px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold text-white">{userData?.name || 'Loading...'}</h2>
                    <p className="text-sm text-slate-400">{userData?.accountType || 'Loading...'}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'overview' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-white/5'
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
                      activeTab === 'settings' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-white/5'
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
                      activeTab === 'security' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-white/5'
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
                      activeTab === 'notifications' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-white/5'
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
                      activeTab === 'documents' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-white/5'
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Profile Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h3 className="text-slate-400 text-sm mb-1">Total Investments</h3>
                      <p className="text-2xl font-bold text-white">{userData?.totalInvestments || '$0'}</p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h3 className="text-slate-400 text-sm mb-1">Total Returns</h3>
                      <p className="text-2xl font-bold text-green-500">{userData?.totalReturns || '$0'}</p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h3 className="text-slate-400 text-sm mb-1">Portfolio Size</h3>
                      <p className="text-2xl font-bold text-white">{userData?.portfolioSize || 0} Events</p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                      <h3 className="text-slate-400 text-sm mb-1">KYC Status</h3>
                      <p className="text-2xl font-bold text-green-500">{userData?.kycStatus || 'Pending'}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <p className="text-white">{userData?.name || 'Loading...'}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                        <p className="text-white">{userData?.email || 'Loading...'}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                        <p className="text-white">{userData?.phone || 'Loading...'}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Member Since</label>
                        <p className="text-white">{userData?.memberSince || 'Loading...'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={userData?.name || ''}
                        className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue={userData?.email || ''}
                        className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue={userData?.phone || ''}
                        className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Account Type</label>
                      <select 
                        className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={userData?.accountType || 'Accredited Investor'}
                      >
                        <option className="text-black" value="Accredited Investor">Accredited Investor</option>
                        <option className="text-black" value="Institutional Investor">Institutional Investor</option>
                        <option className="text-black" value="Family Office">Family Office</option>
                        <option className="text-black" value="Corporate Investor">Corporate Investor</option>
                      </select>
                    </div>
                    
                    <div className="pt-4">
                      <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-white/10 rounded-xl p-5">
                      <h3 className="font-medium text-white mb-2">Change Password</h3>
                      <p className="text-slate-400 text-sm mb-4">Update your password regularly to keep your account secure</p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-400 mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <button className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-xl p-5">
                      <h3 className="font-medium text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-slate-400 text-sm mb-4">Add an extra layer of security to your account</p>
                      
                      <div className="flex items-center">
                        <span className="mr-4 text-green-500 material-symbols-outlined">check_circle</span>
                        <span className="text-green-500 font-medium">Enabled</span>
                        <button className="ml-auto px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                          Disable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border border-white/10 rounded-xl p-4">
                      <div>
                        <h3 className="font-medium text-white">Email Notifications</h3>
                        <p className="text-slate-400 text-sm">Receive updates and alerts via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.email}
                          onChange={(e) => setNotificationPreferences({...notificationPreferences, email: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between border border-white/10 rounded-xl p-4">
                      <div>
                        <h3 className="font-medium text-white">SMS Notifications</h3>
                        <p className="text-slate-400 text-sm">Receive critical updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.sms}
                          onChange={(e) => setNotificationPreferences({...notificationPreferences, sms: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between border border-white/10 rounded-xl p-4">
                      <div>
                        <h3 className="font-medium text-white">Push Notifications</h3>
                        <p className="text-slate-400 text-sm">Receive app notifications on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationPreferences.push}
                          onChange={(e) => setNotificationPreferences({...notificationPreferences, push: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={() => {
                          // In a real app, this would save preferences to backend
                          alert('Notification preferences saved successfully!');
                        }}
                        className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'documents' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Documents</h2>
                  
                  <div className="space-y-4">
                    <div className="border border-white/10 rounded-xl p-5">
                      <div className="flex items-center">
                        <span className="mr-4 text-blue-500 material-symbols-outlined">description</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">KYC Documentation</h3>
                          <p className="text-slate-400 text-sm">Submitted on January 15, 2023</p>
                        </div>
                        <span className="text-green-500 text-sm font-medium">Verified</span>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-xl p-5">
                      <div className="flex items-center">
                        <span className="mr-4 text-green-500 material-symbols-outlined">receipt_long</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">Tax Documentation</h3>
                          <p className="text-slate-400 text-sm">Submitted on February 3, 2023</p>
                        </div>
                        <span className="text-green-500 text-sm font-medium">Verified</span>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-xl p-5">
                      <div className="flex items-center">
                        <span className="mr-4 text-amber-500 material-symbols-outlined">account_balance_wallet</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">Investment Agreement</h3>
                          <p className="text-slate-400 text-sm">Signed on March 12, 2023</p>
                        </div>
                        <span className="text-green-500 text-sm font-medium">Completed</span>
                      </div>
                    </div>
                    
                    <div className="border border-white/10 rounded-xl p-5">
                      <div className="flex items-center">
                        <span className="mr-4 text-purple-500 material-symbols-outlined">folder_shared</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">Portfolio Reports</h3>
                          <p className="text-slate-400 text-sm">Latest report: December 2023</p>
                        </div>
                        <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}