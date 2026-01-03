'use client';

import { useState, useEffect } from 'react';
import { proposalAPI } from '@/lib/api';
import { Proposal } from '@/types';

export default function AdminDashboardPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await proposalAPI.getAllProposals();
        if (response.data.success) {
          setProposals(response.data.data || []);
        }
      } catch (err) {
        setError('Failed to load proposals');
        console.error('Error fetching proposals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  // Group proposals by status
  const proposalsByStatus: Record<string, Proposal[]> = {
    SUBMITTED: [],
    'IN_REVIEW': [],
    VETTED: [],
    CALLBACK: [],
    FUNDED: [],
    REJECTED: [],
  };

  proposals.forEach(proposal => {
    if (proposalsByStatus[proposal.status]) {
      proposalsByStatus[proposal.status].push(proposal);
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Manage event funding proposals</p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(proposalsByStatus).map(([status, statusProposals]) => (
            <div key={status} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{status.replace('_', ' ')}</h2>
              <p className="text-3xl font-bold text-blue-600">{statusProposals.length}</p>
              <p className="text-sm text-gray-500 mt-1">proposals</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Proposals */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Proposals</h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : proposals.length === 0 ? (
            <p className="text-gray-500">No proposals found</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {proposals.slice(0, 5).map((proposal) => (
                <li key={proposal.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getStatusColorClass(proposal.status)}`}>
                      {proposal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    by {proposal.organizerName} • {new Date(proposal.createdAt).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatusColorClass(status: string) {
  const colorClasses: Record<string, string> = {
    SUBMITTED: 'bg-gray-100 text-gray-800',
    'IN_REVIEW': 'bg-blue-100 text-blue-800',
    VETTED: 'bg-purple-100 text-purple-800',
    CALLBACK: 'bg-yellow-100 text-yellow-800',
    FUNDED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  return colorClasses[status] || 'bg-gray-100 text-gray-800';
}