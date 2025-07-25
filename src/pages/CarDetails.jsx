import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const CarDetails = ({ vehicle, onClose }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [pickupOption, setPickupOption] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [needDriver, setNeedDriver] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [vehicleDetails, setVehicleDetails] = useState(vehicle);
  const navigate = useNavigate();

  const API_BASE_URL = 'https://amazon-auto-link.onrender.com';

  // Fallback images for different vehicle types
  const fallbackImages = {
    'SUV': 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop&auto=format',
    'Sedan': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop&auto=format',
    'Van': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
    'Truck': 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop&auto=format',
    'default': 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop&auto=format'
  };

  useEffect(() => {
    // Fetch vehicle details from backend if only ID is provided
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/vehicle/${vehicle.id || vehicle}`);
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle details');
        }
        const data = await response.json();
        setVehicleDetails(data);
        setCurrentImageUrl(data.image_url || fallbackImages[data.category] || fallbackImages.default);
        setImageLoading(true);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
        setCurrentImageUrl(fallbackImages.default);
        setImageError(true);
      }
    };

    if (typeof vehicle === 'object' && vehicle.image_url) {
      // If vehicle object with image_url is passed
      setCurrentImageUrl(vehicle.image_url || fallbackImages[vehicle.category] || fallbackImages.default);
      setImageLoading(true);
    } else if (vehicle.id || typeof vehicle === 'number') {
      // If only vehicle ID is passed, fetch details from backend
      fetchVehicleDetails();
    } else {
      // Fallback if no valid vehicle data
      setCurrentImageUrl(fallbackImages.default);
      setImageError(true);
    }
  }, [vehicle]);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !vehicleDetails) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    let total = days * vehicleDetails.price;
    if (needDriver) total += 1000 * days; // Driver fee
    return total;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    console.error('Image failed to load:', currentImageUrl);
    
    // Try fallback image if original failed
    if (currentImageUrl === vehicleDetails?.image_url) {
      const categoryFallback = fallbackImages[vehicleDetails?.category] || fallbackImages.default;
      console.log('Trying fallback image:', categoryFallback);
      setCurrentImageUrl(categoryFallback);
      setImageLoading(true);
      setImageError(false);
    } else {
      // If fallback also failed, show error
      setImageError(true);
    }
  };

  const handleBookNow = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: `/book/${vehicleDetails.id}` } });
      return;
    }

    if (!isFormValid) {
      setError('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = await user.getIdToken();
      const totalPrice = calculateTotalPrice();
      
      const bookingData = {
        vehicle_id: vehicleDetails.id,
        start_date: startDate,
        end_date: endDate,
        full_name: fullName,
        phone: phone,
        email: email,
        id_number: idNumber,
        driving_license: drivingLicense,
        pickup_option: pickupOption,
        delivery_address: pickupOption === 'delivery' ? deliveryAddress : null,
        need_driver: needDriver,
        special_requests: specialRequests,
        payment_method: paymentMethod,
        total_price: totalPrice,
        driver_fee: needDriver ? 1000 * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1) : 0
      };

      const response = await fetch(`${API_BASE_URL}/booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Full error response:', responseData);
        throw new Error(responseData.error || responseData.message || `Booking failed (${response.status})`);
      }

      setIsBookingSuccess(true);
      setTimeout(() => {
        onClose();
        navigate(`/booking-confirmation/${responseData.booking_id}`);
      }, 1500);

    } catch (error) {
      console.error('Full booking error:', error);
      setError(error.message || 'Booking failed. Please try again.');
      if (process.env.NODE_ENV === 'development') {
        setError(`${error.message}. Please check console for details.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    startDate &&
    endDate &&
    fullName &&
    phone &&
    email &&
    idNumber &&
    drivingLicense &&
    pickupOption &&
    paymentMethod &&
    (pickupOption === 'pickup' || (pickupOption === 'delivery' && deliveryAddress)) &&
    agreeTerms;

  if (!vehicleDetails) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0F172A] rounded-lg p-8 text-white">
          Loading vehicle details...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F172A] rounded-lg max-w-4xl w-full overflow-y-auto max-h-[95vh] shadow-xl border border-[#FACC15] font-['Inter','Open Sans',sans-serif]">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#FACC15] text-[#0F172A] rounded-full p-2 z-10 hover:bg-[#F59E0B] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {isBookingSuccess ? (
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircleIcon className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#FACC15] mb-2">Booking Confirmed!</h2>
              <p className="text-gray-300">Your booking for {vehicleDetails.name} has been submitted successfully.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1E293B] h-64 md:h-full flex items-center justify-center">
                <div className="text-white text-center p-4 w-full">
                  <div className="relative">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-[#334155] w-full h-48 flex items-center justify-center rounded-lg">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FACC15]"></div>
                      </div>
                    )}
                    {currentImageUrl && !imageError ? (
                      <img 
                        src={currentImageUrl} 
                        alt={vehicleDetails.name} 
                        className="w-full h-48 object-cover rounded-lg"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{ display: imageLoading ? 'none' : 'block' }}
                      />
                    ) : (
                      <div className="bg-[#334155] w-full h-48 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="text-lg block mb-2">{vehicleDetails.name}</span>
                          <span className="text-sm text-gray-400">Vehicle Image</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 text-white">
                <h2 className="text-3xl font-bold text-[#FACC15]">{vehicleDetails.name}</h2>
                <p className="text-gray-300">{vehicleDetails.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[#FACC15] font-bold">Price: KES {vehicleDetails.price}/day</p>
                  {vehicleDetails.category && (
                    <span className="bg-[#FACC15] text-[#0F172A] px-3 py-1 rounded-full text-sm font-medium">
                      {vehicleDetails.category}
                    </span>
                  )}
                </div>

                {startDate && endDate && (
                  <div className="bg-[#1E293B] p-4 rounded-lg border border-[#FACC15]">
                    <p className="text-[#FACC15] font-bold">
                      Total: KES {calculateTotalPrice().toLocaleString()}
                      {needDriver && (
                        <span className="text-sm text-gray-300 block">
                          (Includes driver fee: KES {(1000 * (Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1)).toLocaleString()})
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Full Name *" 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number *" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                  />
                  <input 
                    type="text" 
                    placeholder="ID/Passport Number *" 
                    value={idNumber} 
                    onChange={e => setIdNumber(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                  />
                  <input 
                    type="text" 
                    placeholder="Driving License Number *" 
                    value={drivingLicense} 
                    onChange={e => setDrivingLicense(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                  />

                  <label className="block text-sm text-gray-400">Delivery Option *</label>
                  <select 
                    value={pickupOption} 
                    onChange={e => setPickupOption(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none"
                  >
                    <option value="">Select Option</option>
                    <option value="pickup">I will pick up the car</option>
                    <option value="delivery">Deliver to my location</option>
                  </select>

                  {pickupOption === 'delivery' && (
                    <input
                      type="text"
                      placeholder="Delivery Address *"
                      value={deliveryAddress}
                      onChange={e => setDeliveryAddress(e.target.value)}
                      className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none"
                    />
                  )}

                  <div className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      id="driver" 
                      checked={needDriver} 
                      onChange={e => setNeedDriver(e.target.checked)} 
                      className="text-[#FACC15] focus:ring-[#FACC15]"
                    />
                    <label htmlFor="driver">Need a driver? (+KES 1,000/day)</label>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm text-gray-400">Start Date *</label>
                      <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400">End Date *</label>
                      <input 
                        type="date" 
                        value={endDate} 
                        onChange={e => setEndDate(e.target.value)} 
                        min={startDate || new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none" 
                      />
                    </div>
                  </div>

                  <textarea 
                    placeholder="Special Requests (optional)" 
                    value={specialRequests} 
                    onChange={e => setSpecialRequests(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded h-20 text-white focus:border-[#FACC15] focus:outline-none" 
                  />

                  <select 
                    value={paymentMethod} 
                    onChange={e => setPaymentMethod(e.target.value)} 
                    className="w-full bg-[#1E293B] border border-gray-600 p-2 rounded text-white focus:border-[#FACC15] focus:outline-none"
                  >
                    <option value="">Select Payment Method *</option>
                    <option value="mpesa">Mpesa</option>
                    <option value="cash">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                  </select>

                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={agreeTerms} 
                      onChange={e => setAgreeTerms(e.target.checked)} 
                      className="text-[#FACC15] focus:ring-[#FACC15]"
                      required
                    />
                    <label htmlFor="terms" className="text-sm">I agree to the terms and conditions *</label>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-[#FACC15] text-[#0F172A] py-3 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Book Now'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;