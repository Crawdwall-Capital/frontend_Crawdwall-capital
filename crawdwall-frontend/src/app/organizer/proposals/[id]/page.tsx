'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
 'react';
import StatusBadge from '@/components/StatusBadge';
 '@/__mocks__/data';

interface Document {
  name: string;
  url: string;
}

interface Milestone {
  name: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  date: string;
}

interface StatusHistory {
  status: string;
  date: string;
  note: string;
}

interface Proposal {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  amount: number;
  description: string;
  eventType: string;
  budget: number;
  duration: string;
  revenuePlan: string;
  timeline: string;
  targetAudience: string;
  documents: Document[];
  milestones: Milestone[];
  statusHistory: StatusHistory[];
}

export default function ProposalDetailPage(
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response: unknown = await mockAPI.getProposal(id);

        if (response.success && response.data) {
          setProposal({
            ...response.data,
            documents: response.data.documents || [],
            milestones: response.data.milestones || [],
            statusHistory: response.data.statusHistory || [],
          });
        } else {
          throw new Error('API failed');
        }
      } catch (error) {
        console.error('Error fetching proposal:', error);

        // Fallback mock data
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
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          Loading proposal...
        </span>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {proposal.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Proposal #{proposal.id} • Submitted on{' '}
            {proposal.createdAt
              ? new Date(proposal.createdAt).toLocaleDateString()
              : 'Unknown'}
          </p>
        </div>

        <Link
          href="/organizer/proposals"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-700"
        >
          ← Back to Proposals
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <p className="text-gray-900 dark:text-white">
              {proposal.description}
            </p>

            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-2">
              Documents
            </h3>
            <ul className="space-y-1">
              {proposal.documents.map((doc: Document, idx: number) => (
                <li key={idx}>
                  <a
                    href={doc.url}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <StatusBadge status={proposal.status} />
            <p className="mt-4 text-gray-900 dark:text-white">
              Budget: ${proposal.amount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
