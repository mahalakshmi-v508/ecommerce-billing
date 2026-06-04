import { useState, useEffect, useRef } from 'react';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Free & Fast Delivery",
      description: "Free shipping on orders over $50. Same-day delivery available in select cities.",
      highlight: "Free Shipping",
      // Modern SVG Icon for Truck
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V11.25a9 9 0 0 0-1.564-5.056l-1.415-2.264A1.125 1.125 0 0 0 16.321 3.375H12m5.25 15.375V13.5m0 0H12m5.25 18.75H12M3.375 14.25h13.5M3.375 14.25V7.5a1.125 1.125 0 0 1 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v6.75M12 3.375V6.75" />
        </svg>
      ),
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 border-emerald-100",
      glowColor: "hover:shadow-emerald-500/5 hover:border-emerald-200",
      badgeBg: "bg-emerald-50 text-emerald-700 font-medium"
    },
    {
      id: 2,
      title: "Secure Payments",
      description: "100% secure transactions with PayPal, Credit Cards, and UPI. PCI compliant.",
      highlight: "256-bit SSL Verified",
      // Modern SVG Icon for Shield Lock
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
        </svg>
      ),
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 border-blue-100",
      glowColor: "hover:shadow-blue-500/5 hover:border-blue-200",
      badgeBg: "bg-blue-50 text-blue-700 font-medium"
    },
    {
      id: 3,
      title: "Quality Guarantee",
      description: "30-day return policy. All products are verified and come with manufacturer warranty.",
      highlight: "100% Authentic",
      // Modern SVG Icon for Badge/Check
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50 border-violet-100",
      glowColor: "hover:shadow-violet-500/5 hover:border-violet-200",
      badgeBg: "bg-violet-50 text-violet-700 font-medium"
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Round-the-clock assistance via chat, email, and phone. Real humans, not bots.",
      highlight: "Instant Assistance",
      // Modern SVG Icon for Support/Chat
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.765 11.995 11.995 0 0 0 1.613-2.416C4.226 16.12 3 14.197 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      ),
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 border-amber-100",
      glowColor: "hover:shadow-amber-500/5 hover:border-amber-200",
      badgeBg: "bg-amber-50 text-amber-700 font-medium"
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white text-slate-800 relative overflow-hidden">
      {/* Subtle Grid Background for Premium Tech Look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Why Shop With Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3">
            What Makes Us Different      
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base font-normal leading-relaxed">
            Join millions of satisfied customers who trust our premium services for their everyday shopping needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative bg-white border border-slate-200/80 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05)] ${feature.glowColor} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className={`w-10 h-10 ${feature.iconBg} border rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                <div className={`${feature.iconColor}`}>
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                {feature.description}
              </p>

              {/* Highlight Badge */}
              <div className="absolute bottom-6 left-7">
                <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md ${feature.badgeBg}`}>
                  {feature.highlight}
                </span>
              </div>
              
              {/* Padding spacer to make layout clean due to absolute badge */}
              <div className="h-5" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}