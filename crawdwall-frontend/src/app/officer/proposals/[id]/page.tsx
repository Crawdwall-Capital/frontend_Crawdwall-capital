'use client';
export const dynamic = 'force-dynamic';
import * as React from 'react';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { mockAPI } from '@/__mocks__/data';

export default function OfficerProposalDetailPage(props: { params: { id: string } }) {
  const { id } = props.params;

  // State for form data
  const [decision, setDecision] = useState('');
  const [comment, setComment] = useState('');

  // State for proposal data
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        setLoading(true);
        setError(null);

        const response: any = await mockAPI.getProposal(id);

        if (response.success && response.data) {
          const transformedProposal = {
            ...response.data,
            date: response.data.createdAt
              ? new Date(response.data.createdAt).toLocaleDateString()
              : 'Unknown',
            amount: `$${response.data.amount?.toLocaleString() || '0'}`,
            budget: `$${response.data.amount?.toLocaleString() || '0'}`,
            eventType: response.data.title.includes('Festival')
              ? 'Festival'
              : response.data.title.includes('Conference')
              ? 'Conference'
              : response.data.title.includes('Exhibition')
              ? 'Exhibition'
              : 'Event',
            duration: '3 days',
            revenuePlan: 'Ticket sales, sponsorships, merchandise',
            timeline: response.data.updatedAt || '2024-05-15',
            targetAudience: 'General public',
            organizer: response.data.organizerName || 'Unknown Organizer',
            organizerEmail: response.data.organizerEmail || 'unknown@example.com',
            documents:
              response.data.documents?.map((doc: string) => ({
                name: doc,
                url: '#',
              })) || [],
            reviews:
              response.data.votes?.map((vote: any) => ({
                officer: vote.officerName,
                date: new Date(vote.timestamp).toLocaleDateString(),
                status: vote.decision === 'ACCEPT' ? 'Accept' : 'Reject',
                comment: vote.review,
              })) || [],
            milestones: [
              {
                name: 'Proposal Submission',
                status: 'Completed',
                date: response.data.createdAt
                  ? new Date(response.data.createdAt).toLocaleDateString()
                  : 'Unknown',
              },
              {
                name: 'Initial Review',
                status: response.data.status === 'SUBMITTED' ? 'Pending' : 'Completed',
                date: 'TBD',
              },
              {
                name: 'Officer Voting',
                status:
                  response.data.status === 'IN_REVIEW'
                    ? 'In Progress'
                    : response.data.status === 'FUNDED' || response.data.status === 'REJECTED'
                    ? 'Completed'
                    : 'Pending',
                date: 'TBD',
              },
              {
                name: 'Final Decision',
                status:
                  response.data.status === 'FUNDED' || response.data.status === 'REJECTED'
                    ? 'Completed'
                    : 'Pending',
                date: 'TBD',
              },
            ],
            statusHistory: [
              {
                status: 'Submitted',
                date: response.data.createdAt
                  ? new Date(response.data.createdAt).toLocaleDateString()
                  : 'Unknown',
                note: 'Proposal submitted for review',
              },
              ...(response.data.status !== 'SUBMITTED'
                ? [{ status: 'Under Review', date: 'TBD', note: 'Admin team reviewing proposal' }]
                : []),
              ...(response.data.status === 'FUNDED'
                ? [{ status: 'Approved', date: 'TBD', note: 'Proposal approved for funding' }]
                : []),
              ...(response.data.status === 'REJECTED'
                ? [{ status: 'Rejected', date: 'TBD', note: 'Proposal rejected' }]
                : []),
            ],
            votesReceived: response.data.votes?.length || 0,
            totalOfficers: 4,
            acceptanceThreshold: 4,
            myVote:
              response.data.votes?.find((vote: any) => vote.officerId === '7')?.decision || null,
          };

          setProposal(transformedProposal);
        } else {
          setError('Proposal not found');
        }
      } catch (err) {
        setError('Failed to load proposal data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          Loading proposal details...
        </span>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 dark:text-red-400 text-lg font-medium">
          {error || 'Proposal not found'}
        </p>
      </div>
    );
  }

  const hasVoted = proposal.myVote !== null;

  return (
    <div className="space-y-8">
      {/* rest of JSX unchanged */}
    </div>
  );
}