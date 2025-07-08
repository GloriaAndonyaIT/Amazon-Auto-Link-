import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setEditForm({
          name: user.displayName || '',
          email: user.email || ''
        });
        fetchBookings(user.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchBookings = async (userId) => {
    try {
      const q = query(collection(db, 'bookings'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
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
      // In a real app, you would update the booking status in Firestore here
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A] mb-2">My Profile</h1>
                <p className="text-gray-600">Manage your account and bookings</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1E293B] transition-colors"
              >
                Sign Out
              </button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15]"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15]"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#FACC15] text-[#0F172A] rounded-md hover:bg-[#F59E0B] transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <h2 className="text-xl font-semibold text-[#0F172A]">Personal Information</h2>
                      <div className="mt-4 space-y-2">
                        <p className="text-gray-700"><span className="font-medium">Name:</span> {user?.displayName || 'Not provided'}</p>
                        <p className="text-gray-700"><span className="font-medium">Email:</span> {user?.email}</p>
                      </div>
                      <div className="mt-6 flex space-x-3">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1E293B] transition-colors"
                        >
                          <PencilIcon className="h-5 w-5 mr-2" />
                          Edit Profile
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5 mr-2" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8 md:mt-0 md:ml-8">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-gray-500">
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold text-[#0F172A]">My Bookings</h2>
              {bookings.length === 0 ? (
                <div className="mt-6 text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">You don't have any bookings yet.</p>
                  <button
                    onClick={() => navigate('/fleet')}
                    className="mt-4 px-4 py-2 bg-[#FACC15] text-[#0F172A] rounded-md hover:bg-[#F59E0B] transition-colors"
                  >
                    Browse Vehicles
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-[#0F172A]">{booking.vehicleName}</h3>
                          <p className="text-gray-600 mt-1">
                            {new Date(booking.startDate.seconds * 1000).toLocaleDateString()} - {new Date(booking.endDate.seconds * 1000).toLocaleDateString()}
                          </p>
                          <div className="mt-2 flex items-center">
                            <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {booking.status}
                            </span>
                            <span className="ml-4 font-medium text-[#0F172A]">${booking.totalPrice}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => cancelBooking(booking.id)}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors">
                            Details
                          </button>
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