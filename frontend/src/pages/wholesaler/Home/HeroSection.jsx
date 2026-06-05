import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="relative h-[300px] or h-[520px] overflow-hidden">
      {/* Background Images with Parallax Effect */}
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

      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Animated Title */}
          <div className={`transition-all duration-500 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent animate-gradient">
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

          {/* Animated Button with Hover Effect */}
          <div className={`transition-all duration-500 delay-200 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <button className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
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
          <div className={`mt-16 flex justify-center gap-8 md:gap-12 transition-all duration-500 delay-300 transform ${
            isAnimating ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">1000+</div>
              <div className="text-sm text-gray-300">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">500+</div>
              <div className="text-sm text-gray-300">Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">50K+</div>
              <div className="text-sm text-gray-300">Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Buttons */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
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
                ? 'w-12 h-3 bg-amber-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            } rounded-full`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}

// Add these styles to your global CSS file (e.g., index.css or App.css)
/*
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes scroll {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(8px); opacity: 0; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-scroll {
  animation: scroll 1.5s ease-in-out infinite;
}
*/