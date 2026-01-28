import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { authAPI } from '@/lib/api';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock API
jest.mock('@/lib/api', () => ({
  authAPI: {
    getCurrentUser: jest.fn(),
  },
}));

describe('AuthGuard', () => {
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

  const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

  describe('Authentication Checks', () => {
    test('shows loading state initially', async () => {
      localStorage.getItem = jest.fn().mockReturnValue('fake-token');
      
      let resolveGetCurrentUser: (value: any) => void;
      const getCurrentUserPromise = new Promise((resolve) => {
        resolveGetCurrentUser = resolve;
      });
      (authAPI.getCurrentUser as jest.Mock).mockReturnValue(getCurrentUserPromise);

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();

      // Resolve the promise to clean up
      resolveGetCurrentUser!({
        data: { success: true, data: { id: '1', role: 'admin' } },
      });

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
    });

    test('redirects to login when no token exists', async () => {
      localStorage.getItem = jest.fn().mockReturnValue(null);

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });

      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    test('redirects to login when no user role exists', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return null;
        return null;
      });

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });
    });

    test('allows access when token and role exist and API call succeeds', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue({
        data: { success: true, data: { id: '1', role: 'admin' } },
      });

      render(
        <AuthGuard allowedRoles={['admin']}>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });

      expect(mockReplace).not.toHaveBeenCalled();
    });

    test('clears auth data and redirects when API call fails', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'invalid-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockRejectedValue(new Error('Token expired'));

      render(
        <AuthGuard allowedRoles={['admin']}>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(localStorage.removeItem).toHaveBeenCalledWith('crawdwall_auth_token');
        expect(localStorage.removeItem).toHaveBeenCalledWith('user_role');
        expect(localStorage.removeItem).toHaveBeenCalledWith('user_email');
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });

      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('Role-Based Access Control', () => {
    beforeEach(() => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'investor';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue({
        data: { success: true, data: { id: '1', role: 'investor' } },
      });
    });

    test('allows access when user role is in allowed roles', async () => {
      render(
        <AuthGuard allowedRoles={['investor', 'organizer']}>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });

      expect(mockReplace).not.toHaveBeenCalled();
    });

    test('denies access when user role is not in allowed roles', async () => {
      render(
        <AuthGuard allowedRoles={['admin', 'officer']}>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });

      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });

    test('uses default allowed roles when none specified', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
    });

    test('handles case-insensitive role matching', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'ADMIN'; // Uppercase
        return null;
      });

      render(
        <AuthGuard allowedRoles={['admin']}> {/* Lowercase */}
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
    });
  });

  describe('Custom Redirect Paths', () => {
    test('redirects to custom path when specified', async () => {
      localStorage.getItem = jest.fn().mockReturnValue(null);

      render(
        <AuthGuard redirectTo="/custom-login">
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/custom-login');
      });
    });

    test('redirects to custom path for unauthorized role', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'investor';
        return null;
      });

      render(
        <AuthGuard allowedRoles={['admin']} redirectTo="/unauthorized">
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/unauthorized');
      });
    });
  });

  describe('Error Handling', () => {
    test('handles API errors gracefully', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      (authAPI.getCurrentUser as jest.Mock).mockRejectedValue(new Error('Network error'));

      render(
        <AuthGuard allowedRoles={['admin']}>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Token verification failed:', expect.any(Error));
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });

      consoleErrorSpy.mockRestore();
    });

    test('handles general auth check errors', async () => {
      localStorage.getItem = jest.fn().mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Auth check failed:', expect.any(Error));
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Loading States', () => {
    test('shows loading spinner during auth check', () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockImplementation(() => new Promise(() => {})); // Never resolves

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
      
      // Check for loading spinner
      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    test('removes loading state after successful auth', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue({
        data: { success: true, data: { id: '1', role: 'admin' } },
      });

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.queryByText('Checking authentication...')).not.toBeInTheDocument();
        expect(screen.getByTestId('protected-content')).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Role Scenarios', () => {
    test('allows access for multiple valid roles', async () => {
      const roles = ['admin', 'officer', 'investor', 'organizer'];
      
      for (const role of roles) {
        localStorage.getItem = jest.fn().mockImplementation((key: string) => {
          if (key === 'crawdwall_auth_token') return 'fake-token';
          if (key === 'user_role') return role;
          return null;
        });

        (authAPI.getCurrentUser as jest.Mock).mockResolvedValue({
          data: { success: true, data: { id: '1', role } },
        });

        const { unmount } = render(
          <AuthGuard allowedRoles={roles}>
            <TestComponent />
          </AuthGuard>
        );

        await waitFor(() => {
          expect(screen.getByTestId('protected-content')).toBeInTheDocument();
        });

        unmount();
        jest.clearAllMocks();
      }
    });

    test('denies access for invalid roles', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'guest'; // Invalid role
        return null;
      });

      render(
        <AuthGuard allowedRoles={['admin', 'officer']}>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login');
      });

      expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    });
  });

  describe('Console Logging', () => {
    test('logs token verification attempts', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'fake-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockResolvedValue({
        data: { success: true, data: { id: '1', role: 'admin' } },
      });

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith('🔍 Verifying token with backend API...');
        expect(consoleLogSpy).toHaveBeenCalledWith('✅ Token verification successful');
      });

      consoleLogSpy.mockRestore();
    });

    test('logs token verification failures', async () => {
      localStorage.getItem = jest.fn().mockImplementation((key: string) => {
        if (key === 'crawdwall_auth_token') return 'invalid-token';
        if (key === 'user_role') return 'admin';
        return null;
      });

      (authAPI.getCurrentUser as jest.Mock).mockRejectedValue(new Error('Invalid token'));

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      render(
        <AuthGuard>
          <TestComponent />
        </AuthGuard>
      );

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Token verification failed:', expect.any(Error));
      });

      consoleErrorSpy.mockRestore();
    });
  });
});