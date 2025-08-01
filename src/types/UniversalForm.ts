
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'tel' 
  | 'number' 
  | 'select' 
  | 'multiselect'
  | 'textarea' 
  | 'checkbox' 
  | 'radio' 
  | 'file' 
  | 'date' 
  | 'datetime-local'
  | 'url'
  | 'autocomplete'
  | 'phone'
  | 'address'
  | 'signature'
  | 'rich-text';

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'min' | 'max' | 'pattern' | 'custom';
  value?: string | number | boolean;
  message: string;
  customValidator?: (value: any, formData: Record<string, any>) => boolean;
}

export interface ConditionalLogic {
  field: string;
  operator: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than' | 'is-empty' | 'is-not-empty';
  value: any;
  action: 'show' | 'hide' | 'require' | 'disable';
}

export interface FormFieldOption {
  label: string;
  value: string;
  disabled?: boolean;
  metadata?: Record<string, any>;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  defaultValue?: any;
  options?: FormFieldOption[];
  validation?: ValidationRule[];
  conditional?: ConditionalLogic[];
  gridColumn?: string;
  metadata?: Record<string, any>;
  autoComplete?: string;
  step?: number; // For multi-step forms
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: string[]; // Field IDs
  validation?: 'on-blur' | 'on-submit' | 'real-time';
  canSkip?: boolean;
}

export interface FormSchema {
  id: string;
  version: string;
  title: string;
  description?: string;
  layout: 'single-step' | 'multi-step' | 'accordion' | 'tabs';
  displayMode: 'popup' | 'inline' | 'sidebar' | 'full-page';
  fields: FormField[];
  steps?: FormStep[];
  branding?: {
    primaryColor?: string;
    logo?: string;
    customCSS?: string;
  };
  behavior?: {
    autoSave?: boolean;
    showProgress?: boolean;
    allowDraft?: boolean;
    submitOnComplete?: boolean;
  };
  analytics?: {
    trackFieldFocus?: boolean;
    trackFieldBlur?: boolean;
    trackStepProgress?: boolean;
  };
  integrations?: {
    webhooks?: string[];
    crmSystem?: string;
    emailProvider?: string;
  };
}

export interface FormSubmissionData {
  formId: string;
  formVersion: string;
  data: Record<string, any>;
  metadata: {
    submittedAt: string;
    userAgent?: string;
    referrer?: string;
    sessionId?: string;
    completionTime?: number;
    source?: string;
    utmParams?: Record<string, string>;
  };
  analytics?: {
    fieldInteractions?: Record<string, number>;
    abandonmentPoints?: string[];
    stepTimes?: Record<string, number>;
  };
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings?: Record<string, string[]>;
}

export interface FormConfiguration {
  websiteId: string;
  environment: 'development' | 'staging' | 'production';
  schema: FormSchema;
  features: {
    enableAnalytics: boolean;
    enableDuplicateDetection: boolean;
    enableLeadScoring: boolean;
    enableOfflineSupport: boolean;
    enableA11y: boolean;
    enableBotProtection: boolean;
  };
  localization?: {
    defaultLanguage: string;
    supportedLanguages: string[];
    translations: Record<string, Record<string, string>>;
  };
}
