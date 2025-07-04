import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsNavOpen(false);
  };

  return (
    <nav className="bg-[#0F172A] text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-[#FACC15] hover:text-yellow-300 transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Amazon Auto Link
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              <Link 
                to="/" 
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link 
                to="/fleet" 
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Fleet cars
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </Link>

              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1 relative group"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>Inquiry</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1E293B] rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link 
                        to="/hotel-booking" 
                        onClick={handleDropdownItemClick}
                        className="block px-4 py-3 text-sm text-white hover:bg-[#334155] hover:text-[#FACC15] transition-colors duration-150"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="font-medium">Hotel Booking</div>
                      </Link>
                      <Link 
                        to="/airport-pickup" 
                        onClick={handleDropdownItemClick}
                        className="block px-4 py-3 text-sm text-white hover:bg-[#334155] hover:text-[#FACC15] transition-colors duration-150"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="font-medium">Airport Pickup</div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/contact" 
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#FACC15] text-[#0F172A] rounded-md text-sm font-medium hover:bg-[#F59E0B] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#FACC15] text-[#0F172A] rounded-md text-sm font-medium hover:bg-[#F59E0B] transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <Link
                to="/profile"
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium mr-2"
              >
                Profile
              </Link>
            )}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#FACC15] hover:bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FACC15] transition-colors duration-200"
            >
              <svg 
                className={`${isNavOpen ? 'hidden' : 'block'} h-6 w-6`} 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isNavOpen ? 'block' : 'hidden'} h-6 w-6`} 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="md:hidden bg-[#1E293B] border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={handleNavClick}
              className="text-white hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Home
            </Link>
            <Link 
              to="/fleet-cars" 
              onClick={handleNavClick}
              className="text-white hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Fleet Cars
            </Link>
            
            {/* Mobile Products Dropdown */}
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white hover:text-[#FACC15] hover:bg-[#334155] w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 flex items-center justify-between"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Inquiry
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="mt-1 space-y-1 pl-4">
                  <Link 
                    to="/hotel-booking" 
                    onClick={handleDropdownItemClick}
                    className="text-gray-300 hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-sm rounded-md transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Hotel Booking
                  </Link>
                  <Link 
                    to="/airport-pickup" 
                    onClick={handleDropdownItemClick}
                    className="text-gray-300 hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-sm rounded-md transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Airport Pickup
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/contact" 
              onClick={handleNavClick}
              className="text-white hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contact
            </Link>

            {!user ? (
              <div className="pt-2 space-y-2">
                <Link
                  to="/login"
                  onClick={handleNavClick}
                  className="block w-full px-3 py-2 text-center text-base font-medium rounded-md text-white bg-[#0F172A] hover:bg-[#1E293B]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleNavClick}
                  className="block w-full px-3 py-2 text-center text-base font-medium rounded-md text-[#0F172A] bg-[#FACC15] hover:bg-[#F59E0B]"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleNavClick();
                  handleLogout();
                }}
                className="block w-full px-3 py-2 text-center text-base font-medium rounded-md text-[#0F172A] bg-[#FACC15] hover:bg-[#F59E0B]"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;