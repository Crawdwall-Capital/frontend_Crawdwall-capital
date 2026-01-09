'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { proposalAPI, authAPI } from '@/lib/api';
import { Proposal } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default function OfficerDashboard() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // For mock data, we'll get all proposals for officers to review
        const response = await proposalAPI.getAllProposals();
        if (response.data.success) {
          setProposals(response.data.data || []);
        } else {
          setError(response.data.message || 'Failed to fetch proposals');
        }
      } catch (err) {
        setError('An error occurred while fetching proposals');
        console.error('Error fetching proposals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
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
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Officer Dashboard</h1>
              <p className="text-gray-600">Review and manage funding proposals</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Officer Account</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Proposals</h2>
          </div>

          {proposals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No proposals available at the moment.</p>
              <p className="text-gray-400 mt-2">Check back later for new proposals to review.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {proposals.map((proposal) => (
                  <li key={proposal.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-blue-600 truncate">
                          {proposal.title}
                        </div>
                        <StatusBadge status={proposal.status} />
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6">
                            <p className="text-sm text-gray-500">Organizer</p>
                            <p className="text-sm text-gray-900">{proposal.organizerName}</p>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="text-sm text-gray-900">${proposal.amount.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p className="text-gray-900">
                            {new Date(proposal.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}