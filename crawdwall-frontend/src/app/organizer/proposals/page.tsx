'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { mockAPI } from '@/__mocks__/data';

export default function OrganizerProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Get current user to fetch their proposals
        const userResponse: unknown = await mockAPI.getCurrentUser();
        if (!userResponse.success) {
          console.error('Failed to get current user');
          return;
        }
        
        const userId = userResponse.data.id;
        const response: unknown = await mockAPI.getUserProposals(userId);
        
        if (response.success) {
          // Transform the data to match the expected format
          const transformedProposals = response.data.map((proposal: any) => ({
            id: proposal.id,
            title: proposal.title,
            status: proposal.status,
            date: proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : 'N/A',
            amount: `$${proposal.amount.toLocaleString()}`,
            description: proposal.description,
          }));
          
          setProposals(transformedProposals);
          setFilteredProposals(transformedProposals);
        } else {
          console.error('Failed to fetch proposals:', response.message);
          // Fallback to mock data
          setProposals([
            {
              id: '1',
              title: 'Music Festival Funding',
              status: 'FUNDED',
              date: '2023-11-15',
              amount: '$50,000',
              description: 'Proposal for funding a major music festival in Lagos',
            },
            {
              id: '2',
              title: 'Tech Conference Proposal',
              status: 'IN_REVIEW',
              date: '2023-11-20',
              amount: '$30,000',
              description: 'Tech conference focusing on African innovation',
            },
            {
              id: '3',
              title: 'Art Exhibition Fundraising',
              status: 'SUBMITTED',
              date: '2023-11-25',
              amount: '$25,000',
              description: 'Contemporary art exhibition showcasing local artists',
            },
            {
              id: '4',
              title: 'Food Festival Investment',
              status: 'REJECTED',
              date: '2023-11-10',
              amount: '$40,000',
              description: 'Cultural food festival celebrating regional cuisines',
            },
          ]);
          setFilteredProposals([
            {
              id: '1',
              title: 'Music Festival Funding',
              status: 'FUNDED',
              date: '2023-11-15',
              amount: '$50,000',
              description: 'Proposal for funding a major music festival in Lagos',
            },
            {
              id: '2',
              title: 'Tech Conference Proposal',
              status: 'IN_REVIEW',
              date: '2023-11-20',
              amount: '$30,000',
              description: 'Tech conference focusing on African innovation',
            },
            {
              id: '3',
              title: 'Art Exhibition Fundraising',
              status: 'SUBMITTED',
              date: '2023-11-25',
              amount: '$25,000',
              description: 'Contemporary art exhibition showcasing local artists',
            },
            {
              id: '4',
              title: 'Food Festival Investment',
              status: 'REJECTED',
              date: '2023-11-10',
              amount: '$40,000',
              description: 'Cultural food festival celebrating regional cuisines',
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching proposals:', error);
        // Fallback to mock data
        setProposals([
          {
            id: '1',
            title: 'Music Festival Funding',
            status: 'FUNDED',
            date: '2023-11-15',
            amount: '$50,000',
            description: 'Proposal for funding a major music festival in Lagos',
          },
          {
            id: '2',
            title: 'Tech Conference Proposal',
            status: 'IN_REVIEW',
            date: '2023-11-20',
            amount: '$30,000',
            description: 'Tech conference focusing on African innovation',
          },
          {
            id: '3',
            title: 'Art Exhibition Fundraising',
            status: 'SUBMITTED',
            date: '2023-11-25',
            amount: '$25,000',
            description: 'Contemporary art exhibition showcasing local artists',
          },
          {
            id: '4',
            title: 'Food Festival Investment',
            status: 'REJECTED',
            date: '2023-11-10',
            amount: '$40,000',
            description: 'Cultural food festival celebrating regional cuisines',
          },
        ]);
        setFilteredProposals([
          {
            id: '1',
            title: 'Music Festival Funding',
            status: 'FUNDED',
            date: '2023-11-15',
            amount: '$50,000',
            description: 'Proposal for funding a major music festival in Lagos',
          },
          {
            id: '2',
            title: 'Tech Conference Proposal',
            status: 'IN_REVIEW',
            date: '2023-11-20',
            amount: '$30,000',
            description: 'Tech conference focusing on African innovation',
          },
          {
            id: '3',
            title: 'Art Exhibition Fundraising',
            status: 'SUBMITTED',
            date: '2023-11-25',
            amount: '$25,000',
            description: 'Contemporary art exhibition showcasing local artists',
          },
          {
            id: '4',
            title: 'Food Festival Investment',
            status: 'REJECTED',
            date: '2023-11-10',
            amount: '$40,000',
            description: 'Cultural food festival celebrating regional cuisines',
          },
        ]);
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
      const filtered = proposals.filter(proposal => 
        status === 'Submitted' ? proposal.status === 'SUBMITTED' :
        status === 'Under Review' ? proposal.status === 'IN_REVIEW' :
        status === 'Accepted' ? proposal.status === 'FUNDED' :
        status === 'Rejected' ? proposal.status === 'REJECTED' : proposal.status === status
      );
      setFilteredProposals(filtered);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Proposals</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track and manage all your event funding proposals
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">All Proposals</h3>
            <Link
              href="/organizer/proposals/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit New Proposal
            </Link>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => filterProposals('All')}
              className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              All ({proposals.length})
            </button>
            <button 
              onClick={() => filterProposals('Submitted')}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Submitted
            </button>
            <button 
              onClick={() => filterProposals('Under Review')}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Under Review
            </button>
            <button 
              onClick={() => filterProposals('Accepted')}
              className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            >
              Accepted
            </button>
            <button 
              onClick={() => filterProposals('Rejected')}
              className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            >
              Rejected
            </button>
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
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{proposal.date}</span>
                      <span className="mx-2">•</span>
                      <span>{proposal.amount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={proposal.status} />
                      <Link
                        href={`/organizer/proposals/${proposal.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
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