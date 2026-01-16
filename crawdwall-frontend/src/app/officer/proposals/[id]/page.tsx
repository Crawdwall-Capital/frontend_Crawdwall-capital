'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { mockAPI } from '@/__mocks__/data';

export default function OfficerProposalDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  const { id } = params;
  
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
          // Transform the API data to match the expected format
          const transformedProposal = {
            ...response.data,
            date: response.data.createdAt ? new Date(response.data.createdAt).toLocaleDateString() : 'Unknown',
            amount: `$${response.data.amount?.toLocaleString() || '0'}`,
            budget: `$${response.data.amount?.toLocaleString() || '0'}`,
            eventType: response.data.title.includes('Festival') ? 'Festival' : 
                      response.data.title.includes('Conference') ? 'Conference' : 
                      response.data.title.includes('Exhibition') ? 'Exhibition' : 'Event',
            duration: '3 days',
            revenuePlan: 'Ticket sales, sponsorships, merchandise',
            timeline: response.data.updatedAt || '2024-05-15',
            targetAudience: 'General public',
            organizer: response.data.organizerName || 'Unknown Organizer',
            organizerEmail: response.data.organizerEmail || 'unknown@example.com',
            documents: response.data.documents?.map((doc: string, index: number) => ({
              name: doc,
              url: '#'
            })) || [],
            reviews: response.data.votes?.map((vote: any) => ({
              officer: vote.officerName,
              date: new Date(vote.timestamp).toLocaleDateString(),
              status: vote.decision === 'ACCEPT' ? 'Accept' : 'Reject',
              comment: vote.review
            })) || [],
            milestones: [
              { name: 'Proposal Submission', status: 'Completed', date: response.data.createdAt ? new Date(response.data.createdAt).toLocaleDateString() : 'Unknown' },
              { name: 'Initial Review', status: response.data.status === 'SUBMITTED' ? 'Pending' : 'Completed', date: 'TBD' },
              { name: 'Officer Voting', status: response.data.status === 'IN_REVIEW' ? 'In Progress' : response.data.status === 'FUNDED' || response.data.status === 'REJECTED' ? 'Completed' : 'Pending', date: 'TBD' },
              { name: 'Final Decision', status: response.data.status === 'FUNDED' || response.data.status === 'REJECTED' ? 'Completed' : 'Pending', date: 'TBD' },
            ],
            statusHistory: [
              { status: 'Submitted', date: response.data.createdAt ? new Date(response.data.createdAt).toLocaleDateString() : 'Unknown', note: 'Proposal submitted for review' },
              ...(response.data.status !== 'SUBMITTED' ? [{ status: 'Under Review', date: 'TBD', note: 'Admin team reviewing proposal' }] : []),
              ...(response.data.status === 'FUNDED' ? [{ status: 'Approved', date: 'TBD', note: 'Proposal approved for funding' }] : []),
              ...(response.data.status === 'REJECTED' ? [{ status: 'Rejected', date: 'TBD', note: 'Proposal rejected' }] : []),
            ],
            votesReceived: response.data.votes?.length || 0,
            totalOfficers: 4,
            acceptanceThreshold: 4,
            myVote: response.data.votes?.find((vote: any) => vote.officerId === '7')?.decision || null,
          };
          
          setProposal(transformedProposal);
        } else {
          setError('Proposal not found');
          console.error('Failed to fetch proposal:', response.message);
        }
      } catch (err) {
        setError('Failed to load proposal data');
        console.error('Error fetching proposal:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProposal();
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading proposal details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Unable to load proposal data</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-400">Proposal not found</p>
      </div>
    );
  }

  // Check if this officer has already voted (safe to access proposal here)
  const hasVoted = proposal.myVote !== null;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{proposal.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Proposal #{proposal.id} • Submitted by {proposal.organizer} on {proposal.date}
            </p>
          </div>
          <Link
            href="/officer/proposals"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            ← Back to Proposals
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Proposal Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proposal Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h4>
                  <p className="text-gray-900 dark:text-white">{proposal.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Event Type</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.eventType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Requested Amount</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.amount}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Duration</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Target Audience</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.targetAudience}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Organizer</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.organizer} ({proposal.organizerEmail})</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Revenue Plan</h4>
                  <p className="text-gray-900 dark:text-white">{proposal.revenuePlan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Timeline</h4>
                  <p className="text-gray-900 dark:text-white">{new Date(proposal.timeline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Supporting Documents</h3>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {(proposal.documents || []).map((doc: any, index: number) => (
                  <li key={index} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 mr-3">description</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</span>
                    </div>
                    <a
                      href={doc.url}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reviews</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {(proposal.reviews || []).map((review: any, index: number) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{review.officer}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                      </div>
                      <StatusBadge status={review.status} />
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                {/* Voting status display */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <span>Votes: {proposal?.votesReceived || 0}/{proposal?.acceptanceThreshold || 4} needed for acceptance</span>
                    <span>Officers: {proposal?.votesReceived || 0}/{proposal?.totalOfficers || 4}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, ((proposal?.votesReceived || 0) / (proposal?.acceptanceThreshold || 4)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {!hasVoted ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: Implement actual voting submission
                    console.log('Submitting vote:', { decision, comment });
                  }} className="space-y-4">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Decision
                      </label>
                      <select
                        id="status"
                        value={decision}
                        onChange={(e) => setDecision(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        disabled={hasVoted}
                      >
                        <option value="">Select decision</option>
                        <option value="accept">Accept</option>
                        <option value="reject">Reject</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Review Comments (Required)
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Provide your detailed review and feedback..."
                        required
                        disabled={hasVoted}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={hasVoted || !decision || !comment}
                      >
                        Submit Vote
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">You have already voted on this proposal.</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Your vote: <span className="font-medium">{proposal?.myVote || 'None'}</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Status</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <StatusBadge status={proposal?.status || 'SUBMITTED'} />
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Budget</h4>
                <p className="text-gray-900 dark:text-white">{proposal?.budget || '$0'}</p>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Milestones</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {(proposal.milestones || []).map((milestone: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {milestone.status === 'Completed' ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <span className="text-green-600 dark:text-green-400 material-symbols-outlined text-xs">check</span>
                        </span>
                      ) : milestone.status === 'In Progress' ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                          <span className="text-yellow-600 dark:text-yellow-400 material-symbols-outlined text-xs">schedule</span>
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                          <span className="text-gray-400 dark:text-gray-500 material-symbols-outlined text-xs">pending</span>
                        </span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className={`text-sm font-medium ${milestone.status === 'Completed' ? 'text-green-800 dark:text-green-400' : milestone.status === 'In Progress' ? 'text-yellow-800 dark:text-yellow-400' : 'text-gray-800 dark:text-gray-300'}`}>
                        {milestone.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Status History</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                {(proposal.statusHistory || []).map((history: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <span className="text-blue-600 dark:text-blue-400 material-symbols-outlined text-xs">fiber_manual_record</span>
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{history.status}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{history.date}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{history.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}