import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { leadsService, type LeadData } from '@/services/LeadsService';

interface LeadPopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const LeadPopupForm: React.FC<LeadPopupFormProps> = ({ isOpen, onClose, source = 'website' }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customOrgType, setCustomOrgType] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState<LeadData>({
    organization_name: '',
    organization_type: 'agri_company',
    contact_name: '',
    email: '',
    phone: '',
    company_size: undefined,
    expected_farmers: undefined,
    budget_range: undefined,
    timeline: undefined,
    requirements: '',
    current_solution: '',
    how_did_you_hear: ''
  });

  const organizationTypes = [
    { value: 'agri_company', label: 'Agricultural Company' },
    { value: 'ngo', label: 'NGO' },
    { value: 'university', label: 'University/Research' },
    { value: 'government', label: 'Government Agency' },
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'other', label: 'Other' },
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  const budgetRanges = [
    { value: 'under_25k', label: 'Under ₹25,000' },
    { value: '25k_50k', label: '₹25,000 - ₹50,000' },
    { value: '50k_100k', label: '₹50,000 - ₹1,00,000' },
    { value: '100k_plus', label: '₹1,00,000+' },
  ];

  const timelines = [
    { value: 'immediate', label: 'Immediate (within 1 month)' },
    { value: '1_month', label: '1-2 months' },
    { value: '3_months', label: '3-6 months' },
    { value: '6_months', label: '6+ months' },
    { value: 'flexible', label: 'Flexible timeline' },
  ];

  const steps = [
    { title: 'Organization', fields: ['organization_name', 'organization_type', 'company_size'] },
    { title: 'Contact Info', fields: ['contact_name', 'email', 'phone'] },
    { title: 'Requirements', fields: ['expected_farmers', 'budget_range', 'timeline'] },
    { title: 'Additional Info', fields: ['current_solution', 'requirements', 'how_did_you_hear'] },
  ];

  const handleInputChange = (field: keyof LeadData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  const handleOrgTypeChange = (value: string) => {
    handleInputChange('organization_type', value as LeadData['organization_type']);
    if (value !== 'other') {
      setCustomOrgType('');
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    if (stepNumber === 1) {
      if (!formData.organization_name.trim()) {
        setError('Organization name is required');
        return false;
      }
      if (formData.organization_type === 'other' && !customOrgType.trim()) {
        setError('Please specify your organization type');
        return false;
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.contact_name.trim()) {
        setError('Contact name is required');
        return false;
      }
      if (!formData.email.trim()) {
        setError('Email is required');
        return false;
      }
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    console.log('Form submission started...');
    setError(null);
    setIsSubmitting(true);

    const submitData: LeadData = {
      ...formData,
      organization_type: formData.organization_type === 'other' 
        ? (customOrgType || 'other') as LeadData['organization_type']
        : formData.organization_type
    };

    console.log('Submitting data:', submitData);

    try {
      const result = await leadsService.submitInquiry(submitData);
      console.log('Submission result:', result);

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your request has been submitted. We'll contact you soon.",
        });

        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        console.error('Submission failed:', result.error);
        setError(result.error || 'Failed to submit your request. Please try again.');
        toast({
          title: "Error",
          description: result.error || "Failed to submit your request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(1);
    setIsSuccess(false);
    setError(null);
    setCustomOrgType('');
    setFormData({
      organization_name: '',
      organization_type: 'agri_company',
      contact_name: '',
      email: '',
      phone: '',
      company_size: undefined,
      expected_farmers: undefined,
      budget_range: undefined,
      timeline: undefined,
      requirements: '',
      current_solution: '',
      how_did_you_hear: ''
    });
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
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
            <Button 
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setFormData({
                  organization_name: '',
                  organization_type: 'agri_company',
                  contact_name: '',
                  email: '',
                  phone: '',
                  company_size: undefined,
                  expected_farmers: undefined,
                  budget_range: undefined,
                  timeline: undefined,
                  requirements: '',
                  current_solution: '',
                  how_did_you_hear: ''
                });
                setCustomOrgType('');
              }} 
              variant="outline"
              className="w-full"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Request Demo - {steps[currentStep - 1].title}
          </DialogTitle>
          <div className="flex items-center space-x-2 mt-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded ${
                  index + 1 <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organization_name">Organization Name *</Label>
                <Input
                  id="organization_name"
                  value={formData.organization_name}
                  onChange={(e) => handleInputChange('organization_name', e.target.value)}
                  placeholder="Enter your organization name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization_type">Organization Type *</Label>
                <Select 
                  value={formData.organization_type} 
                  onValueChange={handleOrgTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.organization_type === 'other' && (
                  <Input
                    value={customOrgType}
                    onChange={(e) => setCustomOrgType(e.target.value)}
                    placeholder="Please specify your organization type"
                    required
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_size">Company Size</Label>
                <Select 
                  value={formData.company_size || ''} 
                  onValueChange={(value) => handleInputChange('company_size', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_name">Contact Name *</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => handleInputChange('contact_name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your phone number"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expected_farmers">Expected Number of Farmers</Label>
                <Input
                  id="expected_farmers"
                  type="number"
                  value={formData.expected_farmers || ''}
                  onChange={(e) => handleInputChange('expected_farmers', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget_range">Budget Range (Annual)</Label>
                <Select 
                  value={formData.budget_range || ''} 
                  onValueChange={(value) => handleInputChange('budget_range', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Implementation Timeline</Label>
                <Select 
                  value={formData.timeline || ''} 
                  onValueChange={(value) => handleInputChange('timeline', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_solution">Current Solution (if any)</Label>
                <Textarea
                  id="current_solution"
                  value={formData.current_solution}
                  onChange={(e) => handleInputChange('current_solution', e.target.value)}
                  placeholder="What tools or systems are you currently using?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Specific Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="Tell us about your specific needs, challenges, or features you're looking for..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="how_did_you_hear">How did you hear about us?</Label>
                <Input
                  id="how_did_you_hear"
                  value={formData.how_did_you_hear}
                  onChange={(e) => handleInputChange('how_did_you_hear', e.target.value)}
                  placeholder="e.g., Google search, referral, etc."
                />
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between pt-6">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center space-x-2"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
            ) : (
              <div />
            )}

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                disabled={isSubmitting}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              >
                {isSubmitting ? (
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadPopupForm;
