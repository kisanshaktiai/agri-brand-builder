
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

interface FormStep {
  id: string;
  title: string;
  description?: string;
}

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: FormStep[];
  progress: number;
}

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps,
  steps,
  progress
}) => {
  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-2 ${
              index <= currentStep ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                index < currentStep
                  ? 'bg-green-600 border-green-600 text-white'
                  : index === currentStep
                  ? 'border-green-600 bg-white text-green-600'
                  : 'border-gray-300 bg-white text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-medium">{step.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
