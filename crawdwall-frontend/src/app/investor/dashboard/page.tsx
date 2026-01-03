'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { proposalAPI, authAPI } from '@/lib/api';
import { Proposal } from '@/types';

export default function InvestorDashboard() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // For mock data, we'll get all proposals to show investors what's available
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
              <h1 className="text-2xl font-bold text-gray-900">Investor Dashboard</h1>
              <p className="text-gray-600">Explore funding opportunities and track your investments</p>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <a 
                  href="/investor/dashboard" 
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium bg-blue-100"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{proposal.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{proposal.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">${proposal.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Organizer:</span>
                  <span className="font-medium">{proposal.organizerName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    proposal.status === 'FUNDED' ? 'bg-green-100 text-green-800' :
                    proposal.status === 'IN_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                    proposal.status === 'VETTED' ? 'bg-blue-100 text-blue-800' :
                    proposal.status === 'SUBMITTED' ? 'bg-gray-100 text-gray-800' :
                    proposal.status === 'CALLBACK' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {proposal.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>

        {proposals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No proposals available at the moment.</p>
            <p className="text-gray-400 mt-2">Check back later for new funding opportunities.</p>
          </div>
        )}
      </main>
    </div>
  );
}