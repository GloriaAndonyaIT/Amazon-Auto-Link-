import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  const API_BASE_URL = 'https://amazon-auto-link.onrender.com';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setEditForm({
          name: user.displayName || '',
          email: user.email || ''
        });
        fetchBookings(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchBookings = async (currentUser) => {
    try {
      setLoading(true);
      setError(null);
      
      // Get Firebase token
      const token = await currentUser.getIdToken();
      
      const response = await fetch(`${API_BASE_URL}/api/bookings/my`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const bookingsData = await response.json();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // In a real app, you would update the user's profile here
    // For Firebase Auth, you would use updateProfile, updateEmail, etc.
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await auth.currentUser.delete();
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const token = await user.getIdToken();
      
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel booking');
      }

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));
      
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert(error.message || 'Failed to cancel booking');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">
      {/* Container with proper overflow control */}
      <div className="w-full max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-12">
        <div className="bg-white shadow rounded-lg overflow-hidden w-full">
          <div className="p-3 sm:p-6 lg:p-10 w-full">
            
            {/* Header - Prevent overflow */}
            <div className="w-full">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start">
                <div className="min-w-0 flex-1 pr-0 sm:pr-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-1 sm:mb-2 break-words">
                    My Profile
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    Manage your account and bookings
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={handleLogout}
                    className="w-full sm:w-auto px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1E293B] transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Information Section */}
            <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 sm:pt-8 w-full">
              
              {/* Profile Layout - Prevent overflow */}
              <div className="w-full">
                <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
                  
                  {/* Profile Details - Full width on mobile */}
                  <div className="flex-1 min-w-0 w-full lg:w-auto">
                    {isEditing ? (
                      <form onSubmit={handleEditSubmit} className="space-y-4 w-full">
                        <div className="w-full">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15] text-sm sm:text-base"
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15] text-sm sm:text-base"
                          />
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 w-full">
                          <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 bg-[#FACC15] text-[#0F172A] rounded-md hover:bg-[#F59E0B] transition-colors text-sm sm:text-base font-medium"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="w-full">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-4">
                          Personal Information
                        </h2>
                        <div className="space-y-3 mb-6 w-full">
                          <div className="bg-gray-50 rounded-lg p-3 w-full">
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Name</p>
                            <p className="text-sm sm:text-base text-gray-900 font-medium break-words">
                              {user?.displayName || 'Not provided'}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 w-full">
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                            <p className="text-sm sm:text-base text-gray-900 font-medium break-all">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 w-full">
                          <button
                            onClick={() => setIsEditing(true)}
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1E293B] transition-colors text-sm sm:text-base"
                          >
                            <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                            <span className="whitespace-nowrap">Edit Profile</span>
                          </button>
                          <button
                            onClick={handleDeleteAccount}
                            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base"
                          >
                            <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                            <span className="whitespace-nowrap">Delete Account</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Avatar - Prevent overflow */}
                  <div className="flex-shrink-0 flex justify-center lg:justify-end">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-500">
                          {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings Section */}
            <div className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 sm:pt-8 w-full">
              <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-4 sm:mb-6">
                My Bookings
              </h2>
              
              {/* Loading State */}
              {loading && (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg w-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FACC15] mx-auto mb-4"></div>
                  <p className="text-gray-500 text-sm sm:text-base">Loading bookings...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-8 sm:py-12 bg-red-50 rounded-lg w-full">
                  <p className="text-red-600 text-sm sm:text-base mb-4">{error}</p>
                  <button
                    onClick={() => fetchBookings(user)}
                    className="px-4 py-2 bg-[#FACC15] text-[#0F172A] rounded-md hover:bg-[#F59E0B] transition-colors text-sm sm:text-base font-medium"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && bookings.length === 0 && (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg w-full">
                  <div className="max-w-sm mx-auto px-4">
                    <p className="text-gray-500 text-sm sm:text-base mb-4">
                      You don't have any bookings yet.
                    </p>
                    <button
                      onClick={() => navigate('/fleet')}
                      className="w-full sm:w-auto px-6 py-2 bg-[#FACC15] text-[#0F172A] rounded-md hover:bg-[#F59E0B] transition-colors text-sm sm:text-base font-medium"
                    >
                      Browse Vehicles
                    </button>
                  </div>
                </div>
              )}

              {/* Bookings List */}
              {!loading && !error && bookings.length > 0 && (
                <div className="space-y-4 w-full">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow w-full overflow-hidden">
                      
                      {/* Single responsive layout for all screen sizes */}
                      <div className="w-full">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:justify-between sm:items-start">
                          
                          {/* Booking Details */}
                          <div className="flex-1 min-w-0 w-full sm:w-auto sm:pr-4">
                            <h3 className="font-semibold text-base sm:text-lg text-[#0F172A] mb-1 break-words">
                              {booking.vehicle}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 break-words">
                              {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                            </p>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-4">
                              <span className={`inline-block px-2 py-1 text-xs rounded-full w-fit ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                              <span className="font-semibold text-[#0F172A] text-sm sm:text-base">
                                ${booking.total_price}
                              </span>
                            </div>
                            
                            {/* Additional booking details */}
                            <div className="mt-2 text-xs sm:text-sm text-gray-500 space-y-1">
                              <p>Pickup: {booking.pickup_option}</p>
                              {booking.need_driver && <p>Driver requested</p>}
                              <p>Payment: {booking.payment_method}</p>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex-shrink-0 w-full sm:w-auto">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                              {booking.status === 'pending' && (
                                <button
                                  onClick={() => cancelBooking(booking.id)}
                                  className="w-full sm:w-auto px-3 py-2 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors whitespace-nowrap"
                                >
                                  Cancel
                                </button>
                              )}
                              <button 
                                onClick={() => navigate(`/booking/${booking.id}`)}
                                className="w-full sm:w-auto px-3 py-2 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors whitespace-nowrap"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;