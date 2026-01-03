import { PROPOSAL_STATUS_COLORS } from '@/constants';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  // Format the status for display (replace underscores with spaces and capitalize)
  const displayStatus = status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Get the appropriate color class based on the status
  const colorClass = PROPOSAL_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}>
      {displayStatus}
    </span>
  );
}