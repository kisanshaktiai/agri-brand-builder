import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Building2, Users, DollarSign, Calendar, MessageSquare, Eye, Globe, Building, UserCheck, Briefcase, Factory, Sparkles } from 'lucide-react';
import { SelectionButtonGroup } from './SelectionButtonGroup';
import { useToast } from '@/hooks/use-toast';
import { LeadsService } from '@/services/LeadsService';

interface FormData {
  organization_name: string;
  organization_type: string;
  company_size: string;
  contact_name: string;
  email: string;
  phone: string;
  expected_farmers: string;
  budget_range: string;
  timeline: string;
  requirements: string;
  current_solution: string;
  how_did_you_hear: string;
}

interface StepByStepLeadFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const TOTAL_STEPS = 6;

const organizationTypeOptions = [
  { value: 'agri_company', label: 'Agriculture Company', description: 'Commercial farming or agribusiness', icon: <Building2 className="w-5 h-5" /> },
  { value: 'ngo', label: 'NGO/Non-Profit', description: 'Agricultural development organization', icon: <Users className="w-5 h-5" /> },
  { value: 'university', label: 'University/Research', description: 'Academic or research institution', icon: <Eye className="w-5 h-5" /> },
  { value: 'government', label: 'Government', description: 'Government department or agency', icon: <Building className="w-5 h-5" /> },
  { value: 'cooperative', label: 'Cooperative', description: 'Farmer cooperative or collective', icon: <Users className="w-5 h-5" /> },
  { value: 'other', label: 'Other', description: 'Other type of organization', icon: <Building2 className="w-5 h-5" /> }
];

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees', description: 'Small team or startup', icon: <UserCheck className="w-6 h-6" /> },
  { value: '11-50', label: '11-50 employees', description: 'Growing business', icon: <Users className="w-6 h-6" /> },
  { value: '51-200', label: '51-200 employees', description: 'Medium-sized company', icon: <Briefcase className="w-6 h-6" /> },
  { value: '201-500', label: '201-500 employees', description: 'Large organization', icon: <Building className="w-6 h-6" /> },
  { value: '500+', label: '500+ employees', description: 'Enterprise level', icon: <Factory className="w-6 h-6" /> }
];

const budgetRangeOptions = [
  { value: 'under-50k', label: 'Under ₹50,000', description: 'Basic package', icon: <DollarSign className="w-4 h-4" /> },
  { value: '50k-2l', label: '₹50K - ₹2L', description: 'Standard solution', icon: <DollarSign className="w-4 h-4" /> },
  { value: '2l-5l', label: '₹2L - ₹5L', description: 'Professional tier', icon: <DollarSign className="w-4 h-4" /> },
  { value: '5l-10l', label: '₹5L - ₹10L', description: 'Enterprise solution', icon: <DollarSign className="w-4 h-4" /> },
  { value: '10l+', label: '₹10L+', description: 'Custom enterprise', icon: <DollarSign className="w-4 h-4" /> }
];

const timelineOptions = [
  { value: 'immediate', label: 'Immediately', description: 'Ready to start now', icon: <Calendar className="w-4 h-4" /> },
  { value: '1-3months', label: '1-3 months', description: 'Planning phase', icon: <Calendar className="w-4 h-4" /> },
  { value: '3-6months', label: '3-6 months', description: 'Evaluation period', icon: <Calendar className="w-4 h-4" /> },
  { value: '6-12months', label: '6-12 months', description: 'Long-term planning', icon: <Calendar className="w-4 h-4" /> },
  { value: 'exploring', label: 'Just exploring', description: 'Research phase', icon: <Eye className="w-4 h-4" /> }
];

const howDidYouHearOptions = [
  { value: 'youtube', label: 'YouTube', description: 'Found us on YouTube', icon: <MessageSquare className="w-4 h-4" /> },
  { value: 'facebook', label: 'Facebook', description: 'Social media discovery', icon: <MessageSquare className="w-4 h-4" /> },
  { value: 'google', label: 'Google Search', description: 'Search engine results', icon: <Globe className="w-4 h-4" /> },
  { value: 'linkedin', label: 'LinkedIn', description: 'Professional network', icon: <Users className="w-4 h-4" /> },
  { value: 'referral', label: 'Referral', description: 'Word of mouth', icon: <Users className="w-4 h-4" /> },
  { value: 'website', label: 'Website', description: 'Direct website visit', icon: <Globe className="w-4 h-4" /> },
  { value: 'other', label: 'Other', description: 'Other source', icon: <MessageSquare className="w-4 h-4" /> }
];

export const StepByStepLeadForm: React.FC<StepByStepLeadFormProps> = ({ onSuccess, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [detectedSource, setDetectedSource] = useState<string>('');
  const [sourceDetails, setSourceDetails] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const leadsService = new LeadsService();

  const [formData, setFormData] = useState<FormData>({
    organization_name: '',
    organization_type: '',
    company_size: '',
    contact_name: '',
    email: '',
    phone: '',
    expected_farmers: '',
    budget_range: '',
    timeline: '',
    requirements: '',
    current_solution: '',
    how_did_you_hear: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Enhanced source detection
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    let source = 'website';
    let sourceLabel = 'Direct Website Visit';
    const details: Record<string, string> = {};

    if (utmSource) {
      source = utmSource;
      sourceLabel = `${utmSource.charAt(0).toUpperCase() + utmSource.slice(1)}`;
      
      if (utmMedium) details.medium = utmMedium;
      if (utmCampaign) details.campaign = utmCampaign;
    } else if (referrer) {
      if (referrer.includes('youtube.com')) {
        source = 'youtube';
        sourceLabel = 'YouTube';
      } else if (referrer.includes('facebook.com')) {
        source = 'facebook';
        sourceLabel = 'Facebook';
      } else if (referrer.includes('google.com')) {
        source = 'google';
        sourceLabel = 'Google Search';
      } else if (referrer.includes('linkedin.com')) {
        source = 'linkedin';
        sourceLabel = 'LinkedIn';
      } else if (referrer.includes('twitter.com') || referrer.includes('x.com')) {
        source = 'other';
        sourceLabel = 'Twitter/X';
      } else if (referrer && !referrer.includes(window.location.hostname)) {
        source = 'referral';
        sourceLabel = 'External Referral';
        details.referrer = new URL(referrer).hostname;
      }
    }

    setDetectedSource(sourceLabel);
    setSourceDetails(details);
    setFormData(prev => ({ ...prev, how_did_you_hear: source }));

    // Load from localStorage if available
    const saved = localStorage.getItem('kisanshakti_lead_form');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsedData, how_did_you_hear: source }));
      } catch (error) {
        console.warn('Failed to load saved form data');
      }
    }
  }, []);

  useEffect(() => {
    // Auto-save to localStorage
    localStorage.setItem('kisanshakti_lead_form', JSON.stringify(formData));
  }, [formData]);

  const validateCurrentStep = (): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (currentStep) {
      case 1:
        if (!formData.organization_type) newErrors.organization_type = 'Please select organization type';
        break;
      case 2:
        if (!formData.company_size) newErrors.company_size = 'Please select company size';
        break;
      case 3:
        if (!formData.organization_name.trim()) newErrors.organization_name = 'Organization name is required';
        if (!formData.contact_name.trim()) newErrors.contact_name = 'Contact name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      case 4:
        if (!formData.budget_range) newErrors.budget_range = 'Please select budget range';
        if (!formData.timeline) newErrors.timeline = 'Please select timeline';
        break;
      case 5:
        if (!formData.how_did_you_hear) newErrors.how_did_you_hear = 'Please select how you heard about us';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      console.log('Starting form submission...');
      
      const leadData = {
        organization_name: formData.organization_name,
        organization_type: formData.organization_type as any,
        contact_name: formData.contact_name,
        email: formData.email,
        phone: formData.phone,
        company_size: formData.company_size,
        expected_farmers: formData.expected_farmers ? parseInt(formData.expected_farmers) : undefined,
        budget_range: formData.budget_range,
        timeline: formData.timeline,
        requirements: formData.requirements,
        current_solution: formData.current_solution,
        how_did_you_hear: formData.how_did_you_hear
      };

      console.log('Submitting lead data:', leadData);

      const result = await leadsService.submitInquiry(leadData);

      if (result.success) {
        console.log('Lead submission successful:', result.lead);
        setIsSuccess(true);
        localStorage.removeItem('kisanshakti_lead_form');
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully. We'll contact you soon!",
        });
        setTimeout(() => {
          onSuccess?.();
        }, 3000);
      } else {
        console.error('Lead submission failed:', result.error);
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Permission denied')) {
          errorMessage = 'There was a permission issue. Please refresh the page and try again.';
        } else if (error.message.includes('Network error')) {
          errorMessage = 'Network connection issue. Please check your internet and try again.';
        } else if (error.message.includes('Invalid data format')) {
          errorMessage = 'Please check your form entries and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-4 sm:p-8 text-center">
          <div className="animate-fade-in">
            {/* Animated Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in shadow-lg">
              <span className="text-2xl font-bold text-white animate-pulse">K</span>
            </div>
            
            {/* Animated Welcome Message */}
            <div className="mb-6 animate-slide-up">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Great! Welcome aboard!
                </h2>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <p className="text-lg text-gray-600 mb-4 animate-fade-in" style={{animationDelay: '0.5s'}}>
                Thank you for choosing KisanShakti AI
              </p>
            </div>
            
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <p className="text-gray-600 mb-6 text-sm sm:text-base animate-fade-in" style={{animationDelay: '1s'}}>
              We've received your information and our team will contact you within 24 hours.
            </p>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 mb-6 animate-slide-up" style={{animationDelay: '1.5s'}}>
              <h3 className="font-semibold text-green-800 mb-3 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                What happens next?
              </h3>
              <ul className="text-sm text-green-700 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  A member of our team will reach out to you shortly
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  We'll schedule a demo tailored to your needs
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  You'll get a personalized proposal and pricing
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  We'll help you get started with a free trial
                </li>
              </ul>
            </div>
            
            {onClose && (
              <Button onClick={onClose} variant="outline" className="w-full sm:w-auto animate-fade-in" style={{animationDelay: '2s'}}>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg sm:text-xl">Get Started with KisanShakti AI</CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
        
        {detectedSource && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              📍 Source: <strong>{detectedSource}</strong>
              {Object.keys(sourceDetails).length > 0 && (
                <span className="block text-xs mt-1 opacity-75">
                  {Object.entries(sourceDetails).map(([key, value]) => 
                    `${key}: ${value}`
                  ).join(' • ')}
                </span>
              )}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Step {currentStep} of {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-4 sm:px-6">
        {/* Step 1: Organization Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What type of organization are you?</h3>
              <p className="text-gray-600 text-sm mb-4">This helps us understand your specific needs</p>
            </div>
            
            <SelectionButtonGroup
              options={organizationTypeOptions}
              value={formData.organization_type}
              onChange={(value) => updateFormData('organization_type', value)}
              name="organization_type"
              label=""
              error={errors.organization_type}
              columns={window.innerWidth < 640 ? 1 : 2}
            />
          </div>
        )}

        {/* Step 2: Company Size - Enhanced Card View */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What's your organization size?</h3>
              <p className="text-gray-600 text-sm mb-4">Number of employees in your organization</p>
            </div>
            
            <SelectionButtonGroup
              options={companySizeOptions}
              value={formData.company_size}
              onChange={(value) => updateFormData('company_size', value)}
              name="company_size"
              label=""
              error={errors.company_size}
              columns={2}
              variant="cards"
            />
          </div>
        )}

        {/* Step 3: Contact Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your contact details</h3>
              <p className="text-gray-600 text-sm mb-4">We'll use this to get in touch with you</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="organization_name">Organization Name *</Label>
                <Input
                  id="organization_name"
                  value={formData.organization_name}
                  onChange={(e) => updateFormData('organization_name', e.target.value)}
                  placeholder="Enter your organization name"
                  className={errors.organization_name ? 'border-red-500' : ''}
                />
                {errors.organization_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.organization_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contact_name">Your Name *</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => updateFormData('contact_name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.contact_name ? 'border-red-500' : ''}
                />
                {errors.contact_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.contact_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="your.email@company.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="expected_farmers">Expected Number of Farmers (Optional)</Label>
                <Input
                  id="expected_farmers"
                  type="number"
                  value={formData.expected_farmers}
                  onChange={(e) => updateFormData('expected_farmers', e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Budget & Timeline - Two Cards in One Row */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements & Budget</h3>
              <p className="text-gray-600 text-sm mb-4">Help us understand your project scope</p>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Budget Range Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  What's your budget range? *
                </h4>
                <SelectionButtonGroup
                  options={budgetRangeOptions}
                  value={formData.budget_range}
                  onChange={(value) => updateFormData('budget_range', value)}
                  name="budget_range"
                  label=""
                  error={errors.budget_range}
                  columns={1}
                  variant="compact"
                />
              </div>

              {/* Timeline Card */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  When do you want to get started? *
                </h4>
                <SelectionButtonGroup
                  options={timelineOptions}
                  value={formData.timeline}
                  onChange={(value) => updateFormData('timeline', value)}
                  name="timeline"
                  label=""
                  error={errors.timeline}
                  columns={1}
                  variant="compact"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">Tell us about your requirements (Optional)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => updateFormData('requirements', e.target.value)}
                placeholder="What specific features or solutions are you looking for?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="current_solution">What solution do you currently use? (Optional)</Label>
              <Input
                id="current_solution"
                value={formData.current_solution}
                onChange={(e) => updateFormData('current_solution', e.target.value)}
                placeholder="e.g., Excel sheets, other software, manual process"
              />
            </div>
          </div>
        )}

        {/* Step 5: How Did You Hear */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How did you hear about us?</h3>
              <p className="text-gray-600 text-sm mb-4">This helps us improve our outreach</p>
            </div>
            
            <SelectionButtonGroup
              options={howDidYouHearOptions}
              value={formData.how_did_you_hear}
              onChange={(value) => updateFormData('how_did_you_hear', value)}
              name="how_did_you_hear"
              label=""
              error={errors.how_did_you_hear}
              columns={window.innerWidth < 640 ? 1 : 2}
            />
          </div>
        )}

        {/* Step 6: Review & Submit */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Review your information</h3>
              <p className="text-gray-600 text-sm mb-4">Please confirm your details before submitting</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
              <div><strong>Organization:</strong> {formData.organization_name}</div>
              <div><strong>Type:</strong> {organizationTypeOptions.find(opt => opt.value === formData.organization_type)?.label}</div>
              <div><strong>Size:</strong> {formData.company_size}</div>
              <div><strong>Contact:</strong> {formData.contact_name}</div>
              <div><strong>Email:</strong> {formData.email}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
              <div><strong>Budget:</strong> {budgetRangeOptions.find(opt => opt.value === formData.budget_range)?.label}</div>
              <div><strong>Timeline:</strong> {timelineOptions.find(opt => opt.value === formData.timeline)?.label}</div>
              {detectedSource && <div><strong>Source:</strong> {detectedSource}</div>}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === TOTAL_STEPS ? (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 order-1 sm:order-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-700 order-1 sm:order-2"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StepByStepLeadForm;
