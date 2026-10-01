import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { AppProviders } from './App.tsx'
import './index.css'
import './styles/tokens.css'
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

(async () => {
  try {
    logger.info('🚀 Initializing KisanShakti AI app...');
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      logger.error('CRITICAL: Root element not found in DOM');
      return;
    }

    const checkResults = await runStartupChecks();
    if (!checkResults.passed) {
      logger.error('Startup checks failed', checkResults);
    }

    const tree = (
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    );

    // Prerendered routes carry server markup; hydrate it. Anything else (an
    // unknown route served by the SPA fallback) renders from scratch.
    if (rootElement.hasChildNodes() && rootElement.dataset.prerendered === 'true') {
      hydrateRoot(rootElement, tree);
    } else {
      createRoot(rootElement).render(tree);
    }
    logger.info('✅ React app rendered successfully');
  } catch (error) {
    logger.error('CRITICAL: Failed to initialize app', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
})();
