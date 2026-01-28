import axios from 'axios';
import { authAPI, proposalAPI } from '@/lib/api';
import { ApiError, NetworkError } from '@/lib/errorHandler';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock window.location
delete (window as any).location;
(window as any).location = { href: '' };

describe('API Client Tests', () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
    };

    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    mockLocalStorage.getItem.mockReturnValue('fake-token');
  });

  describe('API Client Configuration', () => {
    test('creates axios instance with correct base configuration', () => {
      // Re-import to trigger axios.create call
      jest.resetModules();
      require('@/lib/api');

      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://crawdwall-backend-ywlk.onrender.com/api',
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: false,
      });
    });

    test('sets up request interceptor for auth token', () => {
      jest.resetModules();
      require('@/lib/api');

      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      
      // Get the request interceptor function
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      
      // Test the interceptor adds token to headers
      const config = { headers: {} };
      mockLocalStorage.getItem.mockReturnValue('test-token');
      
      const result = requestInterceptor(config);
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('crawdwall_auth_token');
      expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    test('request interceptor handles missing token gracefully', () => {
      jest.resetModules();
      require('@/lib/api');

      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      
      const config = { headers: {} };
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const result = requestInterceptor(config);
      
      expect(result.headers.Authorization).toBeUndefined();
    });

    test('sets up response interceptor for error handling', () => {
      jest.resetModules();
      require('@/lib/api');

      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
      
      // Should have success handler and error handler
      const responseInterceptorCall = mockAxiosInstance.interceptors.response.use.mock.calls[0];
      expect(responseInterceptorCall).toHaveLength(2);
      expect(typeof responseInterceptorCall[0]).toBe('function'); // Success handler
      expect(typeof responseInterceptorCall[1]).toBe('function'); // Error handler
    });
  });

  describe('Response Interceptor Error Handling', () => {
    let errorHandler: any;

    beforeEach(() => {
      jest.resetModules();
      require('@/lib/api');
      
      // Get the error handler from response interceptor
      errorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    });

    test('handles network errors (ERR_NETWORK)', async () => {
      const networkError = {
        code: 'ERR_NETWORK',
        message: 'Network Error',
        config: { url: '/test' },
      };

      await expect(errorHandler(networkError)).rejects.toThrow(NetworkError);
      await expect(errorHandler(networkError)).rejects.toThrow('Network error. Please check your connection and try again.');
    });

    test('handles 401 unauthorized errors', async () => {
      const unauthorizedError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' },
        },
        config: { url: '/test' },
      };

      await expect(errorHandler(unauthorizedError)).rejects.toThrow(ApiError);
      
      // Should clear auth data
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('crawdwall_auth_token');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user_role');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user_email');
      
      // Should redirect to login
      expect(window.location.href).toBe('/login');
    });

    test('handles 403 forbidden errors', async () => {
      const forbiddenError = {
        response: {
          status: 403,
          data: { message: 'Forbidden' },
        },
        config: { url: '/test' },
      };

      await expect(errorHandler(forbiddenError)).rejects.toThrow(ApiError);
      
      // Should clear auth data and redirect
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('crawdwall_auth_token');
      expect(window.location.href).toBe('/login');
    });

    test('handles 500 server errors', async () => {
      const serverError = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' },
        },
        config: { url: '/test' },
      };

      await expect(errorHandler(serverError)).rejects.toThrow(ApiError);
      await expect(errorHandler(serverError)).rejects.toThrow('Internal Server Error');
    });

    test('handles 400 client errors', async () => {
      const clientError = {
        response: {
          status: 400,
          data: { message: 'Bad Request' },
        },
        config: { url: '/test' },
      };

      await expect(errorHandler(clientError)).rejects.toThrow(ApiError);
      await expect(errorHandler(clientError)).rejects.toThrow('Bad Request');
    });

    test('creates proper ApiError structure', async () => {
      const testError = {
        response: {
          status: 404,
          data: { message: 'Not Found' },
        },
        config: { url: '/test-endpoint' },
        message: 'Request failed',
      };

      try {
        await errorHandler(testError);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error.message).toBe('Not Found');
        expect(error.status).toBe(404);
        expect(error.data).toEqual({ message: 'Not Found' });
        expect(error.url).toBe('/test-endpoint');
      }
    });
  });

  describe('Authentication API', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('sendOtp calls correct endpoint with email', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { success: true, message: 'OTP sent' },
      });

      const { authAPI } = require('@/lib/api');
      
      await authAPI.sendOtp({ email: 'admin@example.com' });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/admin/request-otp', {
        email: 'admin@example.com',
      });
    });

    test('verifyOtp calls correct endpoint with email and OTP', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { token: 'jwt-token', message: 'Success' },
      });

      const { authAPI } = require('@/lib/api');
      
      await authAPI.verifyOtp({ email: 'admin@example.com', otp: '123456' });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/admin/verify-otp', {
        email: 'admin@example.com',
        otp: '123456',
      });
    });

    test('login calls correct endpoint with credentials', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { token: 'jwt-token', role: 'INVESTOR' },
      });

      const { authAPI } = require('@/lib/api');
      
      await authAPI.login({ email: 'user@example.com', password: 'password123' });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        email: 'user@example.com',
        password: 'password123',
      });
    });

    test('registerOrganizer calls correct endpoint with user data', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { token: 'jwt-token', message: 'Registration successful' },
      });

      const { authAPI } = require('@/lib/api');
      
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
      };

      await authAPI.registerOrganizer(userData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/register', {
        ...userData,
        role: 'ORGANIZER',
      });
    });

    test('registerInvestor calls correct endpoint with user data', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { token: 'jwt-token', message: 'Registration successful' },
      });

      const { authAPI } = require('@/lib/api');
      
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phoneNumber: '0987654321',
        password: 'password123',
      };

      await authAPI.registerInvestor(userData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/register', {
        ...userData,
        role: 'INVESTOR',
      });
    });

    test('getCurrentUser calls correct endpoint', async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: { 
          success: true, 
          data: { id: '1', email: 'user@example.com', role: 'INVESTOR' } 
        },
      });

      const { authAPI } = require('@/lib/api');
      
      await authAPI.getCurrentUser();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/auth/me');
    });

    test('logout clears localStorage', () => {
      const { authAPI } = require('@/lib/api');
      
      authAPI.logout();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('crawdwall_auth_token');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user_role');
    });
  });

  describe('Proposal API', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('getAllProposals calls correct endpoint', async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: { success: true, data: [] },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.getAllProposals();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/proposals');
    });

    test('getUserProposals calls correct endpoint', async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: { success: true, data: [] },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.getUserProposals();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/proposals/my-proposals');
    });

    test('getProposal calls correct endpoint with ID', async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: { success: true, data: { id: '123', title: 'Test Proposal' } },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.getProposal('123');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/proposals/123');
    });

    test('createProposal calls correct endpoint with data', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { success: true, data: { id: '123', title: 'New Proposal' } },
      });

      const { proposalAPI } = require('@/lib/api');
      
      const proposalData = {
        title: 'New Proposal',
        description: 'Test description',
        amount: 10000,
      };

      await proposalAPI.createProposal(proposalData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/proposals', proposalData);
    });

    test('updateProposalStatus calls correct endpoint with status', async () => {
      mockAxiosInstance.patch.mockResolvedValue({
        data: { success: true, data: { id: '123', status: 'APPROVED' } },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.updateProposalStatus('123', 'APPROVED', 'Looks good');

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/proposals/123/status', {
        status: 'APPROVED',
        comment: 'Looks good',
      });
    });

    test('updateProposalStatus works without comment', async () => {
      mockAxiosInstance.patch.mockResolvedValue({
        data: { success: true, data: { id: '123', status: 'REJECTED' } },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.updateProposalStatus('123', 'REJECTED');

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/proposals/123/status', {
        status: 'REJECTED',
        comment: undefined,
      });
    });

    test('addComment calls correct endpoint with comment data', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { success: true, data: { id: 'comment-123' } },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.addComment('123', 'This is a comment', true);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/proposals/123/comments', {
        content: 'This is a comment',
        isInternal: true,
      });
    });

    test('addComment defaults isInternal to false', async () => {
      mockAxiosInstance.post.mockResolvedValue({
        data: { success: true, data: { id: 'comment-123' } },
      });

      const { proposalAPI } = require('@/lib/api');
      
      await proposalAPI.addComment('123', 'Public comment');

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/proposals/123/comments', {
        content: 'Public comment',
        isInternal: false,
      });
    });
  });

  describe('Error Propagation', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    test('API methods propagate errors correctly', async () => {
      const testError = new ApiError('Test error', 400, { error: 'Bad request' }, '/test');
      mockAxiosInstance.post.mockRejectedValue(testError);

      const { authAPI } = require('@/lib/api');

      await expect(authAPI.login({ email: 'test@example.com', password: 'password' }))
        .rejects.toThrow('Test error');
    });

    test('Network errors are properly handled', async () => {
      const networkError = new NetworkError('Network connection failed');
      mockAxiosInstance.get.mockRejectedValue(networkError);

      const { authAPI } = require('@/lib/api');

      await expect(authAPI.getCurrentUser()).rejects.toThrow('Network connection failed');
    });
  });

  describe('Request Headers and Configuration', () => {
    test('includes auth token in requests when available', async () => {
      mockLocalStorage.getItem.mockReturnValue('test-auth-token');
      mockAxiosInstance.get.mockResolvedValue({ data: { success: true } });

      jest.resetModules();
      const { authAPI } = require('@/lib/api');

      await authAPI.getCurrentUser();

      // Verify the request interceptor was called and would add the token
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    });

    test('handles requests without auth token', async () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      mockAxiosInstance.post.mockResolvedValue({ data: { success: true } });

      jest.resetModules();
      const { authAPI } = require('@/lib/api');

      await authAPI.login({ email: 'test@example.com', password: 'password' });

      // Should still work without token for login endpoint
      expect(mockAxiosInstance.post).toHaveBeenCalled();
    });
  });

  describe('API Response Types', () => {
    test('handles successful API responses', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: { id: '1', name: 'Test User' },
          message: 'Success',
        },
        status: 200,
        statusText: 'OK',
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      jest.resetModules();
      const { authAPI } = require('@/lib/api');

      const result = await authAPI.getCurrentUser();

      expect(result).toEqual(mockResponse);
      expect(result.data.success).toBe(true);
      expect(result.data.data.id).toBe('1');
    });

    test('handles API error responses', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: {
            success: false,
            message: 'User not found',
            error: 'NOT_FOUND',
          },
        },
        config: { url: '/auth/me' },
      };

      mockAxiosInstance.get.mockRejectedValue(errorResponse);

      jest.resetModules();
      const { authAPI } = require('@/lib/api');

      await expect(authAPI.getCurrentUser()).rejects.toThrow();
    });
  });
});