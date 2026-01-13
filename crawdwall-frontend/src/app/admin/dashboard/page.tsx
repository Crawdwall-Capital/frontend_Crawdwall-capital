import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

export default function AdminDashboardPage() {
  // Mock data for stats
  const stats = [
    { name: 'Total Proposals', value: 42, icon: 'description', color: 'blue' },
    { name: 'Active Officers', value: 8, icon: 'person', color: 'green' },
    { name: 'Active Organizers', value: 15, icon: 'groups', color: 'yellow' },
    { name: 'Total Investors', value: 24, icon: 'account_balance', color: 'purple' },
    { name: 'Pending Reviews', value: 12, icon: 'hourglass_top', color: 'orange' },
    { name: 'Awaiting Votes', value: 5, icon: 'how_to_vote', color: 'red' },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: '1',
      action: 'Proposal submitted',
      description: 'Music Festival Funding proposal submitted by John Doe',
      time: '2 minutes ago',
      user: 'John Doe',
      type: 'proposal',
    },
    {
      id: '2',
      action: 'Officer created',
      description: 'Alice Johnson created as officer by Admin',
      time: '15 minutes ago',
      user: 'Admin',
      type: 'officer',
    },
    {
      id: '3',
      action: 'Proposal reviewed',
      description: 'Tech Conference proposal reviewed by Bob Smith',
      time: '1 hour ago',
      user: 'Bob Smith',
      type: 'review',
    },
    {
      id: '4',
      action: 'Proposal accepted',
      description: 'Art Exhibition proposal accepted by voting majority',
      time: '3 hours ago',
      user: 'Voting System',
      type: 'decision',
    },
  ];

  // Function to get color classes based on color name
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Full platform control, oversight, and configuration
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-600 dark:text-gray-300 material-symbols-outlined">
                    {stat.icon}
                  </span>
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h3>
              <Link
                href="/admin/audit-logs"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <span className="text-blue-600 dark:text-blue-400 material-symbols-outlined text-sm">
                        {activity.type === 'proposal' ? 'description' : 
                         activity.type === 'officer' ? 'person' : 
                         activity.type === 'review' ? 'rate_review' : 'check_circle'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Platform Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">System Status</span>
                <span className="text-sm text-green-600 dark:text-green-400">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Users</span>
                <span className="text-sm text-gray-900 dark:text-white">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Proposals</span>
                <span className="text-sm text-gray-900 dark:text-white">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg. Review Time</span>
                <span className="text-sm text-gray-900 dark:text-white">2.3 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Acceptance Rate</span>
                <span className="text-sm text-gray-900 dark:text-white">68%</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/admin/officers"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Manage Officers
                </Link>
                <Link
                  href="/admin/settings"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Platform Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}