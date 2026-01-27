'use client';
export const dynamic = 'force-dynamic';
import * as React from 'react';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import Head from 'next/head';
import InvestorNavbar from '@/components/ui/InvestorNavbar';
import Footer from '@/components/ui/Footer';

export default function InvestorActivityPage() {
  const router = useRouter();
  
  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      title: "New Investment Opportunity",
      description: "Afrobeats Festival 2024 is now available for investment",
      date: "2 hours ago",
      type: "opportunity",
      eventId: "afrobeats-festival-2024"
    },
    {
      id: 2,
      title: "Investment Return",
      description: "Received $2,700 return from Tech Innovation Summit",
      date: "1 day ago",
      type: "return",
      eventId: "tech-innovation-summit"
    },
    {
      id: 3,
      title: "Event Update",
      description: "Cultural Heritage Expo reached 80% capacity",
      date: "2 days ago",
      type: "update",
      eventId: "cultural-heritage-expo"
    },
    {
      id: 4,
      title: "Portfolio Diversification",
      description: "Your portfolio allocation has been rebalanced",
      date: "3 days ago",
      type: "portfolio",
      eventId: null
    },
    {
      id: 5,
      title: "Document Uploaded",
      description: "New quarterly report for Fashion & Design Week",
      date: "5 days ago",
      type: "document",
      eventId: "fashion-design-week"
    },
    {
      id: 6,
      title: "Market Insight",
      description: "New trends in African entertainment sector",
      date: "1 week ago",
      type: "insight",
      eventId: null
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
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
        <InvestorNavbar />

        <main className="max-w-7xl ml-0 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Activity Feed
            </h1>
            <p className="text-slate-400">
              Stay updated on your investments and opportunities
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start pb-4 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <div className={`mr-3 mt-1 h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.type === 'opportunity' ? 'bg-blue-500/20 text-blue-400' :
                    activity.type === 'return' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'update' ? 'bg-amber-500/20 text-amber-400' :
                    activity.type === 'portfolio' ? 'bg-purple-500/20 text-purple-400' :
                    activity.type === 'document' ? 'bg-indigo-500/20 text-indigo-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    <span className="material-symbols-outlined text-sm">
                      {activity.type === 'opportunity' ? 'add_circle' : 
                       activity.type === 'return' ? 'paid' : 
                       activity.type === 'update' ? 'event_note' : 
                       activity.type === 'portfolio' ? 'pie_chart' : 
                       activity.type === 'document' ? 'description' : 
                       'info'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h3 className="font-medium text-white">{activity.title}</h3>
                        <p className="text-sm text-slate-400">{activity.description}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 sm:mt-0">{activity.date}</p>
                    </div>
                    {activity.eventId && (
                      <Link 
                        href={`/investor/portfolio/${activity.eventId}`} 
                        className="mt-2 inline-block text-sm text-primary hover:underline"
                      >
                        View details
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-text-secondary hover:bg-white/5 transition-colors">
                Load More
              </button>
            </div>
          </div>
        </main>

      </div>
    </Fragment>
  );
}