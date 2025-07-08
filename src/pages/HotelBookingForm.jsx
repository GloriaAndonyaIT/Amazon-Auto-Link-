import React, { useState } from 'react';
import styled from 'styled-components';

const HotelBookingForm = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalHotel, setModalHotel] = useState(null);

  const kenyanHotels = [
    // Premium Nairobi Hotels
    { 
      name: "The Hemingways Nairobi", 
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Karen",
      price: "$280/night",
      rating: "4.9"
    },
    { 
      name: "Tribe Hotel Nairobi", 
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Gigiri",
      price: "$180/night",
      rating: "4.8"
    },
    { 
      name: "Villa Rosa Kempinski", 
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Westlands",
      price: "$220/night",
      rating: "4.9"
    },
    { 
      name: "Sarova Stanley", 
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - CBD",
      price: "$160/night",
      rating: "4.6"
    },
    { 
      name: "Fairmont The Norfolk", 
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - CBD",
      price: "$200/night",
      rating: "4.7"
    },
    { 
      name: "Radisson Blu Hotel", 
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Upper Hill",
      price: "$190/night",
      rating: "4.7"
    },
    { 
      name: "Dusit D2 Nairobi", 
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Riverside",
      price: "$170/night",
      rating: "4.5"
    },
    { 
      name: "Sankara Nairobi", 
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Westlands",
      price: "$210/night",
      rating: "4.8"
    },
    { 
      name: "Crowne Plaza Nairobi", 
      image: "https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Upper Hill",
      price: "$185/night",
      rating: "4.6"
    },
    { 
      name: "Four Points by Sheraton", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Hurlingham",
      price: "$175/night",
      rating: "4.5"
    },
    { 
      name: "Eka Hotel Nairobi", 
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - Eldoret Road",
      price: "$165/night",
      rating: "4.4"
    },
    { 
      name: "The Boma Nairobi", 
      image: "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Nairobi - South B",
      price: "$140/night",
      rating: "4.3"
    },
    // Beach Hotels
    { 
      name: "Serena Beach Resort", 
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Mombasa",
      price: "$150/night",
      rating: "4.5"
    },
    { 
      name: "Voyager Beach Resort", 
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Mombasa",
      price: "$130/night",
      rating: "4.4"
    },
    { 
      name: "Leopard Beach Resort", 
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Diani Beach",
      price: "$140/night",
      rating: "4.6"
    },
    { 
      name: "Baobab Beach Resort", 
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Diani Beach",
      price: "$120/night",
      rating: "4.3"
    },
    // Safari Lodges
    { 
      name: "Ashnil Samburu Camp", 
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Samburu",
      price: "$250/night",
      rating: "4.8"
    },
    { 
      name: "Sarova Mara Game Camp", 
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Masai Mara",
      price: "$300/night",
      rating: "4.9"
    },
    { 
      name: "Keekorok Lodge", 
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Masai Mara",
      price: "$280/night",
      rating: "4.7"
    },
    { 
      name: "Sentrim Amboseli", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Amboseli",
      price: "$220/night",
      rating: "4.6"
    },
    { 
      name: "Ol Tukai Lodge", 
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Amboseli",
      price: "$260/night",
      rating: "4.8"
    }
  ];

  const handleHotelClick = (hotel) => {
    setModalHotel(hotel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalHotel(null);
  };

  const handleBookingSubmit = () => {
    alert(`Booking request submitted for ${modalHotel.name}!`);
    handleCloseModal();
  };

  return (
    <StyledWrapper>
      <div className="form-container">
        <h1>Premium Hotels in Kenya</h1>
        <p className="subtitle">Discover luxury accommodations across Kenya - Click on any hotel card to book your stay</p>

        <div className="search-section">
          <div className="form-group">
            <label htmlFor="destination">Search by Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="e.g. Nairobi, Mombasa, Masai Mara"
            />
          </div>
        </div>

        <div className="hotels-section">
          <h2>Featured Hotels in Kenya</h2>
          <div className="hotel-gallery">
            {kenyanHotels.map((hotel, index) => (
              <div
                key={index}
                className="hotel-card"
                onClick={() => handleHotelClick(hotel)}
              >
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} loading="lazy" />
                  <div className="hotel-rating">★ {hotel.rating}</div>
                </div>
                <div className="hotel-info">
                  <h3>{hotel.name}</h3>
                  <p className="location">{hotel.location}</p>
                  <p className="price">{hotel.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && modalHotel && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Book {modalHotel.name}</h2>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="hotel-details">
                <img src={modalHotel.image} alt={modalHotel.name} />
                <div className="hotel-meta">
                  <h3>{modalHotel.name}</h3>
                  <p>📍 {modalHotel.location}</p>
                  <p>💰 {modalHotel.price}</p>
                  <p>⭐ {modalHotel.rating} rating</p>
                </div>
              </div>

              <div className="booking-form">
                <div className="date-grid">
                  <div className="form-group">
                    <label htmlFor="check-in">Check-in</label>
                    <input
                      type="date"
                      id="check-in"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="check-out">Check-out</label>
                    <input
                      type="date"
                      id="check-out"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Guests & Rooms</label>
                  <div className="guest-selector">
                    <select name="adults" required>
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                    </select>
                    <select name="children">
                      <option value="0">0 Children</option>
                      <option value="1">1 Child</option>
                      <option value="2">2 Children</option>
                    </select>
                    <select name="rooms" required>
                      <option value="1">1 Room</option>
                      <option value="2">2 Rooms</option>
                      <option value="3">3 Rooms</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Contact Email</label>
                  <input type="email" id="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="e.g. +254 712 345 678" required />
                </div>

                <div className="form-group">
                  <label htmlFor="special-requests">Special Requests</label>
                  <textarea
                    id="special-requests"
                    rows={3}
                    placeholder="Any special requirements?"
                  />
                </div>

                <button className="form-submit-btn" type="button" onClick={handleBookingSubmit}>
                  Book Now <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  padding: 20px;
  font-family: 'Inter', sans-serif;

  .form-container {
    max-width: 1200px;
    margin: 0 auto;
    color: white;
  }

  h1 {
    color: #FACC15;
    margin-bottom: 10px;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    text-align: center;
    color: #94a3b8;
    margin-bottom: 40px;
    font-size: 1.1rem;
  }

  .search-section {
    background: #1E293B;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .hotels-section h2 {
    color: #FACC15;
    margin-bottom: 20px;
    text-align: center;
    font-size: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .form-group label {
    margin-bottom: 8px;
    font-weight: 600;
    color: #FACC15;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #334155;
    background: #0F172A;
    color: white;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: #FACC15;
    box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.1);
  }

  .hotel-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin-top: 20px;
  }

  .hotel-card {
    background: #1E293B;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #334155;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .hotel-card:hover {
    transform: translateY(-8px);
    border-color: #FACC15;
    box-shadow: 0 20px 40px rgba(250, 204, 21, 0.15);
  }

  .hotel-image {
    position: relative;
    height: 220px;
    overflow: hidden;
  }

  .hotel-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .hotel-card:hover .hotel-image img {
    transform: scale(1.1);
  }

  .hotel-rating {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.8);
    color: #FACC15;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    backdrop-filter: blur(10px);
  }

  .hotel-info {
    padding: 20px;
  }

  .hotel-info h3 {
    color: white;
    margin-bottom: 8px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .location {
    color: #94a3b8;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  .price {
    color: #FACC15;
    font-weight: 700;
    font-size: 1.2rem;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    backdrop-filter: blur(5px);
  }

  .modal-content {
    background: #1E293B;
    border-radius: 20px;
    max-width: 650px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid #334155;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    border-bottom: 1px solid #334155;
    background: #0F172A;
    border-radius: 20px 20px 0 0;
  }

  .modal-header h2 {
    color: #FACC15;
    margin: 0;
    font-size: 1.4rem;
  }

  .close-btn {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 28px;
    cursor: pointer;
    padding: 0;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    color: #FACC15;
    background: rgba(250, 204, 21, 0.1);
  }

  .modal-body {
    padding: 25px;
  }

  .hotel-details {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
    padding: 20px;
    background: #0F172A;
    border-radius: 12px;
  }

  .hotel-details img {
    width: 140px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #334155;
  }

  .hotel-meta h3 {
    color: white;
    margin-bottom: 8px;
    font-size: 1.1rem;
  }

  .hotel-meta p {
    color: #94a3b8;
    margin-bottom: 5px;
    font-size: 0.9rem;
  }

  .booking-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .date-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .guest-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }

  .form-submit-btn {
    padding: 16px;
    background: linear-gradient(135deg, #FACC15 0%, #EAB308 100%);
    color: #0F172A;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-submit-btn:hover {
    background: linear-gradient(135deg, #EAB308 0%, #CA8A04 100%);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(250, 204, 21, 0.3);
  }

  @media (max-width: 768px) {
    .hotel-gallery {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    
    .modal-content {
      margin: 10px;
      border-radius: 16px;
    }
    
    .hotel-details {
      flex-direction: column;
      gap: 15px;
    }
    
    .hotel-details img {
      width: 100%;
      height: 180px;
    }
    
    .date-grid {
      grid-template-columns: 1fr;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .hotels-section h2 {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    .hotel-gallery {
      grid-template-columns: 1fr;
    }
    
    .guest-selector {
      grid-template-columns: 1fr;
    }
  }
`;

export default HotelBookingForm;