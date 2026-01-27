'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
 'react';
import StatusBadge from '@/components/StatusBadge';
 '@/__mocks__/data';

export default function OfficerProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response: unknown = await mockAPI.getOfficerProposals('7'); // Default to David Wilson
        if (response.success) {
          setProposals(response.data);
          setFilteredProposals(response.data);
        } else {
          console.error('Failed to fetch proposals:', response.message);
          // Set empty arrays to show null state
          setProposals([]);
          setFilteredProposals([]);
        }
      } catch (error) {
        console.error('Error fetching proposals:', error);
        // Set empty arrays to show null state
        setProposals([]);
        setFilteredProposals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const filterProposals = (status: string) => {
    if (status === 'All') {
      setFilteredProposals(proposals);
    } else {
      const filtered = proposals.filter(proposal => proposal.status === status);
      setFilteredProposals(filtered);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Proposals</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and evaluate all submitted event funding proposals
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proposals List</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => filterProposals('All')}
                className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                All ({proposals.length})
              </button>
              <button 
                onClick={() => filterProposals('SUBMITTED')}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Submitted
              </button>
              <button 
                onClick={() => filterProposals('IN_REVIEW')}
                className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              >
                Under Review
              </button>
              <button 
                onClick={() => filterProposals('FUNDED')}
                className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                Approved
              </button>
              <button 
                onClick={() => filterProposals('REJECTED')}
                className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              >
                Rejected
              </button>
              <button 
                onClick={() => filterProposals('CALLBACK')}
                className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/30"
              >
                Callback
              </button>
              <button 
                onClick={() => filterProposals('VETTED')}
                className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/30"
              >
                Vetted
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="px-6 py-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading proposals...</span>
            </div>
          ) : filteredProposals.length > 0 ? (
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
                      By: {proposal.organizerName || proposal.organizer}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{proposal.date || proposal.createdAt?.split('T')[0]}</span>
                      <span className="mx-2">•</span>
                      <span>{proposal.amount ? `$${Number(proposal.amount).toLocaleString()}` : '$0'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={proposal.status} />
                      <Link
                        href={`/officer/proposals/${proposal.id}`}
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
    </div>
  );
}