
import React, { useEffect } from 'react';
import { logger } from '@/utils/logger';
import { UniversalLeadForm } from '@/components/forms/UniversalLeadForm';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const LeadFormPage: React.FC = () => {
  useEffect(() => {
    logger.info('LeadForm page mounted');
    return () => {
      logger.debug('LeadForm page unmounting');
    };
  }, []);

  return (
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your Agricultural Operations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us about your organisation and farmer network. KisanShakti AI is sold to organisations, not directly to farmers.
          </p>
        </div>
        
        <UniversalLeadForm 
          trigger="embed" 
          enableSharing={true}
        />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            We use these details only to reply to you. No spam, ever.
          </p>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};

export default LeadFormPage;
