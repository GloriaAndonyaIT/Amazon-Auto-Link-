import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const BookingForm = ({ vehicle }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (startDate && endDate && vehicle?.price) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 0;
      setTotalPrice(days > 0 ? days * vehicle.price : 0);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!auth.currentUser) {
      navigate('/login', { state: { from: `/book/${vehicle.id}` } });
      return;
    }

    // Validate endDate after startDate
    if (new Date(endDate) <= new Date(startDate)) {
      setError('End date must be after the start date.');
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingData = {
        userId: auth.currentUser.uid,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: totalPrice,
        specialRequests: specialRequests,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">You will be redirected to your profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Book {vehicle?.name}</h2>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15]"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15]"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
          <textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15]"
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-[#0F172A] mb-2">Booking Summary</h3>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Daily Rate</span>
            <span className="font-medium">${vehicle?.price?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">
              {startDate && endDate
                ? `${Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))} days`
                : '0 days'}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-lg font-bold text-[#0F172A]">Total</span>
            <span className="text-lg font-bold text-[#0F172A]">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !startDate || !endDate}
          className="w-full py-3 px-4 bg-[#FACC15] text-[#0F172A] font-bold rounded-md hover:bg-[#F59E0B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FACC15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
