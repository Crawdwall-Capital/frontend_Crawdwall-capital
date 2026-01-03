// Branding Colors
export const COLORS = {
  obsidianBlack: '#121212',
  midnightNavy: '#1e293b',
  electricBlue: '#0ea5e9',
  frostWhite: '#f8fafc',
  lightGray: '#e2e8f0',
  darkGray: '#64748b',
  successGreen: '#10b981',
  warningYellow: '#f59e0b',
  errorRed: '#ef4444',
};

// Proposal Status Colors
export const PROPOSAL_STATUS_COLORS: Record<string, string> = {
  SUBMITTED: 'bg-gray-100 text-gray-800',
  'IN_REVIEW': 'bg-blue-100 text-blue-800',
  VETTED: 'bg-purple-100 text-purple-800',
  CALLBACK: 'bg-yellow-100 text-yellow-800',
  FUNDED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

// API Configuration
export const API_BASE_URL = '/api/v1';
export const AUTH_TOKEN_KEY = 'crawdwall_auth_token';
export const USER_ROLE_KEY = 'crawdwall_user_role';

// Proposal Status Constants
export const PROPOSAL_STATUSES = [
  'SUBMITTED',
  'IN_REVIEW',
  'VETTED',
  'CALLBACK',
  'FUNDED',
  'REJECTED',
] as const;

// Role Constants
export const ROLES = {
  ADMIN: 'admin',
  ORGANIZER: 'organizer',
  INVESTOR: 'investor',
} as const;

// Route Constants
export const ROUTES = {
  // Public routes
  HOME: '/',
  SIGNUP_ORGANIZER: '/signup/organizer',
  LOGIN: '/login',
  
  // Admin routes
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROPOSALS: '/admin/proposals',
  ADMIN_PROPOSAL_DETAIL: (id: string) => `/admin/proposals/${id}`,
  ADMIN_CALLBACKS: '/admin/callbacks',
  
  // Organizer routes
  ORGANIZER_DASHBOARD: '/organizer/dashboard',
  ORGANIZER_PROPOSALS: '/organizer/proposals',
  ORGANIZER_PROPOSAL_NEW: '/organizer/proposals/new',
  ORGANIZER_PROPOSAL_DETAIL: (id: string) => `/organizer/proposals/${id}`,
  ORGANIZER_NOTIFICATIONS: '/organizer/notifications',
  
  // Investor routes
  INVESTOR_DASHBOARD: '/investor/dashboard',
  INVESTOR_PORTFOLIO: '/investor/portfolio',
  INVESTOR_PROFILE: '/investor/profile',
  INVESTOR_EVENT_DETAIL: (id: string) => `/investor/events/${id}`,
} as const;