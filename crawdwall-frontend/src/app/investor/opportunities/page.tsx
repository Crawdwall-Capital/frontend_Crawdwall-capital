'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { proposalAPI } from '@/lib/api';

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
        const proposalsResponse = await proposalAPI.getAllProposals();
        
        if (proposalsResponse.data.success && proposalsResponse.data.data) {
          // Filter proposals to get only those that are suitable as investment opportunities
          const availableOpportunities = proposalsResponse.data.data
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
        // Set up dummy data for demo purposes
        setInvestmentOpportunities([
          { id: 1, eventName: 'Summer Music Festival', category: 'Music & Entertainment', location: 'Nairobi, Kenya', startDate: '2024-07-15', endDate: '2024-07-20', investmentAmount: '$50,000', minInvestment: '$5,000', projectedReturn: '18-22%', riskLevel: 'Medium', duration: '12 months', description: 'Annual summer music festival featuring international and local artists.', status: 'Available', featured: true, roi: '20%' },
          { id: 2, eventName: 'Tech Innovation Summit', category: 'Technology', location: 'Lagos, Nigeria', startDate: '2024-09-10', endDate: '2024-09-12', investmentAmount: '$30,000', minInvestment: '$3,000', projectedReturn: '15-18%', riskLevel: 'Low', duration: '8 months', description: 'International tech summit bringing together innovators and investors.', status: 'Available', featured: true, roi: '17%' },
          { id: 3, eventName: 'Art & Culture Expo', category: 'Arts & Culture', location: 'Cape Town, SA', startDate: '2024-11-05', endDate: '2024-11-10', investmentAmount: '$25,000', minInvestment: '$2,500', projectedReturn: '12-16%', riskLevel: 'Medium', duration: '10 months', description: 'Comprehensive art and culture exhibition showcasing African creativity.', status: 'Coming Soon', featured: false, roi: '15%' },
        ]);
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
    <div className="space-y-8">
      {/* Opportunities Overview */}
      <section>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Investment Opportunities
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Explore curated event investment opportunities in Africa's creative economy
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
            Subscribe to Alerts
          </button>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select 
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Level</label>
            <select 
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select 
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Featured Opportunities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOpportunities
            .filter(opportunity => opportunity.featured)
            .map((opportunity) => (
              <div key={opportunity.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{opportunity.eventName}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">{opportunity.category}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{opportunity.location}</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {opportunity.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Projected Return</p>
                    <p className="text-gray-900 dark:text-white font-medium">{opportunity.projectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Risk Level</p>
                    <p className="text-gray-900 dark:text-white font-medium">{opportunity.riskLevel}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Duration</p>
                    <p className="text-gray-900 dark:text-white font-medium">{opportunity.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">ROI</p>
                    <p className="text-green-600 dark:text-green-400 font-medium">{opportunity.roi}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opportunity.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                  }`}>
                    {opportunity.status}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/investor/opportunities/${opportunity.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                      View Details
                    </Link>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">All Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{opportunity.eventName}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">{opportunity.category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{opportunity.location}</span>
                  </div>
                </div>
                {opportunity.featured && (
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {opportunity.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Projected Return</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.projectedReturn}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Min. Investment</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.minInvestment}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Risk Level</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.riskLevel}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Duration</p>
                  <p className="text-gray-900 dark:text-white font-medium">{opportunity.duration}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  opportunity.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                }`}>
                  {opportunity.status}
                </span>
                <Link href={`/investor/opportunities/${opportunity.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}