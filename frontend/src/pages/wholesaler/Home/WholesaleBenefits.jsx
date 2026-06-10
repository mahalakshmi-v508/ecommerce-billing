import { useState } from 'react';
import riceFieldBg from '../../../assets/banner/rice one.jpg';

export default function WholesaleBenefits() {
  const benefits = [
    {
      id: 1,
      title: "Bulk Discounts",
      description: "Save up to 40% on wholesale orders",
      icon: "💰"
    },
    {
      id: 2,
      title: "Direct from Mills",
      description: "No middlemen, best prices",
      icon: "🏭"
    },
    {
      id: 3,
      title: "GST Invoice",
      description: "100% tax compliant billing",
      icon: "📄"
    },
    {
      id: 4,
      title: "Fast Delivery",
      description: "Pan-India delivery in 3-5 days",
      icon: "🚚"
    },
    {
      id: 5,
      title: "Premium Quality",
      description: "FSSAI certified rice",
      icon: "⭐"
    },
    {
      id: 6,
      title: "24/7 Support",
      description: "Dedicated account manager",
      icon: "🎧"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={riceFieldBg} 
          alt="Rice Field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Wholesale Benefits
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Exclusive advantages for rice wholesalers
          </p>
        </div>

        {/* Simple Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="text-center p-6 border border-white/20 rounded-xl hover:border-amber-500/50 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-amber-500">5000+</div>
            <p className="text-gray-400 text-sm">Wholesalers</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-500">4.9</div>
            <p className="text-gray-400 text-sm">Rating</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-500">50+</div>
            <p className="text-gray-400 text-sm">Rice Varieties</p>
          </div>
        </div>

        {/* Simple CTA */}
        <div className="mt-12 text-center">
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 inline-flex items-center gap-2">
            🌾 Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
}