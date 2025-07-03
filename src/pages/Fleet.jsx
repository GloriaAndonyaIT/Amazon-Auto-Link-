// Fleet.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CarDetails from './CarDetails';

const Fleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vehicles
        const vehiclesResponse = await fetch('https://amazon-auto-link.onrender.com/vehicles');
        if (!vehiclesResponse.ok) throw new Error('Failed to fetch vehicles');
        const vehiclesData = await vehiclesResponse.json();
        
        // Fetch categories
        const categoriesResponse = await fetch('https://amazon-auto-link.onrender.com/categories');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        
        setVehicles(vehiclesData);
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredVehicles = selectedCategory === 'All' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  const handleBookNow = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCloseDetails = () => {
    setSelectedVehicle(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-[#FACC15] text-xl">Loading fleet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
    
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#FACC15] mb-8 text-center" 
            style={{ fontFamily: 'Inter, sans-serif' }}>
          Our Luxury Fleet
        </h1>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                selectedCategory === 'All' 
                  ? 'bg-[#FACC15] text-[#0F172A]' 
                  : 'bg-[#1E293B] text-white hover:bg-[#334155]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedCategory === category.name 
                    ? 'bg-[#FACC15] text-[#0F172A]' 
                    : 'bg-[#1E293B] text-white hover:bg-[#334155]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center text-white py-12">
            <p className="text-xl">No vehicles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard 
                key={vehicle.id} 
                vehicle={vehicle} 
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Car Details Modal */}
      {selectedVehicle && (
        <CarDetails vehicle={selectedVehicle} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

const VehicleCard = ({ vehicle, onBookNow }) => {
  return (
    <StyledWrapper>
      <div className="flip">
        <div className="content">
          <div className="front">
            <h2>{vehicle.name}</h2>
            <p>{vehicle.category}</p>
            <div className="price-badge">
              ${vehicle.price.toFixed(2)}/day
            </div>
          </div>
          <div className="back">
            <h2>{vehicle.name}</h2>
            <p className="line-clamp-3">{vehicle.description}</p>
            <button 
              onClick={() => onBookNow(vehicle)}
              className="book-now-btn"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .flip {
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.5);
    padding: 1em;
    width: 100%;
    height: 300px;
    transform-style: preserve-3d;
    transition: 1s ease;
    border-radius: 0.5rem;
    position: relative;
  }

  .flip:hover {
    transform: rotateY(180deg);
  }

  /* Content */
  .flip .content {
    transform-style: preserve-3d;
    height: 100%;
  }

  .flip .back, .flip .front {
    transform-style: preserve-3d;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .flip .back {
    transform: rotateY(180deg);
  }

  .flip h2,
  .flip p {
    transform: translateZ(90px);
    text-shadow: 0 0 3px black;
    text-align: center;
  }

  .flip h2 {
    font-size: 1.5em;
    color: #fff;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
  }

  .flip p {
    font-size: 1em;
    color: #eee;
    line-height: 1.6em;
    margin-bottom: 1rem;
  }

  .flip::before,
  .flip::after {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background-image: linear-gradient(135deg, #0F172A, #1E293B);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: rotateY(180deg) translateZ(1px);
    border-radius: 0.5rem;
  }

  .flip::before {
    transform: none;
    background-image: linear-gradient(135deg, #1E293B, #0F172A);
    border-radius: 0.5rem;
  }

  .price-badge {
    background-color: #FACC15;
    color: #0F172A;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: bold;
    position: absolute;
    bottom: 1rem;
    transform: translateZ(90px);
  }

  .book-now-btn {
    background-color: #FACC15;
    color: #0F172A;
    padding: 0.5rem 1.5rem;
    border-radius: 9999px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: translateZ(90px);
    margin-top: 1rem;

    &:hover {
      background-color: #F59E0B;
      transform: translateZ(90px) scale(1.05);
    }
  }
`;

export default Fleet;