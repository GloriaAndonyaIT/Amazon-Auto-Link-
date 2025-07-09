import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { 
  CheckCircleIcon, 
  CalendarDaysIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CreditCardIcon,
  UserIcon,
  TruckIcon,
  ClockIcon,
  PrinterIcon,
  ShareIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const API_BASE_URL = 'https://amazon-auto-link.onrender.com';

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId, retryCount]);

  const handleRetry = () => {
    setError('');
    setLoading(true);
    setRetryCount(prev => prev + 1);
  };

  const fetchBookingDetails = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      console.log('Fetching booking details for ID:', bookingId);
      
      const token = await user.getIdToken();
      console.log('Token obtained, making API request...');
      
      // Check if API server is reachable first
      try {
        const healthCheck = await fetch(`${API_BASE_URL}/health`, {
          method: 'GET',
          signal: AbortSignal.timeout(5000) // 5 second timeout for health check
        });
        console.log('Health check response:', healthCheck.status);
      } catch (healthError) {
        console.warn('Health check failed, but continuing with booking request...');
      }
      
      const response = await fetch(`${API_BASE_URL}/booking/${bookingId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // Add timeout and other options
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        
        if (response.status === 404) {
          throw new Error('Booking not found. Please check the booking ID.');
        } else if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You may not have permission to view this booking.');
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`Failed to fetch booking details: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log('Booking data received:', data);
      setBooking(data);
    } catch (err) {
      console.error('Error fetching booking details:', err);
      
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your internet connection and try again.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Unable to connect to the server. The service may be temporarily unavailable. Please try again later.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateRentalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Car Rental Booking Confirmation',
          text: `My booking confirmation for ${booking?.vehicle?.name}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FACC15] mx-auto mb-4"></div>
          <p className="text-white">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Unable to Load Booking</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="bg-[#FACC15] text-[#0F172A] px-6 py-2 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="bg-[#334155] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#475569] transition-colors"
            >
              Go to Profile
            </button>
            <button
              onClick={() => navigate('/fleet')}
              className="bg-[#334155] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#475569] transition-colors"
            >
              Return to Fleet
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>If the problem persists, please contact support.</p>
            <p>Booking ID: {bookingId}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Booking Not Found</h1>
          <p className="text-gray-400 mb-4">The booking you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/fleet')}
            className="bg-[#FACC15] text-[#0F172A] px-6 py-2 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors"
          >
            Return to Fleet
          </button>
        </div>
      </div>
    );
  }

  const rentalDays = calculateRentalDays(booking.start_date, booking.end_date);

  return (
    <div className="min-h-screen bg-[#0F172A] py-8 px-4 font-['Inter','Open Sans',sans-serif]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-[#1E293B] rounded-t-lg p-6 border-b border-[#FACC15]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center text-[#FACC15] hover:text-[#F59E0B] transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Profile
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex items-center bg-[#334155] text-white px-4 py-2 rounded-lg hover:bg-[#475569] transition-colors"
              >
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center bg-[#334155] text-white px-4 py-2 rounded-lg hover:bg-[#475569] transition-colors"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-[#FACC15]">Booking Confirmed!</h1>
              <p className="text-gray-300">Booking ID: #{booking.id}</p>
            </div>
          </div>
          
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
            <p className="text-green-200 font-medium">
              Your booking has been confirmed and is being processed. You will receive a confirmation email shortly.
            </p>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-b-lg p-6 space-y-6">
          {/* Vehicle Information */}
          <div className="bg-[#0F172A] rounded-lg p-6 border border-[#334155]">
            <div className="flex items-center mb-4">
              <TruckIcon className="h-6 w-6 text-[#FACC15] mr-2" />
              <h2 className="text-xl font-bold text-[#FACC15]">Vehicle Details</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {booking.vehicle?.image_url ? (
                  <img 
                    src={booking.vehicle.image_url} 
                    alt={booking.vehicle.name} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="bg-[#334155] w-full h-48 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{booking.vehicle?.name}</h3>
                <p className="text-gray-300">{booking.vehicle?.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Daily Rate:</span>
                    <p className="text-white font-semibold">{formatCurrency(booking.vehicle?.price)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Rental Days:</span>
                    <p className="text-white font-semibold">{rentalDays} days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Rental Period */}
            <div className="bg-[#0F172A] rounded-lg p-6 border border-[#334155]">
              <div className="flex items-center mb-4">
                <CalendarDaysIcon className="h-6 w-6 text-[#FACC15] mr-2" />
                <h2 className="text-xl font-bold text-[#FACC15]">Rental Period</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Start Date:</span>
                  <p className="text-white font-semibold">{formatDate(booking.start_date)}</p>
                </div>
                <div>
                  <span className="text-gray-400">End Date:</span>
                  <p className="text-white font-semibold">{formatDate(booking.end_date)}</p>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <p className="text-white font-semibold">{rentalDays} days</p>
                </div>
              </div>
            </div>

            {/* Pickup/Delivery */}
            <div className="bg-[#0F172A] rounded-lg p-6 border border-[#334155]">
              <div className="flex items-center mb-4">
                <MapPinIcon className="h-6 w-6 text-[#FACC15] mr-2" />
                <h2 className="text-xl font-bold text-[#FACC15]">Pickup/Delivery</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Option:</span>
                  <p className="text-white font-semibold capitalize">
                    {booking.pickup_option === 'pickup' ? 'Self Pickup' : 'Delivery'}
                  </p>
                </div>
                {booking.pickup_option === 'delivery' && booking.delivery_address && (
                  <div>
                    <span className="text-gray-400">Delivery Address:</span>
                    <p className="text-white font-semibold">{booking.delivery_address}</p>
                  </div>
                )}
                {booking.need_driver && (
                  <div className="bg-[#FACC15]/20 border border-[#FACC15] rounded-lg p-3">
                    <p className="text-[#FACC15] font-semibold">✓ Driver Service Included</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-[#0F172A] rounded-lg p-6 border border-[#334155]">
            <div className="flex items-center mb-4">
              <UserIcon className="h-6 w-6 text-[#FACC15] mr-2" />
              <h2 className="text-xl font-bold text-[#FACC15]">Customer Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Full Name:</span>
                  <p className="text-white font-semibold">{booking.full_name}</p>
                </div>
                <div>
                  <span className="text-gray-400">Phone:</span>
                  <p className="text-white font-semibold">{booking.phone}</p>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p className="text-white font-semibold">{booking.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">ID Number:</span>
                  <p className="text-white font-semibold">{booking.id_number}</p>
                </div>
                <div>
                  <span className="text-gray-400">Driving License:</span>
                  <p className="text-white font-semibold">{booking.driving_license}</p>
                </div>
                <div>
                  <span className="text-gray-400">Payment Method:</span>
                  <p className="text-white font-semibold capitalize">{booking.payment_method}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.special_requests && (
            <div className="bg-[#0F172A] rounded-lg p-6 border border-[#334155]">
              <div className="flex items-center mb-4">
                <ClockIcon className="h-6 w-6 text-[#FACC15] mr-2" />
                <h2 className="text-xl font-bold text-[#FACC15]">Special Requests</h2>
              </div>
              <p className="text-gray-300">{booking.special_requests}</p>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="bg-[#0F172A] rounded-lg p-6 border border-[#334155]">
            <div className="flex items-center mb-4">
              <CreditCardIcon className="h-6 w-6 text-[#FACC15] mr-2" />
              <h2 className="text-xl font-bold text-[#FACC15]">Price Breakdown</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Vehicle Rental ({rentalDays} days)</span>
                <span className="text-white">{formatCurrency(booking.vehicle?.price * rentalDays)}</span>
              </div>
              {booking.need_driver && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Driver Service ({rentalDays} days)</span>
                  <span className="text-white">{formatCurrency(booking.driver_fee)}</span>
                </div>
              )}
              <hr className="border-[#334155]" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-[#FACC15]">Total Amount</span>
                <span className="text-[#FACC15]">{formatCurrency(booking.total_price)}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-[#FACC15]/20 border border-[#FACC15] rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#FACC15] mb-4">Next Steps</h2>
            <div className="space-y-2 text-white">
              <p>• You will receive a confirmation email with all booking details</p>
              <p>• Our team will contact you 24 hours before your rental date</p>
              <p>• Please have your driving license and ID ready for pickup/delivery</p>
              <p>• For any questions, contact us at support@amazonautolink.com</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/fleet')}
              className="bg-[#334155] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#475569] transition-colors"
            >
              Book Another Vehicle
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="bg-[#FACC15] text-[#0F172A] px-8 py-3 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors"
            >
              View All Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;