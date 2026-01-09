interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface WhyCrawdwallFeaturesSectionProps {
  title: string;
  description: string;
  features: Feature[];
}

const WhyCrawdwallFeaturesSection = ({ title, description, features }: WhyCrawdwallFeaturesSectionProps) => {
  return (
    <section className="relative py-24 bg-slate-900 dark:bg-black overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-400">
            {description}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCrawdwallFeaturesSection;