
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DebugPanel } from "@/components/DebugPanel";
import { logger } from "@/utils/logger";
import Index from "./pages/Index";
import LeadForm from "./pages/LeadForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Route tracker component
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logger.info(`Route changed: ${location.pathname}${location.search}`);
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    logger.info('App component mounted');
    logger.info('QueryClient initialized');
    
    return () => {
      logger.info('App component unmounting');
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteTracker />
            <DebugPanel />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lead-form" element={<LeadForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
