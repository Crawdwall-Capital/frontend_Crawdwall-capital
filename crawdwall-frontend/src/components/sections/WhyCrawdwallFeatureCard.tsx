import React from 'react';

interface WhyCrawdwallFeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const WhyCrawdwallFeatureCard = ({ title, description, icon }: WhyCrawdwallFeatureCardProps) => {
  return (
    <div className="flex">
      <span className="material-symbols-outlined text-primary mt-1 mr-4">{icon}</span>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyCrawdwallFeatureCard;