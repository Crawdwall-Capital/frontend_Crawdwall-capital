"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import CardWithImage from "@/components/sections/CardWithImage";
import WhyCrawdwallFeaturesSection from "@/components/sections/WhyCrawdwallFeaturesSection";
import CTACard from "@/components/sections/CTACard";
import Footer from "@/components/ui/Footer";

interface Card {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  features: string[];
}

interface TabContent {
  creators: {
    title: string;
    description: string;
    cards: Card[];
  };
  investors: {
    title: string;
    description: string;
    cards: Card[];
  };
  businesses: {
    title: string;
    description: string;
    cards: Card[];
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    "creators" | "investors" | "businesses"
  >("creators");

  // Define content for each tab
  const tabContent: TabContent = {
    creators: {
      title: "For Event Creators",
      description:
        "Turning events into investable assets through clear financial planning and sustainable funding.",
      cards: [
        {
          title: "Financial Planning",
          description:
            "Expert planning to structure your event budget and maximize potential ROI before you even launch.",
          imageUrl:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
          icon: "account_balance",
          features: [
            "Budget structuring",
            "ROI maximization",
            "Pre-launch planning",
          ],
        },
        {
          title: "Sustainable Funding",
          description:
            "Access secure and sustainable capital sources tailored specifically for the event lifecycle.",
          imageUrl:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
          icon: "savings",
          features: [
            "Secure capital sources",
            "Lifecycle funding",
            "Tailored solutions",
          ],
        },
        {
          title: "Strategic Growth",
          description:
            "Long-term strategies for scaling single events into recurring, profitable franchises.",
          imageUrl:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
          icon: "rocket_launch",
          features: [
            "Scaling strategies",
            "Franchise development",
            "Long-term growth",
          ],
        },
      ],
    },
    investors: {
      title: "For Investors",
      description:
        "Access to curated event investment opportunities with transparent risk profiles and measurable returns.",
      cards: [
        {
          title: "Risk Assessment",
          description:
            "Detailed evaluation of event concepts to ensure viable investment opportunities.",
          imageUrl:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
          icon: "assessment",
          features: ["Due diligence", "Risk modeling", "Market analysis"],
        },
        {
          title: "ROI Tracking",
          description:
            "Real-time monitoring of investment performance with transparent reporting.",
          imageUrl:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
          icon: "bar_chart",
          features: [
            "Performance metrics",
            "Return analytics",
            "Portfolio tracking",
          ],
        },
        {
          title: "Diversified Portfolio",
          description:
            "Access to a variety of event categories for balanced investment portfolios.",
          imageUrl:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
          icon: "inventory_2",
          features: [
            "Sector variety",
            "Risk distribution",
            "Geographic spread",
          ],
        },
      ],
    },
    businesses: {
      title: "For Businesses",
      description:
        "Leverage event platforms for high-impact sponsorships that drive real customer acquisition and brand growth.",
      cards: [
        {
          title: "Targeted Reach",
          description:
            "Connect directly with engaged audiences in niche markets aligned with your brand.",
          imageUrl:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
          icon: "campaign",
          features: [
            "Audience targeting",
            "Demographic alignment",
            "Engagement metrics",
          ],
        },
        {
          title: "Measurable Impact",
          description:
            "Data-driven sponsorship packages with clear KPI tracking and attribution.",
          imageUrl:
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
          icon: "trending_up",
          features: [
            "KPI tracking",
            "Attribution analysis",
            "Impact measurement",
          ],
        },
        {
          title: "Brand Partnership",
          description:
            "Turn event attendees into loyal brand advocates through meaningful engagement.",
          imageUrl:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
          icon: "handshake",
          features: [
            "Customer acquisition",
            "Brand loyalty",
            "Advocacy programs",
          ],
        },
      ],
    },
  };

  const currentContent = tabContent[activeTab as keyof TabContent];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-x-hidden">
      <Navbar />

      <main>
        <HeroSection
          badgeText="Revolutionizing Event Finance"
          title={<>
            Africa's First <span className="text-primary font-bold">Investment Bank</span> for Events
          </>}
          subtitle="We make events investable. From creators to investors to businesses, we structure, fund, and unlock value in the world's creative economy."
          backgroundImageUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
        />

        {/* Section 1: What We Do */}
        <div className="w-full bg-background-dark py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What We Do
              </h2>
              <p className="mt-4 max-w-2xl text-text-secondary">
                Turning events into investable assets through clear financial
                planning and sustainable funding.
              </p>
            </div>

            {/* Tabs Navigation - Responsive */}
            <div className="mb-12 flex flex-wrap justify-center gap-2 border-b border-border-dark">
              <nav
                aria-label="Tabs"
                className="-mb-px flex flex-wrap justify-center gap-4"
              >
                <button
                  aria-current={activeTab === "creators" ? "page" : undefined}
                  className={`group inline-flex items-center border-b-2 ${
                    activeTab === "creators"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:border-gray-300 hover:text-gray-300"
                  } px-3 py-2 text-sm font-medium min-w-max`}
                  onClick={() => setActiveTab("creators")}
                >
                  <span className="material-symbols-outlined mr-2 text-base">
                    mic
                  </span>
                  <span>For Creators</span>
                </button>
                <button
                  aria-current={activeTab === "investors" ? "page" : undefined}
                  className={`group inline-flex items-center border-b-2 ${
                    activeTab === "investors"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:border-gray-300 hover:text-gray-300"
                  } px-3 py-2 text-sm font-medium min-w-max`}
                  onClick={() => setActiveTab("investors")}
                >
                  <span className="material-symbols-outlined mr-2 text-base">
                    monetization_on
                  </span>
                  <span>For Investors</span>
                </button>
                <button
                  aria-current={activeTab === "businesses" ? "page" : undefined}
                  className={`group inline-flex items-center border-b-2 ${
                    activeTab === "businesses"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:border-gray-300 hover:text-gray-300"
                  } px-3 py-2 text-sm font-medium min-w-max`}
                  onClick={() => setActiveTab("businesses")}
                >
                  <span className="material-symbols-outlined mr-2 text-base">
                    business_center
                  </span>
                  <span>For Businesses</span>
                </button>
              </nav>
            </div>
            {/* Content Grid (Dynamic based on active tab) */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentContent.cards.map((card: Card, index: number) => (
                <CardWithImage
                  key={index}
                  title={card.title}
                  description={card.description}
                  imageUrl={card.imageUrl}
                  icon={card.icon}
                  features={card.features}
                />
              ))}
            </div>
          </div>
        </div>
        <WhyCrawdwallFeaturesSection
          title="The World's First Investment Bank Dedicated to Events"
          description="We combine traditional financial expertise with a deep, nuanced understanding of the creative economy. We don't just bank; we build the infrastructure for culture to thrive profitably."
          features={[
            {
              icon: "account_balance",
              title: "Specialized Banking",
              description:
                "Financial instruments designed specifically for the event sector's cash flow cycles.",
            },
            {
              icon: "groups",
              title: "Investor Connections",
              description:
                "Direct lines to investors looking for alternative asset classes in the creative economy.",
            },
            {
              icon: "handshake",
              title: "Strategic Sponsorship",
              description:
                "Structuring sponsorship deals that align brand value with event growth.",
            },
          ]}
        />

        <div className="pb-16 bg-slate-900 dark:bg-black flex flex-col items-center justify-center text-center">
          <Link href="/services">
            <button className="flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-colors">
              Discover Our Services
            </button>
          </Link>
        </div>

        {/* Section 3: How It Works */}

        <div className="w-full bg-[#0b1016] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                From Idea to Investment
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Our proven process ensures transparency and returns for all
                stakeholders involved.
              </p>
            </div>
            <div className="relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border-dark -translate-y-1/2 z-0"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Identify &amp; Assess
                  </h3>
                  <p className="text-sm text-text-secondary text-center">
                    We evaluate event concepts or capital needs against market
                    data.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Structure &amp; Plan
                  </h3>
                  <p className="text-sm text-text-secondary text-center">
                    Financial modeling and legal structuring to create an
                    investable asset.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card-bg border-2 border-primary text-white text-xl font-bold shadow-[0_0_15px_rgba(17,98,212,0.5)] mb-6">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Fund &amp; Execute
                  </h3>
                  <p className="text-sm text-text-secondary text-center">
                    Connecting with investors and deploying capital for
                    execution.
                  </p>
                </div>
                {/* Step 4 */}
                <div className="flex flex-col items-center text-center pt-6 sm:pt-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 border-2 border-green-400 text-white text-xl font-bold shadow-[0_0_15px_rgba(34,197,94,0.5)] mb-6">
                    <span className="material-symbols-outlined">
                      emoji_events
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Everyone Wins
                  </h3>
                  <p className="text-sm text-text-secondary text-center">
                    Creators grow, Investors earn returns, Businesses gain
                    exposure.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 flex justify-center">
              <Link href="/signup">
                <button 
                  type="button"
                  className="flex h-12 min-w-[200px] items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark cursor-pointer"
                >
                  Get Started Today
                </button>
              </Link>
            </div> 
          </div>
        </div>
        {/* Section 4: Testimonials */}
        <div className="w-full bg-background-dark py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-10 sm:mb-12 text-center">
              What Our Partners Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Testimonial 1 */}
              <div className="bg-card-bg p-6 sm:p-8 rounded-xl border border-border-dark flex flex-col h-full">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                </div>
                <p className="text-text-secondary italic mb-6 flex-grow">
                  "Crawdwall Capital transformed how we approach our festival
                  funding. We moved from scrambling for sponsors to having a
                  structured investment plan."
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden"
                    data-alt="Portrait of a male event director"
                  >
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
                    <p className="text-xs text-text-secondary">
                      Festival Director
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-card-bg p-6 sm:p-8 rounded-xl border border-border-dark flex flex-col h-full">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                </div>
                <p className="text-text-secondary italic mb-6 flex-grow">
                  "As an investor, the creative economy seemed risky. Crawdwall
                  provided the data and structure I needed to invest with
                  confidence."
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden"
                    data-alt="Portrait of a female investor"
                  >
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
                    <p className="text-xs text-text-secondary">
                      Angel Investor
                    </p>
                  </div>
                </div>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-card-bg p-6 sm:p-8 rounded-xl border border-border-dark flex flex-col h-full">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                  <span className="material-symbols-outlined text-[20px] fill-current">
                    star
                  </span>
                </div>
                <p className="text-text-secondary italic mb-6 flex-grow">
                  "The strategic insight we gained helped us scale our tech
                  conference across three new cities in under a year."
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full bg-gray-600 overflow-hidden"
                    data-alt="Portrait of a male conference organizer"
                  >
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
                    <p className="text-xs text-text-secondary">
                      Tech Conference Organizer
                    </p>
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
