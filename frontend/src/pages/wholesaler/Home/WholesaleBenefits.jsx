import { useState } from 'react';
import riceFieldBg from '../../../assets/banner/rice one.jpg';

export default function WholesaleBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const benefits = [
    {
      id: 1,
      title: "Bulk Discounts",
      subtitle: "Save up to 40% on wholesale orders",
      description: "Volume-based pricing that rewards larger quantities",
      icon: "💰",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: 2,
      title: "Direct from Mills",
      subtitle: "No middlemen, best prices",
      description: "Source directly from premium rice mills across India",
      icon: "🏭",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: 3,
      title: "GST Invoice",
      subtitle: "100% tax compliant billing",
      description: "Get instant GST invoices for all business purchases",
      icon: "📄",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: 4,
      title: "Fast Delivery",
      subtitle: "Pan-India delivery in 3-5 days",
      description: "Express shipping with real-time tracking",
      icon: "🚚",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: 5,
      title: "Premium Quality",
      subtitle: "FSSAI certified rice",
      description: "Superior quality rice with consistent grading",
      icon: "⭐",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      id: 6,
      title: "24/7 Support",
      subtitle: "Dedicated account manager",
      description: "Round-the-clock assistance for all your needs",
      icon: "🎧",
      gradient: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={riceFieldBg} 
          alt="Rice Field Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-emerald-900/95"></div>
        {/* Rice grain pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="ricePatternBg" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <ellipse cx="15" cy="15" rx="4" ry="2" fill="white" transform="rotate(45 15 15)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#ricePatternBg)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Light Text */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5">
              <span className="text-amber-300 text-xs font-semibold tracking-wide">✦ WHY CHOOSE US ✦</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Wholesale Benefits
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-green-400 mx-auto mb-6"></div>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Exclusive advantages designed for rice wholesalers and bulk buyers
          </p>
        </div>

        {/* Benefits Grid - Modern Glassmorphism Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-all duration-500 h-full overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 hover:border-white/40">
                
                {/* Animated Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Card Content */}
                <div className="relative p-6">
                  {/* Icon Container */}
                  <div className={`mb-5 inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30`}>
                    {benefit.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-amber-300">
                    {benefit.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-green-100 text-sm font-medium mb-2">
                    {benefit.subtitle}
                  </p>

                  {/* Description - Expand on Hover */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    hoveredIndex === index ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-green-200 text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Decorative Line */}
                  <div className={`mt-4 h-px bg-gradient-to-r ${benefit.gradient} transition-all duration-500 ${hoveredIndex === index ? 'w-full' : 'w-12'}`}></div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-white rotate-45"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .group:hover .group-hover\\:scale-110 {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}