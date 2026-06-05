import { useState, useEffect, useRef } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    { 
      id: 1,
      title: "Discovery", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      description: "Discover products that match your needs",
      detailedDesc: "Browse through categories, search products, and find exactly what you're looking for with our advanced semantic AI search engines.",
      activeIconBg: "bg-blue-600 text-white shadow-md",
      lightAccent: "bg-[#EBF2F7] text-blue-600", 
      borderColor: "hover:border-blue-300",
      stepNumber: "01",
      duration: "1-2 mins"
    },
    { 
      id: 2,
      title: "Selection", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      description: "Select items and add to cart",
      detailedDesc: "Compare prices seamlessly, check verified community reviews, and curate your personalized collection directly in your smart cart.",
      activeIconBg: "bg-purple-600 text-white shadow-md",
      lightAccent: "bg-[#F5F1F9] text-purple-600",
      borderColor: "hover:border-purple-300",
      stepNumber: "02",
      duration: "2-3 mins"
    },
    { 
      id: 3,
      title: "Checkout", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Secure payment processing",
      detailedDesc: "Experience ultra-secure instant transactions with multi-currency support, end-to-end encryption, and dynamic coupon optimizations.",
      activeIconBg: "bg-pink-600 text-white shadow-md",
      lightAccent: "bg-[#F9F1F3] text-pink-600",
      borderColor: "hover:border-pink-300",
      stepNumber: "03",
      duration: "3-5 mins"
    },
    { 
      id: 4,
      title: "Fulfillment", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      description: "Order processing & delivery",
      detailedDesc: "Real-time automated order validation, eco-friendly automated packaging dispatch, and real-time live map tracking to your doorstep.",
      activeIconBg: "bg-green-600 text-white shadow-md",
      lightAccent: "bg-[#F1F9F3] text-green-600",
      borderColor: "hover:border-green-300",
      stepNumber: "04",
      duration: "2-5 days"
    },
    { 
      id: 5,
      title: "Support", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: "Post-purchase support",
      detailedDesc: "Enjoy lifetime security! Access continuous 24/7 technical help desks, one-click seamless returns, and proactive warranty claims.",
      activeIconBg: "bg-orange-600 text-white shadow-md",
      lightAccent: "bg-[#F9F4F1] text-orange-600",
      borderColor: "hover:border-orange-300",
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isVisible, steps.length]);

  return (
    <section ref={sectionRef} className="relative py-14 px-4 md:px-8 bg-[#F8FAFC] overflow-hidden -mt-15">
      
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0f172a]">
            The Customer Journey Blueprint
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl text-base md:text-lg leading-relaxed">
            An engineered lifecycle designed for absolute reliability, security, and elite speed.
          </p>
        </div>

        {/* Core Layout Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: Control Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {steps.map((step, index) => {
              const isCurrent = index === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 relative flex items-center gap-5 ${
                    isCurrent 
                      ? 'bg-white border-blue-600 shadow-xl shadow-blue-900/5 translate-x-2' 
                      : `bg-white border-gray-100 ${step.borderColor} hover:shadow-md`
                  }`}
                >
                  {/* Left Accent indicator line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-full transition-all duration-300 ${
                    isCurrent ? 'bg-blue-600' : 'bg-transparent'
                  }`} />

                  {/* Icon Node Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isCurrent ? step.activeIconBg : step.lightAccent
                  }`}>
                    {step.icon}
                  </div>

                  {/* Label Text Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold text-base tracking-tight transition-colors duration-200 ${
                        isCurrent ? 'text-[#0f172a]' : 'text-[#475569]'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-xs font-bold font-mono tracking-wider ${
                        isCurrent ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {step.stepNumber}
                      </span>
                    </div>
                    <p className={`text-slate-500 text-xs mt-1 leading-relaxed truncate transition-colors duration-200 ${
                      isCurrent ? 'text-[#334155]' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT SIDE: Dedicated Detailed Showcase Panel */}
          <div className="lg:col-span-7 w-full flex">
            <div className="w-full bg-white border-2 border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-900/5 flex flex-col justify-between relative overflow-hidden">
              
              {/* Graphic Backdrop Accent Decors */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-slate-50 rounded-bl-full pointer-events-none border-l border-b border-gray-100/40" />
              
              {/* Monitoring Status Bar Layout */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm animate-pulse" />
                  <span className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase">
                    SYSTEM DASHBOARD // STEP {steps[activeStep].stepNumber}
                  </span>
                </div>
                
                <div className="px-3 py-1 rounded-lg bg-slate-50 border border-gray-200 text-xs font-bold font-mono text-slate-600 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {steps[activeStep].duration}
                </div>
              </div>

              {/* Dynamic Content Core Presentation Block */}
              <div className="flex-1 flex flex-col justify-center py-6">
                <div key={activeStep} className="animate-fade-in-up">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 font-mono">
                    {steps[activeStep].title} Stage
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-[#0f172a] tracking-tight leading-tight">
                    {steps[activeStep].description}
                  </h4>
                  <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed max-w-xl">
                    {steps[activeStep].detailedDesc}
                  </p>
                </div>
              </div>

              {/* Progress Flow Tracking Mechanics */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-[11px] font-bold font-mono text-slate-400 mb-2 tracking-wider">
                  <span>PROCESS FLOW STABILITY</span>
                  <span className="text-blue-600">{Math.round(((activeStep + 1) / steps.length) * 100)}% COMPLETE</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-[2px]">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out" 
                    style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}