import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Fleet from './pages/Fleet'
import CarDetails from './pages/CarDetails'


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