import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import AdminLoginPage from '../app/admin-login/page';
import { authAPI } from '@/lib/api';

// --------------------
// Mocks
// --------------------

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock API
jest.mock('@/lib/api', () => ({
  authAPI: {
    sendOtp: jest.fn(),
    verifyOtp: jest.fn(),
  },
}));

// Mock Navbar & Footer
jest.mock('@/components/ui/Navbar', () => () => (
  <div data-testid="navbar">Navbar</div>
));
jest.mock('@/components/ui/Footer', () => () => (
  <div data-testid="footer">Footer</div>
));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn((name: string) => ({
      name,
      id: name,
      'data-testid': name,
    })),
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      return fn({
        email: 'admin@example.com',
        otp: '123456',
      });
    },
    formState: { errors: {} },
    trigger: jest.fn(() => Promise.resolve(true)),
    getValues: jest.fn((field: string) => {
      if (field === 'email') return 'admin@example.com';
      if (field === 'otp') return '123456';
      return '';
    }),
    setValue: jest.fn(),
  }),
}));

// Mock zod resolver
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

describe('AdminLoginPage', () => {
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
        clear: jest.fn(() => {
          store = {};
        }),
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
  });

  test('renders admin login form correctly', () => {
    render(<AdminLoginPage />);

    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByText('Secure OTP-based access')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send otp/i })).toBeInTheDocument();
  });

  test('logs configuration on component mount', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<AdminLoginPage />);

    expect(consoleSpy).toHaveBeenCalledWith(
      '🔧 Admin Login Configuration:',
      expect.objectContaining({
        backendUrl: 'https://crawdwall-backend-ywlk.onrender.com',
        fullBaseUrl: 'https://crawdwall-backend-ywlk.onrender.com/api',
        sendOtpEndpoint: '/auth/admin/request-otp',
        verifyOtpEndpoint: '/auth/admin/verify-otp',
      })
    );

    consoleSpy.mockRestore();
  });

  describe('OTP Request Flow', () => {
    test('successfully sends OTP request', async () => {
      (authAPI.sendOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: {
          success: true,
          message: 'OTP sent successfully',
        },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });

      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(authAPI.sendOtp).toHaveBeenCalledWith({
          email: 'admin@example.com',
        });
      });

      expect(screen.getByText('OTP sent to your email.')).toBeInTheDocument();
      expect(screen.getByTestId('otp')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /verify otp/i })).toBeInTheDocument();
    });

    test('handles OTP request failure', async () => {
      (authAPI.sendOtp as jest.Mock).mockRejectedValue({
        response: {
          status: 400,
          data: {
            message: 'Invalid email address',
          },
        },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });

      await user.type(emailInput, 'invalid@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    test('handles network error during OTP request', async () => {
      (authAPI.sendOtp as jest.Mock).mockRejectedValue({
        code: 'ERR_NETWORK',
        message: 'Network Error',
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });

      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByText('Network error. Please check your connection and backend availability.')).toBeInTheDocument();
      });
    });

    test('handles backend unavailable (503) error', async () => {
      (authAPI.sendOtp as jest.Mock).mockRejectedValue({
        response: {
          status: 503,
          data: {
            message: 'Service Unavailable',
          },
        },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });

      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByText('Service Unavailable')).toBeInTheDocument();
      });
    });
  });

  describe('OTP Verification Flow', () => {
    beforeEach(async () => {
      // Setup OTP sent state
      (authAPI.sendOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: { success: true, message: 'OTP sent successfully' },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });

      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByTestId('otp')).toBeInTheDocument();
      });
    });

    test('successfully verifies OTP and navigates to admin dashboard', async () => {
      (authAPI.verifyOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: {
          token: 'admin-jwt-token',
          message: 'Login successful',
          role: 'ADMIN',
        },
      });

      const user = userEvent.setup();
      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });

      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(authAPI.verifyOtp).toHaveBeenCalledWith({
          email: 'admin@example.com',
          otp: '123456',
        });
      });

      // Check navigation occurred
      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('crawdwall_auth_token', 'admin-jwt-token');
        expect(localStorage.setItem).toHaveBeenCalledWith('user_role', 'admin');
        expect(localStorage.setItem).toHaveBeenCalledWith('user_email', 'admin@example.com');
      });

      // Note: window.location.href navigation is mocked and doesn't actually change the URL in tests
    });

    test('handles invalid OTP error', async () => {
      (authAPI.verifyOtp as jest.Mock).mockRejectedValue({
        response: {
          status: 401,
          data: {
            message: 'Invalid OTP',
          },
        },
      });

      const user = userEvent.setup();
      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });

      await user.type(otpInput, '000000');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid OTP')).toBeInTheDocument();
      });
    });

    test('handles expired OTP error', async () => {
      (authAPI.verifyOtp as jest.Mock).mockRejectedValue({
        response: {
          status: 401,
          data: {
            message: 'OTP expired',
          },
        },
      });

      const user = userEvent.setup();
      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });

      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(screen.getByText('OTP expired')).toBeInTheDocument();
      });
    });

    test('handles server error during OTP verification', async () => {
      (authAPI.verifyOtp as jest.Mock).mockRejectedValue({
        response: {
          status: 500,
          data: {
            message: 'Internal server error',
          },
        },
      });

      const user = userEvent.setup();
      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });

      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(screen.getByText('Internal server error')).toBeInTheDocument();
      });
    });

    test('handles network error during OTP verification', async () => {
      (authAPI.verifyOtp as jest.Mock).mockRejectedValue({
        code: 'ERR_NETWORK',
        message: 'Network Error',
      });

      const user = userEvent.setup();
      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });

      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(screen.getByText('Network error. Please check your connection and backend availability.')).toBeInTheDocument();
      });
    });
  });

  describe('UI State Management', () => {
    test('shows loading state during OTP request', async () => {
      let resolveOtp: (value: any) => void;
      const otpPromise = new Promise((resolve) => {
        resolveOtp = resolve;
      });
      (authAPI.sendOtp as jest.Mock).mockReturnValue(otpPromise);

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });

      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      // Check loading state
      expect(screen.getByText('Sending OTP...')).toBeInTheDocument();
      expect(sendOtpButton).toBeDisabled();

      // Resolve the promise
      resolveOtp!({
        status: 200,
        data: { success: true, message: 'OTP sent successfully' },
      });

      await waitFor(() => {
        expect(screen.queryByText('Sending OTP...')).not.toBeInTheDocument();
      });
    });

    test('shows loading state during OTP verification', async () => {
      // First send OTP
      (authAPI.sendOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: { success: true, message: 'OTP sent successfully' },
      });

      let resolveVerify: (value: any) => void;
      const verifyPromise = new Promise((resolve) => {
        resolveVerify = resolve;
      });
      (authAPI.verifyOtp as jest.Mock).mockReturnValue(verifyPromise);

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      // Send OTP first
      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });
      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByTestId('otp')).toBeInTheDocument();
      });

      // Now verify OTP
      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });

      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      // Check loading state
      expect(screen.getByText('Verifying...')).toBeInTheDocument();
      expect(verifyButton).toBeDisabled();

      // Resolve the promise
      resolveVerify!({
        status: 200,
        data: {
          token: 'admin-jwt-token',
          message: 'Login successful',
          role: 'ADMIN',
        },
      });

      await waitFor(() => {
        expect(screen.queryByText('Verifying...')).not.toBeInTheDocument();
      });
    });

    test('allows changing email after OTP is sent', async () => {
      (authAPI.sendOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: { success: true, message: 'OTP sent successfully' },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      // Send OTP first
      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });
      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByTestId('otp')).toBeInTheDocument();
      });

      // Click change email
      const changeEmailButton = screen.getByRole('button', { name: /change email/i });
      await user.click(changeEmailButton);

      // Should be back to email input state
      expect(screen.queryByTestId('otp')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send otp/i })).toBeInTheDocument();
    });
  });

  describe('Response Structure Handling', () => {
    test('handles flat response structure correctly', async () => {
      (authAPI.sendOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: { success: true, message: 'OTP sent successfully' },
      });

      (authAPI.verifyOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: {
          token: 'flat-response-token',
          message: 'Verification successful',
          role: 'ADMIN',
        },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      // Complete the flow
      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });
      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByTestId('otp')).toBeInTheDocument();
      });

      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });
      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('crawdwall_auth_token', 'flat-response-token');
        expect(localStorage.setItem).toHaveBeenCalledWith('user_role', 'admin');
      });

      // Note: window.location.href navigation is mocked and doesn't actually change the URL in tests
    });

    test('handles nested response structure as fallback', async () => {
      (authAPI.sendOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: { success: true, message: 'OTP sent successfully' },
      });

      (authAPI.verifyOtp as jest.Mock).mockResolvedValue({
        status: 200,
        data: {
          success: true,
          data: {
            token: 'nested-response-token',
            user: {
              id: '1',
              email: 'admin@example.com',
              role: 'ADMIN',
            },
          },
        },
      });

      const user = userEvent.setup();
      render(<AdminLoginPage />);

      // Complete the flow
      const emailInput = screen.getByTestId('email');
      const sendOtpButton = screen.getByRole('button', { name: /send otp/i });
      await user.type(emailInput, 'admin@example.com');
      await user.click(sendOtpButton);

      await waitFor(() => {
        expect(screen.getByTestId('otp')).toBeInTheDocument();
      });

      const otpInput = screen.getByTestId('otp');
      const verifyButton = screen.getByRole('button', { name: /verify otp/i });
      await user.type(otpInput, '123456');
      await user.click(verifyButton);

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('crawdwall_auth_token', 'nested-response-token');
        expect(localStorage.setItem).toHaveBeenCalledWith('user_role', 'admin');
      });

      // Note: window.location.href navigation is mocked and doesn't actually change the URL in tests
    });
  });
});