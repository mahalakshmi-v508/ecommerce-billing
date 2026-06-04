import { useState, useEffect, useRef } from 'react';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Free & Fast Delivery",
      icon: "🚚",
      description: "Free shipping on orders over $50. Same-day delivery available in select cities.",
      highlight: "Free Shipping",
      highlightColor: "text-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      title: "Secure Payments",
      icon: "🔒",
      description: "100% secure transactions with PayPal, Credit Cards, and UPI. PCI compliant.",
      highlight: "256-bit SSL",
      highlightColor: "text-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 3,
      title: "Quality Guarantee",
      icon: "✓",
      description: "30-day return policy. All products are verified and come with manufacturer warranty.",
      highlight: "100% Authentic",
      highlightColor: "text-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      title: "24/7 Customer Support",
      icon: "💬",
      description: "Round-the-clock assistance via chat, email, and phone. Real humans, not bots.",
      highlight: "Instant Help",
      highlightColor: "text-orange-600",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Amazon/Flipkart style */}
        <div className="text-center mb-12">
          {/* <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Why Choose Us</span> */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join millions of satisfied customers who trust us for their shopping needs
          </p>
        </div>

        {/* Features Grid - Card Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <span className={`text-2xl ${feature.iconColor}`}>{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Highlight Badge */}
              <div className="inline-block px-3 py-1 bg-gray-100 rounded-full">
                <span className={`text-xs font-medium ${feature.highlightColor}`}>
                  {feature.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

       
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}