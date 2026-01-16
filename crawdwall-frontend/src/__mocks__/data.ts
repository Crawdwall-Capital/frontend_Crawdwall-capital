import { Proposal, User, UserWithPassword, Vote } from '@/types';

// Store users in memory for registration
// Store users in memory for registration
let mockUsers: UserWithPassword[] = (() => {
  // Load users from localStorage if available
  if (typeof window !== 'undefined') {
    const savedUsers = localStorage.getItem('mockUsers');
    if (savedUsers) {
      try {
        return JSON.parse(savedUsers);
      } catch (e) {
        console.error('Error parsing saved users:', e);
      }
    }
  }
  
  // Initialize with default users
  return [
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
      email: 'organizer3@crawdwall.com',
      name: 'Emma Thompson',
      role: 'organizer',
      password: 'organizer123',
      createdAt: '2023-03-25T16:30:00Z',
      updatedAt: '2023-03-25T16:30:00Z',
    },
    {
      id: '5',
      email: 'investor1@crawdwall.com',
      name: 'Michael Brown',
      role: 'investor',
      password: 'investor123',
      createdAt: '2023-04-05T09:20:00Z',
      updatedAt: '2023-04-05T09:20:00Z',
    },
    {
      id: '6',
      email: 'investor2@crawdwall.com',
      name: 'Robert Johnson',
      role: 'investor',
      password: 'investor123',
      createdAt: '2023-04-15T11:45:00Z',
      updatedAt: '2023-04-15T11:45:00Z',
    },
    {
      id: '7',
      email: 'officer1@crawdwall.com',
      name: 'David Wilson',
      role: 'officer',
      password: 'officer123',
      createdAt: '2023-05-10T13:45:00Z',
      updatedAt: '2023-05-10T13:45:00Z',
    },
    {
      id: '8',
      email: 'officer2@crawdwall.com',
      name: 'Lisa Thompson',
      role: 'officer',
      password: 'officer123',
      createdAt: '2023-05-20T09:30:00Z',
      updatedAt: '2023-05-20T09:30:00Z',
    },
    {
      id: '9',
      email: 'officer3@crawdwall.com',
      name: 'James Rodriguez',
      role: 'officer',
      password: 'officer123',
      createdAt: '2023-06-05T14:20:00Z',
      updatedAt: '2023-06-05T14:20:00Z',
    },
    {
      id: '10',
      email: 'officer4@crawdwall.com',
      name: 'Maria Garcia',
      role: 'officer',
      password: 'officer123',
      createdAt: '2023-06-15T11:15:00Z',
      updatedAt: '2023-06-15T11:15:00Z',
    }
  ];
})()

// Function to get all users
export const getAllUsers = (): User[] => {
  return mockUsers;
};

// Function to add a new user
export const addUser = (user: Omit<UserWithPassword, 'id' | 'createdAt' | 'updatedAt'>): User => {
  // Calculate new ID based on highest existing ID
  const maxId = Math.max(...mockUsers.map(u => parseInt(u.id)), 0);
  const newUser: UserWithPassword = {
    id: `${maxId + 1}`,
    ...user,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  // Add to in-memory array
  mockUsers.push(newUser);
  
  // Save updated users to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }
  
  // Return user without password for security
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Function to find a user by email
export const findUserByEmail = (email: string): User | undefined => {
  // Load users from localStorage if available
  let users = mockUsers;
  if (typeof window !== 'undefined') {
    const savedUsers = localStorage.getItem('mockUsers');
    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch (e) {
        console.error('Error parsing saved users:', e);
      }
    }
  }
  return users.find((user: any) => user.email === email);
};

// Function to find a user by ID
export const findUserById = (id: string): User | undefined => {
  // Load users from localStorage if available
  let users = mockUsers;
  if (typeof window !== 'undefined') {
    const savedUsers = localStorage.getItem('mockUsers');
    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch (e) {
        console.error('Error parsing saved users:', e);
      }
    }
  }
  return users.find((user: any) => user.id === id);
};

// Function to validate admin credentials
export const validateAdmin = (email: string, password: string): boolean => {
  // Load users from localStorage if available
  let users = mockUsers;
  if (typeof window !== 'undefined') {
    const savedUsers = localStorage.getItem('mockUsers');
    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch (e) {
        console.error('Error parsing saved users:', e);
      }
    }
  }
  const adminUser = users.find((user: any) => user.email === email && user.role === 'admin');
  return adminUser ? adminUser.password === password : false;
};

// Mock investors
export const mockInvestors: User[] = [
  { id: '5', email: 'investor1@crawdwall.com', name: 'Michael Brown', role: 'investor', createdAt: '2023-04-05T09:20:00Z', updatedAt: '2023-04-05T09:20:00Z' },
  { id: '6', email: 'investor2@crawdwall.com', name: 'Robert Johnson', role: 'investor', createdAt: '2023-04-15T11:45:00Z', updatedAt: '2023-04-15T11:45:00Z' },
];

// Mock organizations (funded proposals)
export const mockOrganizations: Proposal[] = [
  { id: '1', title: 'Music Festival in Lagos', description: 'A large-scale music festival', amount: 50000, status: 'FUNDED', organizerId: '2', organizerName: 'John Smith', organizerEmail: 'organizer1@crawdwall.com', createdAt: '2023-05-15T11:30:00Z', updatedAt: '2023-07-20T16:45:00Z' },
  { id: '2', title: 'Art Exhibition in Accra', description: 'Contemporary African art exhibition', amount: 25000, status: 'FUNDED', organizerId: '3', organizerName: 'Sarah Johnson', organizerEmail: 'organizer2@crawdwall.com', createdAt: '2023-06-20T14:20:00Z', updatedAt: '2023-08-10T09:15:00Z' },
  { id: '3', title: 'Film Production Workshop', description: 'Training workshop for young filmmakers', amount: 15000, status: 'FUNDED', organizerId: '2', organizerName: 'John Smith', organizerEmail: 'organizer1@crawdwall.com', createdAt: '2023-07-05T09:45:00Z', updatedAt: '2023-08-25T14:30:00Z' },
];

// Mock officers
export const mockOfficers: User[] = [
  { id: '7', email: 'officer1@crawdwall.com', name: 'David Wilson', role: 'officer', createdAt: '2023-05-10T13:45:00Z', updatedAt: '2023-05-10T13:45:00Z' },
  { id: '8', email: 'officer2@crawdwall.com', name: 'Lisa Thompson', role: 'officer', createdAt: '2023-05-20T09:30:00Z', updatedAt: '2023-05-20T09:30:00Z' },
  { id: '9', email: 'officer3@crawdwall.com', name: 'James Rodriguez', role: 'officer', createdAt: '2023-06-05T14:20:00Z', updatedAt: '2023-06-05T14:20:00Z' },
  { id: '10', email: 'officer4@crawdwall.com', name: 'Maria Garcia', role: 'officer', createdAt: '2023-06-15T11:15:00Z', updatedAt: '2023-06-15T11:15:00Z' },
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
    ],
    votes: [
      { officerId: '7', officerName: 'David Wilson', decision: 'ACCEPT', review: 'Excellent proposal with strong community impact', timestamp: '2023-07-10T14:30:00Z' },
      { officerId: '8', officerName: 'Lisa Thompson', decision: 'ACCEPT', review: 'Great initiative for local artists', timestamp: '2023-07-11T11:15:00Z' },
      { officerId: '9', officerName: 'James Rodriguez', decision: 'ACCEPT', review: 'Solid business plan and execution strategy', timestamp: '2023-07-12T09:45:00Z' },
      { officerId: '10', officerName: 'Maria Garcia', decision: 'ACCEPT', review: 'Strong potential for cultural impact', timestamp: '2023-07-13T16:20:00Z' }
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
    ],
    votes: [
      { officerId: '7', officerName: 'David Wilson', decision: 'ACCEPT', review: 'Good concept, needs financial clarity', timestamp: '2023-07-15T10:30:00Z' },
      { officerId: '8', officerName: 'Lisa Thompson', decision: 'REJECT', review: 'Budget concerns and unclear ROI', timestamp: '2023-07-16T14:20:00Z' },
      { officerId: '9', officerName: 'James Rodriguez', decision: 'ACCEPT', review: 'Cultural value is significant', timestamp: '2023-07-17T12:45:00Z' },
      { officerId: '10', officerName: 'Maria Garcia', decision: 'ACCEPT', review: 'Important for art community', timestamp: '2023-07-18T11:30:00Z' }
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
    comments: [],
    votes: [
      { officerId: '7', officerName: 'David Wilson', decision: 'ACCEPT', review: 'Educational value is excellent', timestamp: '2023-08-10T15:20:00Z' },
      { officerId: '8', officerName: 'Lisa Thompson', decision: 'ACCEPT', review: 'Good for skill development', timestamp: '2023-08-11T13:15:00Z' },
      { officerId: '9', officerName: 'James Rodriguez', decision: 'ACCEPT', review: 'Important for creative industry growth', timestamp: '2023-08-12T10:45:00Z' },
      { officerId: '10', officerName: 'Maria Garcia', decision: 'REJECT', review: 'Budget seems high for scope', timestamp: '2023-08-13T09:30:00Z' }
    ]
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
    comments: [],
    votes: []
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
    ],
    votes: [
      { officerId: '7', officerName: 'David Wilson', decision: 'ACCEPT', review: 'Important cultural preservation project', timestamp: '2023-08-25T14:15:00Z' },
      { officerId: '8', officerName: 'Lisa Thompson', decision: 'ACCEPT', review: 'Significant educational value', timestamp: '2023-08-26T11:30:00Z' },
      { officerId: '9', officerName: 'James Rodriguez', decision: 'REJECT', review: 'Distribution strategy needs improvement', timestamp: '2023-08-27T16:45:00Z' },
      { officerId: '10', officerName: 'Maria Garcia', decision: 'ACCEPT', review: 'Valuable for cultural awareness', timestamp: '2023-08-28T13:20:00Z' }
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
    ],
    votes: [
      { officerId: '7', officerName: 'David Wilson', decision: 'REJECT', review: 'Does not align with current priorities', timestamp: '2023-09-15T10:30:00Z' },
      { officerId: '8', officerName: 'Lisa Thompson', decision: 'REJECT', review: 'Overlap with other funded projects', timestamp: '2023-09-16T14:15:00Z' },
      { officerId: '9', officerName: 'James Rodriguez', decision: 'ACCEPT', review: 'Innovative approach to tech-arts intersection', timestamp: '2023-09-17T12:45:00Z' },
      { officerId: '10', officerName: 'Maria Garcia', decision: 'REJECT', review: 'Budget concerns', timestamp: '2023-09-18T09:20:00Z' }
    ]
  },
  {
    id: '7',
    title: 'Digital Art Platform for Emerging Artists',
    description: 'Online platform to showcase and sell digital artwork by emerging African artists with NFT marketplace integration.',
    amount: 65000,
    status: 'DRAFT',
    organizerId: '4',
    organizerName: 'Emma Thompson',
    organizerEmail: 'organizer3@crawdwall.com',
    createdAt: '2023-09-25T10:30:00Z',
    updatedAt: '2023-09-25T10:30:00Z',
    documents: [],
    comments: [],
    votes: []
  },
  {
    id: '8',
    title: 'Community Music School Initiative',
    description: 'Establishing music schools in underserved communities to provide free instrument training and music theory education.',
    amount: 45000,
    status: 'SUBMITTED',
    organizerId: '4',
    organizerName: 'Emma Thompson',
    organizerEmail: 'organizer3@crawdwall.com',
    createdAt: '2023-10-01T14:20:00Z',
    updatedAt: '2023-10-01T14:20:00Z',
    documents: ['school-plan.pdf', 'curriculum.pdf'],
    comments: [],
    votes: []
  }
];

// Mock officer reviews
export const mockOfficerReviews = [
  {
    id: 'rev1',
    proposalId: '1',
    proposalTitle: 'Music Festival in Lagos',
    officerId: '7',
    officerName: 'David Wilson',
    date: '2023-07-10',
    status: 'ACCEPT',
    comment: 'Strong financial projections and market analysis.',
    proposalStatus: 'FUNDED',
  },
  {
    id: 'rev2',
    proposalId: '2',
    proposalTitle: 'Art Exhibition in Accra',
    officerId: '8',
    officerName: 'Lisa Thompson',
    date: '2023-07-16',
    status: 'REJECT',
    comment: 'Concerns about sustainability and ROI projections.',
    proposalStatus: 'IN_REVIEW',
  },
  {
    id: 'rev3',
    proposalId: '3',
    proposalTitle: 'Film Production Workshop',
    officerId: '7',
    officerName: 'David Wilson',
    date: '2023-08-10',
    status: 'ACCEPT',
    comment: 'Excellent cultural value and community impact.',
    proposalStatus: 'VETTED',
  },
  {
    id: 'rev4',
    proposalId: '5',
    proposalTitle: 'Cultural Heritage Documentary',
    officerId: '9',
    officerName: 'James Rodriguez',
    date: '2023-08-27',
    status: 'REJECT',
    comment: 'Distribution strategy needs improvement.',
    proposalStatus: 'CALLBACK',
  },
];

// Mock audit logs
export const mockAuditLogs = [
  {
    id: 'log1',
    action: 'Proposal submitted',
    details: 'John Smith submitted Music Festival in Lagos proposal',
    actor: 'John Smith',
    actorRole: 'organizer',
    timestamp: '2023-05-15T11:30:00Z',
    proposalId: '1',
  },
  {
    id: 'log2',
    action: 'Proposal status updated',
    details: 'Proposal status changed from SUBMITTED to IN_REVIEW',
    actor: 'Admin User',
    actorRole: 'admin',
    timestamp: '2023-05-16T09:15:00Z',
    proposalId: '1',
  },
  {
    id: 'log3',
    action: 'Officer voted',
    details: 'David Wilson voted ACCEPT on Music Festival in Lagos proposal',
    actor: 'David Wilson',
    actorRole: 'officer',
    timestamp: '2023-07-10T14:30:00Z',
    proposalId: '1',
  },
  {
    id: 'log4',
    action: 'Proposal funded',
    details: 'Music Festival in Lagos proposal approved for funding',
    actor: 'System',
    actorRole: 'system',
    timestamp: '2023-07-20T16:45:00Z',
    proposalId: '1',
  },
  {
    id: 'log5',
    action: 'Proposal reviewed',
    details: 'Lisa Thompson submitted review for Art Exhibition in Accra',
    actor: 'Lisa Thompson',
    actorRole: 'officer',
    timestamp: '2023-07-16T14:20:00Z',
    proposalId: '2',
  },
  {
    id: 'log6',
    action: 'User registered',
    details: 'New organizer Emma Thompson registered',
    actor: 'Emma Thompson',
    actorRole: 'organizer',
    timestamp: '2023-03-25T16:30:00Z',
    proposalId: null,
  },
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
        // Load users from localStorage if available
        let users = mockUsers;
        if (typeof window !== 'undefined') {
          const savedUsers = localStorage.getItem('mockUsers');
          if (savedUsers) {
            try {
              users = JSON.parse(savedUsers);
            } catch (e) {
              console.error('Error parsing saved users:', e);
            }
          }
        }
        
        const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
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

  registerInvestor: (userData: { name: string; email: string; phone: string; password: string }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = addUser({
          email: userData.email,
          name: userData.name,
          role: 'investor',
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
        
        // Load users from localStorage if available
        let users = mockUsers;
        if (typeof window !== 'undefined') {
          const savedUsers = localStorage.getItem('mockUsers');
          if (savedUsers) {
            try {
              users = JSON.parse(savedUsers);
            } catch (e) {
              console.error('Error parsing saved users:', e);
            }
          }
        }
        
        // Get user from localStorage if available
        const userEmail = localStorage.getItem('user_email');
        if (userEmail) {
          const user = users.find((u: any) => u.email === userEmail);
          if (user) {
            // Return user without password for security
            const { password, ...userWithoutPassword } = user;
            resolve({
              success: true,
              data: userWithoutPassword
            });
            return;
          }
        }
        
        // Fallback to role-based lookup
        const role = localStorage.getItem('user_role') || 'organizer';
        const user = users.find((u: any) => u.role === role);
        
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

  getOfficerProposals: (officerId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Officer can see proposals that are in review or have votes from other officers
        const officerProposals = mockProposals.filter(p => 
          p.status === 'SUBMITTED' || 
          p.status === 'IN_REVIEW' || 
          p.votes?.some(v => v.officerId === officerId) ||
          p.votes && p.votes.length > 0
        );
        resolve({
          success: true,
          data: officerProposals
        });
      }, 800);
    });
  },

  getOfficerVotes: (officerId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const officerVotes = mockProposals.flatMap(p => 
          p.votes?.filter(v => v.officerId === officerId) || []
        );
        resolve({
          success: true,
          data: officerVotes
        });
      }, 800);
    });
  },

  submitVote: (proposalId: string, officerId: string, decision: 'ACCEPT' | 'REJECT', review: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proposalIndex = mockProposals.findIndex(p => p.id === proposalId);
        if (proposalIndex !== -1) {
          const proposal = mockProposals[proposalIndex];
          const officer = mockOfficers.find(o => o.id === officerId);
          
          if (!officer) {
            resolve({
              success: false,
              message: 'Officer not found'
            });
            return;
          }
          
          // Check if officer has already voted on this proposal
          const existingVoteIndex = proposal.votes?.findIndex(v => v.officerId === officerId) ?? -1;
          
          const voteData = {
            officerId,
            officerName: officer.name || officer.email.split('@')[0],
            decision,
            review,
            timestamp: new Date().toISOString()
          };
          
          if (existingVoteIndex >= 0) {
            // Update existing vote
            proposal.votes![existingVoteIndex] = voteData;
          } else {
            // Add new vote
            if (!proposal.votes) {
              proposal.votes = [];
            }
            proposal.votes.push(voteData);
            
            // Update status based on voting rules
            const acceptVotes = proposal.votes.filter(v => v.decision === 'ACCEPT').length;
            if (acceptVotes >= 4) {
              proposal.status = 'FUNDED';
              proposal.updatedAt = new Date().toISOString();
            } else {
              // If proposal was in review and now has votes, move to vetted
              if (proposal.status === 'IN_REVIEW' && proposal.votes.length > 0) {
                proposal.status = 'VETTED';
                proposal.updatedAt = new Date().toISOString();
              }
            }
          }
          
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
      }, 1000);
    });
  },

  getVotingResults: (proposalId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const proposal = mockProposals.find(p => p.id === proposalId);
        if (proposal && proposal.votes) {
          const acceptCount = proposal.votes.filter(v => v.decision === 'ACCEPT').length;
          const rejectCount = proposal.votes.filter(v => v.decision === 'REJECT').length;
          
          resolve({
            success: true,
            data: {
              acceptCount,
              rejectCount,
              totalVotes: proposal.votes.length,
              thresholdMet: acceptCount >= 4,
              status: proposal.status
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Proposal not found or has no votes'
          });
        }
      }, 500);
    });
  },

  getAuditLogs: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockAuditLogs
        });
      }, 1000);
    });
  },

  getFundedEvents: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fundedEvents = mockProposals.filter(p => p.status === 'FUNDED');
        resolve({
          success: true,
          data: fundedEvents
        });
      }, 800);
    });
  },

  getInvestorPortfolio: (investorId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, we'll return a portfolio based on mock data
        // In a real system, this would be linked to actual investment records
        const portfolioItems = [
          {
            id: '1',
            eventId: '1',
            eventName: 'Music Festival in Lagos',
            investmentAmount: 15000,
            investmentDate: '2023-06-15',
            projectedReturn: '18%',
            currentStatus: 'Active',
            progress: 75,
            organizerId: '2',
            organizerName: 'John Smith',
            organizerEmail: 'organizer1@crawdwall.com'
          },
          {
            id: '2',
            eventId: '3',
            eventName: 'Film Production Workshop',
            investmentAmount: 8000,
            investmentDate: '2023-08-20',
            projectedReturn: '22%',
            currentStatus: 'Completed',
            progress: 100,
            organizerId: '2',
            organizerName: 'John Smith',
            organizerEmail: 'organizer1@crawdwall.com'
          },
          {
            id: '3',
            eventId: '2',
            eventName: 'Art Exhibition in Accra',
            investmentAmount: 12000,
            investmentDate: '2023-07-10',
            projectedReturn: '15%',
            currentStatus: 'Active',
            progress: 60,
            organizerId: '3',
            organizerName: 'Sarah Johnson',
            organizerEmail: 'organizer2@crawdwall.com'
          }
        ];
        
        resolve({
          success: true,
          data: portfolioItems
        });
      }, 800);
    });
  },

  getProposalStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalProposals = mockProposals.length;
        const fundedProposals = mockProposals.filter(p => p.status === 'FUNDED').length;
        const inReviewProposals = mockProposals.filter(p => p.status === 'IN_REVIEW').length;
        const rejectedProposals = mockProposals.filter(p => p.status === 'REJECTED').length;
        
        resolve({
          success: true,
          data: {
            total: totalProposals,
            funded: fundedProposals,
            inReview: inReviewProposals,
            rejected: rejectedProposals,
            totalAmountRequested: mockProposals.reduce((sum, p) => sum + p.amount, 0),
            totalAmountFunded: mockProposals.filter(p => p.status === 'FUNDED').reduce((sum, p) => sum + p.amount, 0)
          }
        });
      }, 800);
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
  },

  // Officer-specific API functions
  getOfficerReviews: (officerId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const officerReviews = mockOfficerReviews.filter(review => review.officerId === officerId);
        resolve({
          success: true,
          data: officerReviews
        });
      }, 800);
    });
  },

  getProposalsNeedingVotes: (officerId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get proposals that are in review status and don't have votes from this officer yet
        const proposalsNeedingVotes = mockProposals.filter(proposal => 
          proposal.status === 'IN_REVIEW' || proposal.status === 'SUBMITTED'
        ).map(proposal => {
          const votesReceived = proposal.votes?.length || 0;
          const officerVote = proposal.votes?.find(vote => vote.officerId === officerId);
          
          return {
            id: proposal.id,
            title: proposal.title,
            status: proposal.status,
            date: proposal.createdAt.split('T')[0],
            amount: `$${proposal.amount.toLocaleString()}`,
            description: proposal.description,
            organizer: proposal.organizerName,
            reviewsReceived: votesReceived,
            totalOfficers: mockOfficers.length,
            acceptanceThreshold: 4,
            votesReceived: votesReceived,
            myVote: officerVote ? officerVote.decision : null,
          };
        }).filter(proposal => proposal.myVote === null); // Only show proposals where officer hasn't voted
        
        resolve({
          success: true,
          data: proposalsNeedingVotes
        });
      }, 800);
    });
  },

  getMyVotedProposals: (officerId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get proposals where this officer has voted
        const votedProposals = mockProposals.filter(proposal => 
          proposal.votes?.some(vote => vote.officerId === officerId)
        ).map(proposal => {
          const officerVote = proposal.votes?.find(vote => vote.officerId === officerId);
          const votesReceived = proposal.votes?.length || 0;
          const acceptVotes = proposal.votes?.filter(vote => vote.decision === 'ACCEPT').length || 0;
          
          return {
            id: proposal.id,
            title: proposal.title,
            status: proposal.status === 'FUNDED' ? 'Accepted' : 
                   proposal.status === 'REJECTED' ? 'Rejected' : 
                   acceptVotes >= 4 ? 'Accepted' : 'Rejected',
            date: proposal.createdAt.split('T')[0],
            amount: `$${proposal.amount.toLocaleString()}`,
            myVote: officerVote?.decision,
            acceptanceThreshold: 4,
            votesReceived: votesReceived,
            totalOfficers: mockOfficers.length,
          };
        });
        
        resolve({
          success: true,
          data: votedProposals
        });
      }, 800);
    });
  }
};