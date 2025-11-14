import { logger } from './logger';

export interface StartupCheckResult {
  passed: boolean;
  checks: {
    domReady: boolean;
    reactLoaded: boolean;
    routerAvailable: boolean;
    supabaseClientAvailable: boolean;
  };
  errors: string[];
}

export async function runStartupChecks(): Promise<StartupCheckResult> {
  const errors: string[] = [];
  const checks = {
    domReady: false,
    reactLoaded: false,
    routerAvailable: false,
    supabaseClientAvailable: false,
  };

  // Check 1: DOM Ready
  try {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      checks.domReady = true;
      logger.info('DOM ready - root element found');
    } else {
      errors.push('Root element not found in DOM');
      logger.error('DOM check failed - root element not found');
    }
  } catch (e) {
    errors.push(`DOM check error: ${e}`);
    logger.error('DOM check failed', e);
  }

  // Check 2: React Loaded
  try {
    const reactModule = await import('react');
    if (reactModule.default || reactModule.Component) {
      checks.reactLoaded = true;
      logger.info('React loaded successfully');
    } else {
      errors.push('React module not properly loaded');
      logger.error('React check failed');
    }
  } catch (e) {
    errors.push(`React check error: ${e}`);
    logger.error('React check failed', e);
  }

  // Check 3: Router Available
  try {
    const routerCheck = await import('react-router-dom');
    if (routerCheck.BrowserRouter) {
      checks.routerAvailable = true;
      logger.info('React Router available');
    } else {
      errors.push('React Router BrowserRouter not found');
      logger.error('Router check failed');
    }
  } catch (e) {
    errors.push(`Router check error: ${e}`);
    logger.error('Router check failed', e);
  }

  // Check 4: Supabase Client Available
  try {
    const supabaseModule = await import('@/integrations/supabase/client');
    if (supabaseModule.supabase) {
      checks.supabaseClientAvailable = true;
      logger.info('Supabase client available');
    } else {
      errors.push('Supabase client not initialized');
      logger.error('Supabase check failed');
    }
  } catch (e) {
    errors.push(`Supabase check error: ${e}`);
    logger.error('Supabase check failed', e);
  }

  const passed = Object.values(checks).every(check => check === true);
  
  if (passed) {
    logger.info('✅ All startup checks passed');
  } else {
    logger.error('❌ Some startup checks failed', { checks, errors });
  }

  return { passed, checks, errors };
}
