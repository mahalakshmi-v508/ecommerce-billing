import { useState, useEffect, useRef } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    { 
      id: 1,
      title: "Discovery", 
      icon: "🔍", 
      description: "Discover products that match your needs",
      detailedDesc: "Browse through categories, search products, and find exactly what you're looking for",
      color: "from-indigo-500 to-blue-500",
      lightColor: "from-indigo-50 to-blue-50",
      stepNumber: "01",
      duration: "1-2 mins"
    },
    { 
      id: 2,
      title: "Selection", 
      icon: "✅", 
      description: "Select items and add to cart",
      detailedDesc: "Compare prices, check reviews, and add desired items to your shopping cart",
      color: "from-purple-500 to-pink-500",
      lightColor: "from-purple-50 to-pink-50",
      stepNumber: "02",
      duration: "2-3 mins"
    },
    { 
      id: 3,
      title: "Checkout", 
      icon: "💳", 
      description: "Secure payment processing",
      detailedDesc: "Enter shipping details, apply coupons, and complete payment securely",
      color: "from-pink-500 to-rose-500",
      lightColor: "from-pink-50 to-rose-50",
      stepNumber: "03",
      duration: "3-5 mins"
    },
    { 
      id: 4,
      title: "Fulfillment", 
      icon: "🎁", 
      description: "Order processing & delivery",
      detailedDesc: "Order confirmation, packaging, shipping, and doorstep delivery",
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-50 to-emerald-50",
      stepNumber: "04",
      duration: "2-5 days"
    },
    { 
      id: 5,
      title: "Support", 
      icon: "💬", 
      description: "Post-purchase support",
      detailedDesc: "24/7 customer support, returns, and warranty assistance",
      color: "from-orange-500 to-red-500",
      lightColor: "from-orange-50 to-red-50",
      stepNumber: "05",
      duration: "Always"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate through steps when visible
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
      {/* Background Lifecycle Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-indigo-100/50 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-100/50 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-pink-100/50 opacity-30"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-100/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-100/30 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-medium">
              Customer Lifecycle
            </span>
          </div>
          
        
          
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete shopping lifecycle from discovery to post-purchase support
          </p>
        </div>

        {/* Lifecycle Flow - Desktop Timeline */}
        <div className="hidden lg:block relative mb-16">
          <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-full"></div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 text-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className="relative group focus:outline-none"
                >
                  {/* Timeline node */}
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${
                    index === activeStep 
                      ? `bg-gradient-to-r ${step.color} shadow-lg scale-110` 
                      : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
                  }`}>
                    <span className={`text-2xl ${index === activeStep ? 'text-white' : 'text-gray-400'}`}>
                      {step.icon}
                    </span>
                  </div>
                  
                  {/* Step number */}
                  <div className="mt-2 text-xs text-gray-400">{step.stepNumber}</div>
                  
                  {/* Title */}
                  <div className={`mt-2 font-semibold text-sm transition-colors duration-300 ${
                    index === activeStep ? `text-${step.color.split('-')[1]}-600` : 'text-gray-600'
                  }`}>
                    {step.title}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Steps Indicator */}
        <div className="lg:hidden flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? 'w-8 bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Start Your Journey →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}