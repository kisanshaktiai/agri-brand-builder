
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-agri-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <h3 className="text-xl font-bold">KisanShaktiAI</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Revolutionizing agriculture through artificial intelligence, empowering farmers with data-driven insights for sustainable and profitable farming.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">AI Advisory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Satellite Monitoring</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Weather Forecasting</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Crop Analytics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Marketplace Access</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Mobile Solutions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Vision Ai Private Limited, Kolhapur, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">+91 898 398 9495</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">contact@kisanshaktiai.in</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Subscribe to Updates</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:border-green-400 focus:outline-none text-white"
                />
                <button className="bg-agri-gradient px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} KisanShaktiAI. All rights reserved. Powered by Agricultural Intelligence.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🌱 Sustainable Farming</span>
              <span>🤖 AI-Powered</span>
              <span>🇮🇳 Made in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
