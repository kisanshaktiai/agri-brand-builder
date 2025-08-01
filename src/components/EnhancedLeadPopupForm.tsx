
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UnifiedLeadForm from './forms/UnifiedLeadForm';

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
  const handleSubmitSuccess = () => {
    console.log('Lead submitted successfully');
    // Additional success handling can be added here
    setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Lead Form</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <UnifiedLeadForm 
            onSuccess={handleSubmitSuccess}
            onClose={onClose}
            source={source}
            showTitle={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedLeadPopupForm;
