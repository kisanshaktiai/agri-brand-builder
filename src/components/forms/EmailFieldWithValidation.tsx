import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface EmailFieldWithValidationProps {
  field: {
    id: string;
    label: string;
    placeholder?: string;
    required?: boolean;
  };
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean | null, message: string) => void;
}

export const EmailFieldWithValidation: React.FC<EmailFieldWithValidationProps> = ({
  field,
  value,
  error,
  onChange,
  onValidationChange
}) => {
  const [validationState, setValidationState] = useState<{
    isChecking: boolean;
    isValid: boolean | null;
    message: string;
  }>({
    isChecking: false,
    isValid: null,
    message: ''
  });

  const validateEmail = async (email: string) => {
    if (!email || !email.trim()) {
      const newState = { isChecking: false, isValid: null, message: '' };
      setValidationState(newState);
      onValidationChange?.(null, '');
      return;
    }

    // Basic format validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      const newState = { 
        isChecking: false, 
        isValid: false, 
        message: 'Please enter a valid email address' 
      };
      setValidationState(newState);
      onValidationChange?.(false, newState.message);
      return;
    }

    const checkingState = { isChecking: true, isValid: null, message: 'Checking email...' };
    setValidationState(checkingState);
    onValidationChange?.(null, checkingState.message);

    try {
      // Make a direct fetch call to handle the 409 status properly
      const response = await fetch(`https://qfklkkzxemsbeniyugiz.supabase.co/functions/v1/validate-lead-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFma2xra3p4ZW1zYmVuaXl1Z2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjcxNjUsImV4cCI6MjA2ODAwMzE2NX0.dUnGp7wbwYom1FPbn_4EGf3PWjgmr8mXwL2w2SdYOh4`,
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFma2xra3p4ZW1zYmVuaXl1Z2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjcxNjUsImV4cCI6MjA2ODAwMzE2NX0.dUnGp7wbwYom1FPbn_4EGf3PWjgmr8mXwL2w2SdYOh4',
          'x-client-info': 'supabase-js-web',
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (response.status === 409) {
        // Email already exists
        if (data.exists === true) {
          const existsState = { 
            isChecking: false, 
            isValid: false, 
            message: 'Email already exists' 
          };
          setValidationState(existsState);
          onValidationChange?.(false, existsState.message);
        }
      } else if (response.status === 200) {
        // Email is available
        if (data.valid === true && data.exists === false) {
          const validState = { 
            isChecking: false, 
            isValid: true, 
            message: 'Email verified' 
          };
          setValidationState(validState);
          onValidationChange?.(true, validState.message);
        }
      } else if (response.status === 400) {
        // Invalid email format or other validation error
        const errorState = { 
          isChecking: false, 
          isValid: false, 
          message: data.error || 'Invalid email' 
        };
        setValidationState(errorState);
        onValidationChange?.(false, errorState.message);
      } else {
        // Other errors - fall back to neutral state
        console.warn('Email validation unexpected response:', response.status, data);
        const neutralState = { isChecking: false, isValid: null, message: '' };
        setValidationState(neutralState);
        onValidationChange?.(null, '');
      }
    } catch (error) {
      console.warn('Email validation network error:', error);
      const neutralState = { isChecking: false, isValid: null, message: '' };
      setValidationState(neutralState);
      onValidationChange?.(null, '');
    }
  };

  const handleBlur = () => {
    validateEmail(value);
  };

  return (
    <div>
      <Label htmlFor={field.id} className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={field.id}
        type="email"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={field.placeholder}
        className={error ? "border-red-500" : ""}
      />
      
      {/* Validation status */}
      {validationState.message && (
        <div className={`mt-1 text-sm flex items-center ${
          validationState.isChecking ? 'text-blue-600' : 
          validationState.isValid === true ? 'text-green-600' : 
          validationState.isValid === false ? 'text-red-600' : 'text-gray-500'
        }`}>
          {validationState.isChecking && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
          {validationState.isValid === true && <CheckCircle className="w-3 h-3 mr-1" />}
          {validationState.message}
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
