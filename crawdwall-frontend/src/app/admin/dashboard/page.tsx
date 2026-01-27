'use client';
export const dynamic = 'force-dynamic';
import * as React from 'react';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockAPI } from '@/__mocks__/data';
import StatusBadge from '@/components/StatusBadge';

export default function AdminDashboardPage() {
  const [userName, setUserName] = useState<string>('Admin');
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Using the mock API to get current user
        const response: any = await mockAPI.getCurrentUser();
        if (response.success && response.data) {
          setUserName(response.data.name || 'Admin');
          
          // Fetch admin-specific data
          const allProposalsResponse: any = await mockAPI.getAllProposals();
          const auditLogsResponse: any = await mockAPI.getAuditLogs();
          
          // Load all users from localStorage if available
          let allUsers = [];
          if (typeof window !== 'undefined') {
            const savedUsers = localStorage.getItem('mockUsers');
            if (savedUsers) {
              try {
                allUsers = JSON.parse(savedUsers);
              } catch (e) {
                console.error('Error parsing saved users:', e);
                allUsers = [];
              }
            }
          }
          
          if (allProposalsResponse.success && auditLogsResponse.success) {
            // Calculate stats
            const totalProposals = allProposalsResponse.data.length;
            const activeOfficers = allUsers.filter((user: any) => user.role === 'officer').length;
            const activeOrganizers = allUsers.filter((user: any) => user.role === 'organizer').length;
            const totalInvestors = allUsers.filter((user: any) => user.role === 'investor').length;
            const pendingReviews = allProposalsResponse.data.filter((p: any) => p.status === 'SUBMITTED' || p.status === 'IN_REVIEW').length;
            
            // Count awaiting votes by checking proposals that don't have enough votes yet
            let awaitingVotes = 0;
            allProposalsResponse.data.forEach((proposal: any) => {
              if (proposal.status === 'SUBMITTED' || proposal.status === 'IN_REVIEW') {
                const acceptVotes = proposal.votes ? proposal.votes.filter((v: any) => v.decision === 'ACCEPT').length : 0;
                const rejectVotes = proposal.votes ? proposal.votes.filter((v: any) => v.decision === 'REJECT').length : 0;
                if (acceptVotes < 4 && rejectVotes < 4) { // Less than majority
                  awaitingVotes++;
                }
              }
            });
            
            setStats([
              { name: 'Total Proposals', value: totalProposals, icon: 'description', color: 'blue' },
              { name: 'Active Officers', value: activeOfficers, icon: 'person', color: 'green' },
              { name: 'Active Organizers', value: activeOrganizers, icon: 'groups', color: 'yellow' },
              { name: 'Total Investors', value: totalInvestors, icon: 'account_balance', color: 'purple' },
              { name: 'Pending Reviews', value: pendingReviews, icon: 'hourglass_top', color: 'orange' },
              { name: 'Awaiting Votes', value: awaitingVotes, icon: 'how_to_vote', color: 'red' },
            ]);
            
            // Set recent activities from audit logs
            setRecentActivities(auditLogsResponse.data.slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to a default name
        setUserName('Admin');
      }
    };

    fetchUserData();
  }, []);

  // Function to get color classes based on color name
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {userName}!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Full platform control, oversight, and configuration
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-600 dark:text-gray-300 material-symbols-outlined">
                    {stat.icon}
                  </span>
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h3>
              <Link
                href="/admin/audit-logs"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <span className="text-blue-600 dark:text-blue-400 material-symbols-outlined text-sm">
                        {activity.type === 'proposal' ? 'description' : 
                         activity.type === 'officer' ? 'person' : 
                         activity.type === 'review' ? 'rate_review' : 'check_circle'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Platform Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Status</span>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Users</span>
                <span className="text-sm text-gray-900 dark:text-white">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Proposals</span>
                <span className="text-sm text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg. Review Time</span>
                <span className="text-sm text-gray-900 dark:text-white">2.3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Acceptance Rate</span>
                <span className="text-sm text-gray-900 dark:text-white">68%</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/officers"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Manage Officers
                </Link>
                <Link
                  href="/admin/settings"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Platform Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}