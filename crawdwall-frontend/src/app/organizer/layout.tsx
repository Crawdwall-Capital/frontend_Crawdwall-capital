import OrganizerNavbar from '@/components/ui/OrganizerNavbar';
import Footer from '@/components/ui/Footer';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <div className="flex flex-1 md:gap-8">
        <OrganizerNavbar />
        <main className="w-full lg:w-3/4 ml-0 md:ml-64 px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}