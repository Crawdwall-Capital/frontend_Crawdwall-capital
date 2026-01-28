// jest.setup.js

// --------------------
// Jest DOM matchers
// --------------------
import '@testing-library/jest-dom';

// --------------------
// Mock environment variables
// --------------------
process.env.NEXT_PUBLIC_API_URL = 'https://crawdwall-backend-ywlk.onrender.com';

// --------------------
// Mock localStorage
// --------------------
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};



// --------------------
// Mock ResizeObserver
// --------------------
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// --------------------
// Mock IntersectionObserver
// --------------------
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// --------------------
// Mock matchMedia
// --------------------
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// --------------------
// Mock React lazy and Suspense for testing
// --------------------

// Mock React.lazy to resolve immediately in tests
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    lazy: (factory) => {
      const Component = factory();
      return Component.default || Component;
    }
  };
});

// Mock Suspense to render children directly in tests
global.React = {
  ...global.React,
  Suspense: ({ children }) => children,
};

// Alternative: Add Suspense directly to global scope
global.Suspense = ({ children }) => children;
