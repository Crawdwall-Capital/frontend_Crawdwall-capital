'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import { mockAPI } from '@/__mocks__/data';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorOpportunitiesPage() {
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    status: 'all'
  });
  const [investmentOpportunities, setInvestmentOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Get all proposals that are in appropriate status for investment opportunities
        const proposalsResponse: any = await mockAPI.getAllProposals();
        
        if (proposalsResponse.success) {
          // Filter proposals to get only those that are suitable as investment opportunities
          const availableOpportunities = proposalsResponse.data
            .filter((proposal: any) => proposal.status === 'SUBMITTED' || proposal.status === 'IN_REVIEW' || proposal.status === 'VETTED')
            .map((proposal: any, index: number) => ({
              id: proposal.id || index + 1,
              eventName: proposal.title,
              category: proposal.category || "Event",
              location: proposal.location || "Location TBD",
              startDate: proposal.startDate || "TBD",
              endDate: proposal.endDate || "TBD",
              investmentAmount: `$${proposal.amount ? proposal.amount.toLocaleString() : '0'}`,
              minInvestment: proposal.minInvestment ? `$${proposal.minInvestment.toLocaleString()}` : "$5,000",
              projectedReturn: proposal.projectedReturn || "15-25%",
              riskLevel: proposal.riskLevel || "Medium",
              duration: proposal.duration || "12 months",
              description: proposal.description || "Detailed description of the investment opportunity.",
              status: proposal.status === 'SUBMITTED' ? 'Available' : proposal.status === 'IN_REVIEW' ? 'Available' : proposal.status === 'VETTED' ? 'Coming Soon' : 'Available',
              featured: proposal.featured || index < 2, // First two proposals as featured
              roi: proposal.roi || "18%"
            }));
          
          setInvestmentOpportunities(availableOpportunities);
        }
      } catch (error) {
        console.error('Error fetching investment opportunities:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOpportunities();
  }, []);

  const filteredOpportunities = investmentOpportunities.filter(opportunity => {
    return (
      (filters.category === 'all' || opportunity.category.includes(filters.category)) &&
      (filters.riskLevel === 'all' || opportunity.riskLevel === filters.riskLevel) &&
      (filters.status === 'all' || opportunity.status === filters.status)
    );
  });

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

        <main className="w-full lg:w-3/4 px-4 sm:px-6 lg:px-8 py-8">
          {/* Opportunities Overview */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Investment Opportunities
                </h1>
                <p className="text-slate-400 mt-2">
                  Explore curated event investment opportunities in Africa's creative economy
                </p>
              </div>
              <button className="mt-4 md:mt-0 px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                Subscribe to Alerts
              </button>
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                <select 
                  className="w-full bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option className="text-black" value="all">All Categories</option>
                  <option className="text-black" value="Music & Entertainment">Music & Entertainment</option>
                  <option className="text-black" value="Technology">Technology</option>
                  <option className="text-black" value="Arts & Culture">Arts & Culture</option>
                  <option className="text-black" value="Food & Beverage">Food & Beverage</option>
                  <option className="text-black" value="Fashion">Fashion</option>
                  <option className="text-black" value="Sports">Sports</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Risk Level</label>
                <select 
                  className="w-full bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filters.riskLevel}
                  onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
                >
                  <option className="text-black" value="all">All Levels</option>
                  <option className="text-black" value="Low">Low</option>
                  <option className="text-black" value="Low-Medium">Low-Medium</option>
                  <option className="text-black" value="Medium">Medium</option>
                  <option className="text-black" value="Medium-High">Medium-High</option>
                  <option className="text-black" value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
                <select 
                  className="w-full bg-input-bg dark:bg-input-bg-dark border border-border-light dark:border-border-dark rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option className="text-black" value="all">All Statuses</option>
                  <option className="text-black" value="Available">Available</option>
                  <option className="text-black" value="Coming Soon">Coming Soon</option>
                </select>
              </div>
            </div>
          </section>

          {/* Featured Opportunities */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Featured Opportunities</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOpportunities
                .filter(opportunity => opportunity.featured)
                .map((opportunity) => (
                  <div key={opportunity.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{opportunity.eventName}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-slate-400 mr-4">{opportunity.category}</span>
                          <span className="text-sm text-slate-400">{opportunity.location}</span>
                        </div>
                      </div>
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">
                      {opportunity.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-slate-400 text-xs">Projected Return</p>
                        <p className="text-white font-medium">{opportunity.projectedReturn}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Risk Level</p>
                        <p className="text-white font-medium">{opportunity.riskLevel}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Duration</p>
                        <p className="text-white font-medium">{opportunity.duration}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">ROI</p>
                        <p className="text-green-500 font-medium">{opportunity.roi}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {opportunity.status}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/investor/opportunities/${opportunity.id}`} className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                          View Details
                        </Link>
                        <button className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg text-sm font-medium transition-colors">
                          Invest
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </section>

          {/* All Opportunities */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6">All Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{opportunity.eventName}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-slate-400 mr-4">{opportunity.category}</span>
                        <span className="text-sm text-slate-400">{opportunity.location}</span>
                      </div>
                    </div>
                    {opportunity.featured && (
                      <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    {opportunity.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-slate-400 text-xs">Projected Return</p>
                      <p className="text-white font-medium">{opportunity.projectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Min. Investment</p>
                      <p className="text-white font-medium">{opportunity.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Risk Level</p>
                      <p className="text-white font-medium">{opportunity.riskLevel}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Duration</p>
                      <p className="text-white font-medium">{opportunity.duration}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      opportunity.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {opportunity.status}
                    </span>
                    <Link href={`/investor/opportunities/${opportunity.id}`} className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-white text-sm font-medium transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}