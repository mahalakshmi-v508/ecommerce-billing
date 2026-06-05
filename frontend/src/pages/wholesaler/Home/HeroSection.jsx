import { useState, useEffect, useCallback } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Wholesale Marketplace",
      subtitle: "Buy Bulk Products at Exclusive Prices",
      buttonText: "Browse Products",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-blue-900/80 to-purple-900/80"
    },
    {
      id: 2,
      title: "Premium Quality Products",
      subtitle: "Direct from Manufacturers | Best Prices Guaranteed",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-emerald-900/80 to-teal-900/80"
    },
    {
      id: 3,
      title: "Fast Global Shipping",
      subtitle: "Warehouses in 15+ Countries | 24/7 Support",
      buttonText: "Learn More",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      gradient: "from-orange-900/80 to-red-900/80"
    }
  ];

  // Fixed auto-scroll with proper dependencies
  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, slides.length]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-scroll effect - fixed dependency
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Auto scroll every 5 seconds
    
    return () => clearInterval(interval);
  }, [handleNextSlide]); // Added handleNextSlide as dependency

  // Pause auto-scroll on hover
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [handleNextSlide, isPaused]);

  return (
    <section 
      className="relative h-[520px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, ${slide.gradient}), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Animated Title */}
          <div className={`transition-all duration-500 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent animate-gradient">
              {slides[currentSlide].title}
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className={`transition-all duration-500 delay-100 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Animated Button */}
          <div className={`transition-all duration-500 delay-200 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <button className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg shadow-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                {slides[currentSlide].buttonText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>

          {/* Stats Section */}
          <div className={`mt-12 md:mt-16 flex justify-center gap-6 md:gap-12 transition-all duration-500 delay-300 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">1000+</div>
              <div className="text-xs md:text-sm text-gray-300">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">500+</div>
              <div className="text-xs md:text-sm text-gray-300">Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-amber-500">50K+</div>
              <div className="text-xs md:text-sm text-gray-300">Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating && index !== currentSlide) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 md:w-12 h-2 md:h-3 bg-amber-500'
                : 'w-2 md:w-3 h-2 md:h-3 bg-white/50 hover:bg-white/80'
            } rounded-full`}
          />
        ))}
      </div>

      {/* Auto-scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8">
        <div className="text-white/50 text-xs bg-black/20 px-2 py-1 rounded-full">
          Auto-scroll {!isPaused && '▶'}
        </div>
      </div>
    </section>
  );
}

