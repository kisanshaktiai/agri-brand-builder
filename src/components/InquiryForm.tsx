
import React, { useState } from 'react';
import { Building2, Users, Target, Calendar, Send, CheckCircle, AlertCircle, Rocket, Phone, Mail, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SelectionButtonGroup } from './forms/SelectionButtonGroup';
import { FormSection } from './forms/FormSection';
import { AdvancedLeadsService } from '@/services/AdvancedLeadsService';
import { LEAD_FORM_SCHEMA } from '@/config/leadFormSchema';
import EnhancedLeadPopupForm from './EnhancedLeadPopupForm';
import type { FormSubmissionData } from '@/types/UniversalForm';

const InquiryForm = () => {
  const { toast } = useToast();
  const [leadsService] = useState(() => new AdvancedLeadsService(LEAD_FORM_SCHEMA));
  
  const [formData, setFormData] = useState({
    organization_name: '',
    organization_type: '',
    company_size: '',
    contact_name: '',
    email: '',
    phone: '',
    expected_farmers: '',
    budget_range: '',
    timeline: '',
    current_solution: '',
    requirements: '',
    how_did_you_hear: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEnhancedForm, setShowEnhancedForm] = useState(false);

  // Selection options with icons
  const organizationTypeOptions = [
    { value: 'agri_company', label: 'Agricultural Company', icon: <Building2 className="w-4 h-4" />, description: 'Commercial farming or agribusiness' },
    { value: 'ngo', label: 'NGO', icon: <Users className="w-4 h-4" />, description: 'Non-profit organization' },
    { value: 'university', label: 'University/Research', icon: <Target className="w-4 h-4" />, description: 'Academic or research institution' },
    { value: 'government', label: 'Government Agency', icon: <Building2 className="w-4 h-4" />, description: 'Government or public sector' },
    { value: 'cooperative', label: 'Cooperative', icon: <Users className="w-4 h-4" />, description: 'Farmer cooperative or collective' },
    { value: 'other', label: 'Other', icon: <Star className="w-4 h-4" />, description: 'Other type of organization' }
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees', icon: <Users className="w-4 h-4" />, description: 'Small team or startup' },
    { value: '11-50', label: '11-50 employees', icon: <Users className="w-4 h-4" />, description: 'Growing company' },
    { value: '51-200', label: '51-200 employees', icon: <Users className="w-4 h-4" />, description: 'Medium-sized company' },
    { value: '201-1000', label: '201-1000 employees', icon: <Users className="w-4 h-4" />, description: 'Large organization' },
    { value: '1000+', label: '1000+ employees', icon: <Users className="w-4 h-4" />, description: 'Enterprise organization' }
  ];

  const budgetRangeOptions = [
    { value: 'under_25k', label: 'Under ₹25,000', icon: <Target className="w-4 h-4" />, description: 'Basic package suitable for small operations' },
    { value: '25k_50k', label: '₹25,000 - ₹50,000', icon: <Target className="w-4 h-4" />, description: 'Standard package for growing businesses' },
    { value: '50k_100k', label: '₹50,000 - ₹1,00,000', icon: <Target className="w-4 h-4" />, description: 'Premium package with advanced features' },
    { value: '100k_plus', label: '₹1,00,000+', icon: <Target className="w-4 h-4" />, description: 'Enterprise solutions with full customization' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (within 1 month)', icon: <Calendar className="w-4 h-4" />, description: 'Ready to start right away' },
    { value: '1_month', label: '1-2 months', icon: <Calendar className="w-4 h-4" />, description: 'Quick deployment needed' },
    { value: '3_months', label: '3-6 months', icon: <Calendar className="w-4 h-4" />, description: 'Standard implementation timeline' },
    { value: '6_months', label: '6+ months', icon: <Calendar className="w-4 h-4" />, description: 'Planned for future implementation' },
    { value: 'flexible', label: 'Flexible timeline', icon: <Calendar className="w-4 h-4" />, description: 'Open to discussion' }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.organization_name.trim()) newErrors.organization_name = 'Organization name is required';
    if (!formData.organization_type) newErrors.organization_type = 'Please select your organization type';
    if (!formData.contact_name.trim()) newErrors.contact_name = 'Contact name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Please tell us about your requirements';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData: FormSubmissionData = {
        formId: 'inquiry-form-2025',
        formVersion: '1.0.0',
        data: formData,
        metadata: {
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          sessionId: crypto.randomUUID(),
          completionTime: Date.now(),
          source: 'inquiry_form'
        }
      };

      const result = await leadsService.submitLead(submissionData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          organization_name: '',
          organization_type: '',
          company_size: '',
          contact_name: '',
          email: '',
          phone: '',
          expected_farmers: '',
          budget_range: '',
          timeline: '',
          current_solution: '',
          requirements: '',
          how_did_you_hear: ''
        });

        toast({
          title: "Success!",
          description: "Your inquiry has been submitted successfully. We'll contact you within 24 hours.",
        });
      } else {
        throw new Error(result.error);
      }

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 block">Agricultural Operations?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get in touch with our agricultural technology experts and discover how KisanShaktiAI can benefit your farming operations.
            </p>
            
            {/* Enhanced Form Button */}
            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">Try Our New Enhanced Form Experience</h3>
              </div>
              <p className="text-green-700 mb-4">
                Experience our advanced multi-step form with smart validation, auto-save, and personalized lead scoring.
              </p>
              <Button
                onClick={() => setShowEnhancedForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Open Enhanced Form
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3">
              {/* Main Form - 2/3 width */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Your Personalized Demo
                  </h3>
                  <p className="text-gray-600">
                    Fill out this form to receive a customized demonstration of our agricultural technology platform
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Organization Information */}
                  <FormSection 
                    title="Organization Information" 
                    description="Tell us about your organization"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.organization_name}
                          onChange={(e) => handleChange('organization_name', e.target.value)}
                          placeholder="Your organization name"
                          className={errors.organization_name ? 'border-red-500' : ''}
                        />
                        {errors.organization_name && (
                          <p className="text-sm text-red-600 mt-1">{errors.organization_name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Number of Farmers
                        </label>
                        <Input
                          type="number"
                          value={formData.expected_farmers}
                          onChange={(e) => handleChange('expected_farmers', e.target.value)}
                          placeholder="e.g., 1000"
                        />
                      </div>
                    </div>

                    <SelectionButtonGroup
                      label="Organization Type"
                      options={organizationTypeOptions}
                      value={formData.organization_type}
                      onChange={(value) => handleChange('organization_type', value)}
                      name="organization_type"
                      required
                      error={errors.organization_type}
                      columns={2}
                    />

                    <SelectionButtonGroup
                      label="Company Size"
                      options={companySizeOptions}
                      value={formData.company_size}
                      onChange={(value) => handleChange('company_size', value)}
                      name="company_size"
                      columns={2}
                    />
                  </FormSection>

                  {/* Contact Information */}
                  <FormSection 
                    title="Contact Information" 
                    description="How can we reach you?"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.contact_name}
                          onChange={(e) => handleChange('contact_name', e.target.value)}
                          placeholder="Your full name"
                          className={errors.contact_name ? 'border-red-500' : ''}
                        />
                        {errors.contact_name && (
                          <p className="text-sm text-red-600 mt-1">{errors.contact_name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="+91 (800) 123-4567"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="your.email@company.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </FormSection>

                  {/* Requirements & Budget */}
                  <FormSection 
                    title="Requirements & Budget" 
                    description="Help us understand your needs"
                  >
                    <SelectionButtonGroup
                      label="Budget Range (Annual)"
                      options={budgetRangeOptions}
                      value={formData.budget_range}
                      onChange={(value) => handleChange('budget_range', value)}
                      name="budget_range"
                      columns={2}
                    />

                    <SelectionButtonGroup
                      label="Implementation Timeline"
                      options={timelineOptions}
                      value={formData.timeline}
                      onChange={(value) => handleChange('timeline', value)}
                      name="timeline"
                      columns={2}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Solution
                        </label>
                        <Textarea
                          value={formData.current_solution}
                          onChange={(e) => handleChange('current_solution', e.target.value)}
                          placeholder="What tools or systems are you currently using?"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          How did you hear about us?
                        </label>
                        <Input
                          type="text"
                          value={formData.how_did_you_hear}
                          onChange={(e) => handleChange('how_did_you_hear', e.target.value)}
                          placeholder="e.g., Google search, referral, etc."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specific Requirements *
                      </label>
                      <Textarea
                        value={formData.requirements}
                        onChange={(e) => handleChange('requirements', e.target.value)}
                        placeholder="Tell us about your specific needs, challenges, or features you're looking for..."
                        rows={4}
                        className={errors.requirements ? 'border-red-500' : ''}
                      />
                      {errors.requirements && (
                        <p className="text-sm text-red-600 mt-1">{errors.requirements}</p>
                      )}
                    </div>
                  </FormSection>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 p-4 bg-green-100 text-green-800 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>Thank you! Your inquiry has been submitted successfully. We'll get back to you within 24 hours.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 p-4 bg-red-100 text-red-800 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>Something went wrong. Please try again or contact us directly.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info Sidebar - 1/3 width */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-green-100">contact@kisanshaktiai.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-green-100">+91 (800) 123-4567</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-green-200 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-green-100">Agricultural Technology Hub<br />Bangalore, India</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Why Choose KisanShaktiAI?</h4>
                  <ul className="space-y-3 text-green-100">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <span>24/7 AI-powered agricultural support</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <span>Multi-language platform support</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <span>Real-time satellite monitoring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <span>Proven track record with 25K+ farmers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
                      <span>Customizable solutions for every scale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Form Modal */}
      <EnhancedLeadPopupForm
        isOpen={showEnhancedForm}
        onClose={() => setShowEnhancedForm(false)}
        source="inquiry_form"
      />
    </section>
  );
};

export default InquiryForm;
