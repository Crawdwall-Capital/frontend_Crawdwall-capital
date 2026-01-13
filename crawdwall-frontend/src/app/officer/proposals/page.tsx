import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default function OfficerProposalsPage() {
  // Mock data for proposals
  const proposals = [
    {
      id: '1',
      title: 'Music Festival Funding',
      status: 'Under Review',
      date: '2023-11-15',
      amount: '$50,000',
      description: 'Proposal for funding a major music festival in Lagos',
      organizer: 'John Doe',
    },
    {
      id: '2',
      title: 'Tech Conference Proposal',
      status: 'Submitted',
      date: '2023-11-20',
      amount: '$30,000',
      description: 'Tech conference focusing on African innovation',
      organizer: 'Jane Smith',
    },
    {
      id: '3',
      title: 'Art Exhibition Fundraising',
      status: 'Under Review',
      date: '2023-11-25',
      amount: '$25,000',
      description: 'Contemporary art exhibition showcasing local artists',
      organizer: 'Robert Johnson',
    },
    {
      id: '4',
      title: 'Food Festival Investment',
      status: 'Submitted',
      date: '2023-11-10',
      amount: '$40,000',
      description: 'Cultural food festival celebrating regional cuisines',
      organizer: 'Emily Chen',
    },
    {
      id: '5',
      title: 'Sports Tournament Funding',
      status: 'Submitted',
      date: '2023-11-22',
      amount: '$35,000',
      description: 'Annual sports tournament for youth development',
      organizer: 'Michael Brown',
    },
  ];

  // For demonstration purposes, we'll use all proposals
  // In a real app, you would filter based on state
  const filteredProposals = proposals;

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
              <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                All ({proposals.length})
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Submitted
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                Under Review
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Approved
              </button>
              <button className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                Rejected
              </button>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredProposals.length > 0 ? (
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
                      By: {proposal.organizer}
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