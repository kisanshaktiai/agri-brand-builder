
import React, { useState, useEffect } from 'react';

const StatsSection = () => {
  const [counters, setCounters] = useState({
    farmers: 0,
    acres: 0,
    insights: 0,
    savings: 0
  });

  const targets = {
    farmers: 25000,
    acres: 500000,
    insights: 1200000,
    savings: 40
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;

    const increment = {
      farmers: targets.farmers / steps,
      acres: targets.acres / steps,
      insights: targets.insights / steps,
      savings: targets.savings / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCounters(prev => ({
          farmers: Math.min(Math.floor(increment.farmers * currentStep), targets.farmers),
          acres: Math.min(Math.floor(increment.acres * currentStep), targets.acres),
          insights: Math.min(Math.floor(increment.insights * currentStep), targets.insights),
          savings: Math.min(Math.floor(increment.savings * currentStep), targets.savings)
        }));
        currentStep++;
      } else {
        setCounters(targets);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  const stats = [
    {
      value: formatNumber(counters.farmers) + '+',
      label: 'Farmers Supported',
      description: 'Active users across multiple regions',
      icon: '👨‍🌾'
    },
    {
      value: formatNumber(counters.acres) + '+',
      label: 'Acres Monitored',
      description: 'Agricultural land under monitoring',
      icon: '🌾'
    },
    {
      value: formatNumber(counters.insights) + '+',
      label: 'AI Insights Delivered',
      description: 'Personalized recommendations provided',
      icon: '🧠'
    },
    {
      value: counters.savings + '%',
      label: 'Average Cost Savings',
      description: 'Reduction in input costs',
      icon: '💰'
    }
  ];

  return (
    <section className="py-20 bg-agri-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Farmers Worldwide
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Join thousands of farmers who have transformed their agricultural practices with KisanShaktiAI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2 animate-count-up">
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
              <p className="text-green-100 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              "KisanShaktiAI has revolutionized how we approach farming. The AI advisory and weather predictions have helped us increase our yield by 35%."
            </h3>
            <div className="text-green-200">
              <p className="font-semibold">Rajesh Kumar</p>
              <p className="text-sm">Progressive Farmer, Punjab</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
