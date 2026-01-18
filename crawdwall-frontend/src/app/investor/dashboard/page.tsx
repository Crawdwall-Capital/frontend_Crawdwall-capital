'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockAPI } from '@/__mocks__/data';

export default function InvestorDashboardPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const [userName, setUserName] = useState<string>('Investor');
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalReturns: 0,
    activeEvents: 0,
    pendingReturns: 0
  });
  const [opportunities, setOpportunities] = useState<any[]>([]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Using the mock API to get current user
        const response: any = await mockAPI.getCurrentUser();
        if (response.success && response.data) {
          setUserName(response.data.name || 'Investor');
          
          // Fetch user-specific data
          const userId = response.data.id;
          const portfolioResponse: any = await mockAPI.getInvestorPortfolio(userId);
          
          if (portfolioResponse.success) {
            // Convert portfolio items to the format expected by the UI
            const portfolio = portfolioResponse.data.map((item: any) => ({
              id: item.id,
              eventName: item.eventName,
              investmentAmount: `$${item.investmentAmount.toLocaleString()}`,
              projectedReturn: item.projectedReturn,
              status: item.currentStatus,
              progress: item.progress
            }));
            setPortfolioItems(portfolio);
          }
          
          // Fetch recent activities
          const auditLogResponse: any = await mockAPI.getAuditLogs();
          if (auditLogResponse.success) {
            const activities = auditLogResponse.data.slice(0, 5).map((log: any, index: number) => ({
              id: log.id,
              title: log.action,
              description: log.details,
              date: log.timestamp,
              type: log.action.toLowerCase().includes('proposal') ? 'opportunity' : 
                     log.action.toLowerCase().includes('return') ? 'return' : 'update'
            }));
            setRecentActivity(activities);
          }
          
          // Fetch investment opportunities
          const allProposalsResponse: any = await mockAPI.getAllProposals();
          if (allProposalsResponse.success) {
            const opportunityList = allProposalsResponse.data
              .filter((proposal: any) => proposal.status === 'SUBMITTED' || proposal.status === 'IN_REVIEW')
              .slice(0, 3)
              .map((proposal: any) => ({
                id: proposal.id,
                title: proposal.title,
                description: proposal.description,
                minInvestment: `$${Math.floor(proposal.amount * 0.1).toLocaleString()}`,
                projectedReturn: `${Math.floor(Math.random() * 10) + 15}-${Math.floor(Math.random() * 10) + 20}%`,
                duration: `${Math.floor(Math.random() * 12) + 6} months`,
                riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
              }));
            setOpportunities(opportunityList);
          }
          
          // Calculate stats
          const fundedProposals = allProposalsResponse.data.filter((p: any) => p.status === 'FUNDED');
          const totalInvested = fundedProposals.reduce((sum: number, p: any) => sum + p.amount, 0);
          const activeEvents = fundedProposals.length;
          
          setStats({
            totalInvested,
            totalReturns: Math.floor(totalInvested * 0.15), // Assuming 15% return rate
            activeEvents,
            pendingReturns: 0
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fallback to a default name
        setUserName('Investor');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your event investments today.
        </p>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalInvested.toLocaleString()}</p>
            </div>
          </div>
        </div>
      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
              <span className="material-symbols-outlined text-xl">trending_up</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Returns</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalReturns.toLocaleString()}</p>
            </div>
          </div>
        </div>
      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
              <span className="material-symbols-outlined text-xl">event_available</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Events</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeEvents}</p>
            </div>
          </div>
        </div>
      
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-4">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Pending Returns</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.pendingReturns.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio and Recent Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Portfolio Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Portfolio</h2>
            <Link href="/investor/portfolio" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.eventName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Invested: {item.investmentAmount}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'FUNDED' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    item.status === 'SUBMITTED' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                    item.status === 'IN_REVIEW' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' :
                    item.status === 'VETTED' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                    item.status === 'CALLBACK' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300' :
                    item.status === 'REJECTED' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Projected Return</p>
                    <p className="font-bold text-gray-900 dark:text-white">{item.projectedReturn}</p>
                  </div>
                  
                  <div className="w-24">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">{item.progress}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <Link href="/investor/activity" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className={`mr-3 mt-1 h-8 w-8 rounded-full flex items-center justify-center ${
                  activity.type === 'opportunity' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  activity.type === 'return' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                }`}>
                  <span className="material-symbols-outlined text-sm">
                    {activity.type === 'opportunity' ? 'add_circle' : 
                     activity.type === 'return' ? 'paid' : 'event_note'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{activity.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Investment Opportunities */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Investment Opportunities</h2>
          <Link href="/investor/opportunities" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{opportunity.title}</h3>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                  New
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {opportunity.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Min. Investment</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.minInvestment}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Projected Return</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.projectedReturn}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Duration</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Risk Level</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.riskLevel}</p>
                </div>
              </div>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}