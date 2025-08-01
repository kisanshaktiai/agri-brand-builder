
import React from 'react';
import UniversalFormEngine from './forms/UniversalFormEngine';
import { LEAD_FORM_SCHEMA } from '@/config/leadFormSchema';

interface EnhancedLeadPopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const EnhancedLeadPopupForm: React.FC<EnhancedLeadPopupFormProps> = ({
  isOpen,
  onClose,
  source = 'website'
}) => {
  const handleSubmitSuccess = (leadId: string) => {
    console.log('Lead submitted successfully:', leadId);
    // Additional success handling can be added here
  };

  const handleSubmitError = (error: string) => {
    console.error('Lead submission failed:', error);
    // Additional error handling can be added here
  };

  return (
    <UniversalFormEngine
      config={LEAD_FORM_SCHEMA}
      isOpen={isOpen}
      onClose={onClose}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitError={handleSubmitError}
      source={source}
    />
  );
};

export default EnhancedLeadPopupForm;
