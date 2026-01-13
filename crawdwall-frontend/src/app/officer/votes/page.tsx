import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default function OfficerVotesPage() {
  // Mock data for proposals needing votes
  const proposalsNeedingVotes = [
    {
      id: '1',
      title: 'Music Festival Funding',
      status: 'Under Review',
      date: '2023-11-15',
      amount: '$50,000',
      description: 'Proposal for funding a major music festival in Lagos',
      organizer: 'John Doe',
      reviewsReceived: 3,
      totalOfficers: 5,
      acceptanceThreshold: 4,
      votesReceived: 3,
      myVote: null,
    },
    {
      id: '2',
      title: 'Tech Conference Proposal',
      status: 'Under Review',
      date: '2023-11-20',
      amount: '$30,000',
      description: 'Tech conference focusing on African innovation',
      organizer: 'Jane Smith',
      reviewsReceived: 2,
      totalOfficers: 5,
      acceptanceThreshold: 4,
      votesReceived: 2,
      myVote: null,
    },
  ];

  // Mock data for voted proposals
  const votedProposals = [
    {
      id: '3',
      title: 'Art Exhibition Fundraising',
      status: 'Accepted',
      date: '2023-11-25',
      amount: '$25,000',
      myVote: 'Accept',
      acceptanceThreshold: 4,
      votesReceived: 4,
      totalOfficers: 5,
    },
    {
      id: '4',
      title: 'Food Festival Investment',
      status: 'Rejected',
      date: '2023-11-10',
      amount: '$40,000',
      myVote: 'Reject',
      acceptanceThreshold: 4,
      votesReceived: 2,
      totalOfficers: 5,
    },
  ];

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
          {proposalsNeedingVotes.length > 0 ? (
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
          {votedProposals.length > 0 ? (
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