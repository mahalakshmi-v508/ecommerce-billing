import riceFieldVideo from '../../../assets/Videos/rice-field.mp4';

export default function WholesaleShowcase() {
  const features = [
    { text: "Direct from premium rice mills", icon: "🌾" },
    { text: "Bulk orders with best prices", icon: "💰" },
    { text: "FSSAI certified quality", icon: "✅" },
    { text: "Pan-India fast delivery", icon: "🚚" }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Side - Content */}
          <div className="flex-1 lg:flex-[1.2] lg:pr-4">
            {/* Badge */}
            <div className="inline-block mb-4">
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Why Choose Us
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              India's Trusted 
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Rice Wholesale</span>
              <br />
              Platform
            </h2>
            
            {/* Divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mb-6"></div>
            
            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              Fathima Rice Land is India's premier wholesale rice marketplace, connecting 
              businesses directly with premium rice mills across the country. We eliminate 
              middlemen to provide you the best wholesale prices on high-quality rice.
            </p>
            
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              With over 5000+ satisfied wholesalers and 50+ rice varieties, we ensure 
              consistent quality, timely delivery, and complete tax compliance with 
              GST invoices for every bulk order.
            </p>
            
            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-gray-700 text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-8 pt-4 border-t border-green-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">5000+ Happy Wholesalers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Clean Video Player */}
          <div className="flex-1 w-full lg:flex-[1.5]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-green-100 bg-gray-900">
              
              {/* Video Wrapper Box */}
              <div className="relative aspect-[4/3] max-h-[500px] w-full">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={riceFieldVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}