import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://amazon-auto-link.onrender.com';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Data states
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Form states
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    category_id: '',
    description: '',
    price_per_day: '',
    seats: '',
    transmission: 'automatic',
    fuel_type: 'petrol',
    availability: true,
    image_url: ''
  });

  // Verify token and admin status
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/verify_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      return await response.json();
    } catch (err) {
      throw new Error('Failed to verify token');
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/users`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return await response.json();
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return await response.json();
  };

  // Fetch all categories
  const fetchCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    return await response.json();
  };

  // Fetch all vehicles
  const fetchVehicles = async () => {
    const response = await fetch(`${API_URL}/vehicles`);
    return await response.json();
  };

  // Check admin status on component mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await verifyToken(token);
        if (response.user && response.user.is_admin) {
          setIsAdmin(true);
          
          // Load all initial data
          const [bookingsData, usersData, categoriesData, vehiclesData] = await Promise.all([
            fetchBookings(),
            fetchUsers(),
            fetchCategories(),
            fetchVehicles()
          ]);
          
          setBookings(bookingsData);
          setUsers(usersData);
          setCategories(categoriesData);
          setVehicles(vehiclesData);
        } else {
          navigate('/');
        }
      } catch (err) {
        setError('Failed to verify admin status');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  // User management functions
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/users/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  // Booking management functions
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  // Category management functions
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      const createdCategory = await response.json();
      setCategories([...categories, createdCategory]);
      setNewCategory({ name: '' });
    } catch (err) {
      setError('Failed to create category');
    }
  };

  const handleUpdateCategory = async (categoryId, updatedName) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/categories/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName }),
      });
      setCategories(categories.map(category => 
        category.id === categoryId ? { ...category, name: updatedName } : category
      ));
    } catch (err) {
      setError('Failed to update category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/categories/${categoryId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setCategories(categories.filter(category => category.id !== categoryId));
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  // Vehicle management functions
  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/vehicles`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVehicle),
      });
      const createdVehicle = await response.json();
      setVehicles([...vehicles, createdVehicle]);
      setNewVehicle({
        name: '',
        category_id: '',
        description: '',
        price_per_day: '',
        seats: '',
        transmission: 'automatic',
        fuel_type: 'petrol',
        availability: true,
        image_url: ''
      });
    } catch (err) {
      setError('Failed to create vehicle');
    }
  };

  const handleUpdateVehicle = async (vehicleId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/vehicles/${vehicleId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === vehicleId ? { ...vehicle, ...updatedData } : vehicle
      ));
    } catch (err) {
      setError('Failed to update vehicle');
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/vehicles/${vehicleId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
      } catch (err) {
        setError('Failed to delete vehicle');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-[#FACC15] text-xl">Loading admin panel...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-[#FACC15] text-xl">Unauthorized access</div>
      </div>
    );
  }

  // ... [rest of the component remains the same as in the previous version]
  // The JSX part of the component is identical to what I provided earlier

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Admin Header and Navigation */}
      {/* ... */}
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#FACC15]">Manage Bookings</h2>
            {/* Bookings table */}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#FACC15]">Manage Users</h2>
            {/* Users table */}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            {/* Categories form and table */}
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div>
            {/* Vehicles form and table */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;