import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to handle navigation item clicks (closes mobile menu)
  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  // Function to handle dropdown item clicks (closes dropdown)
  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsNavOpen(false); // Also close mobile menu if open
  };

  return (
    <nav className="bg-[#0F172A] text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#" 
              className="text-2xl font-bold text-[#FACC15] hover:text-yellow-300 transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Amazon Auto Link
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a 
                href="#" 
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              <a 
                href="#" 
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Fleet cars
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </a>

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
                      <a 
                        href="#" 
                        onClick={handleDropdownItemClick}
                        className="block px-4 py-3 text-sm text-white hover:bg-[#334155] hover:text-[#FACC15] transition-colors duration-150"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="font-medium">Hotel Booking</div>
                      </a>
                      <a 
                        href="#" 
                        onClick={handleDropdownItemClick}
                        className="block px-4 py-3 text-sm text-white hover:bg-[#334155] hover:text-[#FACC15] transition-colors duration-150"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="font-medium">Airport Pickup</div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a 
                href="#" 
                className="text-white hover:text-[#FACC15] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FACC15] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
            <a 
              href="#" 
              onClick={handleNavClick}
              className="text-white hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={handleNavClick}
              className="text-white hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Fleet Cars
            </a>
            
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
                  <a 
                    href="#" 
                    onClick={handleDropdownItemClick}
                    className="text-gray-300 hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-sm rounded-md transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Hotel Booking
                  </a>
                  <a 
                    href="#" 
                    onClick={handleDropdownItemClick}
                    className="text-gray-300 hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-sm rounded-md transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Airport Pickup
                  </a>
                </div>
              )}
            </div>
            
            <a 
              href="#" 
              onClick={handleNavClick}
              className="text-white hover:text-[#FACC15] hover:bg-[#334155] block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;