interface ContactCardProps {
  icon: string;
  title: string;
  content: string | string[];
}

const ContactCard = ({ icon, title, content }: ContactCardProps) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">{icon}</span>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{title}</h3>
        {Array.isArray(content) ? (
          content.map((item, index) => (
            <p key={index} className="text-slate-600 dark:text-slate-300">{item}</p>
          ))
        ) : (
          <p className="text-slate-600 dark:text-slate-300">{content}</p>
        )}
      </div>
    </div>
  );
};

export default ContactCard;