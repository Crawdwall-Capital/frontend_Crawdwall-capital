'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { mockAPI } from '@/__mocks__/data';

export default function ProposalDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = React.use(props.params);
  const id = params.id;
  const [proposal, setProposal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response: any = await mockAPI.getProposal(id);
        if (response.success && response.data) {
          // Ensure arrays exist in the response data
          const proposalWithDefaults = {
            ...response.data,
            documents: response.data.documents || [],
            milestones: response.data.milestones || [],
            statusHistory: response.data.statusHistory || [],
          };
          setProposal(proposalWithDefaults);
        } else {
          console.error('Failed to fetch proposal:', response.message);
          // Set default data if API call fails
          setProposal({
            id,
            title: 'Music Festival Funding',
            status: 'SUBMITTED',
            createdAt: '2023-11-15',
            amount: 50000,
            description: 'Proposal for funding a major music festival in Lagos',
            eventType: 'Music Festival',
            budget: 50000,
            duration: '3 days',
            revenuePlan: 'Ticket sales, sponsorships, merchandise',
            timeline: '2024-05-15',
            targetAudience: 'Young adults aged 18-35 interested in music',
            documents: [
              { name: 'Budget.pdf', url: '#' },
              { name: 'Timeline.xlsx', url: '#' },
              { name: 'MarketingPlan.docx', url: '#' },
            ],
            milestones: [
              { name: 'Venue Booking', status: 'COMPLETED', date: '2024-01-15' },
              { name: 'Artist Contracts', status: 'IN_PROGRESS', date: '2024-02-01' },
              { name: 'Marketing Launch', status: 'PENDING', date: '2024-03-01' },
              { name: 'Ticket Sales', status: 'PENDING', date: '2024-04-01' },
            ],
            statusHistory: [
              { status: 'SUBMITTED', date: '2023-11-15', note: 'Proposal submitted for review' },
              { status: 'UNDER_REVIEW', date: '2023-11-16', note: 'Admin team reviewing proposal' },
              { status: 'APPROVED', date: '2023-11-20', note: 'Proposal approved by committee' },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching proposal:', error);
        // Set default data if API call fails
        setProposal({
          id,
          title: 'Music Festival Funding',
          status: 'SUBMITTED',
          createdAt: '2023-11-15',
          amount: 50000,
          description: 'Proposal for funding a major music festival in Lagos',
          eventType: 'Music Festival',
          budget: 50000,
          duration: '3 days',
          revenuePlan: 'Ticket sales, sponsorships, merchandise',
          timeline: '2024-05-15',
          targetAudience: 'Young adults aged 18-35 interested in music',
          documents: [
            { name: 'Budget.pdf', url: '#' },
            { name: 'Timeline.xlsx', url: '#' },
            { name: 'MarketingPlan.docx', url: '#' },
          ],
          milestones: [
            { name: 'Venue Booking', status: 'COMPLETED', date: '2024-01-15' },
            { name: 'Artist Contracts', status: 'IN_PROGRESS', date: '2024-02-01' },
            { name: 'Marketing Launch', status: 'PENDING', date: '2024-03-01' },
            { name: 'Ticket Sales', status: 'PENDING', date: '2024-04-01' },
          ],
          statusHistory: [
            { status: 'SUBMITTED', date: '2023-11-15', note: 'Proposal submitted for review' },
            { status: 'UNDER_REVIEW', date: '2023-11-16', note: 'Admin team reviewing proposal' },
            { status: 'APPROVED', date: '2023-11-20', note: 'Proposal approved by committee' },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading proposal...</span>
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

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{proposal.title}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Proposal #{proposal.id} • Submitted on {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : 'Unknown date'}
            </p>
          </div>
          <Link
            href="/organizer/proposals"
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
                    <p className="text-gray-900 dark:text-white">${proposal.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Duration</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Target Audience</h4>
                    <p className="text-gray-900 dark:text-white">{proposal.targetAudience}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Revenue Plan</h4>
                  <p className="text-gray-900 dark:text-white">{proposal.revenuePlan}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Timeline</h4>
                  <p className="text-gray-900 dark:text-white">{proposal.timeline ? new Date(proposal.timeline).toLocaleDateString() : 'Not set'}</p>
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
                <p className="text-gray-900 dark:text-white">${proposal.amount.toLocaleString()}</p>
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
                      {milestone.status === 'COMPLETED' ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                          <span className="text-green-600 dark:text-green-400 material-symbols-outlined text-xs">check</span>
                        </span>
                      ) : milestone.status === 'IN_PROGRESS' ? (
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
                      <p className={`text-sm font-medium ${milestone.status === 'COMPLETED' ? 'text-green-800 dark:text-green-400' : milestone.status === 'IN_PROGRESS' ? 'text-yellow-800 dark:text-yellow-400' : 'text-gray-800 dark:text-gray-300'}`}>
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