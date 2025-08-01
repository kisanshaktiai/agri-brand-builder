
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LeadsService } from '@/services/LeadsService';

interface FormData {
  organizationName: string;
  organizationType: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: string;
  expectedFarmers: string;
  budgetRange: string;
  timeline: string;
  requirements: string;
  currentSolution: string;
  howDidYouHear: string;
}

const InquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const leadsService = new LeadsService();

  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    organizationType: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    expectedFarmers: '',
    budgetRange: '',
    timeline: '',
    requirements: '',
    currentSolution: '',
    howDidYouHear: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData.organizationType) {
      newErrors.organizationType = 'Please select organization type';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSelectChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        organization_name: formData.organizationName,
        organization_type: formData.organizationType as 'agri_company' | 'ngo' | 'university' | 'government' | 'cooperative' | 'other',
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        company_size: formData.companySize,
        expected_farmers: formData.expectedFarmers ? parseInt(formData.expectedFarmers) : undefined,
        budget_range: formData.budgetRange,
        timeline: formData.timeline,
        requirements: formData.requirements,
        current_solution: formData.currentSolution,
        how_did_you_hear: formData.howDidYouHear
      };

      const result = await leadsService.submitInquiry(leadData);

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully. We'll contact you soon!",
        });
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Thank you for your inquiry!</h2>
          <p className="text-gray-600 mb-6">
            We've received your information and our team will contact you within 24 hours.
          </p>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>• A member of our team will reach out to you shortly</li>
              <li>• We'll schedule a demo tailored to your needs</li>
              <li>• You'll get a personalized proposal and pricing</li>
              <li>• We'll help you get started with a free trial</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-green-700">
          Get Started with KisanShakti AI
        </CardTitle>
        <p className="text-center text-gray-600">
          Fill out the form below and our team will get in touch with you within 24 hours.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organizationName">Organization Name *</Label>
              <Input
                id="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange('organizationName')}
                placeholder="Enter your organization name"
                className={errors.organizationName ? 'border-red-500' : ''}
              />
              {errors.organizationName && (
                <p className="text-sm text-red-600 mt-1">{errors.organizationName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="organizationType">Organization Type *</Label>
              <Select value={formData.organizationType} onValueChange={handleSelectChange('organizationType')}>
                <SelectTrigger className={errors.organizationType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agri_company">Agriculture Company</SelectItem>
                  <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                  <SelectItem value="university">University/Research</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="cooperative">Cooperative</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.organizationType && (
                <p className="text-sm text-red-600 mt-1">{errors.organizationType}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={handleInputChange('contactName')}
                placeholder="Your full name"
                className={errors.contactName ? 'border-red-500' : ''}
              />
              {errors.contactName && (
                <p className="text-sm text-red-600 mt-1">{errors.contactName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="your.email@company.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                placeholder="+91 98765 43210"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="companySize">Company Size</Label>
              <Select value={formData.companySize} onValueChange={handleSelectChange('companySize')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expectedFarmers">Expected Number of Farmers</Label>
              <Input
                id="expectedFarmers"
                type="number"
                value={formData.expectedFarmers}
                onChange={handleInputChange('expectedFarmers')}
                placeholder="e.g., 500"
              />
            </div>

            <div>
              <Label htmlFor="budgetRange">Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={handleSelectChange('budgetRange')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                  <SelectItem value="50k-2l">₹50K - ₹2L</SelectItem>
                  <SelectItem value="2l-5l">₹2L - ₹5L</SelectItem>
                  <SelectItem value="5l-10l">₹5L - ₹10L</SelectItem>
                  <SelectItem value="10l+">₹10L+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Implementation Timeline</Label>
              <Select value={formData.timeline} onValueChange={handleSelectChange('timeline')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediately</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                  <SelectItem value="exploring">Just exploring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
              <Select value={formData.howDidYouHear} onValueChange={handleSelectChange('howDidYouHear')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="requirements">Tell us about your requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={handleInputChange('requirements')}
              placeholder="What specific features or solutions are you looking for?"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="currentSolution">What solution do you currently use?</Label>
            <Input
              id="currentSolution"
              value={formData.currentSolution}
              onChange={handleInputChange('currentSolution')}
              placeholder="e.g., Excel sheets, other software, manual process"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Inquiry
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our Terms of Service and Privacy Policy.
            We'll never share your information with third parties.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default InquiryForm;
