interface CardWithImageProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
  features: string[];
}

const CardWithImage = ({ title, description, imageUrl, icon, features }: CardWithImageProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <span className="material-symbols-outlined text-4xl mb-2">{icon}</span>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          {description}
        </p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="material-symbols-outlined text-green-500 mr-2 text-sm mt-1">check_circle</span>
              <span className="text-slate-600 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardWithImage;