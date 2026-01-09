interface MissionVisionCardProps {
  title: string;
  description: string;
  icon: string;
  colorScheme: 'blue' | 'purple';
}

const MissionVisionCard = ({ title, description, icon, colorScheme }: MissionVisionCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors duration-300">
      <div className="flex items-center mb-6">
        <div className={`flex items-center justify-center h-12 w-12 rounded-md ${colorClasses[colorScheme]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <h3 className="ml-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
};

export default MissionVisionCard;