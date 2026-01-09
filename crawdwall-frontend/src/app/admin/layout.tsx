'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {pathname !== '/admin/login' && (
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-white text-xl font-bold">Crawdwall Admin</h1>

              <div className="flex gap-4">
                <Link href="/admin/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link href="/admin/proposals" className="nav-link">
                  Proposals
                </Link>
                <Link href="/admin/callbacks" className="nav-link">
                  Callbacks
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    router.push('/login');
                  }}
                  className="nav-link"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>{children}</main>
    </div>
  );
}
