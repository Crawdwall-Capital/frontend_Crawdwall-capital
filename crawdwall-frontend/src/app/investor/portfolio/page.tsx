'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { authAPI, proposalAPI } from '@/lib/api';


interface PortfolioItem {
  id: number | string;
  eventName: string;
  eventDate: string;
  investmentAmount: string;
  projectedReturn: string;
  actualReturn: string;
  status: string;
  progress: number;
  category: string;
  location: string;
}

interface InvestmentSummary {
  totalInvested: string;
  totalReturns: string;
  netValue: string;
  portfolioGrowth: string;
}

export default function InvestorPortfolioPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [investmentSummary, setInvestmentSummary] = useState<InvestmentSummary>({
    totalInvested: "$0",
    totalReturns: "$0",
    netValue: "$0",
    portfolioGrowth: "+0%"
  });
  const [loading, setLoading] = useState(true);

  const toggleAccordion = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const userResponse = await authAPI.getCurrentUser();
        if (userResponse.data.success && userResponse.data.data) {
          const portfolioResponse = await proposalAPI.getUserProposals();
          if (portfolioResponse.data.success && portfolioResponse.data.data) {
            const formattedPortfolio: PortfolioItem[] = portfolioResponse.data.data.map((item: any, index: number) => ({
              id: item.id || index + 1,
              eventName: item.title,
              eventDate: item.createdAt || "TBD",
              investmentAmount: `$${item.amount ? item.amount.toLocaleString() : '0'}`,
              projectedReturn: `${Math.floor(Math.random() * 10) + 15}-${Math.floor(Math.random() * 10) + 20}%`,
              actualReturn: item.status === 'FUNDED' ? `$${(item.amount * 0.18).toLocaleString()}` : "$0",
              status: item.status,
              progress: Math.floor(Math.random() * 100),
              category: item.category || "Event",
              location: item.location || "Location TBD"
            }));

            setPortfolioItems(formattedPortfolio);

            const totalInvested = formattedPortfolio.reduce((sum, item) =>
              sum + parseInt(item.investmentAmount.replace(/[^0-9]/g, '') || '0'), 0
            );
            const totalReturns = formattedPortfolio.reduce((sum, item) =>
              sum + parseInt(item.actualReturn.replace(/[^0-9]/g, '') || '0'), 0
            );
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
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading portfolio...</span>
      </div>
    );
  }

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
          {Object.entries(investmentSummary).map(([label, value]) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                {label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </p>
              <p className={`text-2xl font-bold ${label === 'portfolioGrowth' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Table */}
      <section className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Event', 'Investment', 'Projected Return', 'Actual Return', 'Status', 'Progress', 'Actions'].map(header => (
                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {portfolioItems.map(item => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.projectedReturn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.actualReturn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'FUNDED' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                        item.status === 'IN_REVIEW' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 mr-2">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.progress}%` }}></div>
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

      {/* Performance Chart */}
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
                {['Event', 'Type', 'Amount', 'Date', 'Status'].map(header => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Sample static transactions */}
              {[
                { event: 'Afrobeats Festival 2024', type: 'Return Payment', amount: '+$2,700', date: 'May 15, 2024', status: 'Completed', statusColor: 'green' },
                { event: 'Tech Innovation Summit', type: 'Investment', amount: '-$25,000', date: 'Mar 22, 2024', status: 'Active', statusColor: 'blue' },
                { event: 'Cultural Heritage Expo', type: 'Return Payment', amount: '+$1,500', date: 'Apr 10, 2024', status: 'Completed', statusColor: 'green' },
              ].map((tx, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{tx.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.type}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${tx.statusColor === 'green' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.statusColor === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
