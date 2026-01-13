'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function OfficerNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') return false; // Special case to avoid highlighting home on all routes
    return pathname === path || pathname.startsWith(path + '/');
  };

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
            href="/officer/dashboard" 
            className={`text-sm font-medium transition-colors ${
              isActive('/officer/dashboard') 
                ? 'text-primary' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="/officer/proposals" 
            className={`text-sm font-medium transition-colors ${
              isActive('/officer/proposals') 
                ? 'text-primary' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            All Proposals
          </Link>
          <Link 
            href="/officer/reviews" 
            className={`text-sm font-medium transition-colors ${
              isActive('/officer/reviews') 
                ? 'text-primary' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            My Reviews
          </Link>
          <Link 
            href="/officer/votes" 
            className={`text-sm font-medium transition-colors ${
              isActive('/officer/votes') 
                ? 'text-primary' 
                : 'text-text-secondary hover:text-white'
            }`}
          >
            Voting
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              localStorage.removeItem('crawdwall_auth_token');
              localStorage.removeItem('user_role');
              window.location.href = '/login';
            }}
            className="hidden md:flex h-10 items-center justify-center rounded-lg bg-primary hover:bg-primary-dark transition-colors px-6 text-white text-sm font-bold shadow-lg shadow-blue-900/20"
          >
            <span className="truncate">Logout</span>
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#111822]/90 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/officer/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/officer/dashboard') 
                  ? 'text-primary bg-white/10' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/officer/proposals" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/officer/proposals') 
                  ? 'text-primary bg-white/10' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              All Proposals
            </Link>
            <Link 
              href="/officer/reviews" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/officer/reviews') 
                  ? 'text-primary bg-white/10' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Reviews
            </Link>
            <Link 
              href="/officer/votes" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/officer/votes') 
                  ? 'text-primary bg-white/10' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Voting
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('crawdwall_auth_token');
                localStorage.removeItem('user_role');
                window.location.href = '/login';
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}