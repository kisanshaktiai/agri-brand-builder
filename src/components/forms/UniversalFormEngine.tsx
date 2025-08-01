
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import type { FormConfiguration, FormSubmissionData } from '@/types/UniversalForm';
import { AdvancedLeadsService } from '@/services/AdvancedLeadsService';
import { FormFieldRenderer } from './FormFieldRenderer';
import { FormProgress } from './FormProgress';

interface UniversalFormEngineProps {
  config: FormConfiguration;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmitSuccess?: (leadId: string) => void;
  onSubmitError?: (error: string) => void;
  className?: string;
  source?: string;
}

interface FormState {
  data: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  currentStep: number;
  isDraft: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  analyticsData: {
    startTime: number;
    fieldInteractions: Record<string, number>;
    stepTimes: Record<string, number>;
    abandonmentPoints: string[];
  };
}

export const UniversalFormEngine: React.FC<UniversalFormEngineProps> = ({
  config,
  isOpen = true,
  onClose,
  onSubmitSuccess,
  onSubmitError,
  className = '',
  source = 'website'
}) => {
  const { toast } = useToast();
  const [leadsService] = useState(() => new AdvancedLeadsService(config));
  
  const [formState, setFormState] = useState<FormState>({
    data: {},
    errors: {},
    touched: {},
    currentStep: 0,
    isDraft: false,
    isSubmitting: false,
    isSuccess: false,
    analyticsData: {
      startTime: Date.now(),
      fieldInteractions: {},
      stepTimes: { '0': Date.now() },
      abandonmentPoints: []
    }
  });

  const { schema } = config;
  const isMultiStep = schema.layout === 'multi-step';
  const steps = schema.steps || [{ id: 'single', title: 'Form', fields: schema.fields.map(f => f.id) }];
  const currentStepConfig = steps[formState.currentStep];
  const progress = isMultiStep ? ((formState.currentStep + 1) / steps.length) * 100 : 100;

  // Load draft data on mount
  useEffect(() => {
    if (config.schema.behavior?.allowDraft) {
      loadDraftData();
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (config.schema.behavior?.autoSave && formState.isDraft) {
      const timer = setTimeout(() => {
        saveDraftData();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formState.data]);

  // Track field interactions
  const trackFieldInteraction = useCallback((fieldId: string) => {
    if (!config.features.enableAnalytics) return;
    
    setFormState(prev => ({
      ...prev,
      analyticsData: {
        ...prev.analyticsData,
        fieldInteractions: {
          ...prev.analyticsData.fieldInteractions,
          [fieldId]: (prev.analyticsData.fieldInteractions[fieldId] || 0) + 1
        }
      }
    }));
  }, [config.features.enableAnalytics]);

  const loadDraftData = () => {
    try {
      const saved = localStorage.getItem(`form_draft_${schema.id}`);
      if (saved) {
        const draft = JSON.parse(saved);
        setFormState(prev => ({
          ...prev,
          data: draft.data || {},
          currentStep: draft.currentStep || 0,
          isDraft: true
        }));
      }
    } catch (error) {
      console.warn('Failed to load draft:', error);
    }
  };

  const saveDraftData = () => {
    try {
      const draft = {
        data: formState.data,
        currentStep: formState.currentStep,
        timestamp: Date.now()
      };
      localStorage.setItem(`form_draft_${schema.id}`, JSON.stringify(draft));
    } catch (error) {
      console.warn('Failed to save draft:', error);
    }
  };

  const clearDraftData = () => {
    try {
      localStorage.removeItem(`form_draft_${schema.id}`);
    } catch (error) {
      console.warn('Failed to clear draft:', error);
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentFields = currentStepConfig.fields;
    const stepFields = schema.fields.filter(field => currentFields.includes(field.id));
    const errors: Record<string, string[]> = {};

    for (const field of stepFields) {
      const value = formState.data[field.id];
      const fieldErrors: string[] = [];

      // Check required fields
      if (field.required && (!value || value === '')) {
        fieldErrors.push(`${field.label} is required`);
      }

      // Check field-specific validation
      if (field.validation && value) {
        for (const rule of field.validation) {
          switch (rule.type) {
            case 'email':
              if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
                fieldErrors.push(rule.message);
              }
              break;
            case 'min':
              if (typeof value === 'string' && value.length < (rule.value as number)) {
                fieldErrors.push(rule.message);
              }
              break;
            case 'pattern':
              if (!new RegExp(rule.value as string).test(value)) {
                fieldErrors.push(rule.message);
              }
              break;
          }
        }
      }

      if (fieldErrors.length > 0) {
        errors[field.id] = fieldErrors;
      }
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [fieldId]: value },
      touched: { ...prev.touched, [fieldId]: true },
      isDraft: true,
      errors: { ...prev.errors, [fieldId]: [] } // Clear field errors on change
    }));
    
    trackFieldInteraction(fieldId);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStep = formState.currentStep + 1;
      setFormState(prev => ({
        ...prev,
        currentStep: nextStep,
        analyticsData: {
          ...prev.analyticsData,
          stepTimes: { ...prev.analyticsData.stepTimes, [nextStep.toString()]: Date.now() }
        }
      }));
    }
  };

  const handlePrevious = () => {
    setFormState(prev => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
      errors: {} // Clear errors when going back
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const submissionData: FormSubmissionData = {
        formId: schema.id,
        formVersion: schema.version,
        data: formState.data,
        metadata: {
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          sessionId: crypto.randomUUID(),
          completionTime: Date.now() - formState.analyticsData.startTime,
          source
        },
        analytics: config.features.enableAnalytics ? {
          fieldInteractions: formState.analyticsData.fieldInteractions,
          abandonmentPoints: formState.analyticsData.abandonmentPoints,
          stepTimes: formState.analyticsData.stepTimes
        } : undefined
      };

      const result = await leadsService.submitLead(submissionData);

      if (result.success) {
        setFormState(prev => ({ ...prev, isSuccess: true }));
        clearDraftData();
        
        toast({
          title: "Success!",
          description: config.localization?.translations[config.localization.defaultLanguage]['form.success'] || 
                      "Your request has been submitted successfully.",
        });
        
        onSubmitSuccess?.(result.leadId!);
        
        // Auto-close after success
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Submission failed';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      onSubmitError?.(errorMessage);
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleClose = () => {
    if (formState.isDraft && config.schema.behavior?.allowDraft) {
      saveDraftData();
    }
    
    setFormState(prev => ({
      data: {},
      errors: {},
      touched: {},
      currentStep: 0,
      isDraft: false,
      isSubmitting: false,
      isSuccess: false,
      analyticsData: {
        startTime: Date.now(),
        fieldInteractions: {},
        stepTimes: { '0': Date.now() },
        abandonmentPoints: []
      }
    }));
    
    onClose?.();
  };

  if (formState.isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Form Submission Successful</DialogTitle>
            <DialogDescription className="sr-only">
              Your form has been submitted successfully and we will contact you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-600">
                Thank you for your inquiry!
              </h3>
              <p className="text-gray-600">
                We've received your information and our team will contact you within 24 hours.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 w-full">
              <h4 className="font-medium mb-2 text-green-800">What happens next?</h4>
              <ul className="text-sm space-y-1 text-green-700 text-left">
                <li>• A member of our team will reach out to you shortly</li>
                <li>• We'll schedule a demo tailored to your needs</li>
                <li>• You'll get a personalized proposal and pricing</li>
                <li>• We'll help you get started with a free trial</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress indicator */}
      {isMultiStep && config.schema.behavior?.showProgress && (
        <FormProgress 
          currentStep={formState.currentStep} 
          totalSteps={steps.length}
          steps={steps}
          progress={progress}
        />
      )}

      {/* Current step fields */}
      <div className="space-y-4">
        {currentStepConfig.fields.map(fieldId => {
          const field = schema.fields.find(f => f.id === fieldId);
          if (!field) return null;

          return (
            <FormFieldRenderer
              key={field.id}
              field={field}
              value={formState.data[field.id]}
              error={formState.errors[field.id]?.[0]}
              onChange={(value) => handleFieldChange(field.id, value)}
              onFocus={() => trackFieldInteraction(field.id)}
              config={config}
            />
          );
        })}
      </div>

      {/* Form errors */}
      {Object.keys(formState.errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix the errors above before continuing.
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        {isMultiStep && formState.currentStep > 0 ? (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center space-x-2"
            disabled={formState.isSubmitting}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
        ) : (
          <div />
        )}

        {isMultiStep && formState.currentStep < steps.length - 1 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
            disabled={formState.isSubmitting}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
          >
            {formState.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Request</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>

      {/* Draft save indicator */}
      {formState.isDraft && config.schema.behavior?.allowDraft && (
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Save className="w-4 h-4 mr-1" />
          Draft saved automatically
        </div>
      )}
    </form>
  );

  if (schema.displayMode === 'popup') {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {schema.title} - {currentStepConfig.title}
            </DialogTitle>
            <DialogDescription>
              {currentStepConfig.description || "Please fill out the form below to submit your request."}
            </DialogDescription>
          </DialogHeader>
          {renderFormContent()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className={`form-container ${className}`}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{schema.title}</h2>
          {schema.description && (
            <p className="text-gray-600">{schema.description}</p>
          )}
        </div>
        {renderFormContent()}
      </div>
    </div>
  );
};

export default UniversalFormEngine;
