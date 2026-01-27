'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/sections/HeroSection';
import MissionVisionCard from '@/components/sections/MissionVisionCard';
import CardWithImage from '@/components/sections/CardWithImage';
import WhyCrawdwallFeatureCard from '@/components/sections/WhyCrawdwallFeatureCard';
import TeamMemberCard from '@/components/sections/TeamMemberCard';
import CTACard from '@/components/sections/CTACard';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Navbar />
      
      <HeroSection 
        badgeText="Investment Banking for the Creative Economy"
        title="Who We Are"
        subtitle="We transform events from simple gatherings into structured investment opportunities that generate returns for all stakeholders."
        backgroundImageUrl="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Mission & Vision Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MissionVisionCard 
            title="Our Mission" 
            description="To revolutionize event financing by connecting capital with creativity, enabling event creators to scale their vision while providing investors with structured opportunities in the growing creative economy."
            icon="flag"
            colorScheme="blue"
          />
          
          <MissionVisionCard 
            title="Our Vision" 
            description="To become the leading platform for event investment banking globally, empowering the creative economy and making events investable assets that drive sustainable economic growth."
            icon="visibility"
            colorScheme="purple"
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What We Do</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our innovative approach transforms events into viable investment opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardWithImage 
              title="Event Structuring"
              description="We structure events as investment vehicles with clear risk-return profiles and transparent financial reporting."
              imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              icon="currency_exchange"
              features={["Financial modeling", "Risk assessment", "Compliance framework"]}
            />
            
            <CardWithImage 
              title="Capital Raising"
              description="We connect event creators with qualified investors seeking diversified portfolio exposure."
              imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
              icon="groups"
              features={["Investor matching", "Due diligence", "Deal structuring"]}
            />
            
            <CardWithImage 
              title="Performance Tracking"
              description="We provide ongoing analytics and reporting to optimize event ROI and investor returns."
              imageUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
              icon="analytics"
              features={["Real-time metrics", "ROI analysis", "Investor reporting"]}
            />
          </div>
        </div>
      </section>

      {/* Why Crawdwall Capital Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Why Crawdwall Capital</h2>
            
            <div className="space-y-6">
              <WhyCrawdwallFeatureCard 
                title="Industry Expertise"
                description="Our team brings decades of combined experience in investment banking, event management, and creative industry financing."
                icon="verified"
              />
              
              <WhyCrawdwallFeatureCard 
                title="Proven Track Record"
                description="We've successfully structured over 200 events worth more than $50 million in combined investment capital."
                icon="insights"
              />
              
              <WhyCrawdwallFeatureCard 
                title="Secure Platform"
                description="Enterprise-grade security ensures your investment and personal information is always protected."
                icon="lock"
              />
              
              <WhyCrawdwallFeatureCard 
                title="Dedicated Support"
                description="Our concierge-level service ensures your investment journey is seamless from start to finish."
                icon="support_agent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Team meeting discussing event financing"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Investment presentation"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              Leadership Team
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Meet the Team</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our experienced leadership team combines expertise in investment banking, creative industries, and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard 
              name="James Wilson"
              role="CEO & Founder"
              bio="Former investment banker with 15+ years in emerging market finance."
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
            />
            
            <TeamMemberCard 
              name="Sarah Johnson"
              role="Chief Operating Officer"
              bio="Operations expert with extensive experience in creative industry logistics."
              imageUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
            />
            
            <TeamMemberCard 
              name="Michael Chen"
              role="Head of Investment"
              bio="Portfolio manager specializing in alternative asset classes and event investments."
              imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2070&auto=format&fit=crop"
            />
            
            <TeamMemberCard 
              name="Emily Rodriguez"
              role="Creative Partnerships Director"
              bio="Event industry veteran with connections across global creative networks."
              imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Start Your Event Investment Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Whether you're creating, investing, or growing your business, we have the right path for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CTACard 
            title="For Creators"
            description="Transform your event concept into a structured investment opportunity."
            buttonText="Apply for Capital"
            buttonLink="#"
            icon="campaign"
            colorScheme="blue"
          />
          
          <CTACard 
            title="For Investors"
            description="Access curated event investment opportunities with transparent risk profiles."
            buttonText="Browse Opportunities"
            buttonLink="#"
            icon="trending_up"
            colorScheme="green"
          />
          
          <CTACard 
            title="For Businesses"
            description="Leverage event platforms for high-impact sponsorships and partnerships."
            buttonText="Partner with Us"
            buttonLink="#"
            icon="storefront"
            colorScheme="amber"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}