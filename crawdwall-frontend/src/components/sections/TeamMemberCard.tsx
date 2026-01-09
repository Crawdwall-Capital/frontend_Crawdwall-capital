interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const TeamMemberCard = ({ name, role, bio, imageUrl }: TeamMemberCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h3>
        <p className="text-primary mb-2">{role}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {bio}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;