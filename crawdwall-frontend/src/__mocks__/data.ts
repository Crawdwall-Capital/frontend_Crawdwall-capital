import { Proposal, User, UserWithPassword } from '@/types';

// Store users in memory for registration
let mockUsers: UserWithPassword[] = [
  {
    id: '1',
    email: 'admin@crawdwall.com',
    name: 'Admin User',
    role: 'admin',
    password: 'admin123',
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-01-15T08:30:00Z',
  },
  {
    id: '2',
    email: 'organizer1@crawdwall.com',
    name: 'John Smith',
    role: 'organizer',
    password: 'organizer123',
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-02-20T10:15:00Z',
  },
  {
    id: '3',
    email: 'organizer2@crawdwall.com',
    name: 'Sarah Johnson',
    role: 'organizer',
    password: 'organizer123',
    createdAt: '2023-03-10T14:45:00Z',
    updatedAt: '2023-03-10T14:45:00Z',
  },
  {
    id: '4',
    email: 'investor1@crawdwall.com',
    name: 'Michael Brown',
    role: 'investor',
    password: 'investor123',
    createdAt: '2023-04-05T09:20:00Z',
    updatedAt: '2023-04-05T09:20:00Z',
  },
  {
    id: '5',
    email: 'officer1@crawdwall.com',
    name: 'David Wilson',
    role: 'officer',
    password: 'officer123',
    createdAt: '2023-05-10T13:45:00Z',
    updatedAt: '2023-05-10T13:45:00Z',
  },
];

// Function to get all users
export const getAllUsers = (): User[] => {
  return mockUsers;
};

// Function to add a new user
export const addUser = (user: Omit<UserWithPassword, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: UserWithPassword = {
    id: `${mockUsers.length + 1}`,
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  // Return user without password for security
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Function to find a user by email
export const findUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

// Function to find a user by ID
export const findUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Function to validate admin credentials
export const validateAdmin = (email: string, password: string): boolean => {
  const adminUser = mockUsers.find(user => user.email === email && user.role === 'admin');
  return adminUser ? adminUser.password === password : false;
};

// Mock investors
export const mockInvestors: User[] = [
  { id: '1', email: 'investor1@crawdwall.com', name: 'Robert Johnson', role: 'investor', createdAt: '2023-04-05T16:20:00Z', updatedAt: '2023-04-05T16:20:00Z' },
  { id: '2', email: 'investor2@crawdwall.com', name: 'Emily Davis', role: 'investor', createdAt: '2023-05-12T11:30:00Z', updatedAt: '2023-05-12T11:30:00Z' },
  { id: '3', email: 'investor3@crawdwall.com', name: 'Michael Brown', role: 'investor', createdAt: '2023-06-18T09:45:00Z', updatedAt: '2023-06-18T09:45:00Z' },
];

// Mock organizations (funded proposals)
export const mockOrganizations: Proposal[] = [
  { id: '1', title: 'Music Festival in Lagos', description: 'A large-scale music festival', amount: 50000, status: 'FUNDED', organizerId: '2', organizerName: 'John Smith', organizerEmail: 'organizer1@crawdwall.com', createdAt: '2023-05-15T11:30:00Z', updatedAt: '2023-07-20T16:45:00Z' },
  { id: '2', title: 'Art Exhibition in Accra', description: 'Contemporary African art exhibition', amount: 25000, status: 'FUNDED', organizerId: '3', organizerName: 'Sarah Johnson', organizerEmail: 'organizer2@crawdwall.com', createdAt: '2023-06-20T14:20:00Z', updatedAt: '2023-08-10T09:15:00Z' },
  { id: '3', title: 'Film Production Workshop', description: 'Training workshop for young filmmakers', amount: 15000, status: 'FUNDED', organizerId: '2', organizerName: 'John Smith', organizerEmail: 'organizer1@crawdwall.com', createdAt: '2023-07-05T09:45:00Z', updatedAt: '2023-08-25T14:30:00Z' },
];

// Mock officers
export const mockOfficers: User[] = [
  { id: '1', email: 'officer1@crawdwall.com', name: 'David Wilson', role: 'officer', createdAt: '2023-05-10T13:45:00Z', updatedAt: '2023-05-10T13:45:00Z' },
  { id: '2', email: 'officer2@crawdwall.com', name: 'Lisa Thompson', role: 'officer', createdAt: '2023-06-15T09:30:00Z', updatedAt: '2023-06-15T09:30:00Z' },
  { id: '3', email: 'officer3@crawdwall.com', name: 'James Rodriguez', role: 'officer', createdAt: '2023-07-22T14:20:00Z', updatedAt: '2023-07-22T14:20:00Z' },
  { id: '4', email: 'officer4@crawdwall.com', name: 'Maria Garcia', role: 'officer', createdAt: '2023-08-30T11:15:00Z', updatedAt: '2023-08-30T11:15:00Z' },
];

// Mock proposals
export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Music Festival in Lagos',
    description: 'A large-scale music festival featuring African artists to promote local talent and culture.',
    amount: 50000,
    status: 'FUNDED',
    organizerId: '2',
    organizerName: 'John Smith',
    organizerEmail: 'organizer1@crawdwall.com',
    createdAt: '2023-05-15T11:30:00Z',
    updatedAt: '2023-07-20T16:45:00Z',
    documents: ['contract.pdf', 'budget.pdf'],
    comments: [
      {
        id: 'c1',
        author: 'Admin User',
        content: 'Proposal approved for funding. Please proceed with event planning.',
        createdAt: '2023-07-15T10:00:00Z',
        isInternal: false,
      }
    ]
  },
  {
    id: '2',
    title: 'Art Exhibition in Accra',
    description: 'Contemporary African art exhibition showcasing emerging artists from Ghana and neighboring countries.',
    amount: 25000,
    status: 'IN_REVIEW',
    organizerId: '3',
    organizerName: 'Sarah Johnson',
    organizerEmail: 'organizer2@crawdwall.com',
    createdAt: '2023-06-20T14:20:00Z',
    updatedAt: '2023-08-10T09:15:00Z',
    documents: ['exhibition-plan.pdf'],
    comments: [
      {
        id: 'c2',
        author: 'Admin User',
        content: 'Needs more detailed budget breakdown',
        createdAt: '2023-06-25T11:30:00Z',
        isInternal: true,
      }
    ]
  },
  {
    id: '3',
    title: 'Film Production Workshop',
    description: 'Training workshop for young filmmakers in Nairobi focusing on storytelling and technical skills.',
    amount: 15000,
    status: 'VETTED',
    organizerId: '2',
    organizerName: 'John Smith',
    organizerEmail: 'organizer1@crawdwall.com',
    createdAt: '2023-07-05T09:45:00Z',
    updatedAt: '2023-08-25T14:30:00Z',
    documents: ['workshop-outline.pdf', 'trainer-info.pdf'],
    comments: []
  },
  {
    id: '4',
    title: 'Fashion Week in Cape Town',
    description: 'Annual fashion week highlighting African fashion designers and promoting cultural exchange.',
    amount: 75000,
    status: 'SUBMITTED',
    organizerId: '3',
    organizerName: 'Sarah Johnson',
    organizerEmail: 'organizer2@crawdwall.com',
    createdAt: '2023-08-01T16:10:00Z',
    updatedAt: '2023-08-01T16:10:00Z',
    documents: ['event-outline.pdf'],
    comments: []
  },
  {
    id: '5',
    title: 'Cultural Heritage Documentary',
    description: 'Documentary series exploring the cultural heritage of various African communities.',
    amount: 40000,
    status: 'CALLBACK',
    organizerId: '2',
    organizerName: 'John Smith',
    organizerEmail: 'organizer1@crawdwall.com',
    createdAt: '2023-08-15T13:20:00Z',
    updatedAt: '2023-09-05T12:10:00Z',
    documents: ['proposal.pdf', 'crew-info.pdf'],
    comments: [
      {
        id: 'c3',
        author: 'Admin User',
        content: 'Interesting concept. Please provide more details about distribution plans.',
        createdAt: '2023-08-20T10:15:00Z',
        isInternal: false,
      }
    ]
  },
  {
    id: '6',
    title: 'Tech Conference for Creative Industries',
    description: 'Conference bringing together technology and creative professionals to explore innovation in the arts.',
    amount: 30000,
    status: 'REJECTED',
    organizerId: '3',
    organizerName: 'Sarah Johnson',
    organizerEmail: 'organizer2@crawdwall.com',
    createdAt: '2023-09-10T11:00:00Z',
    updatedAt: '2023-09-20T15:45:00Z',
    documents: ['conference-plan.pdf'],
    comments: [
      {
        id: 'c4',
        author: 'Admin User',
        content: 'Proposal does not align with current funding priorities.',
        createdAt: '2023-09-20T15:45:00Z',
        isInternal: false,
      }
    ]
  }
];

// Mock API response functions
export const mockAPI = {
  // Utility functions
  validateAdmin,
  findUserByEmail,
  findUserById,
  // Auth API mocks
  login: (credentials: { email: string; password: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          // Return user without password for security
          const { password, ...userWithoutPassword } = user;
          resolve({
            success: true,
            data: {
              token: 'mock-token',
              user: userWithoutPassword
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid credentials'
          });
        }
      }, 500);
    });
  },

  registerOrganizer: (userData: { name: string; email: string; phone: string; password: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = addUser({
          email: userData.email,
          name: userData.name,
          role: 'organizer',
          password: userData.password,
        });
        
        resolve({
          success: true,
          data: {
            token: 'mock-token',
            user: newUser
          }
        });
      }, 500);
    });
  },

  getCurrentUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = localStorage.getItem('crawdwall_auth_token');
        if (!token) {
          resolve({
            success: false,
            message: 'No authentication token found'
          });
          return;
        }
        
        const role = localStorage.getItem('user_role') || 'organizer';
        const user = mockUsers.find(u => u.role === role && u.password);
        
        if (user) {
          // Return user without password for security
          const { password, ...userWithoutPassword } = user;
          resolve({
            success: true,
            data: userWithoutPassword
          });
        } else {
          resolve({
            success: false,
            message: 'User not found'
          });
        }
      }, 500);
    });
  },

  // Proposal API mocks
  getAllProposals: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockProposals
        });
      }, 800);
    });
  },

  getUserProposals: (userId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userProposals = mockProposals.filter(p => p.organizerId === userId);
        resolve({
          success: true,
          data: userProposals
        });
      }, 800);
    });
  },

  getProposal: (id: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proposal = mockProposals.find(p => p.id === id);
        if (proposal) {
          resolve({
            success: true,
            data: proposal
          });
        } else {
          resolve({
            success: false,
            message: 'Proposal not found'
          });
        }
      }, 500);
    });
  },

  createProposal: (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProposal: Proposal = {
          id: (mockProposals.length + 1).toString(),
          title: data.title,
          description: data.description,
          amount: data.amount,
          status: 'SUBMITTED',
          organizerId: '2', // Default to John Smith
          organizerName: 'John Smith',
          organizerEmail: 'organizer1@crawdwall.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          documents: data.documents ? Array.from(data.documents).map((doc: any) => doc.name) : [],
          comments: []
        };
        
        resolve({
          success: true,
          data: newProposal
        });
      }, 1000);
    });
  },

  updateProposalStatus: (id: string, status: string, comment?: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proposalIndex = mockProposals.findIndex(p => p.id === id);
        if (proposalIndex !== -1) {
          mockProposals[proposalIndex].status = status as 'SUBMITTED' | 'IN_REVIEW' | 'VETTED' | 'CALLBACK' | 'FUNDED' | 'REJECTED';
          mockProposals[proposalIndex].updatedAt = new Date().toISOString();
          
          if (comment) {
            const commentsArray = mockProposals[proposalIndex].comments || [];
            const newComment = {
              id: `c${commentsArray.length + 1}`,
              author: 'Admin User',
              content: comment,
              createdAt: new Date().toISOString(),
              isInternal: false
            };
            if (mockProposals[proposalIndex].comments) {
              mockProposals[proposalIndex].comments!.push(newComment);
            } else {
              mockProposals[proposalIndex].comments = [newComment];
            }
          }
          
          resolve({
            success: true,
            data: mockProposals[proposalIndex]
          });
        } else {
          resolve({
            success: false,
            message: 'Proposal not found'
          });
        }
      }, 800);
    });
  },

  addComment: (id: string, content: string, isInternal: boolean = false) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proposalIndex = mockProposals.findIndex(p => p.id === id);
        if (proposalIndex !== -1) {
          const commentsArray = mockProposals[proposalIndex].comments || [];
          const newComment = {
            id: `c${commentsArray.length + 1}`,
            author: 'Admin User',
            content: content,
            createdAt: new Date().toISOString(),
            isInternal: isInternal
          };
          
          if (mockProposals[proposalIndex].comments) {
            mockProposals[proposalIndex].comments!.push(newComment);
          } else {
            mockProposals[proposalIndex].comments = [newComment];
          }
          
          resolve({
            success: true,
            data: mockProposals[proposalIndex]
          });
        } else {
          resolve({
            success: false,
            message: 'Proposal not found'
          });
        }
      }, 500);
    });
  }
};