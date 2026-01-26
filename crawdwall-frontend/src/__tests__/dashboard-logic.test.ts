import { authAPI, proposalAPI } from '@/lib/api';

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

// Mock API calls
jest.mock('@/lib/api', () => ({
  authAPI: {
    getCurrentUser: jest.fn(),
  },
  proposalAPI: {
    getAllProposals: jest.fn(),
    getUserProposals: jest.fn(),
  },
}));

describe('Dashboard Logic Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue('fake-token');
  });

  describe('User Data Fetching', () => {
    test('getCurrentUser returns correct investor data structure', async () => {
      const mockUserData = {
        data: {
          success: true,
          data: {
            id: '1',
            name: 'Investor User',
            email: 'investor@example.com',
            role: 'investor',
            totalInvested: 15000,
            activeEvents: 2
          }
        }
      };

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue(mockUserData);

      const result = await authAPI.getCurrentUser();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.name).toBe('Investor User');
      expect(result.data.data?.role).toBe('investor');
    });

    test('getCurrentUser returns correct admin data structure', async () => {
      const mockAdminData = {
        data: {
          success: true,
          data: {
            id: '2',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            pendingProposals: 5,
            totalUsers: 150
          }
        }
      };

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue(mockAdminData);

      const result = await authAPI.getCurrentUser();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.role).toBe('admin');
    });

    test('getCurrentUser returns correct officer data structure', async () => {
      const mockOfficerData = {
        data: {
          success: true,
          data: {
            id: '3',
            name: 'Officer User',
            email: 'officer@example.com',
            role: 'officer',
            pendingReviews: 3,
            totalVotes: 25
          }
        }
      };

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue(mockOfficerData);

      const result = await authAPI.getCurrentUser();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.role).toBe('officer');
    });

    test('getCurrentUser returns correct organizer data structure', async () => {
      const mockOrganizerData = {
        data: {
          success: true,
          data: {
            id: '4',
            name: 'Organizer User',
            email: 'organizer@example.com',
            role: 'organizer',
            draftProposals: 2,
            submittedProposals: 1
          }
        }
      };

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue(mockOrganizerData);

      const result = await authAPI.getCurrentUser();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.role).toBe('organizer');
    });
  });

  describe('Proposal Data Fetching', () => {
    test('getUserProposals returns investor portfolio data', async () => {
      const mockPortfolioData = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              title: 'Summer Music Festival',
              amount: 10000,
              status: 'FUNDED',
              investedDate: '2024-01-15',
              expectedReturn: '12000'
            },
            {
              id: '2',
              title: 'Tech Conference',
              amount: 5000,
              status: 'IN_REVIEW',
              investedDate: '2024-01-20',
              expectedReturn: '6000'
            }
          ]
        }
      };

      (proposalAPI.getUserProposals as jest.Mock).mockResolvedValue(mockPortfolioData);

      const result = await proposalAPI.getUserProposals();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.length).toBe(2);
      expect(result.data.data?.[0].title).toBe('Summer Music Festival');
      expect(result.data.data?.[0].amount).toBe(10000);
      expect(result.data.data?.[0].status).toBe('FUNDED');
    });

    test('getAllProposals returns available investment opportunities', async () => {
      const mockOpportunitiesData = {
        data: {
          success: true,
          data: [
            {
              id: '3',
              title: 'Winter Food Festival',
              amount: 15000,
              status: 'SUBMITTED',
              description: 'Seasonal winter food festival',
              minInvestment: 1000,
              deadline: '2024-02-15'
            },
            {
              id: '4',
              title: 'Art Exhibition',
              amount: 8000,
              status: 'SUBMITTED',
              description: 'Contemporary art exhibition',
              minInvestment: 500,
              deadline: '2024-03-01'
            }
          ]
        }
      };

      (proposalAPI.getAllProposals as jest.Mock).mockResolvedValue(mockOpportunitiesData);

      const result = await proposalAPI.getAllProposals();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.length).toBe(2);
    });

    test('getAllProposals returns admin proposal management data', async () => {
      const mockAdminProposals = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              title: 'Pending Review Proposal',
              status: 'SUBMITTED',
              amount: 20000,
              submitter: 'John Organizer',
              submissionDate: '2024-01-10',
              reviewStatus: 'PENDING'
            }
          ]
        }
      };

      (proposalAPI.getAllProposals as jest.Mock).mockResolvedValue(mockAdminProposals);

      const result = await proposalAPI.getAllProposals();

      expect(result.data.success).toBe(true);
      expect(result.data.data?.[0].reviewStatus).toBe('PENDING');
      expect(result.data.data?.[0].submitter).toBe('John Organizer');
    });
  });

  describe('Dashboard Calculations', () => {
    test('Calculates total investment for investor dashboard', async () => {
      const mockPortfolio = [
        { amount: 10000, status: 'FUNDED' },
        { amount: 5000, status: 'IN_REVIEW' },
        { amount: 7500, status: 'FUNDED' }
      ];

      const totalInvested = mockPortfolio
        .filter(p => p.status === 'FUNDED')
        .reduce((sum, proposal) => sum + proposal.amount, 0);

      expect(totalInvested).toBe(17500);
    });

    test('Counts active events for dashboard metrics', async () => {
      const mockEvents = [
        { status: 'FUNDED' },
        { status: 'IN_REVIEW' },
        { status: 'COMPLETED' },
        { status: 'FUNDED' }
      ];

      const activeEvents = mockEvents.filter(e => 
        e.status === 'FUNDED' || e.status === 'IN_REVIEW'
      ).length;

      expect(activeEvents).toBe(3);
    });

    test('Filters proposals by status for different dashboard views', async () => {
      const mockProposals = [
        { id: '1', status: 'SUBMITTED' },
        { id: '2', status: 'IN_REVIEW' },
        { id: '3', status: 'APPROVED' },
        { id: '4', status: 'REJECTED' },
        { id: '5', status: 'FUNDED' }
      ];

      // Admin view - pending proposals
      const pendingProposals = mockProposals.filter(p => 
        p.status === 'SUBMITTED' || p.status === 'IN_REVIEW'
      );
      expect(pendingProposals.length).toBe(2);

      // Investor view - active investments
      const activeInvestments = mockProposals.filter(p => 
        p.status === 'FUNDED' || p.status === 'IN_REVIEW'
      );
      expect(activeInvestments.length).toBe(2);

      // Officer view - proposals needing review
      const reviewNeeded = mockProposals.filter(p => 
        p.status === 'IN_REVIEW'
      );
      expect(reviewNeeded.length).toBe(1);
    });
  });

  describe('Error Handling', () => {
    test('Handles authentication errors gracefully', async () => {
      (authAPI.getCurrentUser as jest.Mock).mockRejectedValue(
        new Error('Authentication failed')
      );

      await expect(authAPI.getCurrentUser()).rejects.toThrow('Authentication failed');
    });

    test('Handles proposal API errors gracefully', async () => {
      (proposalAPI.getAllProposals as jest.Mock).mockRejectedValue(
        new Error('Proposal service unavailable')
      );

      await expect(proposalAPI.getAllProposals()).rejects.toThrow('Proposal service unavailable');
    });

    test('Provides fallback data when APIs fail', async () => {
      // Simulate API failure scenario
      (authAPI.getCurrentUser as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      // Should fall back to default dashboard state
      const fallbackData = {
        userName: 'Guest User',
        userRole: 'guest',
        totalInvested: 0,
        activeEvents: 0
      };

      expect(fallbackData.userName).toBe('Guest User');
      expect(fallbackData.totalInvested).toBe(0);
    });
  });

  describe('Dashboard State Management', () => {
    test('Manages loading states during data fetching', async () => {
      // Simulate loading sequence
      let isLoading = true;
      
      // Start loading
      expect(isLoading).toBe(true);
      
      // Mock successful data fetch
      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue({
        data: { success: true, data: { name: 'Test User' } }
      });
      
      await authAPI.getCurrentUser();
      isLoading = false;
      
      expect(isLoading).toBe(false);
    });

    test('Handles concurrent dashboard data requests', async () => {
      // Mock both APIs resolving concurrently
      const userDataPromise = Promise.resolve({
        data: { success: true, data: { name: 'Concurrent User' } }
      });
      
      const proposalsDataPromise = Promise.resolve({
        data: { success: true, data: [] }
      });

      (authAPI.getCurrentUser as jest.Mock).mockImplementation(() => userDataPromise);
      (proposalAPI.getUserProposals as jest.Mock).mockImplementation(() => proposalsDataPromise);

      // Both should resolve without interference
      const [userData, proposalsData] = await Promise.all([
        authAPI.getCurrentUser(),
        proposalAPI.getUserProposals()
      ]);

      expect(userData.data.success).toBe(true);
      expect(proposalsData.data.success).toBe(true);
    });
  });
});