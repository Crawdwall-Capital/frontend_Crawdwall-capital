'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import CardWithImage from '@/components/sections/CardWithImage';
import WhyCrawdwallFeaturesSection from '@/components/sections/WhyCrawdwallFeaturesSection';
import CTACard from '@/components/sections/CTACard';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection
          badgeText="Revolutionizing Event Finance"
          title="Africa's First Investment Bank for Events"
          subtitle="We make events investable. From creators to investors to businesses, we structure, fund, and unlock value in the world's creative economy."
        />

        {/* Section 1: What We Do */}
        <div className="w-full bg-background-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What We Do</h2>
              <p className="mt-4 max-w-2xl text-text-secondary">
                Turning events into investable assets through clear financial planning and sustainable funding.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-12 flex justify-center border-b border-border-dark">
              <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                <button aria-current="page" className="group inline-flex items-center border-b-2 border-primary px-1 py-4 text-sm font-medium text-primary">
                  <span className="material-symbols-outlined mr-2">mic</span>
                  <span>For Creators</span>
                </button>
                <button className="group inline-flex items-center border-b-2 border-transparent px-1 py-4 text-sm font-medium text-text-secondary hover:border-gray-300 hover:text-gray-300">
                  <span className="material-symbols-outlined mr-2">monetization_on</span>
                  <span>For Investors</span>
                </button>
                <button className="group inline-flex items-center border-b-2 border-transparent px-1 py-4 text-sm font-medium text-text-secondary hover:border-gray-300 hover:text-gray-300">
                  <span className="material-symbols-outlined mr-2">business_center</span>
                  <span>For Businesses</span>
                </button>
              </nav>
            </div>
            {/* Content Grid (Showing Creator content by default for design) */}
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <CardWithImage 
                title="Financial Planning"
                description="Expert planning to structure your event budget and maximize potential ROI before you even launch."
                imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                icon="account_balance"
                features={["Budget structuring", "ROI maximization", "Pre-launch planning"]}
              />
              <CardWithImage 
                title="Sustainable Funding"
                description="Access secure and sustainable capital sources tailored specifically for the event lifecycle."
                imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
                icon="savings"
                features={["Secure capital sources", "Lifecycle funding", "Tailored solutions"]}
              />
              <CardWithImage 
                title="Strategic Growth"
                description="Long-term strategies for scaling single events into recurring, profitable franchises."
                imageUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
                icon="rocket_launch"
                features={["Scaling strategies", "Franchise development", "Long-term growth"]}
              />
            </div>
          </div>
        </div>
        <WhyCrawdwallFeaturesSection
          title="The World's First Investment Bank Dedicated to Events"
          description="We combine traditional financial expertise with a deep, nuanced understanding of the creative economy. We don't just bank; we build the infrastructure for culture to thrive profitably."
          features={[{
            icon: "account_balance",
            title: "Specialized Banking",
            description: "Financial instruments designed specifically for the event sector's cash flow cycles."
          }, {
            icon: "groups",
            title: "Investor Connections",
            description: "Direct lines to investors looking for alternative asset classes in the creative economy."
          }, {
            icon: "handshake",
            title: "Strategic Sponsorship",
            description: "Structuring sponsorship deals that align brand value with event growth."
          }]}
        />

        {/* Section 3: How It Works */}

        <div className="w-full bg-[#0b1016] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">From Idea to Investment</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Our proven process ensures transparency and returns for all stakeholders involved.</p>
            </div>
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-border-dark -translate-y-1/2 z-0"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Identify &amp; Assess</h3>
                  <p className="text-sm text-text-secondary">We evaluate event concepts or capital needs against market data.</p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Structure &amp; Plan</h3>
                  <p className="text-sm text-text-secondary">Financial modeling and legal structuring to create an investable asset.</p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Fund &amp; Execute</h3>
                  <p className="text-sm text-text-secondary">Connecting with investors and deploying capital for execution.</p>
                </div>
                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 border-2 border-green-400 text-white text-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)] mb-6">
                    <span className="material-symbols-outlined">emoji_events</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Everyone Wins</h3>
                  <p className="text-sm text-text-secondary">Creators grow, Investors earn returns, Businesses gain exposure.</p>
                </div>
              </div>
            </div>
            <div className="mt-16 flex justify-center">
              <button className="flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-colors">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
        {/* Section 4: Testimonials */}
        <div className="w-full bg-background-dark py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-12 text-center">What Our Partners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-card-bg p-8 rounded-xl border border-border-dark">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                </div>
                <p className="text-text-secondary italic mb-6">"Crawdwall Capital transformed how we approach our festival funding. We moved from scrambling for sponsors to having a structured investment plan."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden" data-alt="Portrait of a male event director">
                    <Image 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYmA4_10iEW5wgFEdC0BYaJLy-u46WIIEYlz3qPPcuHvI8uZTg7tZKYY2bXAaAnsyvTb6es6ZQXLxN9Qw4DIMt7Hf2YWORurLkjDM1S3GtNzGOawuWXurlVfSXTTG-9NVHhLoGjj8tq3v3yD1shLdzkNCAJyhaQA5A9pwNOYAXizg3VBU3rK3MgGjVe6y2kr-XvJYXXPOAMyGEDgOlDOgQGICpvFjWQVZrPPfaNYYyWC8cEMpVrqExnVa4gKa2M_mtljEdG3pAdZT4" 
                      alt="Portrait of a male event director" 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">David O.</h4>
                    <p className="text-xs text-text-secondary">Festival Director</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-card-bg p-8 rounded-xl border border-border-dark">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                </div>
                <p className="text-text-secondary italic mb-6">"As an investor, the creative economy seemed risky. Crawdwall provided the data and structure I needed to invest with confidence."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden" data-alt="Portrait of a female investor">
                    <Image 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5-ZkC8kTeNCNMSbtAV5W9NWPXrQRByoVB127zz28iLcf57jJgNx236ZMbtUwzN9sQ7bEMiNbXocZW04ntw99w-apdvJ1NpHrRl_23AuAmJ9BDq464SltxQELcvMbwSM2cEJWzT9P2boM-RvRFpT51wvn9WHc4bncU9Daqn1nOakFu6pVpn-q97gT582guLPLHncS1K_6gVOKYiF1Vhu4-jufMOFNKzfnp2r1xQmCCUYvYhvFXbN8D7wa0fULh7zxuaUGFKF6buIoD" 
                      alt="Portrait of a female investor" 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Sarah M.</h4>
                    <p className="text-xs text-text-secondary">Angel Investor</p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-card-bg p-8 rounded-xl border border-border-dark">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                  <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                </div>
                <p className="text-text-secondary italic mb-6">"The strategic insight we gained helped us scale our tech conference across three new cities in under a year."</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden" data-alt="Portrait of a male conference organizer">
                    <Image 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrwYUTXBFbde2657LtYJ0IcHUCu1S5UVZY4WF9WpLNEb9mc904HL8XjsVeWilN3aRQfKtaL3F2MZcPlrNaPgaJKVDHLgPOC5_L1l4Y2vfnPEWCtTnHe7taj_D1a4zDKfwcLQ63KDPWTkBAs1oJo66jRcYyO0BQ7vkvbMbwaIeZY-vPy0vwaJ3VdAoBhL-DyuHIHZtQm83vkzzMcf925C5_rzqsQx6jV5wM60LP-3PXVUvOxfKxR1IAR0qLyJK-WHji_4ZMo4QBr1Sq" 
                      alt="Portrait of a male conference organizer" 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">James K.</h4>
                    <p className="text-xs text-text-secondary">Tech Conference Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}