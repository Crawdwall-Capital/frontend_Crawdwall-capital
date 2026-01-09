'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#111822]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-white">
          <Link href="/" className="h-10 w-30 text-primary">
            <img src="/image/C capital logo 2.svg" alt="Crawdwall Capital Logo" className="h-full w-full object-contain" />
          </Link>
        </div>
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
          <Link href="/signup/organizer" className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary hover:bg-primary-dark transition-colors px-6 text-white text-sm font-bold shadow-lg shadow-blue-900/20">
            <span className="truncate">Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;