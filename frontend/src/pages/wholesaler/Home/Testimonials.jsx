import { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollIntervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      business: "Raj Electronics, Delhi",
      rating: 5,
      review: "The wholesale pricing is unbeatable! Saved over 30% on bulk orders. GST invoices help with tax claims. Highly recommended for retailers.",
      date: "2 weeks ago",
      verified: true,
      image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=2E7D32&color=fff&rounded=true&size=64",
      product: "Rice Wholesaler",
      orderCount: "50+ orders"
    },
    {
      id: 2,
      name: "Priya Sharma",
      business: "Sharma General Store, Mumbai",
      rating: 5,
      review: "Excellent platform for wholesale rice purchases. Fast delivery and great customer support. The bulk discount system is very transparent.",
      date: "1 month ago",
      verified: true,
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=388E3C&color=fff&rounded=true&size=64",
      product: "Rice Retailer",
      orderCount: "30+ orders"
    },
    {
      id: 3,
      name: "Amit Patel",
      business: "Patel Traders, Ahmedabad",
      rating: 5,
      review: "Best wholesale rice marketplace in India. Quality products, timely delivery, and amazing discounts. Their support team is very responsive.",
      date: "3 weeks ago",
      verified: true,
      image: "https://ui-avatars.com/api/?name=Amit+Patel&background=43A047&color=fff&rounded=true&size=64",
      product: "Rice Trading",
      orderCount: "100+ orders"
    },
    {
      id: 4,
      name: "Sunil Mehta",
      business: "Mehta Distributors, Surat",
      rating: 5,
      review: "Great wholesale platform for rice with excellent support. Bulk ordering is smooth and delivery is always on time. Highly professional team.",
      date: "1 week ago",
      verified: true,
      image: "https://ui-avatars.com/api/?name=Sunil+Mehta&background=4CAF50&color=fff&rounded=true&size=64",
      product: "Rice Distribution",
      orderCount: "75+ orders"
    },
    {
      id: 5,
      name: "Neha Gupta",
      business: "Gupta Enterprises, Bangalore",
      rating: 4,
      review: "Good rice variety and competitive wholesale pricing. The bulk discounts are very attractive. Customer service is responsive.",
      date: "2 months ago",
      verified: true,
      image: "https://ui-avatars.com/api/?name=Neha+Gupta&background=66BB6A&color=fff&rounded=true&size=64",
      product: "Rice Enterprise",
      orderCount: "25+ orders"
    },
    {
      id: 6,
      name: "Vikram Singh",
      business: "Singh Traders, Jaipur",
      rating: 5,
      review: "Amazing experience with bulk rice orders. The GST invoice system is very helpful for our business. Will continue ordering.",
      date: "3 days ago",
      verified: true,
      image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=81C784&color=fff&rounded=true&size=64",
      product: "Rice Trading",
      orderCount: "60+ orders"
    }
  ];

  const cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [cardsToShow, setCardsToShow] = useState(3);
  const totalSlides = Math.ceil(testimonials.length / cardsToShow);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsPerView());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [currentIndex, isAutoScrolling, totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      if (isAutoScrolling) {
        scrollIntervalRef.current = setInterval(() => {
          nextSlide();
        }, 4000);
      }
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getVisibleCards = () => {
    const start = currentIndex * cardsToShow;
    return testimonials.slice(start, start + cardsToShow);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements - Soft Green Accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Wholesalers Say
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by 5000+ rice wholesalers across India
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards Grid with Animation */}
          <div className="overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
              {getVisibleCards().map((testimonial, idx) => (
                <div
                  key={testimonial.id}
                  className="group animate-fadeIn"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  <div className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2 border border-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ padding: '2px' }}></div>
                    
                    <div className="bg-white rounded-2xl p-6 h-full relative">
                      {/* Verified Badge */}
                      {testimonial.verified && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 border border-green-100">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified Buyer
                          </div>
                        </div>
                      )}

                      {/* Rice Icon Decoration */}
                      <div className="absolute top-4 left-4 opacity-10">
                        <span className="text-2xl">🌾</span>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-sm italic">
                        "{testimonial.review}"
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500 text-xs">{testimonial.business}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-green-600 font-medium">{testimonial.product}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{testimonial.orderCount}</span>
                          </div>
                        </div>
                        
                        {/* Hover Arrow */}
                        <div className="transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom Progress Bar */}
                      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500 w-0 group-hover:w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
          >
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-8 h-2 bg-gradient-to-r from-green-600 to-emerald-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-green-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-scroll Toggle */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className="text-xs text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors duration-300"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              {isAutoScrolling ? (
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              )}
            </svg>
            {isAutoScrolling ? 'Pause Auto-scroll' : 'Start Auto-scroll'}
          </button>
        </div>

        {/* Rating Summary - Modern Light Theme */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div>
              <div className="flex items-center gap-2 justify-center">
                <div className="text-4xl font-bold text-gray-900">4.9</div>
                <div>
                  <div className="flex gap-0.5">
                    {renderStars(5)}
                  </div>
                  <div className="text-gray-500 text-sm">Based on 1,234 reviews</div>
                </div>
              </div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block"></div>
            <div>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-gray-500 text-sm">Would recommend to others</div>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block"></div>
            <div>
              <div className="text-2xl font-bold text-green-600">5000+</div>
              <div className="text-gray-500 text-sm">Happy wholesalers</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}