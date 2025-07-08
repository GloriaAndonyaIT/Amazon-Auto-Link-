import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const API_BASE_URL = 'https://amazon-auto-link.onrender.com';

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    let total = days * vehicle.price;
    if (needDriver) total += 1000 * days; // Driver fee
    return total;
  };

  const handleBookNow = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: `/book/${vehicle.id}` } });
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
        vehicle_id: vehicle.id,
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
              <p className="text-gray-300">Your booking for {vehicle.name} has been submitted successfully.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1E293B] h-64 md:h-full flex items-center justify-center">
                <div className="text-white text-center p-4">
                  {vehicle.image_url ? (
                    <img 
                      src={vehicle.image_url} 
                      alt={vehicle.name} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="bg-[#334155] w-full h-48 flex items-center justify-center rounded-lg">
                      <span className="text-lg">No Image Available</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4 text-white">
                <h2 className="text-3xl font-bold text-[#FACC15]">{vehicle.name}</h2>
                <p className="text-gray-300">{vehicle.description}</p>
                <p className="text-[#FACC15] font-bold">Price: KES {vehicle.price}/day</p>

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
                    <label htmlFor="driver">Need a driver?</label>
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