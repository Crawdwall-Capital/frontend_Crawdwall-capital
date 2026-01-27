'use client';
export const dynamic = 'force-dynamic';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Close sidebar when route changes
  useEffect(() => {
    // Close sidebar when route changes
    const timer = setTimeout(() => {
      setIsSidebarOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === '/') return false; // Special case to avoid highlighting home on all routes
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 z-50 h-screen w-64 transform transition-transform duration-300 ease-in-out bg-white/5 border-r border-white/10 backdrop-blur-md ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`} 
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center gap-2 p-6 border-b border-white/10">
            <img 
              src="/image/C capital logo d.svg" 
              alt="Crawdwall Capital Logo" 
              className="h-8 w-8 object-contain"
            />
            <h3 className="text-white font-bold text-lg">
              Crawdwall Capital
            </h3>
          </div>
          
          {/* Sidebar navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <Link 
                href="/admin/dashboard"
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  isActive('/admin/dashboard') 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-slate-400 hover:bg-white/5'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="material-symbols-outlined text-sm mr-3">home</span>
                Dashboard
              </Link>
              
              <Link 
                href="/admin/officers"
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  isActive('/admin/officers') 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-slate-400 hover:bg-white/5'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="material-symbols-outlined text-sm mr-3">people</span>
                Officers
              </Link>
              
              <Link 
                href="/admin/proposals"
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  isActive('/admin/proposals') 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-slate-400 hover:bg-white/5'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="material-symbols-outlined text-sm mr-3">description</span>
                Proposals
              </Link>
              
              <Link 
                href="/admin/audit-logs"
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  isActive('/admin/audit-logs') 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-slate-400 hover:bg-white/5'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="material-symbols-outlined text-sm mr-3">fact_check</span>
                Audit Logs
              </Link>
              
              <Link 
                href="/admin/settings"
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  isActive('/admin/settings') 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-slate-400 hover:bg-white/5'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="material-symbols-outlined text-sm mr-3">settings</span>
                Settings
              </Link>
              
              <button 
                onClick={() => {
                  localStorage.removeItem('crawdwall_auth_token');
                  localStorage.removeItem('user_role');
                  window.location.href = '/login';
                }}
                className="w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center text-slate-400 hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-sm mr-3">logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-white fixed top-4 right-4 z-40 text-2xl focus:outline-none" 
        aria-label="Toggle menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
    </>
  );
}