import { useState } from 'react';

export default function BulkOrderBenefits() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const benefits = [
    {
      id: 1,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Exclusive Wholesale Pricing",
      description: "Get products at 20-40% lower prices than retail customers",
      longDesc: "Special pricing for registered businesses with volume-based discounts that increase with order quantity.",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      savings: "Save up to 40%",
      badge: "Best Value",
      stat: "vs Retail Price"
    },
    {
      id: 2,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13l-3 3-3-3" />
        </svg>
      ),
      title: "Bulk Purchase Discounts",
      description: "Higher quantities unlock better tiered discounts",
      longDesc: "Scale your savings with our volume-based pricing. The more you buy, the more you save.",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      savings: "Tiered Discounts",
      badge: "Scalable",
      stat: "10% | 20% | 35%"
    },
    {
      id: 3,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Free Shipping",
      description: "Enjoy free delivery on eligible bulk orders",
      longDesc: "Free pan-India shipping on orders above ₹25,000. Express delivery available for metro cities.",
      color: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      savings: "Free Delivery",
      badge: "Pan-India",
      stat: "Above ₹25,000"
    },
    {
      id: 4,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "GST Invoices",
      description: "Download GST invoices for all business purchases",
      longDesc: "Get detailed tax invoices with GSTIN. Claim input tax credit on your business purchases.",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      savings: "ITC Available",
      badge: "Tax Compliant",
      stat: "Instant Download"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block animate-pulse">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Buy Wholesale?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Exclusive benefits designed for retailers, resellers and business owners
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated Border Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200`}></div>
              
              {/* Card */}
              <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                {/* Top Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${benefit.bgGradient} text-${benefit.color.split(' ')[1].replace('to-', '')}-700`}>
                    {benefit.badge}
                  </div>
                </div>

                <div className="p-6">
                  {/* Icon with Animation */}
                  <div className={`mb-5 inline-flex p-3 rounded-xl bg-gradient-to-r ${benefit.bgGradient} group-hover:scale-110 transition-all duration-300 group-hover:rotate-6`}>
                    <div className={`text-${benefit.color.split(' ')[1].replace('to-', '')}-600`}>
                      {benefit.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-${benefit.color.split(' ')[1].replace('to-', '')}-600`}>
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {benefit.description}
                  </p>

                  {/* Expanded Description on Hover */}
                  <div className={`overflow-hidden transition-all duration-300 ${
                    hoveredIndex === index ? 'max-h-24 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-gray-500 text-xs leading-relaxed bg-gray-50 p-3 rounded-lg">
                      {benefit.longDesc}
                    </p>
                  </div>

                  {/* Savings/Stats Section */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 0a1 1 0 10-2 0v6a1 1 0 102 0V7zM8 7a1 1 0 10-2 0v6a1 1 0 102 0V7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-emerald-600 font-semibold text-sm">{benefit.savings}</span>
                      </div>
                      <div className="text-gray-400 text-xs">{benefit.stat}</div>
                    </div>
                  </div>

                  {/* Hover Action Button */}
                  <div className={`mt-4 transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}>
                    <button className={`w-full text-center text-sm font-semibold py-2 rounded-lg bg-gradient-to-r ${benefit.bgGradient} text-${benefit.color.split(' ')[1].replace('to-', '')}-600 hover:text-white hover:bg-gradient-to-r hover:${benefit.color} transition-all duration-300`}>
                      Learn More →
                    </button>
                  </div>
                </div>

                {/* Bottom Progress Bar */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.color} transition-all duration-500 ${hoveredIndex === index ? 'w-full' : 'w-0'}`}></div>
              </div>
            </div>
          ))}
        </div>

      

        
      </div>
    </section>
  );
}