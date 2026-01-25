import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const AUTH_TOKEN_KEY = 'crawdwall_auth_token';
import { ApiResponse, AuthResponse, OtpLoginRequest, OtpVerifyRequest, User, Proposal, CreateProposalRequest } from '@/types';
import { mockAPI } from '@/__mocks__/data';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: '/api', // Use relative path for proxy
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
    if (error.code === 'ERR_NETWORK') {
      // Network error - likely CORS or connectivity issue
      console.error('Network error - check CORS configuration and connectivity');
      // You might want to show a user-friendly message here
    } else if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden - possibly invalid/expired token
      console.error('Access forbidden - check authentication');
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_email');
      window.location.href = '/login';
    } else if (error.response?.status >= 500) {
      // Server error - log for monitoring
      console.error('Server error:', error.response?.data || error.message);
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
    return apiClient.get('/auth/me');
  },
};

// Proposal API functions
export const proposalAPI = {
  // Get all proposals (admin only)
  getAllProposals: async (): Promise<AxiosResponse<ApiResponse<Proposal[]>>> => {
    return apiClient.get('/proposals');
  },

  // Get proposals by user (organizer only)
  getUserProposals: async (): Promise<AxiosResponse<ApiResponse<Proposal[]>>> => {
    return apiClient.get('/proposals/my-proposals');
  },

  // Get single proposal
  getProposal: async (id: string): Promise<AxiosResponse<ApiResponse<Proposal>>> => {
    return apiClient.get(`/proposals/${id}`);
  },

  // Create proposal
  createProposal: async (data: CreateProposalRequest): Promise<AxiosResponse<ApiResponse<Proposal>>> => {
    return apiClient.post('/proposals', data);
  },

  // Update proposal status (admin only)
  updateProposalStatus: async (
    id: string,
    status: string,
    comment?: string
  ): Promise<AxiosResponse<ApiResponse<Proposal>>> => {
    return apiClient.patch(`/proposals/${id}/status`, { status, comment });
  },

  // Add comment to proposal
  addComment: async (
    id: string,
    content: string,
    isInternal: boolean = false
  ): Promise<AxiosResponse<ApiResponse<any>>> => {
    return apiClient.post(`/proposals/${id}/comments`, { content, isInternal });
  },
};

// Export the API client for direct use if needed
export default apiClient;