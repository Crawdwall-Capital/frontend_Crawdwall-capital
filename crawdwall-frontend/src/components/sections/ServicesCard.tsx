import React from 'react';

interface ServicesCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  altText: string;
  buttonText: string;
  buttonIcon?: string;
  buttonVariant?: 'primary' | 'secondary';
}

const ServicesCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  imageUrl, 
  altText, 
  buttonText, 
  buttonIcon = 'arrow_forward',
  buttonVariant = 'primary'
}: ServicesCardProps) => {
  const buttonClasses = buttonVariant === 'primary' 
    ? 'bg-primary text-white hover:bg-primary-dark' 
    : 'bg-white dark:bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white';
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div className="relative mb-6 lg:mb-0">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-surface-dark relative shadow-2xl shadow-primary/10 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
          <img 
            alt={altText} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
            src={imageUrl} 
          />
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex items-center gap-3 text-white">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="font-semibold text-sm">Structured for Scale</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 text-primary font-bold tracking-wider uppercase text-sm">
          <span className="material-symbols-outlined">{icon}</span>
          {title}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {description}
        </h2>
        <ul className="space-y-4 my-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-500 shrink-0 mt-0.5">check_circle</span>
              <span className="text-slate-700 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServicesCard;