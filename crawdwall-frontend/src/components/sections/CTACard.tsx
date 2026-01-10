import Link from 'next/link';

interface CTACardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  icon: string;
  colorScheme: 'blue' | 'green' | 'amber';
}

const CTACard = ({ title, description, buttonText, buttonLink, icon, colorScheme }: CTACardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400',
    amber: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400'
  };

  const bgColorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    amber: 'bg-amber-600 hover:bg-amber-700'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-center hover:border-primary dark:hover:border-primary transition-colors duration-300 flex flex-col h-full">
      <div className="flex justify-center mb-6">
        <div className={`w-14 sm:w-16 h-14 sm:h-16 rounded-full ${colorClasses[colorScheme]} flex items-center justify-center`}>
          <span className="material-symbols-outlined text-2xl sm:text-3xl">{icon}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
        {description}
      </p>
      <Link href={buttonLink} className={`inline-block px-6 py-3 ${bgColorClasses[colorScheme]} text-white font-medium rounded-lg transition-colors mt-auto cursor-default`}>
        {buttonText}
      </Link>
    </div>
  );
};

export default CTACard;