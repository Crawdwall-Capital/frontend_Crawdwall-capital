'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { User } from '@/types';

export default function OfficerManagement() {
  const router = useRouter();
  const [officers, setOfficers] = useState<User[]>([]);
  const [filteredOfficers, setFilteredOfficers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState<User | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        // Fetch mock officers from the data.ts file
        const { mockOfficers } = await import('@/__mocks__/data');
        
        setOfficers(mockOfficers);
        setFilteredOfficers(mockOfficers);
      } catch (err) {
        setError('An error occurred while fetching officers');
        console.error('Error fetching officers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = officers.filter(officer => 
        officer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        officer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOfficers(filtered);
    } else {
      setFilteredOfficers(officers);
    }
  }, [searchTerm, officers]);

  const handleOfficerClick = (officer: User) => {
    setSelectedOfficer(officer);
    setShowPopup(true);
  };

  const handleEditOfficer = () => {
    if (selectedOfficer) {
      // In a real app, this would navigate to an edit form
      alert(`Editing officer: ${selectedOfficer.name}`);
      setShowPopup(false);
    }
  };

  const handleDeleteOfficer = () => {
    if (selectedOfficer) {
      if (window.confirm(`Are you sure you want to delete ${selectedOfficer.name}?`)) {
        // In a real app, this would make an API call to delete the officer
        const updatedOfficers = officers.filter(officer => officer.id !== selectedOfficer.id);
        setOfficers(updatedOfficers);
        setFilteredOfficers(updatedOfficers);
        setShowPopup(false);
      }
    }
  };

  const handleAddOfficer = () => {
    // In a real app, this would navigate to an add officer form
    alert('Add new officer form would open here');
  };

  const handleLogout = () => {
    authAPI.logout();
    router.push('/login');
  };

  const handleBackToDashboard = () => {
    router.push('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading officers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Officer Management</h1>
              <p className="text-gray-600">Manage platform officers</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Manage Officers</h2>
            <button
              onClick={handleAddOfficer}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add New Officer
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Officers
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOfficers.map((officer) => (
                  <tr key={officer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {officer.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {officer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {officer.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(officer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleOfficerClick(officer)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOfficers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No officers found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Officer Detail Popup */}
      {showPopup && selectedOfficer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Officer Details</h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedOfficer.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedOfficer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{selectedOfficer.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Join Date</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedOfficer.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedOfficer.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handleEditOfficer}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteOfficer}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}