'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default function AdminProposalDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

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
    // Voting system fields
    votesReceived: 2,  // Number of votes already cast
    totalOfficers: 5,  // Total number of officers
    acceptanceThreshold: 4,  // Minimum votes needed for acceptance
    acceptVotes: 1,  // Number of accept votes
    rejectVotes: 1,  // Number of reject votes
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
  };

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
            href="/admin/proposals"
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Officer Reviews</h3>
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
              
              {/* Voting Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Voting Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Votes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{proposal.votesReceived}<span className="text-sm font-normal">/{proposal.totalOfficers}</span></p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Accept Votes</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">{proposal.acceptVotes}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Reject Votes</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-400">{proposal.rejectVotes}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <span>Acceptance Progress</span>
                    <span>{proposal.acceptVotes}/{proposal.acceptanceThreshold} needed</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (proposal.acceptVotes / proposal.acceptanceThreshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Override Decision Section */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Override Decision</h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="decision" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Override to
                    </label>
                    <select
                      id="decision"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Choose decision...</option>
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>
                      <option value="re-review">Send for Re-review</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reason for Override
                    </label>
                    <textarea
                      id="reason"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Provide reason for overriding the decision..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Override Decision
                    </button>
                  </div>
                </form>
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