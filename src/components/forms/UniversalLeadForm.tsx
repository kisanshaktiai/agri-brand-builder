
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import StepByStepLeadForm from './StepByStepLeadForm';

interface UniversalLeadFormProps {
  trigger?: 'button' | 'popup' | 'embed';
  buttonText?: string;
  autoOpen?: boolean;
  onSuccess?: () => void;
}

export const UniversalLeadForm: React.FC<UniversalLeadFormProps> = ({
  trigger = 'button',
  buttonText = 'Get Started',
  autoOpen = false,
  onSuccess
}) => {
  const [isOpen, setIsOpen] = useState(autoOpen);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.();
  };

  if (trigger === 'embed') {
    return (
      <div className="w-full">
        <StepByStepLeadForm onSuccess={onSuccess} />
      </div>
    );
  }

  if (trigger === 'popup') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Lead Form</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <StepByStepLeadForm onSuccess={handleSuccess} onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Lead Form</DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <StepByStepLeadForm onSuccess={handleSuccess} onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UniversalLeadForm;
