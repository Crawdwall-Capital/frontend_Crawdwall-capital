'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { proposalAPI, authAPI } from '@/lib/api';
import { Proposal } from '@/types';
import StatusBadge from '@/components/StatusBadge';

export default function InvestorPortfolio() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestorProposals = async () => {
      try {
        // For mock data, we'll get all proposals that are funded
        const response = await proposalAPI.getAllProposals();
        if (response.data.success) {
          // Filter to only show funded proposals for the investor portfolio
          const fundedProposals = (response.data.data || []).filter(
            proposal => proposal.status === 'FUNDED'
          );
          setProposals(fundedProposals);
        } else {
          setError(response.data.message || 'Failed to fetch proposals');
        }
      } catch (err) {
        setError('An error occurred while fetching portfolio data');
        console.error('Error fetching investor portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestorProposals();
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
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Investor Portfolio</h1>
              <p className="text-gray-600">Track your funded creative events</p>
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
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium bg-blue-100"
                >
                  Portfolio
                </a>
                <a 
                  href="/investor/profile" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Total Investments</p>
              <p className="text-2xl font-bold text-gray-900">
                ${proposals.reduce((sum, prop) => sum + prop.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{proposals.length}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Average Investment</p>
              <p className="text-2xl font-bold text-gray-900">
                ${proposals.length > 0 
                  ? Math.round(proposals.reduce((sum, prop) => sum + prop.amount, 0) / proposals.length).toLocaleString() 
                  : '0'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Funded Events</h2>
          </div>

          {proposals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No funded events in your portfolio yet.</p>
              <p className="text-gray-400 mt-2">Start exploring funding opportunities to build your portfolio.</p>
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
                            <p className="text-sm text-gray-500">Investment</p>
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