
import React, { useEffect, useState } from 'react';
import { ArrowRight, Cloud, Thermometer, Droplets, Wind } from 'lucide-react';
import { UniversalLeadForm } from './forms/UniversalLeadForm';

const HeroSection = () => {
  const [currentData, setCurrentData] = useState({
    temp: '28°C',
    humidity: '65%',
    wind: '12 km/h',
    rainfall: '15mm'
  });

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setCurrentData({
        temp: `${Math.floor(Math.random() * 15 + 20)}°C`,
        humidity: `${Math.floor(Math.random() * 30 + 50)}%`,
        wind: `${Math.floor(Math.random() * 10 + 8)} km/h`,
        rainfall: `${Math.floor(Math.random() * 20 + 5)}mm`
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-green-700/70 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Modern Agriculture Technology"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up">
                Bring Growth.
                <span className="block text-green-300">Fresh Agriculture.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-green-100 max-w-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
                Revolutionize your farming with AI-powered insights, real-time monitoring, and data-driven decisions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <UniversalLeadForm 
                trigger="button"
                buttonText="Request Demo"
              />
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-800 transition-all duration-300">
                Book a Call
              </button>
            </div>
          </div>

          {/* Smart Weather Widget */}
          <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-float">
              <div className="text-white mb-6">
                <h3 className="text-2xl font-bold mb-2">Live Farm Data</h3>
                <p className="text-green-200">Real-time environmental monitoring</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-2">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                    <span className="text-white font-medium">Temperature</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentData.temp}</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-2">
                    <Droplets className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentData.humidity}</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-2">
                    <Wind className="w-6 h-6 text-gray-300" />
                    <span className="text-white font-medium">Wind Speed</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentData.wind}</p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-2">
                    <Cloud className="w-6 h-6 text-blue-300" />
                    <span className="text-white font-medium">Rainfall</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{currentData.rainfall}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
