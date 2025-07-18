// src/pages/Contact.jsx
import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800" style={{ color: '#0F172A' }}>
                Get in Touch
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {/* Location */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#FACC15' }} />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Our Location</h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-600 break-words">
                      Embakasi Utawala Astrol, Nairobi, Kenya
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#FACC15' }} />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Email Address</h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-600 break-all">
                      info@example.com
                    </p>
                    <a 
                      href="mailto:info@example.com" 
                      className="mt-2 inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white hover:bg-opacity-90 transition-colors"
                      style={{ backgroundColor: '#0F172A' }}
                    >
                      Send Email
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#FACC15' }} />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Phone Number</h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-600 break-all">
                      +254 757895570
                    </p>
                    <a 
                      href="tel:+254757895570" 
                      className="mt-2 inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white hover:bg-opacity-90 transition-colors"
                      style={{ backgroundColor: '#0F172A' }}
                    >
                      Call Now
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#FACC15' }} />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">WhatsApp</h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">
                      Chat with us on WhatsApp
                    </p>
                    <a 
                      href="https://wa.me/254750528870" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white hover:bg-opacity-90 transition-colors"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <FaWhatsapp className="mr-1 sm:mr-2" />
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800" style={{ color: '#0F172A' }}>
                Ready to Get Started?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                We're here to help you with any questions or needs you might have. Reach out today!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href="tel:+254757895570" 
                  className="flex-1 inline-flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white hover:bg-opacity-90 transition-colors"
                  style={{ backgroundColor: '#0F172A' }}
                >
                  Call Now
                </a>
                <a 
                  href="mailto:info@example.com" 
                  className="flex-1 inline-flex justify-center items-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                  style={{ color: '#0F172A', borderColor: '#0F172A' }}
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800" style={{ color: '#0F172A' }}>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors text-sm sm:text-base"
                  style={{ 
                    borderColor: '#0F172A', 
                    focusRingColor: '#FACC15',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors text-sm sm:text-base"
                  style={{ 
                    borderColor: '#0F172A', 
                    focusRingColor: '#FACC15',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors text-sm sm:text-base"
                  style={{ 
                    borderColor: '#0F172A', 
                    focusRingColor: '#FACC15',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="block w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none transition-colors resize-y text-sm sm:text-base"
                  style={{ 
                    borderColor: '#0F172A', 
                    focusRingColor: '#FACC15',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors hover:bg-opacity-90"
                  style={{ 
                    backgroundColor: '#0F172A',
                    focusRingColor: '#FACC15'
                  }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Maps Integration */}
        <div className="mt-8 sm:mt-12 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800" style={{ color: '#0F172A' }}>
            Find Us on Google Maps
          </h2>
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            <div className="w-full h-0 pb-[56.25%] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.650536747285!2d36.953456!3d-1.3663891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1c7c6d4d7c7b%3A0x1c7c6d4d7c7b1c7c!2sEmbakasi%20Utawala%20Astrol%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://www.google.com/maps/search/Embakasi+Utawala+Astrol,+Nairobi,+Kenya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: '#0F172A' }}
            >
              <FaMapMarkerAlt className="mr-1 sm:mr-2" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;