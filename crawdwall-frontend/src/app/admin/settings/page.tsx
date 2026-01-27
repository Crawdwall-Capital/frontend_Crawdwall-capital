'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('platform');

  const [platformSettings, setPlatformSettings] = useState<any>({
    acceptanceThreshold: 70,
    minReviewers: 2,
    maxReviewDays: 14,
    platformFee: 2.5,
    escrowHoldDays: 30,
    maintenanceMode: false,
  });

  const [systemRules, setSystemRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, we would fetch from API
        // For now, using default values
        const defaultSettings = {
          acceptanceThreshold: 70,
          minReviewers: 2,
          maxReviewDays: 14,
          platformFee: 2.5,
          escrowHoldDays: 30,
          maintenanceMode: false,
        };
        
        const defaultRules = [
          { id: 1, name: 'Minimum Proposal Amount', value: '$10,000', enabled: true },
          { id: 2, name: 'Maximum Proposal Amount', value: '$100,000', enabled: true },
          { id: 3, name: 'Proposal Duration Limit', value: '180 days', enabled: true },
          { id: 4, name: 'Investor Minimum Stake', value: '$5,000', enabled: true },
        ];
        
        setPlatformSettings(defaultSettings);
        setSystemRules(defaultRules);
      } catch (err) {
        setError('Failed to load settings');
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  // Handle platform settings change
  const handlePlatformSettingChange = (field: string, value: unknown) => {
    setPlatformSettings((prev: unknown) => ({
      ...prev,
      [field]: value
    }));
  };

  // Toggle system rule
  const toggleRule = (id: number) => {
    setSystemRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Configure system rules and platform-wide settings
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading settings...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Configure system rules and platform-wide settings
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5">
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Unable to load settings</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Configure system rules and platform-wide settings
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('platform')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'platform'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Platform Settings
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              System Rules
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Security
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'platform' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Platform Configuration</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="acceptance-threshold" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Acceptance Threshold (%)
                  </label>
                  <input
                    type="number"
                    id="acceptance-threshold"
                    value={platformSettings.acceptanceThreshold}
                    onChange={(e) => handlePlatformSettingChange('acceptanceThreshold', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="0"
                    max="100"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Percentage of positive votes required to accept a proposal
                  </p>
                </div>

                <div>
                  <label htmlFor="min-reviewers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Reviewers
                  </label>
                  <input
                    type="number"
                    id="min-reviewers"
                    value={platformSettings.minReviewers}
                    onChange={(e) => handlePlatformSettingChange('minReviewers', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="1"
                    max="10"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Minimum number of officers required to review a proposal
                  </p>
                </div>

                <div>
                  <label htmlFor="max-review-days" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Max Review Days
                  </label>
                  <input
                    type="number"
                    id="max-review-days"
                    value={platformSettings.maxReviewDays}
                    onChange={(e) => handlePlatformSettingChange('maxReviewDays', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="1"
                    max="90"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Maximum days allowed for proposal review
                  </p>
                </div>

                <div>
                  <label htmlFor="platform-fee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Platform Fee (%)
                  </label>
                  <input
                    type="number"
                    id="platform-fee"
                    value={platformSettings.platformFee}
                    onChange={(e) => handlePlatformSettingChange('platformFee', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fee percentage charged on successful funding
                  </p>
                </div>

                <div>
                  <label htmlFor="escrow-hold-days" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Escrow Hold Days
                  </label>
                  <input
                    type="number"
                    id="escrow-hold-days"
                    value={platformSettings.escrowHoldDays}
                    onChange={(e) => handlePlatformSettingChange('escrowHoldDays', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="1"
                    max="365"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Number of days funds are held in escrow
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Maintenance Mode</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Temporarily disable platform access for all users
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        platformSettings.maintenanceMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                      role="switch"
                      aria-checked={platformSettings.maintenanceMode}
                      onClick={() => handlePlatformSettingChange('maintenanceMode', !platformSettings.maintenanceMode)}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                          platformSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">System Rules Configuration</h3>
              <div className="space-y-4">
                {systemRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{rule.name}</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Current value: {rule.value}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        rule.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                      role="switch"
                      aria-checked={rule.enabled}
                      onClick={() => toggleRule(rule.id)}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                          rule.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5"
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Session Timeout</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Automatically log out inactive sessions after 30 minutes
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600"
                    role="switch"
                    aria-checked="true"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-5"
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">IP Whitelisting</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Restrict admin access to specific IP addresses
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-200 dark:bg-gray-600"
                    role="switch"
                    aria-checked="false"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 translate-x-0"
                    ></span>
                  </button>
                </div>
              </div>
              <div className="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}