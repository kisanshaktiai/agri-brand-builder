
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import LeadPopupForm from './LeadPopupForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRequestDemo = () => {
    setIsLeadPopupOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-agri-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">KisanShaktiAI</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Home</a>
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Features</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Contact</a>
              
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 text-gray-700">
                <Globe size={16} />
                <select className="bg-transparent text-sm font-medium">
                  <option>EN</option>
                  <option>HI</option>
                  <option>MR</option>
                </select>
              </div>
              
              <button 
                onClick={handleRequestDemo}
                className="bg-agri-gradient text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Request Demo
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
              <nav className="flex flex-col space-y-4 p-6">
                <a href="#home" className="text-gray-700 hover:text-green-600 font-medium">Home</a>
                <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
                <a href="#about" className="text-gray-700 hover:text-green-600 font-medium">About</a>
                <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium">Contact</a>
                <button 
                  onClick={handleRequestDemo}
                  className="bg-agri-gradient text-white px-6 py-3 rounded-lg font-medium w-full"
                >
                  Request Demo
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <LeadPopupForm 
        isOpen={isLeadPopupOpen}
        onClose={() => setIsLeadPopupOpen(false)}
        source="header"
      />
    </>
  );
};

export default Header;
