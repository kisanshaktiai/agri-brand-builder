
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
  variant?: 'default' | 'cards' | 'compact';
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
  columns = 2,
  variant = 'default'
}) => {
  return (
    <div className="space-y-3">
      {label && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <p className="text-sm text-gray-500 mb-3">{description}</p>
          )}
        </div>
      )}
      
      <div className={cn(
        "grid gap-3",
        variant === 'compact' && "gap-2",
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
              "relative text-left border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
              variant === 'cards' 
                ? "p-6 hover:shadow-lg hover:scale-[1.02] transform"
                : "p-4 hover:shadow-md",
              variant === 'compact' && "p-3",
              value === option.value
                ? "border-green-500 bg-green-50 text-green-900 shadow-md"
                : "border-gray-200 bg-white text-gray-900 hover:border-green-300 hover:bg-green-50/50",
              error && "border-red-300"
            )}
            aria-pressed={value === option.value}
            role="radio"
          >
            <div className={cn(
              "flex items-start space-x-3",
              variant === 'cards' && "flex-col space-x-0 space-y-3 items-center text-center"
            )}>
              {option.icon && (
                <div className={cn(
                  "flex-shrink-0",
                  variant === 'cards' ? "text-2xl" : "mt-0.5",
                  value === option.value ? "text-green-600" : "text-gray-400"
                )}>
                  {option.icon}
                </div>
              )}
              <div className={cn(
                "flex-1 min-w-0",
                variant === 'cards' && "text-center"
              )}>
                <div className={cn(
                  "font-medium",
                  variant === 'cards' ? "text-base" : "text-sm"
                )}>{option.label}</div>
                {option.description && (
                  <div className={cn(
                    "text-gray-500 mt-1",
                    variant === 'cards' ? "text-sm" : "text-xs"
                  )}>{option.description}</div>
                )}
              </div>
            </div>
            
            {value === option.value && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
