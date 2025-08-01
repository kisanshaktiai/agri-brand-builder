import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Building, Users, DollarSign, Clock, Lightbulb, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { SelectionButtonGroup } from './forms/SelectionButtonGroup';
import { FormSection } from './forms/FormSection';
import { LeadsService } from '@/services/LeadsService';

interface InquiryFormData {
  organization_name: string;
  organization_type: string;
  contact_name: string;
  email: string;
  phone: string;
  company_size?: string | null;
  expected_farmers?: number | null;
  budget_range?: string | null;
  timeline?: string | null;
  current_solution?: string | null;
  requirements?: string | null;
  how_did_you_hear?: string | null;
  lead_source: 'website';
  status: 'new';
  priority: 'medium';
}

const organizationTypeOptions = [
  { label: 'Agricultural Company', value: 'agri_company' },
  { label: 'NGO', value: 'ngo' },
  { label: 'University/Research', value: 'university' },
  { label: 'Government Agency', value: 'government' },
  { label: 'Cooperative', value: 'cooperative' },
  { label: 'Other', value: 'other' },
];

const companySizeOptions = [
  { label: '1-10 employees', value: '1-10' },
  { label: '11-50 employees', value: '11-50' },
  { label: '51-200 employees', value: '51-200' },
  { label: '201-1000 employees', value: '201-1000' },
  { label: '1000+ employees', value: '1000+' },
];

const budgetRangeOptions = [
  { label: 'Under ₹25,000', value: 'under_25k' },
  { label: '₹25,000 - ₹50,000', value: '25k_50k' },
  { label: '₹50,000 - ₹1,00,000', value: '50k_100k' },
  { label: '₹1,00,000+', value: '100k_plus' },
];

const timelineOptions = [
  { label: 'Immediate (within 1 month)', value: 'immediate' },
  { label: '1-2 months', value: '1_month' },
  { label: '3-6 months', value: '3_months' },
  { label: '6+ months', value: '6_months' },
  { label: 'Flexible timeline', value: 'flexible' },
];

const howDidYouHearOptions = [
  { label: 'Google Search', value: 'google_search' },
  { label: 'Social Media (Facebook, LinkedIn, etc.)', value: 'social_media' },
  { label: 'Referral from friend/colleague', value: 'referral' },
  { label: 'Industry publication/magazine', value: 'publication' },
  { label: 'Conference/event', value: 'conference' },
  { label: 'Email marketing', value: 'email_marketing' },
  { label: 'Online advertisement', value: 'advertisement' },
  { label: 'Partner/vendor recommendation', value: 'partner' },
  { label: 'Existing customer', value: 'existing_customer' },
  { label: 'Word of mouth', value: 'word_of_mouth' },
  { label: 'Other', value: 'other' },
];

const InquiryForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [organizationName, setOrganizationName] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [expectedFarmers, setExpectedFarmers] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [timeline, setTimeline] = useState('');
  const [currentSolution, setCurrentSolution] = useState('');
  const [requirements, setRequirements] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!organizationType) {
      newErrors.organizationType = 'Please select your organization type';
    }

    if (!contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        organization_name: organizationName,
        organization_type: organizationType,
        contact_name: contactName,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        company_size: companySize || null,
        expected_farmers: expectedFarmers ? parseInt(expectedFarmers) : null,
        budget_range: budgetRange || null,
        timeline: timeline || null,
        current_solution: currentSolution.trim() || null,
        requirements: requirements.trim() || null,
        how_did_you_hear: howDidYouHear || null,
        lead_source: 'website',
        status: 'new' as const,
        priority: 'medium' as const,
      };

      const result = await LeadsService.createLead(leadData);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully. We'll contact you within 24 hours.",
        });

        // Reset form
        setOrganizationName('');
        setOrganizationType('');
        setContactName('');
        setEmail('');
        setPhone('');
        setCompanySize('');
        setExpectedFarmers('');
        setBudgetRange('');
        setTimeline('');
        setCurrentSolution('');
        setRequirements('');
        setHowDidYouHear('');
      } else {
        throw new Error(result.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Request a Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your agricultural operations? Get a personalized demo of our platform 
            and see how we can help you achieve your goals.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-green-600" />
              Tell Us About Your Organization
            </CardTitle>
            <CardDescription>
              Fill out the form below and our team will reach out to schedule your personalized demo.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Organization Details */}
              <FormSection
                icon={Building}
                title="Organization Details"
                description="Help us understand your organization"
              >
                <div className="space-y-6">
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <Input
                      id="organizationName"
                      type="text"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Enter your organization name"
                      className={errors.organizationName ? 'border-red-500' : ''}
                      required
                    />
                    {errors.organizationName && (
                      <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Organization Type *
                    </label>
                    <SelectionButtonGroup
                      options={organizationTypeOptions}
                      selectedValue={organizationType}
                      onValueChange={setOrganizationType}
                      error={errors.organizationType}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Company Size
                    </label>
                    <SelectionButtonGroup
                      options={companySizeOptions}
                      selectedValue={companySize}
                      onValueChange={setCompanySize}
                    />
                  </div>
                </div>
              </FormSection>

              {/* Contact Information */}
              <FormSection
                icon={User}
                title="Contact Information"
                description="How can we reach you?"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <Input
                      id="contactName"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your full name"
                      className={errors.contactName ? 'border-red-500' : ''}
                      required
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number"
                        className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="expectedFarmers" className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Number of Farmers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="expectedFarmers"
                        type="number"
                        value={expectedFarmers}
                        onChange={(e) => setExpectedFarmers(e.target.value)}
                        placeholder="e.g., 1000"
                        className="pl-10"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Requirements & Budget */}
              <FormSection
                icon={DollarSign}
                title="Requirements & Budget"
                description="Help us understand your needs"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Budget Range (Annual)
                    </label>
                    <SelectionButtonGroup
                      options={budgetRangeOptions}
                      selectedValue={budgetRange}
                      onValueChange={setBudgetRange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Implementation Timeline
                    </label>
                    <SelectionButtonGroup
                      options={timelineOptions}
                      selectedValue={timeline}
                      onValueChange={setTimeline}
                    />
                  </div>
                </div>
              </FormSection>

              {/* Additional Information */}
              <FormSection
                icon={Lightbulb}
                title="Additional Information"
                description="Tell us more about your requirements"
              >
                <div className="space-y-6">
                  <div>
                    <label htmlFor="currentSolution" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Solution
                    </label>
                    <Textarea
                      id="currentSolution"
                      value={currentSolution}
                      onChange={(e) => setCurrentSolution(e.target.value)}
                      placeholder="What tools or systems are you currently using? (Optional)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Requirements
                    </label>
                    <Textarea
                      id="requirements"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Tell us about your specific needs, challenges, or features you're looking for... (Optional)"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How did you hear about us?
                    </label>
                    <SelectionButtonGroup
                      options={howDidYouHearOptions}
                      selectedValue={howDidYouHear}
                      onValueChange={setHowDidYouHear}
                    />
                  </div>
                </div>
              </FormSection>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request Demo'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InquiryForm;
