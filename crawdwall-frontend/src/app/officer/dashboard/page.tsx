'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockAPI } from '@/__mocks__/data';
import StatusBadge from '@/components/StatusBadge';

export default function OfficerDashboardPage() {
  const [userName, setUserName] = useState<string>('Officer');
  const [stats, setStats] = useState<any[]>([]);
  const [recentProposals, setRecentProposals] = useState<any[]>([]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Using the mock API to get current user
        const response: any = await mockAPI.getCurrentUser();
        if (response.success && response.data) {
          setUserName(response.data.name || 'Officer');
          
          // Fetch officer-specific data
          const userId = response.data.id;
          const officerProposalsResponse: any = await mockAPI.getOfficerProposals(userId);
          
          if (officerProposalsResponse.success) {
            setRecentProposals(officerProposalsResponse.data.slice(0, 4));
            
            // Calculate stats
            const totalProposals = officerProposalsResponse.data.length;
            const awaitingReview = officerProposalsResponse.data.filter((p: any) => p.status === 'SUBMITTED' || p.status === 'IN_REVIEW').length;
            const reviewed = officerProposalsResponse.data.filter((p: any) => p.status === 'VETTED' || p.status === 'FUNDED' || p.status === 'REJECTED').length;
            
            // Get officer votes to count pending votes
            const officerVotesResponse: any = await mockAPI.getOfficerVotes(userId);
            let pendingVotes = 0;
            if (officerVotesResponse.success) {
              const allProposals = officerProposalsResponse.data;
              const votedProposalIds = officerVotesResponse.data.map((vote: any) => vote.proposalId);
              pendingVotes = allProposals.filter((proposal: any) => 
                !votedProposalIds.includes(proposal.id) && 
                (proposal.status === 'SUBMITTED' || proposal.status === 'IN_REVIEW')
              ).length;
            }
            
            setStats([
              { name: 'Total Proposals', value: totalProposals, icon: 'description', color: 'blue' },
              { name: 'Awaiting Review', value: awaitingReview, icon: 'hourglass_top', color: 'yellow' },
              { name: 'Reviewed', value: reviewed, icon: 'check_circle', color: 'green' },
              { name: 'Pending Votes', value: pendingVotes, icon: 'how_to_vote', color: 'purple' },
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to a default name
        setUserName('Officer');
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
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {userName}!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Evaluate, vote on, and review event funding proposals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        {/* Recent Proposals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Proposals</h3>
              <Link
                href="/officer/proposals"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentProposals.map((proposal) => (
              <div key={proposal.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {proposal.title}
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={proposal.status} />
                    <Link
                      href={`/officer/proposals/${proposal.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Review
                    </Link>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{proposal.date}</span>
                  <span>{proposal.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="/officer/proposals"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-blue-600 dark:text-blue-400 material-symbols-outlined">visibility</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Review Proposals</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and evaluate submitted proposals</p>
                </div>
              </Link>
              <Link
                href="/officer/votes"
                className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <span className="text-purple-600 dark:text-purple-400 material-symbols-outlined">how_to_vote</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Vote on Proposals</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Submit your vote for pending proposals</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}