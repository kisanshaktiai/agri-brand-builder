
import React from 'react';
import { cn } from '@/lib/utils';

interface SelectionOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface SelectionButtonGroupProps {
  options: SelectionOption[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
  error?: string;
  label: string;
  description?: string;
  columns?: number;
}

export const SelectionButtonGroup: React.FC<SelectionButtonGroupProps> = ({
  options,
  value,
  onChange,
  name,
  required = false,
  error,
  label,
  description,
  columns = 2
}) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && (
          <p className="text-sm text-gray-500 mb-3">{description}</p>
        )}
      </div>
      
      <div className={cn(
        "grid gap-3",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
              value === option.value
                ? "border-green-500 bg-green-50 text-green-900 shadow-sm"
                : "border-gray-200 bg-white text-gray-900 hover:border-green-300 hover:bg-green-50/50",
              error && "border-red-300"
            )}
            aria-pressed={value === option.value}
            role="radio"
          >
            <div className="flex items-start space-x-3">
              {option.icon && (
                <div className={cn(
                  "flex-shrink-0 mt-0.5",
                  value === option.value ? "text-green-600" : "text-gray-400"
                )}>
                  {option.icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                )}
              </div>
            </div>
            
            {value === option.value && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
