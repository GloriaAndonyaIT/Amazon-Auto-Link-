import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import CarDetails from './pages/CarDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Booking from './pages/Booking'
import HotelBooking from './pages/HotelBookingForm'
import AirportPickup from './pages/AirportPickup'
import Contact from './pages/Contact'
import PrivateRoute from './components/PrivateRoute'
import BookingConfirmation from './pages/BookingConfirmation'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotel-booking" element={<HotelBooking />} />
            <Route path="/airport-pickup" element={<AirportPickup />} /> 
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="/book/:id" element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            } />
            <Route path="/booking-confirmation/:bookingId" element={
  <PrivateRoute>
    <BookingConfirmation />
  </PrivateRoute>
} />
            
            {/* 404 Not Found Route */}
            <Route path="*" element={
              <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-[#FACC15] mb-4">404</h1>
                  <p className="text-xl text-gray-400 mb-8">Page Not Found</p>
                  <a href="/" className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#0F172A] px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300">
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App