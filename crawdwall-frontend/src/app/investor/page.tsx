'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorLandingPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

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

        <main>
          {/* Hero Section */}
          <section className="relative isolate overflow-hidden min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background-light dark:bg-background-dark">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop')" }}
              >
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
            </div>
            
            <div className="relative z-10 max-w-4xl sm:max-w-5xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Welcome to Event-Based Investing
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl sm:max-w-3xl mb-8 sm:mb-12">
                Crawdwall Capital is Africa's premier investment bank for events. We transform the creative economy into structured, investable assets with transparent risk profiles and measurable returns.
              </p>
              <Link href="/signup" className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-colors">
                Start Investing with Crawdwall Capital
              </Link>
            </div>
          </section>

          {/* Why Invest in Events Section */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 uppercase tracking-wider">
                Why Invest in Events
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:text-4xl">
                Events as Undervalued Investment Assets
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                The creative economy represents a massive untapped investment opportunity with predictable revenue streams and strong growth potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Revenue Generation Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">trending_up</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Revenue Generation</h3>
                <p className="text-slate-400 leading-relaxed">
                  Events generate predictable revenue streams through ticket sales, sponsorships, merchandise, and licensing agreements.
                </p>
              </div>
              
              {/* Structured Approach Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">account_balance</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Structured Approach</h3>
                <p className="text-slate-400 leading-relaxed">
                  We apply traditional investment banking rigor to event structuring, ensuring proper financial modeling and risk assessment.
                </p>
              </div>
              
              {/* Curated Projects Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Curated Projects</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our platform features only thoroughly vetted events with proven track records and realistic growth projections.
                </p>
              </div>
            </div>
          </section>

          {/* Investment Process Section */}
          <section className="py-20 bg-slate-900 dark:bg-black border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:text-4xl">
                  How We Deploy Investor Capital
                </h2>
              </div>
              
              <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border-dark -translate-y-1/2 z-0"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                      1
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Deal Sourcing</h3>
                    <p className="text-sm text-text-secondary text-center">Identifying high-potential event projects with strong fundamentals.</p>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                      2
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Underwriting &amp; Structuring</h3>
                    <p className="text-sm text-text-secondary text-center">Assessing risk and structuring financial instruments.</p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                      3
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Capital Deployment</h3>
                    <p className="text-sm text-text-secondary text-center">Allocating funds to vetted event projects.</p>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                      4
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Execution &amp; Oversight</h3>
                    <p className="text-sm text-text-secondary text-center">Monitoring event execution and performance.</p>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 border-2 border-green-400 text-white text-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)] mb-6">
                      <span className="material-symbols-outlined">emoji_events</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Returns &amp; Reporting</h3>
                    <p className="text-sm text-text-secondary text-center">Distributing returns and providing transparent reporting.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Management Section */}
          <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:text-4xl">
                  Mitigating Risk in Event Investments
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                  Our rigorous approach to risk management ensures your investment is protected at every stage of the event lifecycle.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Accordion Item 1 */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => toggleAccordion(0)}
                  >
                    <span className="font-medium text-white">Rigorous Project Evaluation</span>
                    <span className="material-symbols-outlined text-primary">
                      {expandedItems.includes(0) ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandedItems.includes(0) && (
                    <div className="p-4 bg-slate-50/5 dark:bg-slate-900/10">
                      <p className="text-slate-400">
                        Every event undergoes comprehensive due diligence including financial analysis, market research, and team evaluation to ensure viability.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Accordion Item 2 */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => toggleAccordion(1)}
                  >
                    <span className="font-medium text-white">Clear Contracts</span>
                    <span className="material-symbols-outlined text-primary">
                      {expandedItems.includes(1) ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandedItems.includes(1) && (
                    <div className="p-4 bg-slate-50/5 dark:bg-slate-900/10">
                      <p className="text-slate-400">
                        We establish transparent contractual agreements that clearly define rights, responsibilities, and revenue sharing arrangements.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Accordion Item 3 */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => toggleAccordion(2)}
                  >
                    <span className="font-medium text-white">Defined Revenue Structures</span>
                    <span className="material-symbols-outlined text-primary">
                      {expandedItems.includes(2) ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandedItems.includes(2) && (
                    <div className="p-4 bg-slate-50/5 dark:bg-slate-900/10">
                      <p className="text-slate-400">
                        Each investment opportunity has clearly defined revenue streams with measurable performance indicators and accountability measures.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Accordion Item 4 */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                    onClick={() => toggleAccordion(3)}
                  >
                    <span className="font-medium text-white">Ongoing Oversight</span>
                    <span className="material-symbols-outlined text-primary">
                      {expandedItems.includes(3) ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandedItems.includes(3) && (
                    <div className="p-4 bg-slate-50/5 dark:bg-slate-900/10">
                      <p className="text-slate-400">
                        Continuous monitoring of event progress with regular reporting and risk mitigation protocols to protect investor interests.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Target Investors Section */}
          <section className="py-20 bg-slate-50 dark:bg-slate-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:text-4xl">
                  Who Should Invest
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Our platform caters to diverse investor profiles seeking alternative assets in the growing creative economy.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Private Investors Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">person</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Private Investors</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Accredited individuals seeking portfolio diversification in alternative assets with strong growth potential.
                  </p>
                </div>
                
                {/* Family Offices Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-purple-600 dark:text-purple-400">home_work</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Family Offices</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Multi-generational wealth managers looking for innovative investment opportunities in emerging markets.
                  </p>
                </div>
                
                {/* Strategic Partners Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-green-600 dark:text-green-400">corporate_fare</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Strategic Partners</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Corporations seeking to align with the creative economy for marketing and business development.
                  </p>
                </div>
                
                {/* Institutions Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl text-amber-600 dark:text-amber-400">apartment</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Institutions</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Pension funds, insurance companies, and other institutional investors looking for stable returns.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Closing CTA Section */}
          <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              Ready to Join Africa's Premier Event Investment Platform?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
              Start building your portfolio in the creative economy today with our vetted event investment opportunities.
            </p>
            <Link href="/signup" className="inline-flex px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-colors min-w-[200px]">
              Become an Investor
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
}