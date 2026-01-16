'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import { mockAPI } from '@/__mocks__/data';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

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
        const userResponse: any = await mockAPI.getCurrentUser();
        
        if (userResponse.success) {
          const userId = userResponse.data.id;
          
          // Fetch investor portfolio
          const portfolioResponse: any = await mockAPI.getInvestorPortfolio(userId);
          
          if (portfolioResponse.success) {
            // Format portfolio items
            const formattedPortfolio = portfolioResponse.data.map((item: any) => ({
              id: item.id,
              eventName: item.eventName,
              eventDate: item.investmentDate,
              investmentAmount: `$${item.investmentAmount.toLocaleString()}`,
              projectedReturn: item.projectedReturn,
              actualReturn: item.currentStatus === 'Completed' ? `$${(item.investmentAmount * 0.18).toLocaleString()}` : "$0",
              status: item.currentStatus,
              progress: item.progress,
              category: item.organizerName ? "Event" : "Unknown", // Would be derived from event data
              location: item.organizerName ? "Location TBD" : "Unknown" // Would be derived from event data
            }));
            
            setPortfolioItems(formattedPortfolio);
            
            // Calculate investment summary
            const totalInvested = formattedPortfolio.reduce((sum: number, item: any) => {
              return sum + parseInt(item.investmentAmount.replace(/[^0-9]/g, ''));
            }, 0);
            
            const totalReturns = formattedPortfolio.reduce((sum: number, item: any) => {
              return sum + parseInt(item.actualReturn.replace(/[^0-9]/g, ''));
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchPortfolioData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="flex flex-1 md:gap-8">
        <InvestorNavbar />

        <main className="w-full lg:w-3/4 ml-0 md:ml-64 px-4 sm:px-6 lg:px-8 py-8">
          {/* Portfolio Overview */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Your Investment Portfolio
              </h1>
              <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                Download Report
              </button>
            </div>
            
            <p className="text-slate-400 mb-8">
              Track the performance of your event investments and monitor returns.
            </p>
            
            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-slate-400 text-sm mb-1">Total Invested</p>
                <p className="text-2xl font-bold text-white">{investmentSummary.totalInvested}</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-slate-400 text-sm mb-1">Total Returns</p>
                <p className="text-2xl font-bold text-white">{investmentSummary.totalReturns}</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-slate-400 text-sm mb-1">Net Portfolio Value</p>
                <p className="text-2xl font-bold text-white">{investmentSummary.netValue}</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-slate-400 text-sm mb-1">Portfolio Growth</p>
                <p className="text-2xl font-bold text-green-500">{investmentSummary.portfolioGrowth}</p>
              </div>
            </div>
          </section>

          {/* Portfolio Table */}
          <section className="mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Event
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Investment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Projected Return
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Actual Return
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Progress
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {portfolioItems.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">{item.eventName}</div>
                            <div className="text-sm text-slate-400">{item.category} • {item.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{item.investmentAmount}</div>
                          <div className="text-sm text-slate-400">{item.eventDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {item.projectedReturn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {item.actualReturn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                            item.status === 'Upcoming' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 mr-2">
                              <div className="w-full bg-slate-700 rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm text-slate-400">{item.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link href={`/investor/portfolio/${item.id}`} className="text-primary hover:underline mr-4">
                            Details
                          </Link>
                          <Link href="#" className="text-slate-400 hover:text-white">
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
          <section className="mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Portfolio Performance</h2>
              <div className="h-80 flex items-center justify-center bg-slate-900/50 rounded-lg">
                <p className="text-slate-400">Performance chart visualization would appear here</p>
              </div>
            </div>
          </section>

          {/* Recent Transactions */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Event
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Afrobeats Festival 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      Return Payment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      +$2,700
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      May 15, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Tech Innovation Summit
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      Investment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                      -$25,000
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      Mar 22, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      Cultural Heritage Expo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      Return Payment
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      +$1,500
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      Apr 10, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}