
import React from 'react';
import { Leaf, Users, Target, Award } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability First",
      description: "Promoting eco-friendly farming practices that preserve our environment for future generations."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Farmer Empowerment",
      description: "Giving farmers the tools and knowledge they need to make informed decisions and increase productivity."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Agriculture",
      description: "Leveraging AI and data analytics to optimize crop yields while minimizing resource waste."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Innovation Excellence",
      description: "Continuously advancing agricultural technology to solve real-world farming challenges."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transforming Agriculture with
            <span className="text-agri-gradient block">Artificial Intelligence</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed">
              KisanShaktiAI is revolutionizing the agricultural landscape by combining cutting-edge artificial intelligence 
              with deep agricultural expertise. We believe that modern farming should be sustainable, profitable, and accessible to all farmers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="p-12 lg:p-16">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission: Empowering Every Farmer
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're on a mission to democratize agricultural intelligence. From smallholder farms to large agricultural enterprises, 
                our platform provides actionable insights that help farmers make better decisions, reduce costs, and increase yields.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through satellite monitoring, weather prediction, soil analysis, and AI-powered advisory services, 
                we're building the future of sustainable agriculture.
              </p>
            </div>
            <div className="relative h-96 lg:h-full">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Farmer using technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
