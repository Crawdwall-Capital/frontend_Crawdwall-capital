import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorOpportunityDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Mock data for the opportunity
  const opportunity = {
    id: id,
    eventName: "Afrobeats Festival 2024",
    category: "Music & Entertainment",
    location: "Lagos, Nigeria",
    startDate: "June 15, 2024",
    endDate: "June 17, 2024",
    investmentAmount: "$15,000",
    minInvestment: "$5,000",
    projectedReturn: "18-22%",
    riskLevel: "Medium",
    duration: "12 months",
    description: "Major music festival featuring top Afrobeats artists with expected attendance of 50,000. This event has a proven track record of strong attendance and revenue generation.",
    status: "Available",
    featured: true,
    roi: "20%",
    pastPerformance: {
      year1: "18%",
      year2: "21%",
      year3: "19%"
    },
    documents: [
      { name: "Investment Prospectus", type: "PDF", size: "2.4 MB" },
      { name: "Financial Projections", type: "XLSX", size: "1.1 MB" },
      { name: "Risk Assessment", type: "PDF", size: "850 KB" }
    ]
  };

  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
        <InvestorNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/investor/opportunities" className="inline-flex items-center text-primary hover:underline">
              <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
              Back to Opportunities
            </Link>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mr-4">{opportunity.eventName}</h1>
                  <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                    {opportunity.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center text-slate-400 text-sm">
                  <span className="flex items-center mr-4 mb-1">
                    <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                    {opportunity.location}
                  </span>
                  <span className="flex items-center mr-4 mb-1">
                    <span className="material-symbols-outlined text-xs mr-1">event</span>
                    {opportunity.startDate} - {opportunity.endDate}
                  </span>
                  <span className="flex items-center mr-4 mb-1">
                    <span className="material-symbols-outlined text-xs mr-1">schedule</span>
                    {opportunity.duration}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  opportunity.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {opportunity.status}
                </span>
              </div>
            </div>
            
            <p className="text-slate-300 text-lg mb-8">
              {opportunity.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Projected Return</h3>
                <p className="text-2xl font-bold text-white">{opportunity.projectedReturn}</p>
              </div>
              
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Risk Level</h3>
                <p className="text-2xl font-bold text-white">{opportunity.riskLevel}</p>
              </div>
              
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Min. Investment</h3>
                <p className="text-2xl font-bold text-white">{opportunity.minInvestment}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Event Details</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 mb-4">
                    The Afrobeats Festival is an annual celebration of African music and culture, featuring top Afrobeats artists from across the continent. The event has consistently attracted over 50,000 attendees annually, with strong support from sponsors and media partners.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Revenue Streams</h3>
                  <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>Ticket sales from general admission and VIP tiers</li>
                    <li>Sponsorship deals with major brands</li>
                    <li>Merchandise sales featuring artist collaborations</li>
                    <li>Licensing rights for broadcast and streaming</li>
                    <li>Food and beverage partnerships</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">Market Analysis</h3>
                  <p className="text-slate-300">
                    The African music industry has experienced significant growth over the past five years, with Afrobeats becoming a global phenomenon. This trend positions the festival to benefit from increased interest and investment in African cultural events.
                  </p>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Past Performance</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Year 1</p>
                    <p className="text-xl font-bold text-green-500">{opportunity.pastPerformance.year1}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Year 2</p>
                    <p className="text-xl font-bold text-green-500">{opportunity.pastPerformance.year2}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-sm">Year 3</p>
                    <p className="text-xl font-bold text-green-500">{opportunity.pastPerformance.year3}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">Investment Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Projected ROI</span>
                    <span className="text-white font-medium">{opportunity.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white font-medium">{opportunity.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Minimum Investment</span>
                    <span className="text-white font-medium">{opportunity.minInvestment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Level</span>
                    <span className="text-white font-medium">{opportunity.riskLevel}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors mb-4">
                  Invest Now
                </button>
                
                <button className="w-full py-3 border border-primary text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors">
                  Download Documents
                </button>
                
                <div className="mt-6">
                  <h3 className="font-medium text-white mb-3">Documents</h3>
                  <ul className="space-y-2">
                    {opportunity.documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined text-xs mr-2 text-primary">description</span>
                          <span className="text-slate-300">{doc.name}</span>
                        </div>
                        <span className="text-slate-400">{doc.size}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
}