
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        organization: '',
        contactName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your
              <span className="text-agri-gradient block">Agricultural Operations?</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch with our agricultural technology experts and discover how KisanShaktiAI can benefit your farming operations.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Form */}
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                        Organization *
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        required
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your organization name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Tell us about your farming operations and how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-agri-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 p-4 bg-green-100 text-green-800 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 p-4 bg-red-100 text-red-800 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>Something went wrong. Please try again or contact us directly.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-agri-gradient p-8 lg:p-12 text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4 mb-8">
                  <p className="flex items-start space-x-3">
                    <span className="text-green-200">📧</span>
                    <span>contact@kisanshaktiai.com</span>
                  </p>
                  <p className="flex items-start space-x-3">
                    <span className="text-green-200">📞</span>
                    <span>+91 (800) 123-4567</span>
                  </p>
                  <p className="flex items-start space-x-3">
                    <span className="text-green-200">📍</span>
                    <span>Agricultural Technology Hub, Bangalore, India</span>
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Why Choose KisanShaktiAI?</h4>
                  <ul className="space-y-2 text-green-100">
                    <li>✓ 24/7 AI-powered agricultural support</li>
                    <li>✓ Multi-language platform support</li>
                    <li>✓ Real-time satellite monitoring</li>
                    <li>✓ Proven track record with 25K+ farmers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
