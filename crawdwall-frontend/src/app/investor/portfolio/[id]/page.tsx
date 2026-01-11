import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorPortfolioDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Mock data for the portfolio item
  const portfolioItem = {
    id: id,
    eventName: "Afrobeats Festival 2024",
    eventDate: "June 15, 2024",
    investmentAmount: "$15,000",
    projectedReturn: "18%",
    actualReturn: "$2,700",
    status: "Active",
    progress: 75,
    category: "Music & Entertainment",
    location: "Lagos, Nigeria",
    startDate: "June 15, 2024",
    endDate: "June 17, 2024",
    duration: "12 months",
    description: "Major music festival featuring top Afrobeats artists with expected attendance of 50,000. This event has a proven track record of strong attendance and revenue generation.",
    roi: "20%",
    documents: [
      { name: "Investment Agreement", type: "PDF", size: "1.8 MB" },
      { name: "Quarterly Report", type: "PDF", size: "1.2 MB" },
      { name: "Financial Statements", type: "XLSX", size: "950 KB" }
    ],
    performance: [
      { month: "Jan 2024", value: 12 },
      { month: "Feb 2024", value: 25 },
      { month: "Mar 2024", value: 40 },
      { month: "Apr 2024", value: 55 },
      { month: "May 2024", value: 70 },
      { month: "Jun 2024", value: 75 }
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
            <Link href="/investor/portfolio" className="inline-flex items-center text-primary hover:underline">
              <span className="material-symbols-outlined text-sm mr-1">arrow_back</span>
              Back to Portfolio
            </Link>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mr-4">{portfolioItem.eventName}</h1>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    portfolioItem.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                    portfolioItem.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {portfolioItem.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center text-slate-400 text-sm">
                  <span className="flex items-center mr-4 mb-1">
                    <span className="material-symbols-outlined text-xs mr-1">category</span>
                    {portfolioItem.category}
                  </span>
                  <span className="flex items-center mr-4 mb-1">
                    <span className="material-symbols-outlined text-xs mr-1">location_on</span>
                    {portfolioItem.location}
                  </span>
                  <span className="flex items-center mr-4 mb-1">
                    <span className="material-symbols-outlined text-xs mr-1">event</span>
                    {portfolioItem.startDate} - {portfolioItem.endDate}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-slate-400 text-sm">Invested</p>
                <p className="text-xl font-bold text-white">{portfolioItem.investmentAmount}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">{portfolioItem.progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${portfolioItem.progress}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-slate-300 text-lg mb-6">
              {portfolioItem.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Investment Amount</h3>
                <p className="text-xl font-bold text-white">{portfolioItem.investmentAmount}</p>
              </div>
              
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Projected Return</h3>
                <p className="text-xl font-bold text-white">{portfolioItem.projectedReturn}</p>
              </div>
              
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Actual Return</h3>
                <p className="text-xl font-bold text-green-500">{portfolioItem.actualReturn}</p>
              </div>
              
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5">
                <h3 className="text-slate-400 text-sm mb-1">Current ROI</h3>
                <p className="text-xl font-bold text-green-500">{portfolioItem.roi}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Performance Overview</h2>
                
                <div className="h-64 flex items-center justify-center bg-slate-900/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-slate-400 mb-4">Performance chart visualization would appear here</p>
                    <div className="flex items-end justify-center h-40 space-x-2">
                      {portfolioItem.performance.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="w-8 bg-primary rounded-t" 
                            style={{ height: `${item.value}%` }}
                          ></div>
                          <span className="text-xs text-slate-400 mt-2">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
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
            </div>
            
            <div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Investment Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Investment Amount</span>
                    <span className="text-white font-medium">{portfolioItem.investmentAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Projected Return</span>
                    <span className="text-white font-medium">{portfolioItem.projectedReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Actual Return</span>
                    <span className="text-green-500 font-medium">{portfolioItem.actualReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ROI</span>
                    <span className="text-green-500 font-medium">{portfolioItem.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white font-medium">{portfolioItem.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status</span>
                    <span className="text-white font-medium">{portfolioItem.status}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-medium transition-colors">
                  Download Report
                </button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Documents</h2>
                <ul className="space-y-3">
                  {portfolioItem.documents.map((doc, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
                      <div className="flex items-center">
                        <span className="material-symbols-outlined text-primary mr-3">description</span>
                        <div>
                          <p className="text-white text-sm">{doc.name}</p>
                          <p className="text-slate-400 text-xs">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <button className="text-primary hover:text-primary-dark">
                        <span className="material-symbols-outlined text-sm">download</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
}