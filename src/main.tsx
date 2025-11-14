import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { logger } from './utils/logger'
import { runStartupChecks } from './utils/startupChecks'

// Global error handlers
window.addEventListener('error', (event) => {
  logger.error('Global error caught', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.toString(),
  });
});

window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled promise rejection', {
    reason: event.reason?.toString(),
  });
});

// Initialize app with comprehensive logging
(async () => {
  try {
    logger.info('🚀 Initializing KisanShakti AI app...');
    logger.info(`Environment: ${import.meta.env.MODE}`);
    logger.info(`Base URL: ${import.meta.env.BASE_URL}`);
    
    // Check if root element exists
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      logger.error('CRITICAL: Root element not found in DOM');
      document.body.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; background: #f5f5f5;">
          <div style="max-width: 500px; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #dc2626; margin-bottom: 10px;">Initialization Error</h1>
            <p style="color: #666; margin-bottom: 20px;">The application root element could not be found. Please check the HTML structure.</p>
            <button onclick="window.location.reload()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Reload Page</button>
          </div>
        </div>
      `;
      return;
    }

    logger.info('✅ Root element found');

    // Run startup checks
    logger.info('Running startup checks...');
    const checkResults = await runStartupChecks();
    
    if (!checkResults.passed) {
      logger.error('Startup checks failed', checkResults);
    }

    // Attempt to render React app
    logger.info('Attempting to render React app...');
    const root = createRoot(rootElement);
    root.render(<App />);
    logger.info('✅ React app rendered successfully');

  } catch (error) {
    logger.error('CRITICAL: Failed to initialize app', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Fallback error UI
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; background: #f5f5f5;">
          <div style="max-width: 500px; padding: 30px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #dc2626; margin-bottom: 10px;">Application Error</h1>
            <p style="color: #666; margin-bottom: 10px;">Failed to start the application. Please try the following:</p>
            <ul style="color: #666; margin-bottom: 20px; padding-left: 20px;">
              <li>Clear your browser cache</li>
              <li>Reload the page</li>
              <li>Try a different browser</li>
            </ul>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto; font-size: 12px; margin-bottom: 20px;">${error instanceof Error ? error.message : String(error)}</pre>
            <button onclick="window.location.reload()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Reload Page</button>
          </div>
        </div>
      `;
    }
  }
})();
