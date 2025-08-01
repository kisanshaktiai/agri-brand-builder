
import React from 'react';
import { UniversalLeadForm } from '@/components/forms/UniversalLeadForm';

const LeadFormPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your Agricultural Operations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of organizations already using KisanShakti AI to revolutionize farming and boost productivity.
          </p>
        </div>
        
        <UniversalLeadForm trigger="embed" />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Trusted by 500+ organizations • 100% secure • No spam, ever
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadFormPage;
