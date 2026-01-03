// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'organizer' | 'investor';
  createdAt: string;
  updatedAt: string;
}

export interface UserWithPassword extends User {
  password: string;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OtpLoginRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Proposal types
export type ProposalStatus = 
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'VETTED'
  | 'CALLBACK'
  | 'FUNDED'
  | 'REJECTED';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: ProposalStatus;
  organizerId: string;
  organizerName: string;
  organizerEmail: string;
  createdAt: string;
  updatedAt: string;
  documents?: string[]; // URLs to uploaded documents
  comments?: ProposalComment[];
}

export interface ProposalComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isInternal: boolean; // Whether comment is internal (admin-only) or visible to organizer
}

export interface CreateProposalRequest {
  title: string;
  description: string;
  amount: number;
  documents?: File[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Role-based permissions
export interface RolePermissions {
  canViewProposals: boolean;
  canSubmitProposals: boolean;
  canUpdateProposalStatus: boolean;
  canAddComments: boolean;
  canViewAllProposals: boolean;
  canRequestCallback: boolean;
  canViewFundedEvents: boolean;
}