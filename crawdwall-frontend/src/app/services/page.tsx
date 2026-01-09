'use client';

import Link from 'next/link';
import Head from 'next/head';
import { Fragment } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesCard from '@/components/sections/ServicesCard';
import WhyCrawdwallFeaturesSection from '@/components/sections/WhyCrawdwallFeaturesSection';
import CTACard from '@/components/sections/CTACard';

export default function ServicesPage() {
  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
      <Navbar />

      <HeroSection
        badgeText="What We Do"
        title="Services"
        subtitle="Connecting creators, investors, and businesses through the power of structured events. We offer comprehensive services that turn creative visions into investable assets."
      />
      <main className="relative z-10">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ServicesCard
              icon="campaign"
              title="Event Creators"
              description="Fund, structure, and scale your vision."
              features={[
                "Access structured capital pools tailored for creative industries.",
                "Transform your event IP into a bankable financial asset.",
                "Professional financial planning to mitigate execution risks."
              ]}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBRlthInVkyNyVoJMgPog_qXh6bZuoTUWUDhuFvLdIVv5HW-w-OKUuiBLmFS2iYSm3vNbZ0rTRqpPZqwbAhOPoOX_V4HTbODrZ1rFqWrDElgWK_vrgb5yuuzyAZTpH0RBzcpZI4Qb6BHL8DOALwEcgu-b18hHKRLPJkDqvgKfLvK3pmsafIpc1lsr6PTeB8r0KIbx-YFC-7Q9cei7Bj8XlyDmQLPEktr3VOoZ3JGPrOHFWv8ZNJeR3gaQCOQ2otrrptKjhuilQrPKrw"
              altText="Event creators planning stage concert lighting"
              buttonText="Apply for Funding"
              buttonIcon="arrow_forward"
              buttonVariant="primary"
            />
          </div>
        </section>
<section className="py-16 sm:py-24 bg-slate-50 dark:bg-[#151f2e] border-y border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ServicesCard
              icon="trending_up"
              title="Investors"
              description="Curated investment opportunities in the creative economy."
              features={[
                "Participate in the growth of Africa's booming creative economy.",
                "Transparent risk assessment and ROI tracking dashboards.",
                "Diversify your portfolio with non-correlated event assets."
              ]}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDIFK8ui9QsrDM6UKNXcqYZlHR8feEjGij3KVEaIphaGpJTCBmeE8nvep5N7llrtddlY_GqHo6zy_51lNLFWaQk_X9D-krhD92ZekCgEbynWtWB1wR5uXH0PhvZFiDIeMyPCYGgg8kY_XAHKUdq3_FF-NDB_X834pbMW23rWK1ukE_zPCEWz1SwwPymAGWxyhEhCQTP3gHS2fjFhHHMSU54GjKRgOtaVKUW9bEnntGP37AMJLFLih8SSY4npUmpFTufDKysGN1By17M"
              altText="Digital dashboard displaying financial growth charts"
              buttonText="Explore Investment Opportunities"
              buttonVariant="secondary"
            />
          </div>
        </section>
<section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ServicesCard
              icon="storefront"
              title="Businesses & SMEs"
              description="Targeted reach. Measurable impact."
              features={[
                "Connect directly with engaged audiences in niche markets.",
                "Data-driven sponsorship packages with clear KPI tracking.",
                "Turn event attendees into loyal brand advocates."
              ]}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCkeDrtaNQESE3q88R8wOkLLrk-QVEnrdP_v_DEF0cdaanyELMS6gD40FuksU9F4etg7GIiXsaykKQ56Zu18zIFG7zVpgaBFSygW4cDaVwgmF1lDHGWh8Fxlc8mWQkK2ZoG12yyrrLQ4KBw15XD30De1JFvHeAmUmx-plOvWQ6mz0Yz5PGTFQPG_zfZMQLxOkNAdnL5bX4KVNegO_wNmZXjjd-Yr29dBn8W4WIWGidIAhAYtmrBh18gDZmtotonVrPD21fYpdyFGGrA"
              altText="Business professionals networking at a corporate event"
              buttonText="Sponsor an Event"
              buttonIcon="handshake"
              buttonVariant="primary"
            />
          </div>
        </section>
            <WhyCrawdwallFeaturesSection 
              title="Why Crawdwall Capital?"
              description="We don't just support events; we treat them as sophisticated investment vehicles. By combining financial structuring, capital deployment, and strategic insight, we make every event a bankable opportunity."
              features={[{
                icon: "account_balance",
                title: "Financial Structuring",
                description: "We bring investment banking rigor to the events industry, ensuring every project is structured for financial viability and compliance."
              }, {
                icon: "rocket_launch",
                title: "Capital Deployment",
                description: "Efficiently routing funds from investors to creators, ensuring liquidity where it's needed most to fuel growth and execution."
              }, {
                icon: "insights",
                title: "Strategic Insight",
                description: "Leveraging data and market trends to minimize risk and maximize returns for all stakeholders in the ecosystem."
              }]}
            />
            <section className="py-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-10">
                  Ready to Make Your Event Work as an Investment?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <CTACard 
                    title="For Creators"
                    description="Get Funding"
                    buttonText="Apply Now"
                    buttonLink="#"
                    icon="campaign"
                    colorScheme="blue"
                  />
                  <CTACard 
                    title="For Investors"
                    description="Start Investing"
                    buttonText="Explore"
                    buttonLink="#"
                    icon="trending_up"
                    colorScheme="green"
                  />
                  <CTACard 
                    title="For Businesses"
                    description="Become a Sponsor"
                    buttonText="Contact"
                    buttonLink="#"
                    icon="storefront"
                    colorScheme="amber"
                  />
                </div>
              </div>
            </section>
            </main>
            <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
<div className="col-span-1 md:col-span-2">
<div className="flex items-center gap-2 mb-4">
<div className="flex size-6 items-center justify-center rounded bg-primary text-white">
<span className="material-symbols-outlined text-sm">candlestick_chart</span>
</div>
<h3 className="text-white font-bold text-lg">Crawdwall Capital</h3>
</div>
<p className="text-slate-400 text-sm max-w-sm">
                        The investment bank for events. We connect capital with creativity to build a sustainable ecosystem for the future of entertainment.
                    </p>
</div>
<div>
<h4 className="text-white font-semibold mb-4">Quick Links</h4>
<ul className="space-y-2 text-sm text-slate-400">
<li><a className="hover:text-primary transition-colors" href="#">Services</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Events</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Invest</a></li>
<li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
</ul>
</div>
<div>
<h4 className="text-white font-semibold mb-4">Legal</h4>
<ul className="space-y-2 text-sm text-slate-400">
<li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Risk Disclosure</a></li>
</ul>
</div>
</div>
<div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
<p className="text-slate-500 text-sm">© 2024 Crawdwall Capital. All rights reserved.</p>
<div className="flex gap-4">
<a className="text-slate-500 hover:text-white transition-colors" href="#">
<span className="sr-only">Twitter</span>
<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
</a>
<a className="text-slate-500 hover:text-white transition-colors" href="#">
<span className="sr-only">LinkedIn</span>
<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path></svg>
</a>
</div>
</div>
</div>
</footer>
    </div>
  </Fragment>)
}