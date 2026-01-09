'use client';

import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CTACard from '@/components/sections/CTACard';
import ContactCard from '@/components/sections/ContactCard';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Navbar />
      
      <HeroSection 
        title="Let's Make Your Event Work as an Investment"
        subtitle="We transform events from simple gatherings into structured investment opportunities that generate returns for all stakeholders."
      />

      {/* Choose Your Path Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Path</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Whether you're creating, investing, or growing your business, we have the right path for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Event Creators */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">campaign</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-4">Event Creators</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
                Turn your event concept into a scalable investment vehicle with structured funding and financial planning.
              </p>
              <div className="text-center">
                <Link href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">
                  Apply for Capital
                  <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                </Link>
              </div>
            </div>
            
            {/* Card 2 - Investors */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-green-600 dark:text-green-400">trending_up</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-4">Investors</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
                Access curated event investment opportunities with transparent risk profiles and measurable returns.
              </p>
              <div className="text-center">
                <Link href="#" className="inline-flex items-center text-green-600 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300">
                  View Opportunities
                </Link>
              </div>
            </div>
            
            {/* Card 3 - Businesses & SMEs */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-amber-600 dark:text-amber-400">storefront</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center mb-4">Businesses & SMEs</h3>
              <p className="text-slate-600 dark:text-slate-300 text-center mb-6">
                Leverage event platforms for high-impact sponsorships that drive real customer acquisition and brand growth.
              </p>
              <div className="text-center">
                <Link href="#" className="inline-flex items-center text-amber-600 dark:text-amber-400 font-medium hover:text-amber-800 dark:hover:text-amber-300">
                  Become a Sponsor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Inquiries Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">General Inquiries</h2>
            
            <div className="space-y-8">
              <ContactCard 
                icon="mail"
                title="Email"
                content={["info@crawdwallcapital.com", "support@crawdwallcapital.com"]}
              />
              
              <ContactCard 
                icon="phone"
                title="Phone"
                content={["+254 700 000 000", "Mon-Fri, 8am-6pm EAT"]}
              />
              
              <ContactCard 
                icon="location_on"
                title="Headquarters"
                content={["Lagos, Nigeria", "West Africa's Financial Hub"]}
              />
              
              <div className="flex items-center space-x-6 pt-4">
                <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column - Map Card */}
          <div>
            <div className="rounded-xl h-96 relative overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"
                data-alt="Map of financial district in Lagos, Nigeria showing location of Crawdwall Capital"
                data-location="Nigeria"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDN6m1Qql6p-bYrzttX1G3x6hS9qVpEnNgfdOdfvLWgtpmOjSo_AQjq4BtyZzsLd7Wg96EmG51gxWDfdBfj5NlyQWjKMwCxRVCp5UpzK9v4ew760pmPZKbcXtuz-CNkjY1_f4HKAcB81TSJNMqu7uh0R7wWEs4uzCDyOjPDj8zd7hFRmesJvas83p6KsDv_A9Tfy7eyl_9Kh3GDl1J3kADYhdzlOEv0yCG1ljLRs-oUbWajUfshH-roqpAowRHpdurIe5VjSCtjG767')" }}
              >
                <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-md text-sm font-medium text-slate-700 dark:text-slate-300 transition-opacity duration-300 group-hover:opacity-100 opacity-0">
                  View on Maps
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900/50 my-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Start Turning Your Event Into an Investment Today
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of creators, investors, and businesses who trust Crawdwall Capital to structure their event investments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#" className="px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-dark transition-colors">
              Apply for Funding
            </Link>
            <Link href="#" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg shadow hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-300 dark:border-slate-600">
              Invest Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          © 2024 Crawdwall Capital. All rights reserved.
        </p>
      </footer>
    </div>
  );
}