
import React from 'react';
import { MessageSquare, Satellite, CloudRain, ShoppingCart, Smartphone, BarChart3 } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chat & Advisory",
      description: "Get instant answers to your farming questions from our AI-powered agricultural advisor. Available 24/7 in your local language.",
      image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Satellite className="w-8 h-8" />,
      title: "NDVI Monitoring",
      description: "Monitor crop health using satellite imagery and NDVI analysis. Track vegetation growth and identify problem areas early.",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <CloudRain className="w-8 h-8" />,
      title: "Weather Forecasting",
      description: "Precise weather forecasts and alerts tailored to your location. Plan your farming activities with confidence.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Farmer Marketplace",
      description: "Connect directly with buyers and sellers. Get fair prices for your produce and access quality inputs.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile & Offline",
      description: "Access all features on your mobile device, even when offline. No internet? No problem.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and analytics to track your farm's performance and optimize operations.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-agri-gradient block">Modern Farmers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of agricultural tools empowers farmers with the insights and capabilities needed for successful farming.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 bg-white rounded-full p-3 group-hover:bg-green-600 transition-colors duration-300">
                  <div className="text-green-600 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <button className="text-green-600 font-medium hover:text-green-700 transition-colors flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
