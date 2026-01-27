'use client';
export const dynamic = 'force-dynamic';
import * as React from 'react';

import Link from "next/link";
import Head from "next/head";
import { Fragment } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesCard from "@/components/sections/ServicesCard";
import WhyCrawdwallFeaturesSection from "@/components/sections/WhyCrawdwallFeaturesSection";
import CTACard from "@/components/sections/CTACard";

export default function ServicesPage() {
  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen">
        <Navbar />

        <HeroSection
          badgeText="What We Do"
          title="Services"
          subtitle="Connecting creators, investors, and businesses through the power of structured events. We offer comprehensive services that turn creative visions into investable assets."
          backgroundImageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
        />
        <main className="relative z-10">
          <section className="py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ServicesCard
                icon="campaign"
                title="Event Creators"
                description="Fund, structure, and scale your vision."
                features={[
                  "Access structured capital pools tailored for creative industries.",
                  "Transform your event IP into a bankable financial asset.",
                  "Professional financial planning to mitigate execution risks.",
                ]}
                imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBRlthInVkyNyVoJMgPog_qXh6bZuoTUWUDhuFvLdIVv5HW-w-OKUuiBLmFS2iYSm3vNbZ0rTRqpPZqwbAhOPoOX_V4HTbODrZ1rFqWrDElgWK_vrgb5yuuzyAZTpH0RBzcpZI4Qb6BHL8DOALwEcgu-b18hHKRLPJkDqvgKfLvK3pmsafIpc1lsr6PTeB8r0KIbx-YFC-7Q9cei7Bj8XlyDmQLPEktr3VOoZ3JGPrOHFWv8ZNJeR3gaQCOQ2otrrptKjhuilQrPKrw"
                altText="Event creators planning stage concert lighting"
                buttonText="Apply for Funding"
                buttonIcon="arrow_forward"
                buttonVariant="primary"
              />
            </div>
          </section>
          <section className="py-12 sm:py-24 bg-slate-50 dark:bg-[#151f2e] border-y border-slate-200 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ServicesCard
                icon="trending_up"
                title="Investors"
                description="Curated investment opportunities in the creative economy."
                features={[
                  "Participate in the growth of Africa's booming creative economy.",
                  "Transparent risk assessment and ROI tracking dashboards.",
                  "Diversify your portfolio with non-correlated event assets.",
                ]}
                imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDIFK8ui9QsrDM6UKNXcqYZlHR8feEjGij3KVEaIphaGpJTCBmeE8nvep5N7llrtddlY_GqHo6zy_51lNLFWaQk_X9D-krhD92ZekCgEbynWtWB1wR5uXH0PhvZFiDIeMyPCYGgg8kY_XAHKUdq3_FF-NDB_X834pbMW23rWK1ukE_zPCEWz1SwwPymAGWxyhEhCQTP3gHS2fjFhHHMSU54GjKRgOtaVKUW9bEnntGP37AMJLFLih8SSY4npUmpFTufDKysGN1By17M"
                altText="Digital dashboard displaying financial growth charts"
                buttonText="Explore Investment Opportunities"
                buttonVariant="secondary"
              />
            </div>
          </section>
          <section className="py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <ServicesCard
                icon="storefront"
                title="Businesses & SMEs"
                description="Targeted reach. Measurable impact."
                features={[
                  "Connect directly with engaged audiences in niche markets.",
                  "Data-driven sponsorship packages with clear KPI tracking.",
                  "Turn event attendees into loyal brand advocates.",
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
            features={[
              {
                icon: "account_balance",
                title: "Financial Structuring",
                description:
                  "We bring investment banking rigor to the events industry, ensuring every project is structured for financial viability and compliance.",
              },
              {
                icon: "rocket_launch",
                title: "Capital Deployment",
                description:
                  "Efficiently routing funds from investors to creators, ensuring liquidity where it's needed most to fuel growth and execution.",
              },
              {
                icon: "insights",
                title: "Strategic Insight",
                description:
                  "Leveraging data and market trends to minimize risk and maximize returns for all stakeholders in the ecosystem.",
              },
            ]}
          />

          <section className="py-16 sm:py-20 bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-8 sm:mb-10">
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
        <Footer />
      </div>
    </Fragment>
  );
}
