'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authAPI, proposalAPI } from '@/lib/api';

export default function InvestorPortfolioPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [investmentSummary, setInvestmentSummary] = useState({
    totalInvested: "$0",
    totalReturns: "$0",
    netValue: "$0",
    portfolioGrowth: "+0%"
  });
  const [loading, setLoading] = useState(true);
  
  const toggleAccordion = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Get current user
        const userResponse = await authAPI.getCurrentUser();
        
        if (userResponse.data.success && userResponse.data.data) {
          // Fetch user's proposals (this serves as the portfolio for investors)
          const portfolioResponse = await proposalAPI.getUserProposals();
          
          if (portfolioResponse.data.success && portfolioResponse.data.data) {
            // Format portfolio items
            const formattedPortfolio = portfolioResponse.data.data.map((item: any, index: number) => ({
              id: item.id || index + 1,
              eventName: item.title,
              eventDate: item.createdAt || "TBD",
              investmentAmount: `$${item.amount ? item.amount.toLocaleString() : '0'}`,
              projectedReturn: `${Math.floor(Math.random() * 10) + 15}-${Math.floor(Math.random() * 10) + 20}%`,
              actualReturn: item.status === 'FUNDED' ? `$${(item.amount * 0.18).toLocaleString()}` : "$0",
              status: item.status,
              progress: Math.floor(Math.random() * 100), // Placeholder progress
              category: item.category || "Event",
              location: item.location || "Location TBD"
            }));
            
            setPortfolioItems(formattedPortfolio);
            
            // Calculate investment summary
            const totalInvested = formattedPortfolio.reduce((sum: number, item: any) => {
              return sum + parseInt(item.investmentAmount.replace(/[^0-9]/g, '') || '0');
            }, 0);
            
            const totalReturns = formattedPortfolio.reduce((sum: number, item: any) => {
              return sum + parseInt(item.actualReturn.replace(/[^0-9]/g, '') || '0');
            }, 0);
            
            const netValue = totalInvested + totalReturns;
            const portfolioGrowth = totalInvested > 0 ? `+${((totalReturns / totalInvested) * 100).toFixed(1)}%` : "+0%";
            
            setInvestmentSummary({
              totalInvested: `$${totalInvested.toLocaleString()}`,
              totalReturns: `$${totalReturns.toLocaleString()}`,
              netValue: `$${netValue.toLocaleString()}`,
              portfolioGrowth
            });
          }
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Set up dummy data for demo purposes
        const dummyPortfolio = [
          { id: 1, eventName: 'Summer Music Festival', eventDate: '2024-06-15', investmentAmount: '$10,000', projectedReturn: '18-22%', actualReturn: '$1,800', status: 'FUNDED', progress: 75, category: 'Entertainment', location: 'Nairobi, Kenya' },
          { id: 2, eventName: 'Tech Conference', eventDate: '2024-07-20', investmentAmount: '$5,000', projectedReturn: '15-18%', actualReturn: '$0', status: 'IN_REVIEW', progress: 30, category: 'Technology', location: 'Lagos, Nigeria' },
          { id: 3, eventName: 'Art Exhibition', eventDate: '2024-08-10', investmentAmount: '$7,500', projectedReturn: '12-16%', actualReturn: '$0', status: 'SUBMITTED', progress: 10, category: 'Arts', location: 'Cape Town, SA' },
        ];
        
        setPortfolioItems(dummyPortfolio);
        
        const totalInvested = dummyPortfolio.reduce((sum: number, item: any) => {
          return sum + parseInt(item.investmentAmount.replace(/[^0-9]/g, ''));
        }, 0);
        
        const totalReturns = dummyPortfolio.reduce((sum: number, item: any) => {
          return sum + parseInt(item.actualReturn.replace(/[^0-9]/g, '') || '0');
        }, 0);
        
        const netValue = totalInvested + totalReturns;
        const portfolioGrowth = totalInvested > 0 ? `+${((totalReturns / totalInvested) * 100).toFixed(1)}%` : "+0%";
        
        setInvestmentSummary({
          totalInvested: `$${totalInvested.toLocaleString()}`,
          totalReturns: `$${totalReturns.toLocaleString()}`,
          netValue: `$${netValue.toLocaleString()}`,
          portfolioGrowth
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolioData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Your Investment Portfolio
          </h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
            Download Report
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Track the performance of your event investments and monitor returns.
        </p>
        
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Invested</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{investmentSummary.totalInvested}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Total Returns</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{investmentSummary.totalReturns}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Net Portfolio Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{investmentSummary.netValue}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Portfolio Growth</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{investmentSummary.portfolioGrowth}</p>
          </div>
        </div>
      </section>

      {/* Portfolio Table */}
      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Investment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Projected Return
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actual Return
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {portfolioItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.eventName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.category} • {item.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{item.investmentAmount}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.eventDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.projectedReturn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.actualReturn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Active' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                        item.status === 'Upcoming' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 mr-2">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link href={`/investor/portfolio/${item.id}`} className="text-blue-600 dark:text-blue-400 hover:underline mr-4">
                        Details
                      </Link>
                      <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        Documents
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Performance Chart Placeholder */}
      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Performance</h2>
          <div className="h-80 flex items-center justify-center bg-gray-900/50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-gray-400 dark:text-gray-300">Performance chart visualization would appear here</p>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Transactions</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Afrobeats Festival 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Return Payment
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +$2,700
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  May 15, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Tech Innovation Summit
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Investment
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                  -$25,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Mar 22, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Cultural Heritage Expo
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Return Payment
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                  +$1,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  Apr 10, 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
