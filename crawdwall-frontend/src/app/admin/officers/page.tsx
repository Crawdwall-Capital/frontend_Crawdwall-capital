'use client';
export const dynamic = 'force-dynamic';
import * as React from 'react';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockAPI, getAllUsers } from '@/__mocks__/data';

export default function AdminOfficersPage() {
  const [showAddOfficerModal, setShowAddOfficerModal] = useState(false);
  const [officers, setOfficers] = useState<any[]>([]);
  const [filteredOfficers, setFilteredOfficers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get all users to filter officers
        const allUsersResponse = getAllUsers();
        const officersData = allUsersResponse.filter((user: any) => user.role === 'officer');
        
        if (officersData) {
          // Transform the API data to match the expected format
          const transformedOfficers = officersData.map((officer: any) => ({
            id: officer.id,
            name: officer.name,
            email: officer.email,
            status: officer.status || 'Active',
            lastLogin: officer.lastLogin || 'N/A',
            assignedProposals: officer.assignedProposals || 0,
            reviewsCompleted: officer.reviewsCompleted || 0,
          }));
          
          setOfficers(transformedOfficers);
          setFilteredOfficers(transformedOfficers);
        } else {
          setError('Failed to fetch officers');
          console.error('Failed to fetch officers: No data');
        }
      } catch (err) {
        setError('Failed to load officers data');
        console.error('Error fetching officers:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOfficers();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Officers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, suspend, or remove officers and assign voting privileges
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading officers...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Officers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, suspend, or remove officers and assign voting privileges
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5">
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Unable to load officers data</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Officers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, suspend, or remove officers and assign voting privileges
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Officers List</h3>
            <button 
              onClick={() => setShowAddOfficerModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New Officer
            </button>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredOfficers.length > 0 ? (
              filteredOfficers.map((officer) => (
                <div key={officer.id} className="px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {officer.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-medium text-gray-900 dark:text-white">
                            {officer.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {officer.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Last login: {officer.lastLogin}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          officer.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {officer.status}
                        </span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {officer.reviewsCompleted}/{officer.assignedProposals} reviews
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/officers/${officer.id}/edit`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            Edit
                          </Link>
                          <button className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                            {officer.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No officers found</p>
              </div>
            )}
          </div>
        </div>

        {/* Officer Privileges Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Officer Privileges</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="voting-privilege"
                    name="voting-privilege"
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="voting-privilege" className="font-medium text-gray-700 dark:text-gray-300">
                    Voting Privileges
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Allow officers to vote on proposals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="review-privilege"
                    name="review-privilege"
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="review-privilege" className="font-medium text-gray-700 dark:text-gray-300">
                    Review Privileges
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Allow officers to submit reviews on proposals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="access-privilege"
                    name="access-privilege"
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="access-privilege" className="font-medium text-gray-700 dark:text-gray-300">
                    Platform Access
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Grant access to officer dashboard and features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding new officer */}
      {showAddOfficerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowAddOfficerModal(false)}></div>
            
            <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle dark:bg-gray-800">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Add New Officer
                    </h3>
                    <div className="mt-4 w-full">
                      <form className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter officer's full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter officer's email"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="pt-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Assign Privileges
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="new-voting-privilege"
                                  name="new-voting-privilege"
                                  type="checkbox"
                                  defaultChecked={true}
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="new-voting-privilege" className="font-medium text-gray-700 dark:text-gray-300">
                                  Voting Privileges
                                </label>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Allow officer to vote on proposals
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="new-review-privilege"
                                  name="new-review-privilege"
                                  type="checkbox"
                                  defaultChecked={true}
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="new-review-privilege" className="font-medium text-gray-700 dark:text-gray-300">
                                  Review Privileges
                                </label>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Allow officer to submit reviews on proposals
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="new-access-privilege"
                                  name="new-access-privilege"
                                  type="checkbox"
                                  defaultChecked={true}
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="new-access-privilege" className="font-medium text-gray-700 dark:text-gray-300">
                                  Platform Access
                                </label>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Grant access to officer dashboard and features
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    // TODO: Implement actual officer creation
                    console.log('Creating new officer');
                    setShowAddOfficerModal(false);
                  }}
                >
                  Create Officer
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
                  onClick={() => setShowAddOfficerModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}