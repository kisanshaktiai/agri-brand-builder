import type { FormConfiguration } from '@/types/UniversalForm';

export const LEAD_FORM_SCHEMA: FormConfiguration = {
  websiteId: 'kisanshaktiai',
  environment: 'production',
  schema: {
    id: 'lead-capture-2025',
    version: '1.0.0',
    title: 'Request Demo - Agricultural Technology',
    description: 'Get a personalized demo of our agricultural technology platform',
    layout: 'multi-step',
    displayMode: 'popup',
    fields: [
      {
        id: 'organization_name',
        type: 'text',
        label: 'Organization Name',
        placeholder: 'Enter your organization name',
        required: true,
        validation: [
          {
            type: 'required',
            message: 'Organization name is required'
          },
          {
            type: 'min',
            value: 2,
            message: 'Organization name must be at least 2 characters'
          }
        ],
        autoComplete: 'organization',
        step: 1
      },
      {
        id: 'organization_type',
        type: 'select',
        label: 'Organization Type',
        required: true,
        options: [
          { label: 'Agricultural Company', value: 'agri_company' },
          { label: 'NGO', value: 'ngo' },
          { label: 'University/Research', value: 'university' },
          { label: 'Government Agency', value: 'government' },
          { label: 'Cooperative', value: 'cooperative' },
          { label: 'Other', value: 'other' }
        ],
        validation: [
          {
            type: 'required',
            message: 'Please select your organization type'
          }
        ],
        step: 1
      },
      {
        id: 'company_size',
        type: 'select',
        label: 'Company Size',
        placeholder: 'Select company size',
        options: [
          { label: '1-10 employees', value: '1-10' },
          { label: '11-50 employees', value: '11-50' },
          { label: '51-200 employees', value: '51-200' },
          { label: '201-1000 employees', value: '201-1000' },
          { label: '1000+ employees', value: '1000+' }
        ],
        step: 1
      },
      {
        id: 'contact_name',
        type: 'text',
        label: 'Contact Name',
        placeholder: 'Enter your full name',
        required: true,
        validation: [
          {
            type: 'required',
            message: 'Contact name is required'
          },
          {
            type: 'min',
            value: 2,
            message: 'Contact name must be at least 2 characters'
          }
        ],
        autoComplete: 'name',
        step: 2
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'your.email@company.com',
        required: true,
        validation: [
          {
            type: 'required',
            message: 'Email is required'
          },
          {
            type: 'email',
            message: 'Please enter a valid email address'
          }
        ],
        autoComplete: 'email',
        step: 2
      },
      {
        id: 'phone',
        type: 'phone',
        label: 'Phone Number',
        placeholder: 'Your phone number',
        required: true,
        validation: [
          {
            type: 'required',
            message: 'Phone number is required'
          }
        ],
        autoComplete: 'tel',
        step: 2
      },
      {
        id: 'expected_farmers',
        type: 'number',
        label: 'Expected Number of Farmers',
        placeholder: 'e.g., 1000',
        step: 3
      },
      {
        id: 'budget_range',
        type: 'select',
        label: 'Budget Range (Annual)',
        placeholder: 'Select budget range',
        options: [
          { label: 'Under ₹25,000', value: 'under_25k' },
          { label: '₹25,000 - ₹50,000', value: '25k_50k' },
          { label: '₹50,000 - ₹1,00,000', value: '50k_100k' },
          { label: '₹1,00,000+', value: '100k_plus' }
        ],
        step: 3
      },
      {
        id: 'timeline',
        type: 'select',
        label: 'Implementation Timeline',
        placeholder: 'Select timeline',
        options: [
          { label: 'Immediate (within 1 month)', value: 'immediate' },
          { label: '1-2 months', value: '1_month' },
          { label: '3-6 months', value: '3_months' },
          { label: '6+ months', value: '6_months' },
          { label: 'Flexible timeline', value: 'flexible' }
        ],
        step: 3
      },
      {
        id: 'current_solution',
        type: 'textarea',
        label: 'Current Solution',
        placeholder: 'What tools or systems are you currently using?',
        step: 4
      },
      {
        id: 'requirements',
        type: 'textarea',
        label: 'Specific Requirements',
        placeholder: 'Tell us about your specific needs, challenges, or features you\'re looking for...',
        step: 4
      },
      {
        id: 'how_did_you_hear',
        type: 'select',
        label: 'How did you hear about us?',
        placeholder: 'Select an option',
        options: [
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
          { label: 'Other', value: 'other' }
        ],
        step: 4
      }
    ],
    steps: [
      {
        id: 'organization',
        title: 'Organization',
        description: 'Tell us about your organization',
        fields: ['organization_name', 'organization_type', 'company_size'],
        validation: 'on-blur'
      },
      {
        id: 'contact',
        title: 'Contact Info',
        description: 'How can we reach you?',
        fields: ['contact_name', 'email', 'phone'],
        validation: 'on-blur'
      },
      {
        id: 'requirements',
        title: 'Requirements',
        description: 'Help us understand your needs',
        fields: ['expected_farmers', 'budget_range', 'timeline'],
        canSkip: true
      },
      {
        id: 'additional',
        title: 'Additional Info',
        description: 'Any additional details',
        fields: ['current_solution', 'requirements', 'how_did_you_hear'],
        canSkip: true
      }
    ],
    branding: {
      primaryColor: 'hsl(142, 71%, 45%)',
      customCSS: `
        .form-container {
          --primary-color: hsl(142, 71%, 45%);
          --primary-hover: hsl(142, 71%, 40%);
        }
      `
    },
    behavior: {
      autoSave: true,
      showProgress: true,
      allowDraft: true,
      submitOnComplete: true
    },
    analytics: {
      trackFieldFocus: true,
      trackFieldBlur: true,
      trackStepProgress: true
    },
    integrations: {
      webhooks: [],
      crmSystem: 'supabase'
    }
  },
  features: {
    enableAnalytics: true,
    enableDuplicateDetection: true,
    enableLeadScoring: true,
    enableOfflineSupport: true,
    enableA11y: true,
    enableBotProtection: false
  },
  localization: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'hi'],
    translations: {
      en: {
        'form.submit': 'Submit Request',
        'form.next': 'Next',
        'form.previous': 'Previous',
        'form.loading': 'Processing...',
        'form.success': 'Thank you! Your request has been submitted successfully.',
        'form.error': 'There was an error submitting your request. Please try again.',
        'validation.required': 'This field is required',
        'validation.email': 'Please enter a valid email address',
        'validation.phone': 'Please enter a valid phone number',
        'how_did_you_hear.google_search': 'Google Search',
        'how_did_you_hear.social_media': 'Social Media',
        'how_did_you_hear.referral': 'Referral from friend/colleague',
        'how_did_you_hear.publication': 'Industry publication/magazine',
        'how_did_you_hear.conference': 'Conference/event',
        'how_did_you_hear.email_marketing': 'Email marketing',
        'how_did_you_hear.advertisement': 'Online advertisement',
        'how_did_you_hear.partner': 'Partner/vendor recommendation',
        'how_did_you_hear.existing_customer': 'Existing customer',
        'how_did_you_hear.word_of_mouth': 'Word of mouth',
        'how_did_you_hear.other': 'Other'
      },
      hi: {
        'form.submit': 'अनुरोध भेजें',
        'form.next': 'अगला',
        'form.previous': 'पिछला',
        'form.loading': 'प्रसंस्करण...',
        'form.success': 'धन्यवाद! आपका अनुरोध सफलतापूर्वक भेजा गया है।',
        'form.error': 'आपका अनुरोध भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।',
        'how_did_you_hear.google_search': 'गूगल खोज',
        'how_did_you_hear.social_media': 'सोशल मीडिया',
        'how_did_you_hear.referral': 'मित्र/सहयोगी की सिफारिश',
        'how_did_you_hear.publication': 'उद्योग प्रकाशन/पत्रिका',
        'how_did_you_hear.conference': 'सम्मेलन/कार्यक्रम',
        'how_did_you_hear.email_marketing': 'ईमेल मार्केटिंग',
        'how_did_you_hear.advertisement': 'ऑनलाइन विज्ञापन',
        'how_did_you_hear.partner': 'साझेदार/विक्रेता की सिफारिश',
        'how_did_you_hear.existing_customer': 'मौजूदा ग्राहक',
        'how_did_you_hear.word_of_mouth': 'मुंह की बात',
        'how_did_you_hear.other': 'अन्य'
      }
    }
  }
};
