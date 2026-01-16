'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockAPI } from '@/__mocks__/data';

export default function OrganizerNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const userResponse: any = await mockAPI.getCurrentUser();
        if (!userResponse.success) {
          throw new Error('Failed to get current user');
        }
        
        const currentUser = userResponse.data;
        
        // Get user's proposals
        const proposalsResponse: any = await mockAPI.getUserProposals(currentUser.id);
        const userProposals = proposalsResponse.success ? proposalsResponse.data : [];
        
        // Get audit logs
        const auditLogsResponse: any = await mockAPI.getAuditLogs();
        const auditLogs = auditLogsResponse.success ? auditLogsResponse.data : [];
        
        // Generate notifications from proposals and audit logs
        const generatedNotifications = [];
        
        // Proposal status change notifications
        userProposals.forEach((proposal: any) => {
          const proposalLogs = auditLogs.filter((log: any) => log.proposalId === proposal.id);
          
          proposalLogs.forEach((log: any) => {
            let notificationType = 'info';
            let title = '';
            let message = '';
            
            if (log.action === 'Proposal status updated') {
              if (proposal.status === 'IN_REVIEW') {
                notificationType = 'info';
                title = 'Proposal Under Review';
                message = `Your proposal "${proposal.title}" is currently under review.`;
              } else if (proposal.status === 'FUNDED') {
                notificationType = 'success';
                title = 'Proposal Accepted';
                message = `Your proposal "${proposal.title}" has been accepted for funding.`;
              } else if (proposal.status === 'REJECTED') {
                notificationType = 'error';
                title = 'Proposal Rejected';
                message = `Your proposal "${proposal.title}" has been rejected.`;
              } else if (proposal.status === 'CALLBACK') {
                notificationType = 'warning';
                title = 'Action Required';
                message = `Please review feedback for your proposal "${proposal.title}".`;
              }
            } else if (log.action === 'Officer voted') {
              notificationType = 'info';
              title = 'New Vote Received';
              message = `An officer has voted on your proposal "${proposal.title}".`;
            }
            
            if (title && message) {
              generatedNotifications.push({
                id: `proposal-${proposal.id}-${log.id}`,
                title,
                message,
                date: log.timestamp,
                read: false,
                type: notificationType,
                link: `/organizer/proposals/${proposal.id}`,
                category: 'proposal'
              });
            }
          });
        });
        
        // System notifications
        generatedNotifications.push({
          id: 'system-1',
          title: 'System Maintenance',
          message: 'Scheduled maintenance on Sunday, Dec 3rd from 2 AM to 4 AM.',
          date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          read: true,
          type: 'info',
          link: '#',
          category: 'system'
        });
        
        // Sort by date (newest first)
        generatedNotifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setNotifications(generatedNotifications);
        setUnreadCount(generatedNotifications.filter(n => !n.read).length);
        
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Fallback to mock data
        const fallbackNotifications = [
          {
            id: '1',
            title: 'Proposal Accepted',
            message: 'Your proposal "Music Festival Funding" has been accepted.',
            date: new Date().toISOString(),
            read: false,
            type: 'success',
            link: '/organizer/proposals/1',
          },
          {
            id: '2',
            title: 'System Maintenance',
            message: 'Scheduled maintenance on Sunday, Dec 3rd from 2 AM to 4 AM.',
            date: new Date(Date.now() - 86400000).toISOString(),
            read: true,
            type: 'info',
            link: '#',
          },
        ];
        setNotifications(fallbackNotifications);
        setUnreadCount(fallbackNotifications.filter(n => !n.read).length);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Function to get icon based on notification type
  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  // Function to get color classes based on notification type
  const getColorClasses = (type: string) => {
    switch(type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-blue-600 dark:text-blue-400';
    }
  };

  // Function to mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
    setUnreadCount(prev => prev - 1);
  };

  // Function to mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
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
          <button 
            onClick={markAllAsRead}
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
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
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                          disabled={notification.read}
                        >
                          {notification.read ? 'Read' : 'Mark as read'}
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