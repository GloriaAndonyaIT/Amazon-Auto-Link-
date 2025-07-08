import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, User, Plane, Car, Shield, Star } from 'lucide-react';

const AirportPickup = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Flight Information
    flightNumber: '',
    airline: '',
    arrivalDate: '',
    arrivalTime: '',
    departureAirport: '',
    
    // Pickup Details
    pickupLocation: 'terminal',
    destinationAddress: '',
    passengers: '1',
    luggage: 'standard',
    
    // Vehicle Preference
    vehicleType: 'sedan',
    
    // Special Requirements
    specialRequests: '',
    
    // Contact Preference
    contactMethod: 'phone'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Pickup request submitted successfully! You will receive confirmation shortly.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-full shadow-lg">
              <Plane className="w-10 h-10 text-slate-900" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Nairobi Airport Pickup
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Premium airport transfer service from JKIA to anywhere in Nairobi. Professional drivers, luxury vehicles, and guaranteed on-time service.
          </p>
          
          {/* Trust indicators */}
          <div className="flex justify-center items-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700">Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700">5-Star Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-slate-700">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 space-y-10">
          {/* Personal Information */}
          <div className="border-b border-slate-200 pb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <User className="w-6 h-6 text-slate-900" />
              </div>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="+254 700 123 456"
                />
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="border-b border-slate-200 pb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Plane className="w-6 h-6 text-slate-900" />
              </div>
              Flight Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Flight Number *
                </label>
                <input
                  type="text"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="e.g., KQ101, EK719"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Airline
                </label>
                <input
                  type="text"
                  name="airline"
                  value={formData.airline}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="e.g., Kenya Airways, Emirates"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Arrival Date *
                </label>
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Arrival Time *
                </label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Departure Airport/City
                </label>
                <input
                  type="text"
                  name="departureAirport"
                  value={formData.departureAirport}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="e.g., Dubai International, London Heathrow"
                />
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="border-b border-slate-200 pb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-slate-900" />
              </div>
              Pickup Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Pickup Location *
                </label>
                <select
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                >
                  <option value="terminal">JKIA Terminal (Arrivals Hall)</option>
                  <option value="curbside">Curbside Pickup</option>
                  <option value="parking">Parking Area</option>
                  <option value="other">Other Location (specify below)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Destination Address in Nairobi *
                </label>
                <textarea
                  name="destinationAddress"
                  value={formData.destinationAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="Enter your destination address (e.g., Westlands, CBD, Karen, etc.)"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Number of Passengers *
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                    <option value="6+">6+ Passengers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Luggage Requirements
                  </label>
                  <select
                    name="luggage"
                    value={formData.luggage}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  >
                    <option value="standard">Standard Luggage</option>
                    <option value="light">Light Luggage</option>
                    <option value="heavy">Heavy Luggage</option>
                    <option value="oversized">Oversized Items</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Preference */}
          <div className="border-b border-slate-200 pb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Car className="w-6 h-6 text-slate-900" />
              </div>
              Vehicle Preference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: 'sedan', label: 'Sedan', desc: 'Toyota Camry, Nissan Teana', price: 'KSh 3,500' },
                { value: 'suv', label: 'SUV', desc: 'Toyota Prado, Nissan X-Trail', price: 'KSh 4,500' },
                { value: 'luxury', label: 'Luxury', desc: 'BMW 5 Series, Mercedes E-Class', price: 'KSh 6,500' },
                { value: 'van', label: 'Van/Bus', desc: 'Toyota Hiace, Nissan Urvan', price: 'KSh 5,000' }
              ].map((vehicle) => (
                <div key={vehicle.value} className="relative">
                  <input
                    type="radio"
                    name="vehicleType"
                    value={vehicle.value}
                    checked={formData.vehicleType === vehicle.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <label
                    className={`block cursor-pointer rounded-xl border-3 p-6 text-center transition-all transform hover:scale-105 ${
                      formData.vehicleType === vehicle.value
                        ? 'border-yellow-400 bg-yellow-50 text-slate-900 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-yellow-200 hover:shadow-md'
                    }`}
                  >
                    <div className="font-bold text-lg text-slate-900">{vehicle.label}</div>
                    <div className="text-sm text-slate-600 mt-2">{vehicle.desc}</div>
                    <div className="text-lg font-bold text-yellow-600 mt-3">{vehicle.price}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requirements */}
          <div className="pb-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Special Requests or Instructions
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-slate-900 font-medium"
                  placeholder="Any special requirements, accessibility needs, child seats, or additional instructions..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">
                  Preferred Contact Method
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={formData.contactMethod === 'phone'}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="font-medium text-slate-700">Phone Call</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="sms"
                      checked={formData.contactMethod === 'sms'}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="font-medium text-slate-700">SMS/WhatsApp</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={formData.contactMethod === 'email'}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="font-medium text-slate-700">Email</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-slate-900 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 transform hover:scale-105 shadow-lg"
            >
              Book Airport Pickup Now
            </button>
            <p className="text-sm text-slate-600 mt-4 max-w-md mx-auto">
              You will receive a confirmation email with pickup details and driver information within 15 minutes.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              * Payment can be made in cash or M-Pesa to the driver
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AirportPickup;