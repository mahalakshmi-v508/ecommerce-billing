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
      title: "Easy Registration",
      description: "Register as Wholesaler",
      shortDesc: "Create your wholesaler account and complete business verification",
      longDesc: "Fill out our simple registration form, submit your GST certificate, and get approved within 24 hours.",
      color: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
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
      description: "Browse our extensive rice catalog",
      shortDesc: "Browse our extensive rice catalog and select bulk quantities",
      longDesc: "Filter by rice variety, price range, and quality. Get real-time stock availability and wholesale pricing.",
      color: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stats: "50+ Rice Varieties",
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
      description: "Confirm your order",
      shortDesc: "Confirm your order and complete secure payment",
      longDesc: "Choose from UPI, Net Banking, Credit Card, or Bank Transfer. Get instant GST invoice on payment.",
      color: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
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
      description: "Rice delivered with tracking",
      shortDesc: "Rice delivered directly to your business with tracking",
      longDesc: "Track your order from mill to doorstep. Free shipping on bulk orders above ₹25,000.",
      color: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stats: "3-5 Days Delivery",
      time: "Pan-India",
      tag: "Express Shipping"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements - Soft Green Accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Wholesale Ordering Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A seamless 4-step process designed for rice retailers and business buyers
          </p>
        </div>

        {/* Process Steps - Equal Height Cards */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-40 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-emerald-200 to-green-200"></div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 z-20">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 ${hoveredStep === step.id ? 'scale-110 rotate-12' : ''}`}>
                    {step.id}
                  </div>
                </div>

                {/* Card */}
                <div 
                  className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100 h-full min-h-[420px] flex flex-col ${
                    hoveredStep === step.id ? 'transform -translate-y-2' : ''
                  }`}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  {/* Animated Border Gradient */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-0 ${hoveredStep === step.id ? 'opacity-75' : 'opacity-0'} transition duration-500`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-2xl p-6 flex-1 flex flex-col">
                    {/* Icon */}
                    <div className={`mb-5 inline-flex p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 transition-all duration-300 w-fit ${
                      hoveredStep === step.id ? 'scale-110 rotate-6' : ''
                    }`}>
                      <div className="text-green-600">
                        {step.icon}
                      </div>
                    </div>

                    {/* Tag */}
                    <div className="inline-block mb-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {step.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 ${
                      hoveredStep === step.id ? 'text-green-600' : ''
                    }`}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* Short Description */}
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                      {step.shortDesc}
                    </p>

                    {/* Expandable Detailed Description */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeStep === step.id ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-500 text-xs leading-relaxed bg-green-50 p-3 rounded-lg">
                        {step.longDesc}
                      </p>
                    </div>

                    {/* Stats and Info - Pushed to bottom */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{step.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 font-semibold">
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
                      <button className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline inline-flex items-center gap-1">
                        {activeStep === step.id ? 'Show less' : 'Learn more'}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Progress Indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500 ${
                    hoveredStep === step.id ? 'w-full' : 'w-0'
                  }`}></div>
                </div>

                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="text-green-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Takes 5 minutes</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>5000+ Active Wholesalers</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Smart filters</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>50+ Rice Varieties</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Pan-India</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>3-5 Days Delivery</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700 text-sm font-medium">Trusted by 5000+ wholesalers across India</span>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /> */}
              </svg>
              Start Wholesale Order
            </button>
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /> */}
              </svg>
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}