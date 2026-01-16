const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-12 sm:pt-16 pb-6 sm:pb-8 z-60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/image/C capital logo d.svg" 
                alt="Crawdwall Capital Logo" 
                className="h-8 w-8 object-contain"
              />
              <h3 className="text-white font-bold text-lg">
                Crawdwall Capital
              </h3>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              The investment bank for events. We connect capital with
              creativity to build a sustainable ecosystem for the future of
              entertainment.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  Invest
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="/about"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  Risk Disclosure
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Crawdwall Capital. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              className="text-slate-500 hover:text-white transition-colors"
              href="#"
            >
              <span className="sr-only">Twitter</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              className="text-slate-500 hover:text-white transition-colors"
              href="#"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;