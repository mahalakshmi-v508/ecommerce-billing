import { useState } from 'react';

export default function WholesaleBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const benefits = [
    {
      id: 1,
      title: "Bulk Discounts",
      subtitle: "Save up to 40% on wholesale orders",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      color: "emerald"
    },
    {
      id: 2,
      title: "Wholesale Pricing",
      subtitle: "Exclusive rates for businesses",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h6m-5 4h4m-6 4h6M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      ),
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      color: "blue"
    },
    {
      id: 3,
      title: "GST Invoice",
      subtitle: "100% tax compliant billing",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      color: "purple"
    },
    {
      id: 4,
      title: "Fast Delivery",
      subtitle: "Pan-India delivery in 3-5 days",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      color: "orange"
    },
    {
      id: 5,
      title: "Easy Returns",
      subtitle: "30-day hassle-free returns",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50",
      color: "cyan"
    },
    {
      id: 6,
      title: "24/7 Support",
      subtitle: "Dedicated account manager",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      color: "rose"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Wholesale Benefits
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Exclusive advantages designed for businesses and bulk buyers
          </p>
        </div>

        {/* Benefits Grid - Smaller Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Content */}
              <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-5">
                  {/* Icon with Hover Effect */}
                  <div className={`mb-3 inline-flex p-2 rounded-xl bg-gradient-to-r ${benefit.bgGradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`text-${benefit.color}-600`}>
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold text-gray-900 mb-1 group-hover:text-${benefit.color}-600 transition-colors duration-300`}>
                    {benefit.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {benefit.subtitle}
                  </p>
                </div>

                {/* Bottom Progress Bar */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${benefit.gradient} transition-all duration-500 ${hoveredIndex === index ? 'w-full' : 'w-0'}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Call to Action */}
        {/* <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Ready to Scale Your Business?
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Join 5000+ businesses already saving with our wholesale program
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 group">
              Become a Partner
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div> */}

        {/* Trust Badges - Compact */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 items-center text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Trusted by 5000+ Businesses</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Secure Payments</span>
          </div>
        </div>
      </div>
    </section>
  );
}