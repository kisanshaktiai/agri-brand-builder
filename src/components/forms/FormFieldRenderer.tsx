
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { FormField, FormConfiguration } from '@/types/UniversalForm';

interface FormFieldRendererProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onFocus?: () => void;
  config: FormConfiguration;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  field,
  value,
  error,
  onChange,
  onFocus,
  config
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
        return (
          <Input
            id={field.id}
            type={field.type}
            value={value || ''}
            onChange={handleInputChange}
            onFocus={onFocus}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
            required={field.required}
          />
        );

      case 'tel':
      case 'phone':
        return (
          <Input
            id={field.id}
            type="tel"
            value={value || ''}
            onChange={handleInputChange}
            onFocus={onFocus}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete || 'tel'}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
            required={field.required}
          />
        );

      case 'number':
        return (
          <Input
            id={field.id}
            type="number"
            value={value || ''}
            onChange={handleInputChange}
            onFocus={onFocus}
            placeholder={field.placeholder}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={field.id}
            value={value || ''}
            onChange={handleInputChange}
            onFocus={onFocus}
            placeholder={field.placeholder}
            rows={3}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
            required={field.required}
          />
        );

      case 'select':
        return (
          <Select
            value={value || ''}
            onValueChange={onChange}
            required={field.required}
          >
            <SelectTrigger 
              className={error ? 'border-red-500 focus:border-red-500' : ''}
              onFocus={onFocus}
            >
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={onChange}
            className="space-y-2"
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={`${field.id}-${option.value}`}
                  disabled={option.disabled}
                />
                <Label htmlFor={`${field.id}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value || false}
              onCheckedChange={onChange}
              onFocus={onFocus}
              required={field.required}
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case 'date':
      case 'datetime-local':
        return (
          <Input
            id={field.id}
            type={field.type}
            value={value || ''}
            onChange={handleInputChange}
            onFocus={onFocus}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
            required={field.required}
          />
        );

      default:
        return (
          <Input
            id={field.id}
            type="text"
            value={value || ''}
            onChange={handleInputChange}
            onFocus={onFocus}
            placeholder={field.placeholder}
            className={error ? 'border-red-500 focus:border-red-500' : ''}
            required={field.required}
          />
        );
    }
  };

  // Don't render label for checkbox as it's handled internally
  if (field.type === 'checkbox') {
    return (
      <div className="space-y-1">
        {renderField()}
        {field.description && (
          <p className="text-sm text-gray-500">{field.description}</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
      {field.description && (
        <p className="text-sm text-gray-500">{field.description}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
