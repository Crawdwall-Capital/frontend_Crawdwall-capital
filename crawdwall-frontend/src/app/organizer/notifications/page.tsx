import Link from 'next/link';

export default function OrganizerNotificationsPage() {
  // Mock data for notifications
  const notifications = [
    {
      id: '1',
      title: 'Proposal Accepted',
      message: 'Your proposal "Music Festival Funding" has been accepted.',
      date: '2023-11-20',
      read: false,
      type: 'success',
      link: '/organizer/proposals/1',
    },
    {
      id: '2',
      title: 'Proposal Under Review',
      message: 'Your proposal "Tech Conference Proposal" is currently under review.',
      date: '2023-11-21',
      read: true,
      type: 'info',
      link: '/organizer/proposals/2',
    },
    {
      id: '3',
      title: 'Milestone Reminder',
      message: 'Upcoming milestone: Artist contracts due in 3 days.',
      date: '2023-11-22',
      read: false,
      type: 'warning',
      link: '/organizer/proposals/1',
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Sunday, Nov 26th from 2 AM to 4 AM.',
      date: '2023-11-22',
      read: true,
      type: 'info',
      link: '#',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Function to get icon based on notification type
  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      default: return 'info';
    }
  };

  // Function to get color classes based on notification type
  const getColorClasses = (type: string) => {
    switch(type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Notifications</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Mark all as read
          </button>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <span className={`material-symbols-outlined ${getColorClasses(notification.type)}`}>
                      {getIcon(notification.type)}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-3">
                        {!notification.read && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            Unread
                          </span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(notification.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className={`text-sm ${!notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                        {notification.message}
                      </p>
                    </div>
                    <div className="mt-4">
                      {notification.link !== '#' ? (
                        <Link
                          href={notification.link}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View details
                        </Link>
                      ) : (
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No notifications found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}