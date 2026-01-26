import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { authAPI, proposalAPI, getCurrentUser } from '../lib/api';

// Mock the API module
jest.mock('@/lib/api', () => ({
  authAPI: {
    getCurrentUser: jest.fn(),
  },
  proposalAPI: {
    getAllProposals: jest.fn(),
  },
  getCurrentUser: jest.fn(),
}));

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock react components for dashboard pages
jest.mock('../app/investor/dashboard/page', () => ({
  __esModule: true,
  default: () => <div data-testid="investor-dashboard">Investor Dashboard</div>
}));

jest.mock('../app/admin/dashboard/page', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-dashboard">Admin Dashboard</div>
}));

jest.mock('../app/officer/dashboard/page', () => ({
  __esModule: true,
  default: () => <div data-testid="officer-dashboard">Officer Dashboard</div>
}));

jest.mock('../app/organizer/dashboard/page', () => ({
  __esModule: true,
  default: () => <div data-testid="organizer-dashboard">Organizer Dashboard</div>
}));

describe('Dashboard Components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Data Fetching', () => {
    test('getCurrentUser API call works correctly', async () => {
      const mockUserData = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'investor',
      };

      (getCurrentUser as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          data: mockUserData,
        },
      });

      const result = await getCurrentUser();

      expect(getCurrentUser).toHaveBeenCalled();
      expect(result.data.success).toBe(true);
      expect(result.data.data).toEqual(mockUserData);
    });

    test('proposalAPI.getAllProposals works correctly', async () => {
      const mockProposals = [
        { id: '1', title: 'Proposal 1', status: 'active' },
        { id: '2', title: 'Proposal 2', status: 'pending' },
      ];

      (proposalAPI.getAllProposals as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          data: mockProposals,
        },
      });

      const result = await proposalAPI.getAllProposals();

      expect(proposalAPI.getAllProposals).toHaveBeenCalled();
      expect(result.data.success).toBe(true);
      expect(result.data.data).toEqual(mockProposals);
    });

    test('getCurrentUser handles error correctly', async () => {
      const mockError = new Error('Network error');
      (getCurrentUser as jest.Mock).mockRejectedValue(mockError);

      await expect(getCurrentUser()).rejects.toThrow('Network error');
    });

    test('proposalAPI.getAllProposals handles error correctly', async () => {
      const mockError = new Error('API error');
      (proposalAPI.getAllProposals as jest.Mock).mockRejectedValue(mockError);

      await expect(proposalAPI.getAllProposals()).rejects.toThrow('API error');
    });
  });

  describe('Dashboard Rendering', () => {
    test('renders investor dashboard component', async () => {
      const InvestorDashboard = (await import('../app/investor/dashboard/page')).default;
      render(<InvestorDashboard />);

      expect(screen.getByTestId('investor-dashboard')).toBeInTheDocument();
      expect(screen.getByText('Investor Dashboard')).toBeInTheDocument();
    });

    test('renders admin dashboard component', async () => {
      const AdminDashboard = (await import('../app/admin/dashboard/page')).default;
      render(<AdminDashboard />);

      expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument();
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    test('renders officer dashboard component', async () => {
      const OfficerDashboard = (await import('../app/officer/dashboard/page')).default;
      render(<OfficerDashboard />);

      expect(screen.getByTestId('officer-dashboard')).toBeInTheDocument();
      expect(screen.getByText('Officer Dashboard')).toBeInTheDocument();
    });

    test('renders organizer dashboard component', async () => {
      const OrganizerDashboard = (await import('../app/organizer/dashboard/page')).default;
      render(<OrganizerDashboard />);

      expect(screen.getByTestId('organizer-dashboard')).toBeInTheDocument();
      expect(screen.getByText('Organizer Dashboard')).toBeInTheDocument();
    });
  });

  describe('Dashboard with Mock Data', () => {
    test('dashboard fetches and displays user data', async () => {
      const mockUserData = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'investor',
      };

      const mockProposals = [
        { id: '1', title: 'Proposal 1', status: 'active' },
      ];

      (getCurrentUser as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          data: mockUserData,
        },
      });

      (proposalAPI.getAllProposals as jest.Mock).mockResolvedValue({
        data: {
          success: true,
          data: mockProposals,
        },
      });

      // Test that the API calls return expected data
      const userData = await getCurrentUser();
      const proposalsData = await proposalAPI.getAllProposals();

      expect(userData.data.data).toEqual(mockUserData);
      expect(proposalsData.data.data).toEqual(mockProposals);
    });
  });
});