'use client';
export const dynamic = 'force-dynamic';
import * as React from 'react';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { mockAPI } from '@/__mocks__/data';

export default function OfficerVotesPage() {
  const [proposalsNeedingVotes, setProposalsNeedingVotes] = useState<any[]>([]);
  const [votedProposals, setVotedProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officerId = '7'; // Default to David Wilson
        
        // Fetch proposals needing votes
        const votesResponse: any = await mockAPI.getProposalsNeedingVotes(officerId);
        const votedResponse: any = await mockAPI.getMyVotedProposals(officerId);
        
        if (votesResponse.success && votedResponse.success) {
          setProposalsNeedingVotes(votesResponse.data);
          setVotedProposals(votedResponse.data);
        } else {
          console.error('Failed to fetch voting data:', votesResponse.message || votedResponse.message);
          // Set empty arrays to show null state
          setProposalsNeedingVotes([]);
          setVotedProposals([]);
        }
      } catch (error) {
        console.error('Error fetching voting data:', error);
        // Set empty arrays to show null state
        setProposalsNeedingVotes([]);
        setVotedProposals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Voting</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Submit your votes for proposals awaiting decision
        </p>
      </div>

      {/* Proposals Needing My Vote */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proposals Needing My Vote</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading voting data...</span>
            </div>
          ) : proposalsNeedingVotes.length > 0 ? (
            proposalsNeedingVotes.map((proposal) => (
              <div key={proposal.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {proposal.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {proposal.description}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      By: {proposal.organizer} • {proposal.votesReceived}/{proposal.acceptanceThreshold} votes for acceptance
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
                        href={`/officer/proposals/${proposal.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Vote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No proposals need your vote at this time</p>
            </div>
          )}
        </div>
      </div>

      {/* My Voted Proposals */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">My Voted Proposals</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading voting data...</span>
            </div>
          ) : votedProposals.length > 0 ? (
            votedProposals.map((proposal) => (
              <div key={proposal.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {proposal.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Your vote: <span className="font-medium">{proposal.myVote}</span>
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
                        href={`/officer/proposals/${proposal.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Result
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">You haven't voted on any proposals yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}