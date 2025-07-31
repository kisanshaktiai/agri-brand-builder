
import React from 'react';
import { MapPin, Camera, Brain, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Mark Your Land",
      description: "Define your farm boundaries using our easy mapping tool or GPS coordinates.",
      color: "bg-blue-500"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Capture Crop Data",
      description: "Upload photos and input crop details. Our AI analyzes your farm's current state.",
      color: "bg-green-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Get AI Advisory",
      description: "Receive personalized recommendations based on weather, soil, and crop conditions.",
      color: "bg-purple-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your farm's performance and optimize based on real-time insights.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with KisanShaktiAI in four simple steps and transform your farming experience.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Version */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-16">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
                    {step.icon}
                  </div>
                  <div className="text-center max-w-xs">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-10 left-full w-full h-0.5 bg-gray-300" style={{ width: 'calc(100vw/4 - 80px)' }}>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Version */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-agri-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
