// Centralized lazy loading utilities and configuration

export interface LazyLoadingConfig {
  // Threshold in KB for components to be considered "heavy"
  sizeThreshold: number;
  // Whether to preload components on hover
  preloadOnHover: boolean;
  // Delay before showing loading state (ms)
  loadingDelay: number;
}

// Default configuration
export const DEFAULT_LAZY_CONFIG: LazyLoadingConfig = {
  sizeThreshold: 50, // 50KB threshold
  preloadOnHover: true,
  loadingDelay: 200
};

// Components that should be lazy loaded by route
export const LAZY_ROUTES = {
  // Dashboard routes
  '/investor/dashboard': () => import('@/app/investor/dashboard/page'),
  '/admin/dashboard': () => import('@/app/admin/dashboard/page'),
  '/officer/dashboard': () => import('@/app/officer/dashboard/page'),
  '/organizer/dashboard': () => import('@/app/organizer/dashboard/page'),
  
  // Profile routes
  '/investor/profile': () => import('@/app/investor/profile/page'),
  '/admin/profile': () => import('@/app/admin/profile/page'),
  '/officer/profile': () => import('@/app/officer/profile/page'),
  '/organizer/profile': () => import('@/app/organizer/profile/page'),
  
  // Other heavy routes
  '/investor/opportunities': () => import('@/app/investor/opportunities/page'),
  '/investor/portfolio': () => import('@/app/investor/portfolio/page'),
  '/admin/proposals': () => import('@/app/admin/proposals/page'),
  '/officer/proposals': () => import('@/app/officer/proposals/page'),
  '/organizer/proposals': () => import('@/app/organizer/proposals/page'),
};

// Heavy components that benefit from lazy loading
export const HEAVY_COMPONENTS = [
  'FileUpload',
  'HeroSection',
  'ServicesCard',
  'WhyCrawdwallFeaturesSection',
  'AdminNavbar',
  'InvestorNavbar',
  'OfficerNavbar',
  'OrganizerNavbar'
];

// Utility function to determine if component should be lazy loaded
export const shouldLazyLoad = (componentName: string, fileSizeKB: number): boolean => {
  return HEAVY_COMPONENTS.includes(componentName) || fileSizeKB > DEFAULT_LAZY_CONFIG.sizeThreshold;
};

// Preload component utility
export const preloadComponent = (importPromise: () => Promise<any>): void => {
  importPromise();
};

// Loading state management
export class LoadingManager {
  private static loadingStates = new Map<string, boolean>();
  
  static setLoading(key: string, isLoading: boolean): void {
    this.loadingStates.set(key, isLoading);
  }
  
  static isLoading(key: string): boolean {
    return this.loadingStates.get(key) || false;
  }
  
  static clearLoading(key: string): void {
    this.loadingStates.delete(key);
  }
}