
import React from 'react';
import UnifiedLeadForm from '@/components/forms/UnifiedLeadForm';

const LeadFormPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <UnifiedLeadForm showTitle={true} />
        
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
