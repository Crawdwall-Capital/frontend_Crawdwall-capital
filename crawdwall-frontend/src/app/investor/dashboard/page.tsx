'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorDashboardPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  // Mock data for portfolio
  const portfolioItems = [
    {
      id: 1,
      eventName: "Afrobeats Festival 2024",
      investmentAmount: "$15,000",
      projectedReturn: "18%",
      status: "Active",
      progress: 75
    },
    {
      id: 2,
      eventName: "Tech Innovation Summit",
      investmentAmount: "$25,000",
      projectedReturn: "22%",
      status: "Upcoming",
      progress: 30
    },
    {
      id: 3,
      eventName: "Cultural Heritage Expo",
      investmentAmount: "$10,000",
      projectedReturn: "15%",
      status: "Completed",
      progress: 100
    }
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      title: "New Investment Opportunity",
      description: "Afrobeats Festival 2024 is now available for investment",
      date: "2 hours ago",
      type: "opportunity"
    },
    {
      id: 2,
      title: "Investment Return",
      description: "Received $2,700 return from Tech Innovation Summit",
      date: "1 day ago",
      type: "return"
    },
    {
      id: 3,
      title: "Event Update",
      description: "Cultural Heritage Expo reached 80% capacity",
      date: "2 days ago",
      type: "update"
    }
  ];

  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
        <InvestorNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <section className="mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, Investor!
            </h1>
            <p className="text-slate-400">
              Here's what's happening with your event investments today.
            </p>
          </section>

          {/* Stats Overview */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mr-4">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Invested</p>
                  <p className="text-2xl font-bold text-white">$50,000</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 mr-4">
                  <span className="material-symbols-outlined text-xl">trending_up</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Returns</p>
                  <p className="text-2xl font-bold text-white">$8,450</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 mr-4">
                  <span className="material-symbols-outlined text-xl">event_available</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Active Events</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 mr-4">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Pending Returns</p>
                  <p className="text-2xl font-bold text-white">$2,300</p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio and Recent Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Portfolio Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Portfolio</h2>
                <Link href="/investor/portfolio" className="text-primary text-sm hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-white">{item.eventName}</h3>
                        <p className="text-sm text-slate-400">Invested: {item.investmentAmount}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                        item.status === 'Upcoming' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-slate-400">Projected Return</p>
                        <p className="font-bold text-white">{item.projectedReturn}</p>
                      </div>
                      
                      <div className="w-24">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-right text-xs text-slate-400 mt-1">{item.progress}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <Link href="/investor/activity" className="text-primary text-sm hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className={`mr-3 mt-1 h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'opportunity' ? 'bg-blue-500/20 text-blue-400' :
                      activity.type === 'return' ? 'bg-green-500/20 text-green-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      <span className="material-symbols-outlined text-sm">
                        {activity.type === 'opportunity' ? 'add_circle' : 
                         activity.type === 'return' ? 'paid' : 'event_note'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{activity.title}</h3>
                      <p className="text-sm text-slate-400">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* New Investment Opportunities */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">New Investment Opportunities</h2>
              <Link href="/investor/opportunities" className="text-primary text-sm hover:underline">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Opportunity 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">Music & Culture Festival</h3>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Major music festival featuring top Afrobeats artists with expected attendance of 50,000.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-xs">Min. Investment</p>
                    <p className="text-white font-medium">$5,000</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Projected Return</p>
                    <p className="text-white font-medium">20-25%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Duration</p>
                    <p className="text-white font-medium">12 months</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Risk Level</p>
                    <p className="text-white font-medium">Medium</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                  Invest Now
                </button>
              </div>
              
              {/* Opportunity 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">Tech Innovation Summit</h3>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Annual summit bringing together tech leaders with expected sponsorship revenue of $2M.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-xs">Min. Investment</p>
                    <p className="text-white font-medium">$10,000</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Projected Return</p>
                    <p className="text-white font-medium">18-22%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Duration</p>
                    <p className="text-white font-medium">8 months</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Risk Level</p>
                    <p className="text-white font-medium">Low</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                  Invest Now
                </button>
              </div>
              
              {/* Opportunity 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-white">Art & Craft Fair</h3>
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                    Trending
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Cultural exhibition showcasing local artisans with strong community support.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-xs">Min. Investment</p>
                    <p className="text-white font-medium">$3,000</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Projected Return</p>
                    <p className="text-white font-medium">15-18%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Duration</p>
                    <p className="text-white font-medium">6 months</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Risk Level</p>
                    <p className="text-white font-medium">Low-Medium</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                  Invest Now
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
}