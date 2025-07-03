// CarDetails.jsx
import React from 'react';

const CarDetails = ({ vehicle, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F172A] rounded-lg max-w-4xl w-full overflow-hidden shadow-xl border border-[#FACC15]">
        <div className="relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#FACC15] text-[#0F172A] rounded-full p-2 z-10 hover:bg-[#F59E0B] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Car Content */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Car Image */}
            <div className="bg-[#1E293B] h-64 md:h-full flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="bg-[#334155] w-full h-48 flex items-center justify-center rounded-lg">
                  <span className="text-lg">Car Image</span>
                </div>
              </div>
            </div>
            
            {/* Car Details */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-[#FACC15] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                {vehicle.name}
              </h2>
              <div className="flex items-center mb-4">
                <span className="bg-[#FACC15] text-[#0F172A] px-3 py-1 rounded-full text-sm font-bold">
                  {vehicle.category}
                </span>
                <span className="ml-4 text-white font-bold">
                  ${vehicle.price.toFixed(2)} / day
                </span>
              </div>
              
              <p className="text-gray-300 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                {vehicle.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#FACC15] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <span className="block text-sm text-gray-400">Type</span>
                    <span>Luxury Sedan</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Seats</span>
                    <span>5</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Engine</span>
                    <span>V6 3.0L</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400">Transmission</span>
                    <span>Automatic</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-[#FACC15] text-[#0F172A] py-3 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;