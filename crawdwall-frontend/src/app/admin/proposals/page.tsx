'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockAPI } from '@/__mocks__/data';
import StatusBadge from '@/components/StatusBadge';

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response: any = await mockAPI.getAllProposals();
        
        if (response.success && response.data) {
          // Transform the API data to match the expected format
          const transformedProposals = response.data.map((proposal: any) => ({
            id: proposal.id,
            title: proposal.title,
            status: proposal.status.replace(/_/g, ' '),
            date: proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : 'N/A',
            amount: `$${proposal.amount?.toLocaleString() || '0'}`,
            description: proposal.description,
            organizer: proposal.organizerName || 'Unknown Organizer',
            officersAssigned: proposal.votes?.map((vote: any) => vote.officerName) || [],
            reviewsReceived: proposal.votes?.length || 0,
            votesReceived: proposal.votes?.length || 0,
            acceptanceThreshold: 4, // Default threshold
            acceptVotes: proposal.votes?.filter((vote: any) => vote.decision === 'ACCEPT').length || 0,
            rejectVotes: proposal.votes?.filter((vote: any) => vote.decision === 'REJECT').length || 0,
          }));
          
          setProposals(transformedProposals);
          setFilteredProposals(transformedProposals);
        } else {
          setError(response.message || 'Failed to fetch proposals');
          console.error('Failed to fetch proposals:', response.message);
        }
      } catch (err) {
        setError('Failed to load proposals data');
        console.error('Error fetching proposals:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProposals();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Proposals</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor and override proposal decisions as needed
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading proposals...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Proposals</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor and override proposal decisions as needed
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5">
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Unable to load proposals data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Proposals</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Monitor and override proposal decisions as needed
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proposals List</h3>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                All ({proposals.length})
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Submitted
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Under Review
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Accepted
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                Rejected
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <div key={proposal.id} className="px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {proposal.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {proposal.description}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      By: {proposal.organizer} • Assigned to: {proposal.officersAssigned.join(', ')}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{proposal.date}</span>
                      <span className="mx-2">•</span>
                      <span>{proposal.amount}</span>
                      <span className="mx-2">•</span>
                      <span>{proposal.votesReceived}/{proposal.acceptanceThreshold} votes for acceptance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={proposal.status} />
                      <Link
                        href={`/admin/proposals/${proposal.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Review
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No proposals found</p>
            </div>
          )}
        </div>
      </div>

      {/* Override Decision Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manual Decision Override</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="proposal-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Proposal
              </label>
              <select
                id="proposal-select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Choose a proposal...</option>
                {proposals.map(proposal => (
                  <option key={proposal.id} value={proposal.id}>
                    {proposal.title} ({proposal.id})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="decision" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Override Decision
              </label>
              <select
                id="decision"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Choose decision...</option>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
                <option value="re-review">Send for Re-review</option>
              </select>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reason for Override
              </label>
              <textarea
                id="reason"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Provide reason for overriding the decision..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Override Decision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}