'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
 'react';
import StatusBadge from '@/components/StatusBadge';
 '@/__mocks__/data';

export default function OfficerReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response: unknown = await mockAPI.getOfficerReviews('7'); // Default to David Wilson
        if (response.success) {
          setReviews(response.data);
        } else {
          console.error('Failed to fetch reviews:', response.message);
          // Set empty array to show null state
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Set empty array to show null state
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage your proposal reviews
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review History</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading reviews...</span>
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white truncate">
                        {review.proposalTitle}
                      </h4>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        PR-{review.proposalId.padStart(3, '0')}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {review.comment}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{review.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={review.status} />
                      <StatusBadge status={review.proposalStatus} />
                      <Link
                        href={`/officer/proposals/${review.proposalId}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No reviews found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}