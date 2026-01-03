'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants';
import { useState, useEffect } from 'react';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Crawdwall Capital</h1>
            </div>
            <nav className="flex space-x-4">
              <Link 
                href={ROUTES.LOGIN} 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href={ROUTES.SIGNUP_ORGANIZER} 
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Fund Africa's Creative Economy
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
                Structured event-funding platform connecting creative entrepreneurs with investors
              </p>

            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How Crawdwall Works
              </h2>
              <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                A transparent and structured approach to event funding
              </p>
            </div>

            <div className="relative h-64 flex items-center justify-center">
              <HowItWorksCarousel />
            </div>
          </div>
        </section>

        {/* Trust & Transparency Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Built on Trust & Transparency
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform ensures accountability and clear communication between all parties
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Structured Process</h3>
                  <p className="text-gray-600">
                    Our disciplined approach to event funding ensures that all proposals are thoroughly vetted and 
                    that investors have access to comprehensive information about each opportunity.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Clear Status Tracking</h3>
                  <p className="text-gray-600">
                    Track your proposal through each stage of the process with real-time updates and clear status indicators.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Secure Platform</h3>
                  <p className="text-gray-600">
                    All transactions and communications are secured through our platform with strict access controls.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Impact Reporting</h3>
                  <p className="text-gray-600">
                    Access detailed reports on funded events and their impact on Africa's creative economy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-6">
              Ready to Transform Your Creative Vision?
            </h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join Crawdwall Capital and be part of Africa's growing creative economy
            </p>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Crawdwall Capital</h3>
            <p className="text-gray-300 mb-6">
              Structured event-funding platform for Africa's creative economy
            </p>
            <div className="flex justify-center space-x-6">
              <p className="text-gray-300">Terms</p>
              <p className="text-gray-300">Privacy</p>
              <p className="text-gray-300 ">Contact</p>
            </div>
            <p className="mt-8 text-gray-400">
              &copy; {new Date().getFullYear()} Crawdwall Capital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HowItWorksCarousel() {
  const steps = [
    {
      title: 'Submit Your Proposal',
      description: 'Create and submit your event funding proposal with detailed information about your creative project.'
    },
    {
      title: 'Review & Vetting',
      description: 'Our team reviews your proposal and conducts due diligence to ensure quality and transparency.'
    },
    {
      title: 'Secure Funding',
      description: 'Connect with investors and secure funding for your creative event through our structured platform.'
    }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const currentStep = steps[currentStepIndex];

  return (
    <div className="text-center transition-opacity duration-1000 ease-in-out">
      <h3 className="text-xl font-bold text-gray-900 mb-4 transition-all duration-1000 ease-in-out">
        {currentStep.title}
      </h3>
      <p className="text-gray-600 max-w-md transition-all duration-1000 ease-in-out">
        {currentStep.description}
      </p>
      <div className="mt-6 flex justify-center space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStepIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}