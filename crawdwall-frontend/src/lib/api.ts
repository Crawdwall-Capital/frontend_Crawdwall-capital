import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const AUTH_TOKEN_KEY = 'crawdwall_auth_token';
import { ApiResponse, AuthResponse, OtpLoginRequest, OtpVerifyRequest, User, Proposal, CreateProposalRequest } from '@/types';
import { mockAPI } from '@/__mocks__/data';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://crawdwall-backend-ywlk.onrender.com/api', // Updated to use the real backend
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('user_role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authAPI = {
  // Admin OTP login - Request OTP
  sendOtp: async (data: OtpLoginRequest): Promise<AxiosResponse<ApiResponse<null>>> => {
    return apiClient.post('/auth/admin/request-otp', {
      email: data.email
    });
  },

  // Admin OTP login - Verify OTP
  verifyOtp: async (data: OtpVerifyRequest): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return apiClient.post('/auth/admin/verify-otp', {
      email: data.email,
      otp: data.otp
    });
  },

  // Organizer/Investor login
  login: async (credentials: { email: string; password: string }): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return apiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
  },

  // Organizer registration
  registerOrganizer: async (userData: { 
    name: string; 
    email: string; 
    phoneNumber: string; 
    password: string 
  }): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return apiClient.post('/auth/register', {
      ...userData,
      role: 'ORGANIZER' // Backend expects 'ORGANIZER' in uppercase
    });
  },

  // Investor registration
  registerInvestor: async (userData: { 
    name: string; 
    email: string; 
    phoneNumber: string; 
    password: string 
  }): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return apiClient.post('/auth/register', {
      ...userData,
      role: 'INVESTOR' // Backend expects 'INVESTOR' in uppercase
    });
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem('user_role');
  },

  // Get current user
  getCurrentUser: async (): Promise<AxiosResponse<ApiResponse<User>>> => {
    return mockAPI.getCurrentUser() as Promise<AxiosResponse<ApiResponse<User>>>;
  },
};

// Proposal API functions
export const proposalAPI = {
  // Get all proposals (admin only)
  getAllProposals: async (): Promise<AxiosResponse<ApiResponse<Proposal[]>>> => {
    return mockAPI.getAllProposals() as Promise<AxiosResponse<ApiResponse<Proposal[]>>>;
  },

  // Get proposals by user (organizer only)
  getUserProposals: async (): Promise<AxiosResponse<ApiResponse<Proposal[]>>> => {
    // For testing, we'll get the current user's proposals
    const role = localStorage.getItem('user_role') || 'organizer';
    const userId = localStorage.getItem('user_id') || '2'; // Default to John Smith
    return mockAPI.getUserProposals(userId) as Promise<AxiosResponse<ApiResponse<Proposal[]>>>;
  },

  // Get single proposal
  getProposal: async (id: string): Promise<AxiosResponse<ApiResponse<Proposal>>> => {
    return mockAPI.getProposal(id) as Promise<AxiosResponse<ApiResponse<Proposal>>>;
  },

  // Create proposal
  createProposal: async (data: CreateProposalRequest): Promise<AxiosResponse<ApiResponse<Proposal>>> => {
    return mockAPI.createProposal(data) as Promise<AxiosResponse<ApiResponse<Proposal>>>;
  },

  // Update proposal status (admin only)
  updateProposalStatus: async (
    id: string,
    status: string,
    comment?: string
  ): Promise<AxiosResponse<ApiResponse<Proposal>>> => {
    return mockAPI.updateProposalStatus(id, status, comment) as Promise<AxiosResponse<ApiResponse<Proposal>>>;
  },

  // Add comment to proposal
  addComment: async (
    id: string,
    content: string,
    isInternal: boolean = false
  ): Promise<AxiosResponse<ApiResponse<any>>> => {
    return mockAPI.addComment(id, content, isInternal) as Promise<AxiosResponse<ApiResponse<any>>>;
  },
};

// Export the API client for direct use if needed
export default apiClient;