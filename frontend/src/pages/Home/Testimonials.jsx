import { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Fashion Designer",
      location: "Mumbai, India",
      rating: 5,
      review: "Absolutely love the shopping experience! The product quality is exceptional and delivery was faster than expected. Will definitely shop again.",
      avatar: "👩‍🎨",
      date: "2 days ago",
      verified: true,
      purchase: "Women's Ethnic Wear",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50"
    },
    {
      id: 2,
      name: "Rahul Mehta",
      role: "Tech Entrepreneur",
      location: "Bangalore, India",
      rating: 5,
      review: "Best e-commerce platform I've used! The secure payment system and customer support are top-notch. Highly recommended for everyone.",
      avatar: "👨‍💻",
      date: "5 days ago",
      verified: true,
      purchase: "Electronics Gadgets",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      id: 3,
      name: "Anjali Verma",
      role: "Homemaker",
      location: "Delhi, India",
      rating: 5,
      review: "Great variety of products at affordable prices. The return policy is hassle-free and customer service is very responsive. Love shopping here!",
      avatar: "👩‍👧",
      date: "1 week ago",
      verified: true,
      purchase: "Home & Kitchen",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Business Owner",
      location: "Chennai, India",
      rating: 5,
      review: "Incredible platform for bulk orders. The wholesale pricing is competitive and delivery is always on time. Very satisfied!",
      avatar: "👨‍💼",
      date: "3 days ago",
      verified: true,
      purchase: "Bulk Orders",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      id: 5,
      name: "Neha Gupta",
      role: "Software Engineer",
      location: "Hyderabad, India",
      rating: 5,
      review: "The UI is super intuitive and checkout process is seamless. Best online shopping experience I've had in years!",
      avatar: "👩‍💻",
      date: "1 day ago",
      verified: true,
      purchase: "Electronics",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 6,
      name: "Amit Patel",
      role: "Student",
      location: "Pune, India",
      rating: 4,
      review: "Great discounts and offers! Customer support is very helpful. Will recommend to my friends.",
      avatar: "👨‍🎓",
      date: "4 days ago",
      verified: true,
      purchase: "Fashion",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    }
  ];

  // Duplicate testimonials for infinite scroll effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAutoPlaying && isVisible) {
      scrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= testimonials.length * 2 - 1) {
            // Reset to beginning smoothly
            setTimeout(() => {
              setCurrentIndex(0);
            }, 50);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isAutoPlaying, isVisible]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => Math.min(testimonials.length * 2 - 1, prev + 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold">
              Customer Reviews
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"></div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of happy customers worldwide
          </p>
        </div>

        {/* Auto-scrolling Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-6 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-6 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-1000 ease-out cursor-grab active:cursor-grabbing"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="w-full md:w-[calc(33.333%-16px)] flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full transform hover:-translate-y-2">
                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${testimonial.color}`}></div>
                    
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-xl shadow-md`}>
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm">{testimonial.name}</h3>
                            <p className="text-xs text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                        {testimonial.verified && (
                          <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs">Verified</span>
                          </div>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="mb-3">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Review */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 italic line-clamp-3">
                        "{testimonial.review}"
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs font-medium text-gray-600">{testimonial.purchase}</span>
                        <span className="text-xs text-gray-400">{testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

         
        </div>

        
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}