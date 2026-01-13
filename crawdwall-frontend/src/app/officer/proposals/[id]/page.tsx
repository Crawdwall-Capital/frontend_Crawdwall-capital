'use client';

import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { useState, useEffect } from 'react';

export default function OfficerProposalDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // State for form data
  const [decision, setDecision] = useState('');
  const [comment, setComment] = useState('');
  
  // Mock data for proposal
  const proposal = {
    id,
    title: 'Music Festival Funding',
    status: 'Under Review',
    date: '2023-11-15',
    amount: '$50,000',
    description: 'Proposal for funding a major music festival in Lagos',
    eventType: 'Music Festival',
    budget: '$50,000',
    duration: '3 days',
    revenuePlan: 'Ticket sales, sponsorships, merchandise',
    timeline: '2024-05-15',
    targetAudience: 'Young adults aged 18-35 interested in music',
    organizer: 'John Doe',
    organizerEmail: 'john@example.com',
    documents: [
      { name: 'Budget.pdf', url: '#' },
      { name: 'Timeline.xlsx', url: '#' },
      { name: 'MarketingPlan.docx', url: '#' },
    ],
    reviews: [
      { officer: 'Alice Johnson', date: '2023-11-16', status: 'Accept', comment: 'Strong financial projections and market analysis.' },
      { officer: 'Bob Smith', date: '2023-11-17', status: 'Reject', comment: 'Concerns about sustainability and ROI projections.' },
    ],
    milestones: [
      { name: 'Venue Booking', status: 'Completed', date: '2024-01-15' },
      { name: 'Artist Contracts', status: 'In Progress', date: '2024-02-01' },
      { name: 'Marketing Launch', status: 'Pending', date: '2024-03-01' },
      { name: 'Ticket Sales', status: 'Pending', date: '2024-04-01' },
    ],
    statusHistory: [
      { status: 'Submitted', date: '2023-11-15', note: 'Proposal submitted for review' },
      { status: 'Under Review', date: '2023-11-16', note: 'Admin team reviewing proposal' },
    ],
    // New fields for voting system
    votesReceived: 2,  // Number of votes already cast
    totalOfficers: 5,  // Total number of officers
    acceptanceThreshold: 4,  // Minimum votes needed for acceptance
    myVote: null,  // Current officer's vote status
  };
  
  // Check if this officer has already voted
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
                {proposal.documents.map((doc: any, index: number) => (
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
                {proposal.reviews.map((review: any, index: number) => (
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
                    <span>Votes: {proposal.votesReceived}/{proposal.acceptanceThreshold} needed for acceptance</span>
                    <span>Officers: {proposal.votesReceived}/{proposal.totalOfficers}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (proposal.votesReceived / proposal.acceptanceThreshold) * 100)}%` }}
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
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Your vote: <span className="font-medium">{proposal.myVote}</span></p>
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
                <StatusBadge status={proposal.status} />
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Budget</h4>
                <p className="text-gray-900 dark:text-white">{proposal.budget}</p>
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
                {proposal.milestones.map((milestone: any, index: number) => (
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
                {proposal.statusHistory.map((history: any, index: number) => (
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