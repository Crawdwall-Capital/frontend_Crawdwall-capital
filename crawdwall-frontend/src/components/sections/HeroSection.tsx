interface HeroSectionProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  backgroundImageUrl?: string;
  minHeight?: string;
}

const HeroSection = ({
  title,
  subtitle,
  badgeText,
  backgroundImageUrl,
  minHeight = "min-h-screen"
}: HeroSectionProps) => {
  return (
    <section className={`relative isolate overflow-hidden ${minHeight} flex items-center justify-center`}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background-light dark:bg-background-dark">
        <div className="absolute inset-0 bg-[radial-gradient(#1162d4_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.05] dark:opacity-[0.1]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badgeText && (
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            {badgeText}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto mb-12">
            {subtitle}
          </p>
        )}
        
        <div className="animate-bounce mt-12">
          <span className="material-symbols-outlined text-4xl text-white">
            expand_more
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;