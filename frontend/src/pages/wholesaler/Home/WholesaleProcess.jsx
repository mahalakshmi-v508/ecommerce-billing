import { useState } from 'react';

export default function WholesaleProcess() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      title: "Register as Wholesaler",
      description: "Create your wholesaler account and complete business verification in minutes",
      longDesc: "Fill out our simple registration form, submit your GST certificate, and get approved within 24 hours.",
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      stats: "5000+ Active Wholesalers",
      time: "Takes 5 minutes",
      tag: "Easy Registration"
    },
    {
      id: 2,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13l-3 3-3-3" />
        </svg>
      ),
      title: "Choose Bulk Products",
      description: "Browse our extensive catalog and select products in bulk quantities",
      longDesc: "Filter by category, price, and brand. Get real-time stock availability and wholesale pricing.",
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      stats: "10,000+ Products",
      time: "Smart filters",
      tag: "Wide Selection"
    },
    {
      id: 3,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Place Bulk Order",
      description: "Confirm your order and complete secure payment with multiple options",
      longDesc: "Choose from UPI, Net Banking, Credit Card, or Bank Transfer. Get instant invoice on payment.",
      color: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      stats: "100% Secure",
      time: "SSL Encrypted",
      tag: "Safe Payment"
    },
    {
      id: 4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Fast Delivery",
      description: "Products are delivered directly to your business with real-time tracking",
      longDesc: "Track your order from warehouse to doorstep. Free shipping on orders above ₹25,000.",
      color: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      stats: "3-5 Days Delivery",
      time: "Pan-India",
      tag: "Express Shipping"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block animate-pulse">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Wholesale Ordering Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A seamless 4-step process designed for retailers and business buyers
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-amber-200 to-emerald-200"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Number with Animation */}
                <div className="absolute -top-4 -left-4 z-20">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${hoveredStep === step.id ? 'scale-110 rotate-12' : ''}`}>
                    {step.id}
                  </div>
                </div>

                {/* Card */}
                <div 
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${
                    hoveredStep === step.id ? 'transform -translate-y-3' : ''
                  }`}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  {/* Animated Border Gradient */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-2xl blur opacity-0 ${hoveredStep === step.id ? 'opacity-75' : 'opacity-0'} transition duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-2xl p-6">
                    {/* Icon Container */}
                    <div className={`mb-5 inline-flex p-3 rounded-xl bg-gradient-to-r ${step.bgGradient} transition-all duration-300 ${
                      hoveredStep === step.id ? 'scale-110 rotate-6' : ''
                    }`}>
                      <div className={`text-${step.color.split(' ')[1].replace('to-', '')}-600`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="inline-block mb-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${step.bgGradient} text-${step.color.split(' ')[1].replace('to-', '')}-700`}>
                        {step.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 ${
                      hoveredStep === step.id ? `text-${step.color.split(' ')[1].replace('to-', '')}-600` : ''
                    }`}>
                      {step.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* Expandable Detailed Description */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeStep === step.id ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-500 text-xs leading-relaxed bg-gray-50 p-3 rounded-lg">
                        {step.longDesc}
                      </p>
                    </div>

                    {/* Stats and Info */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{step.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 0a1 1 0 10-2 0v6a1 1 0 102 0V7zM8 7a1 1 0 10-2 0v6a1 1 0 102 0V7z" clipRule="evenodd" />
                          </svg>
                          <span>{step.stats}</span>
                        </div>
                      </div>
                    </div>

                    {/* Learn More Link */}
                    <div className={`mt-3 transition-all duration-300 ${
                      hoveredStep === step.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <button className={`text-xs font-semibold text-${step.color.split(' ')[1].replace('to-', '')}-600 hover:underline inline-flex items-center gap-1`}>
                        {activeStep === step.id ? 'Show less' : 'Learn more'}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Progress Indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.color} transition-all duration-500 ${
                    hoveredStep === step.id ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Connector Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="text-gray-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}