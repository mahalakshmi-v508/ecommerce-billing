export default function AboutSection() {
  const features = [
    {
      icon: "🛒",
      title: "Smart Inventory",
      description: "Real-time stock management with AI-powered predictions",
      color: "from-indigo-500 to-blue-500",
      delay: "0s"
    },
    {
      icon: "📦",
      title: "Order Tracking",
      description: "Live tracking & instant notifications for every order",
      color: "from-purple-500 to-pink-500",
      delay: "0.1s"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "100% encrypted transactions with multiple gateways",
      color: "from-blue-500 to-cyan-500",
      delay: "0.2s"
    },
    {
      icon: "👥",
      title: "24/7 Support",
      description: "Dedicated support team ready to assist you anytime",
      color: "from-pink-500 to-rose-500",
      delay: "0.3s"
    }
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-300/20 to-purple-300/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float-slow animation-delay-1000">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-semibold">
              Why Choose Us
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About SmartCommerce
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We're revolutionizing the e-commerce experience with cutting-edge technology 
            and customer-first approach
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: feature.delay }}
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl rounded-2xl"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`, 
                         background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }}>
              </div>
              
              {/* Card Content */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                {/* Icon Container */}
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-500 text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Border Effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-3/4 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-gray-200">
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              50K+
            </div>
            <div className="text-gray-500 text-sm">Happy Customers</div>
          </div>
          
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              10K+
            </div>
            <div className="text-gray-500 text-sm">Products Sold</div>
          </div>
          
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              98%
            </div>
            <div className="text-gray-500 text-sm">Customer Satisfaction</div>
          </div>
          
          <div className="text-center group">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div className="text-gray-500 text-sm">Support Available</div>
          </div>
        </div>

        {/* CTA Banner */}
        {/* <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="mb-6 text-indigo-100">
              Join thousands of satisfied customers using SmartCommerce
            </p>
            <button className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Started Today →
            </button>
          </div>
          
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        </div> */}
      </div>

      {/* Custom Animations - Add to your global CSS or use styled-jsx */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 8s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .grid.md\\:grid-cols-2 > div,
        .grid.lg\\:grid-cols-4 > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .grid.md\\:grid-cols-2 > div:nth-child(1),
        .grid.lg\\:grid-cols-4 > div:nth-child(1) { animation-delay: 0.1s; }
        .grid.md\\:grid-cols-2 > div:nth-child(2),
        .grid.lg\\:grid-cols-4 > div:nth-child(2) { animation-delay: 0.2s; }
        .grid.md\\:grid-cols-2 > div:nth-child(3),
        .grid.lg\\:grid-cols-4 > div:nth-child(3) { animation-delay: 0.3s; }
        .grid.md\\:grid-cols-2 > div:nth-child(4),
        .grid.lg\\:grid-cols-4 > div:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </section>
  );
}