import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AUTH_TOKEN_KEY } from '@/constants';
import { ApiResponse, AuthResponse, OtpLoginRequest, OtpVerifyRequest, User, Proposal, CreateProposalRequest } from '@/types';
import { mockAPI } from '@/__mocks__/data';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: '/api/v1',
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
  // Admin OTP login
  sendOtp: async (data: OtpLoginRequest): Promise<AxiosResponse<ApiResponse<null>>> => {
    try {
      // Validate admin credentials
      const user = await mockAPI.findUserByEmail(data.email);
      
      if (!user || user.role !== 'admin') {
        return Promise.resolve({
          data: { success: false, message: 'Invalid admin credentials' },
          status: 401,
          statusText: 'Unauthorized',
          headers: {},
          config: { url: '', method: 'POST' }
        }) as Promise<AxiosResponse<ApiResponse<null>>>;
      }
      
      return Promise.resolve({
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url: '', method: 'POST' }
      }) as Promise<AxiosResponse<ApiResponse<null>>>;
    } catch (error) {
      return Promise.resolve({
        data: { success: false, message: 'An error occurred while sending OTP' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: { url: '', method: 'POST' }
      }) as Promise<AxiosResponse<ApiResponse<null>>>;
    }
  },

  verifyOtp: async (data: OtpVerifyRequest): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    try {
      // In a real implementation, we would validate the OTP here
      // For mock purposes, we'll just verify the user exists and is an admin
      const adminUser = await mockAPI.findUserByEmail(data.email);
      if (!adminUser || adminUser.role !== 'admin') {
        return Promise.resolve({
          data: { success: false, message: 'Admin user not found' },
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: { url: '', method: 'POST' }
        }) as Promise<AxiosResponse<ApiResponse<AuthResponse>>>;
      }
      
      // Return user without password for security
      const userWithoutPassword = {
        id: adminUser.id,
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role,
        createdAt: adminUser.createdAt,
        updatedAt: adminUser.updatedAt,
      };
      
      return Promise.resolve({
        data: { 
          success: true, 
          data: {
            token: 'mock-token',
            user: userWithoutPassword
          }
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url: '', method: 'POST' }
      }) as Promise<AxiosResponse<ApiResponse<AuthResponse>>>;
    } catch (error) {
      return Promise.resolve({
        data: { success: false, message: 'An error occurred while verifying OTP' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: { url: '', method: 'POST' }
      }) as Promise<AxiosResponse<ApiResponse<AuthResponse>>>;
    }
  },

  // Organizer/Investor login
  login: async (credentials: { email: string; password: string }): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return mockAPI.login(credentials) as Promise<AxiosResponse<ApiResponse<AuthResponse>>>;
  },

  // Organizer registration
  registerOrganizer: async (userData: { 
    name: string; 
    email: string; 
    phone: string; 
    password: string 
  }): Promise<AxiosResponse<ApiResponse<AuthResponse>>> => {
    return mockAPI.registerOrganizer(userData) as Promise<AxiosResponse<ApiResponse<AuthResponse>>>;
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