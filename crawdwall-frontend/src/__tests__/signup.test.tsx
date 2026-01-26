import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import SignupPage from '../app/signup/page';
import { authAPI } from '@/lib/api';

jest.mock('@/components/ui/Navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('@/components/ui/Footer', () => () => <div>Mocked Footer</div>);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
  authAPI: {
    registerOrganizer: jest.fn(),
  },
}));

describe('SignupPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('handles successful registration', async () => {
  (authAPI.registerOrganizer as jest.Mock).mockResolvedValue({
    data: {
      success: true,
      data: {
        token: 'fake-token',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890',
          role: 'organizer',
        },
      },
    },
  });

  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  render(<SignupPage />);

  await user.type(screen.getByLabelText('Full Name'), 'John Doe');
  await user.type(screen.getByLabelText('Email address'), 'john@example.com');
  await user.type(screen.getByLabelText('Phone Number'), '1234567890');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.selectOptions(screen.getByLabelText('Role'), 'organizer');

  await user.click(screen.getByRole('button', { name: /register/i }));

  // flush retries / async effects
  jest.runAllTimers();

  await waitFor(() => {
    expect(authAPI.registerOrganizer).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/organizer/dashboard');
  });
});

});
