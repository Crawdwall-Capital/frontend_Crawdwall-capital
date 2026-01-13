'use client';

import { useState } from 'react';

export default function AdminAuditLogsPage() {
  // Mock data for audit logs
  const [logs] = useState([
    {
      id: '1',
      timestamp: '2023-11-20 14:30:22',
      user: 'Admin',
      action: 'Proposal decision overridden',
      details: 'Proposal #PR-001 decision changed from "Reject" to "Accept"',
      ip: '192.168.1.100',
      status: 'Success',
    },
    {
      id: '2',
      timestamp: '2023-11-20 13:45:15',
      user: 'Alice Johnson',
      action: 'Proposal reviewed',
      details: 'Submitted review for Tech Conference Proposal',
      ip: '192.168.1.101',
      status: 'Success',
    },
    {
      id: '3',
      timestamp: '2023-11-20 12:20:33',
      user: 'Bob Smith',
      action: 'Officer suspended',
      details: 'Officer Carol Davis suspended by Admin',
      ip: '192.168.1.100',
      status: 'Success',
    },
    {
      id: '4',
      timestamp: '2023-11-19 16:15:47',
      user: 'David Wilson',
      action: 'Proposal voted',
      details: 'Voted "Accept" on Art Exhibition Proposal',
      ip: '192.168.1.102',
      status: 'Success',
    },
    {
      id: '5',
      timestamp: '2023-11-19 11:30:12',
      user: 'Admin',
      action: 'New officer created',
      details: 'Created officer account for David Wilson',
      ip: '192.168.1.100',
      status: 'Success',
    },
    {
      id: '6',
      timestamp: '2023-11-19 09:45:55',
      user: 'Jane Smith',
      action: 'Proposal submitted',
      details: 'Submitted Tech Conference Proposal',
      ip: '192.168.1.103',
      status: 'Success',
    },
  ]);

  const [filter, setFilter] = useState('all');

  // Filter logs based on selected filter
  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.action.toLowerCase().includes(filter);
  });

  // Function to get color classes based on status
  const getStatusColor = (status: string) => {
    return status === 'Success' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View full audit logs of all platform activities (immutable trail)
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Activity Logs</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'proposal' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('proposal')}
              >
                Proposals
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'officer' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('officer')}
              >
                Officers
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-full ${
                  filter === 'admin' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setFilter('admin')}
              >
                Admin Actions
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  IP Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No audit logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}