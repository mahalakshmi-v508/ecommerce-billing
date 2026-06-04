import React from 'react';
// குறிப்பு: இந்த ஐகான்களைப் பயன்படுத்த 'lucide-react' பேக்கேஜ் தேவை.
// npm i lucide-react அல்லது yarn add lucide-react மூலம் நிறுவவும்.
import { ShoppingCart, Package, CreditCard, Users, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-indigo-600" />,
      title: "Smart Inventory",
      description: "Real-time stock management with AI-powered predictions",
      borderColor: "border-indigo-100 shadow-sm shadow-indigo-100", // Hover-க்கு முன்பே பார்டர்
      glowColor: "bg-indigo-50/50", // Hover-க்கு முன்பே லைட் பேக்ரவுண்ட் க்ளோ
      textHoverColor: "group-hover:text-indigo-600"
    },
    {
      icon: <Package className="w-8 h-8 text-violet-600" />,
      title: "Order Tracking",
      description: "Live tracking & instant notifications for every order",
      borderColor: "border-violet-100 shadow-sm shadow-violet-100",
      glowColor: "bg-violet-50/50",
      textHoverColor: "group-hover:text-violet-600"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Secure Payments",
      description: "100% encrypted transactions with multiple gateways",
      borderColor: "border-blue-100 shadow-sm shadow-blue-100",
      glowColor: "bg-blue-50/50",
      textHoverColor: "group-hover:text-blue-600"
    },
    {
      icon: <Users className="w-8 h-8 text-slate-600" />,
      title: "24/7 Support",
      description: "Dedicated support team ready to assist you anytime",
      borderColor: "border-slate-200 shadow-sm shadow-slate-100",
      glowColor: "bg-slate-50/50",
      textHoverColor: "group-hover:text-slate-800"
    }
  ];

  return (
    <section className="relative py-14 px-6 overflow-hidden bg-white">
      {/* Background Subtle Geometrics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
          
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            About SmartCommerce
          </h2>
          
          <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We are revolutionizing the e-commerce experience with cutting-edge technology 
            and a strictly customer-first approach.
          </p>
        </div>Complete shopping

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.borderColor}`}
            >
              {/* Pre-active Subtle Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl pointer-events-none -z-10 ${feature.glowColor}`} />
              
              {/* Icon Container */}
              <div className="w-14 h-14 mb-6 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-inner transition-transform group-hover:scale-105 duration-300">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className={`text-lg font-bold text-slate-800 mb-2 transition-colors duration-200 ${feature.textHoverColor}`}>
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-200">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">50K+</div>
            <div className="text-slate-500 text-sm font-medium">Happy Customers</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">10K+</div>
            <div className="text-slate-500 text-sm font-medium">Products Sold</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">98%</div>
            <div className="text-slate-500 text-sm font-medium">Satisfaction Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">24/7</div>
            <div className="text-slate-500 text-sm font-medium">Support Available</div>
          </div>
        </div>

      </div>
    </section>
  );
}