import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, Car, Shield, Clock, Users, Zap, Award, MapPin, Phone, Mail } from 'lucide-react';

  


// ShinyText Component
const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;
  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ title, description, icon: Icon, gradient }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FACC15] to-[#F59E0B] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="relative bg-[#0F172A] border border-gray-800 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-[#FACC15] group-hover:shadow-2xl group-hover:shadow-[#FACC15]/20">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FACC15] to-[#F59E0B] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-[#0F172A]" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FACC15] transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Hottest Car Card Component
const HottestCarCard = ({ name, price, image, rating, features }) => {
  return (
    <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FACC15] to-[#F59E0B] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FACC15] via-transparent to-[#FACC15] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      
      <div className="relative p-6">
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-4 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-[#FACC15] transition-colors duration-300">{name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#FACC15] fill-current" />
            <span className="text-white text-sm">{rating}</span>
          </div>
        </div>
        
        <p className="text-2xl font-bold text-[#FACC15] mb-3">{price}<span className="text-gray-400 text-sm font-normal">/day</span></p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
              {feature}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#0F172A] font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#FACC15]/30 transition-all duration-300 group-hover:scale-105">
          Book Now
        </button>
      </div>
    </div>
  );
};

// TrueFocus Component (simplified version)
const TrueFocus = ({ sentence, step, isActive }) => {
  return (
    <div className={`transition-all duration-1000 ${isActive ? 'opacity-100 scale-105' : 'opacity-60 scale-95'}`}>
      <div className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
        isActive ? 'border-[#FACC15] bg-[#FACC15]/10 shadow-xl shadow-[#FACC15]/20' : 'border-gray-700 bg-[#0F172A]'
      }`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
            isActive ? 'bg-[#FACC15] text-[#0F172A]' : 'bg-gray-800 text-gray-400'
          }`}>
            {step}
          </div>
          <h3 className={`text-xl font-bold transition-colors duration-500 ${
            isActive ? 'text-[#FACC15]' : 'text-white'
          }`}>
            {sentence}
          </h3>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, content, rating, avatar }) => {
  return (
    <div className="bg-[#0F172A] border border-gray-800 rounded-2xl p-6 hover:border-[#FACC15] transition-all duration-300 hover:shadow-xl hover:shadow-[#FACC15]/10">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-[#FACC15] fill-current' : 'text-gray-600'}`} />
        ))}
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed">"{content}"</p>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-[#FACC15] to-[#F59E0B] rounded-full flex items-center justify-center text-[#0F172A] font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const bookingSteps = [
    "Choose Your Dream Car",
    "Select Date & Time",
    "Complete Booking",
    "Enjoy Your Ride"
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Business Executive",
      content: "Exceptional service! The Lamborghini I rented was in perfect condition and the booking process was seamless.",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "Event Planner",
      content: "Perfect for special occasions. The luxury fleet and professional service exceeded all expectations.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Car enthusiast",
      content: "Living the dream! Got to drive my bucket list cars without the commitment. Highly recommended!",
      rating: 5
    }
  ];

  const services = [
    {
      title: "Luxury Fleet",
      description: "Experience the world's most prestigious car brands including Ferrari, Lamborghini, Porsche, and Mercedes-Benz.",
      icon: Car,
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service ensuring your luxury experience is seamless from start to finish.",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Premium Insurance",
      description: "Comprehensive coverage and protection giving you peace of mind during your luxury driving experience.",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "VIP Treatment",
      description: "White-glove service with personal concierge, vehicle delivery, and exclusive member benefits.",
      icon: Award,
      gradient: "from-purple-500 to-violet-500"
    }
  ];

  const hottestCars = [
    {
      name: "Lamborghini Huracán",
      price: "$899",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
      rating: 4.9,
      features: ["V10 Engine", "AWD", "630 HP", "Luxury Interior"]
    },
    {
      name: "Ferrari 488 Spider",
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      rating: 4.8,
      features: ["Convertible", "Twin Turbo", "661 HP", "Carbon Fiber"]
    },
    {
      name: "Porsche 911 Turbo S",
      price: "$699",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
      rating: 4.9,
      features: ["AWD", "640 HP", "Sport Chrono", "Premium Sound"]
    }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % bookingSteps.length);
    }, 3000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white overflow-hidden">
      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 100%; }
          100% { background-position: -100%; }
        }
        .animate-shine {
          animation: shine 5s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.3); }
          50% { box-shadow: 0 0 40px rgba(250, 204, 21, 0.6); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.pinimg.com/736x/f8/c5/f9/f8c5f92b0d721cda2270948c5a1b4074.jpg" 
            alt="Luxury Car" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-[#0F172A]/90"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <ShinyText 
              text="PREMIUM LUXURY RENTALS" 
              className="text-6xl md:text-8xl font-black tracking-wider mb-4" 
              speed={4}
            />
          </div>
          
          <h2 className="text-2xl md:text-4xl font-light text-gray-300 mb-8 leading-relaxed">
            Experience the ultimate driving pleasure with our exclusive collection of 
            <span className="text-[#FACC15] font-semibold"> world-class supercars</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#0F172A] px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#FACC15]/40 transition-all duration-300 transform hover:scale-105 animate-glow">
              Explore Fleet
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-[#FACC15] text-[#FACC15] px-12 py-4 rounded-full font-bold text-lg hover:bg-[#FACC15] hover:text-[#0F172A] transition-all duration-300 transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#FACC15] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FACC15] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <ShinyText text="Our Premium Services" className="text-[#FACC15]" />
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover why discerning car enthusiasts choose us for their luxury automotive experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hottest Cars Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <ShinyText text="Hottest Cars This Week" className="text-[#FACC15]" />
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The most sought-after supercars in our premium fleet
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {hottestCars.map((car, index) => (
              <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                <HottestCarCard {...car} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#0F172A] px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-[#FACC15]/30 transition-all duration-300 transform hover:scale-105">
              View Complete Fleet
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <ShinyText text="How It Works" className="text-[#FACC15]" />
            </h2>
            <p className="text-xl text-gray-400">
              Your journey to luxury begins with these simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingSteps.map((step, index) => (
              <TrueFocus 
                key={index}
                sentence={step}
                step={index + 1}
                isActive={currentStep === index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">
                <ShinyText text="About Our Legacy" className="text-[#FACC15]" />
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                For over a decade, we've been the premier destination for automotive enthusiasts seeking the ultimate driving experience. Our passion for exceptional cars and uncompromising service has made us the trusted choice for luxury car rentals.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FACC15] mb-2">500+</div>
                  <div className="text-gray-400">Premium Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FACC15] mb-2">50K+</div>
                  <div className="text-gray-400">Happy Clients</div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#0F172A] px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-[#FACC15]/30 transition-all duration-300">
                Learn More
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FACC15]/20 to-[#F59E0B]/20 rounded-3xl p-8 backdrop-blur-sm border border-[#FACC15]/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#0F172A] rounded-2xl p-6 text-center border border-gray-800 hover:border-[#FACC15] transition-all duration-300">
                    <Users className="w-8 h-8 text-[#FACC15] mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Expert Team</h3>
                    <p className="text-gray-400 text-sm">Passionate automotive professionals</p>
                  </div>
                  <div className="bg-[#0F172A] rounded-2xl p-6 text-center border border-gray-800 hover:border-[#FACC15] transition-all duration-300">
                    <Zap className="w-8 h-8 text-[#FACC15] mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Fast Service</h3>
                    <p className="text-gray-400 text-sm">Quick booking and delivery</p>
                  </div>
                  <div className="bg-[#0F172A] rounded-2xl p-6 text-center border border-gray-800 hover:border-[#FACC15] transition-all duration-300">
                    <Award className="w-8 h-8 text-[#FACC15] mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Award Winning</h3>
                    <p className="text-gray-400 text-sm">Industry recognition</p>
                  </div>
                  <div className="bg-[#0F172A] rounded-2xl p-6 text-center border border-gray-800 hover:border-[#FACC15] transition-all duration-300">
                    <MapPin className="w-8 h-8 text-[#FACC15] mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Global Reach</h3>
                    <p className="text-gray-400 text-sm">Multiple locations worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <ShinyText text="What Our Clients Say" className="text-[#FACC15]" />
            </h2>
            <p className="text-xl text-gray-400">
              Hear from our satisfied customers about their luxury experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`transition-all duration-1000 ${currentTestimonial === index ? 'scale-105 opacity-100' : 'scale-95 opacity-60'}`}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#FACC15] to-[#F59E0B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-[#0F172A] mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-[#0F172A]/80 mb-8 leading-relaxed">
            Join thousands of satisfied customers who have experienced the thrill of our premium fleet
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-[#0F172A] text-[#FACC15] px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-[#0F172A]/30 transition-all duration-300 transform hover:scale-105">
              <Phone className="inline mr-2 w-5 h-5" />
              Call Now
            </button>
            <button className="border-2 border-[#0F172A] text-[#0F172A] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0F172A] hover:text-[#FACC15] transition-all duration-300 transform hover:scale-105">
              <Mail className="inline mr-2 w-5 h-5" />
              Get Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;