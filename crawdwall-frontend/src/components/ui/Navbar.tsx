'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111822]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-white">
          <Link href="/" className="h-10 w-30 text-primary">
            <img src="/image/C capital logo 2.svg" alt="Crawdwall Capital Logo" className="h-full w-full object-contain" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors ${pathname === '/about' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
          >
            About Us
          </Link>
          <Link 
            href="/services" 
            className={`text-sm font-medium transition-colors ${pathname === '/services' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium transition-colors ${pathname === '/contact' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
          >
            Contact
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/signup" className="hidden md:flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary hover:bg-primary-dark transition-colors px-6 text-white text-sm font-bold shadow-lg shadow-blue-900/20">
            <span className="truncate">Get Started</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111822] py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors py-2 ${pathname === '/' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors py-2 ${pathname === '/about' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/services" 
              className={`text-sm font-medium transition-colors py-2 ${pathname === '/services' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors py-2 ${pathname === '/contact' ? 'text-primary' : 'text-text-secondary hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/signup" 
              className="flex h-10 items-center justify-center rounded-lg bg-primary hover:bg-primary-dark transition-colors px-6 text-white text-sm font-bold shadow-lg shadow-blue-900/20 mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;