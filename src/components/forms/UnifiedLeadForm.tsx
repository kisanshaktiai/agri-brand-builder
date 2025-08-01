
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight, Building2, User, Phone, Mail, Target, Calendar, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { leadsService, type LeadData } from '@/services/LeadsService';

interface UnifiedLeadFormProps {
  onSuccess?: (leadId: string) => void;
  onClose?: () => void;
  source?: string;
  showTitle?: boolean;
}

const steps = [
  { id: 'organization', title: 'Organization', description: 'Tell us about your organization', icon: Building2 },
  { id: 'contact', title: 'Contact Info', description: 'How can we reach you?', icon: User },
  { id: 'requirements', title: 'Requirements', description: 'Help us understand your needs', icon: Target },
  { id: 'additional', title: 'Additional Info', description: 'Any additional details', icon: MessageSquare }
];

export const UnifiedLeadForm: React.FC<UnifiedLeadFormProps> = ({
  onSuccess,
  onClose,
  source = 'website',
  showTitle = true
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<LeadData>>({
    organization_type: 'agri_company'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof LeadData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.organization_name?.trim()) newErrors.organization_name = 'Organization name is required';
      if (!formData.organization_type) newErrors.organization_type = 'Organization type is required';
    } else if (currentStep === 1) {
      if (!formData.contact_name?.trim()) newErrors.contact_name = 'Contact name is required';
      if (!formData.email?.trim()) newErrors.email = 'Email is required';
      else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      const result = await leadsService.submitInquiry(formData as LeadData, source);

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully. We'll contact you soon!",
        });
        onSuccess?.(result.lead!.id);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit inquiry",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Thank you for your inquiry!
              </h3>
              <p className="text-gray-600 mb-4">
                We've received your information and our team will contact you within 24 hours.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• A member of our team will reach out to you shortly</li>
                <li>• We'll schedule a demo tailored to your needs</li>
                <li>• You'll get a personalized proposal and pricing</li>
                <li>• We'll help you get started with a free trial</li>
              </ul>
            </div>
            {onClose && (
              <Button onClick={onClose} variant="outline" className="w-full">
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="max-w-2xl mx-auto">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your Agricultural Operations
          </h2>
          <p className="text-xl text-gray-600">
            Get a personalized demo of our agricultural technology platform
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CurrentStepIcon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">
              {currentStep + 1} of {steps.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 0: Organization */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="organization_name">Organization Name *</Label>
                <Input
                  id="organization_name"
                  value={formData.organization_name || ''}
                  onChange={(e) => updateField('organization_name', e.target.value)}
                  placeholder="Enter your organization name"
                  className={errors.organization_name ? 'border-red-500' : ''}
                />
                {errors.organization_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.organization_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="organization_type">Organization Type *</Label>
                <Select value={formData.organization_type} onValueChange={(value) => updateField('organization_type', value)}>
                  <SelectTrigger className={errors.organization_type ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agri_company">Agricultural Company</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="university">University/Research</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="cooperative">Cooperative</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.organization_type && (
                  <p className="text-red-500 text-sm mt-1">{errors.organization_type}</p>
                )}
              </div>

              <div>
                <Label htmlFor="company_size">Company Size</Label>
                <Select value={formData.company_size} onValueChange={(value) => updateField('company_size', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 1: Contact Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact_name">Contact Name *</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name || ''}
                  onChange={(e) => updateField('contact_name', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.contact_name ? 'border-red-500' : ''}
                />
                {errors.contact_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact_name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="your.email@company.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="expected_farmers">Expected Number of Farmers</Label>
                <Input
                  id="expected_farmers"
                  type="number"
                  value={formData.expected_farmers || ''}
                  onChange={(e) => updateField('expected_farmers', parseInt(e.target.value) || undefined)}
                  placeholder="e.g., 1000"
                />
              </div>

              <div>
                <Label htmlFor="budget_range">Budget Range (Annual)</Label>
                <Select value={formData.budget_range} onValueChange={(value) => updateField('budget_range', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_25k">Under ₹25,000</SelectItem>
                    <SelectItem value="25k_50k">₹25,000 - ₹50,000</SelectItem>
                    <SelectItem value="50k_100k">₹50,000 - ₹1,00,000</SelectItem>
                    <SelectItem value="100k_plus">₹1,00,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeline">Implementation Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateField('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                    <SelectItem value="1_month">1-2 months</SelectItem>
                    <SelectItem value="3_months">3-6 months</SelectItem>
                    <SelectItem value="6_months">6+ months</SelectItem>
                    <SelectItem value="flexible">Flexible timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="current_solution">Current Solution</Label>
                <Textarea
                  id="current_solution"
                  value={formData.current_solution || ''}
                  onChange={(e) => updateField('current_solution', e.target.value)}
                  placeholder="What tools or systems are you currently using?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="requirements">Specific Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements || ''}
                  onChange={(e) => updateField('requirements', e.target.value)}
                  placeholder="Tell us about your specific needs, challenges, or features you're looking for..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="how_did_you_hear">How did you hear about us?</Label>
                <Select value={formData.how_did_you_hear} onValueChange={(value) => updateField('how_did_you_hear', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google_search">Google Search</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="referral">Referral from friend/colleague</SelectItem>
                    <SelectItem value="publication">Industry publication</SelectItem>
                    <SelectItem value="conference">Conference/event</SelectItem>
                    <SelectItem value="email_marketing">Email marketing</SelectItem>
                    <SelectItem value="advertisement">Online advertisement</SelectItem>
                    <SelectItem value="partner">Partner/vendor recommendation</SelectItem>
                    <SelectItem value="existing_customer">Existing customer</SelectItem>
                    <SelectItem value="word_of_mouth">Word of mouth</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedLeadForm;
