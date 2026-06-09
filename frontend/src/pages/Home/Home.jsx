import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, Heart, Menu, ChevronRight, Star, 
  CheckCircle, Truck, ShieldCheck, Award, MapPin, ArrowRight, 
  ChevronDown, Phone, Mail, FileText, Smartphone, Percent, HelpCircle 
} from 'lucide-react';
import img from "../../assets/rice.png"
import catImg1 from "../../assets/IMG1.PNG"
import catImg2 from "../../assets/IMG4.PNG"
import catImg3 from "../../assets/IMG3.PNG"
import catImg4 from "../../assets/IMG2.PNG"
import biryaniBanner from "../../assets/rice-types/biriyani.png"
import dailyStaples from "../../assets/rice-types/biriyani.png"
import idliDosaRice from "../../assets/rice-types/idly.png"
import dessertRice from "../../assets/rice-types/Desserts.png"
import basmathi from "../../assets/basmathi.png"
export default function HomePage() {
  // UI States
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [selectedWeights, setSelectedWeights] = useState({});

  // Sample Product Dataset
  const bestSellers = [
    { id: 'p1', name: '1121 Extra Long Premium Aged Basmati', price: 180, originalPrice: 220, rating: 4.9, reviews: 1240, tags: ['Best Seller', '2 Years Aged'], image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', weights: ['1kg', '5kg', '10kg'], defaultWeight: '5kg' },
    { id: 'p2', name: 'Super Hybrid Organic Sona Masoori', price: 95, originalPrice: 110, rating: 4.8, reviews: 840, tags: ['Organic', 'Low GI'], image: 'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=600&q=80', weights: ['1kg', '5kg', '25kg'], defaultWeight: '5kg' },
    { id: 'p3', name: 'Traditional Fortune Wada Kolam', price: 85, originalPrice: 95, rating: 4.7, reviews: 620, tags: ['Daily Staple'], image: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&w=600&q=80', weights: ['5kg', '10kg', '25kg'], defaultWeight: '10kg' },
    { id: 'p4', name: 'Premium Sharbati Long Grain Rice', price: 115, originalPrice: 135, rating: 4.8, reviews: 410, tags: ['Aromatic'], image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80', weights: ['1kg', '5kg'], defaultWeight: '5kg' }
  ];

  const handleWeightChange = (productId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: weight }));
  };

  const verifyPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({ success: true, message: '🚀 Swift Delivery Available! Delivering tomorrow morning.' });
    } else {
      setPincodeStatus({ success: false, message: '❌ Invalid Pincode. Please enter a valid 6-digit code.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#112E24] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#112E24]">
      
    

      {/* 3. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#FDFBF7] to-[#EAE6DF] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* <div className="inline-flex items-center gap-2 bg-[#112E24]/5 border border-[#112E24]/10 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#112E24]">
              <Award size={14} className="text-[#D4AF37]" /> India's Most Regal Harvest
            </div> */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#112E24] leading-tight">
              The Art of Pure Grain. <br />
              <span className="text-[#D4AF37] italic font-normal">Aged to Perfection.</span>
            </h1>
            <p className="text-[#5A6561] text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Sourced directly from India's finest heritage farms. Handpicked, laser-sorted, and aged naturally up to 24 months for unforgettable culinary moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#bestsellers" className="bg-[#112E24] text-[#FDFBF7] px-8 py-4 rounded-lg font-medium shadow-xl shadow-[#112E24]/10 hover:bg-[#112E24]/90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group">
                Shop Best Sellers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#categories" className="border border-[#112E24] text-[#112E24] px-8 py-4 rounded-lg font-medium hover:bg-[#112E24]/5 transition-all flex items-center justify-center">
                Explore Collections
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent rounded-full filter blur-3xl -z-10 transform scale-75"></div>
            <img 
              src={img} 
              alt="Premium Raw Rice Grains" 
              className="w-full h-[350px] sm:h-[450px] object-cover rounded-2xl shadow-2xl border-4 border-white transform lg:rotate-1 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 4. MAIN CATEGORIES SECTION */}
      <section id="categories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">Curated Dynamic Collections</h2>
          <p className="text-[#5A6561]">Explore pristine grains specialized for nutritional dominance and fine dining culinary art.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Traditional Basmati', count: '12 Varieties', img: catImg1 },
            { name: 'Regional Staples', count: '18 Varieties', img: catImg2 },
            { name: 'Organic & Fitness', count: '8 Varieties', img: catImg3 },
            { name: 'Exotic & Wild Rice', count: '5 Varieties', img: catImg4 },
          ].map((cat, idx) => (
            <div key={idx} className="group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#112E24]/90 via-[#112E24]/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif font-bold text-lg leading-tight">{cat.name}</h3>
                <p className="text-xs text-[#FDFBF7]/80 mt-1 flex items-center justify-between">
                  {cat.count} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEST SELLING RICE PRODUCTS */}
      <section id="bestsellers" className="py-16 bg-[#112E24]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#112E24] mb-2">Our Signature Best Sellers</h2>
              <p className="text-[#5A6561]">The highly verified staples keeping millions of family meals premium and authentic.</p>
            </div>
            <button className="text-[#112E24] font-semibold flex items-center gap-1 group whitespace-nowrap hover:text-[#D4AF37] transition-colors">
              View All Products <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => {
              const currentWeight = selectedWeights[product.id] || product.defaultWeight;
              return (
                <div key={product.id} className="bg-[#FDFBF7] rounded-xl border border-[#EAE6DF] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="relative pt-[100%] bg-white overflow-hidden">
                    <span className="absolute top-2 left-2 bg-[#112E24] text-[#FDFBF7] text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded z-10">
                      {product.tags[0]}
                    </span>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                    />
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                        <span className="text-xs font-bold text-[#112E24]">{product.rating}</span>
                        <span className="text-xs text-[#5A6561]">({product.reviews})</span>
                      </div>
                      <h3 className="font-medium text-sm sm:text-base text-[#112E24] line-clamp-2 min-h-[40px] hover:text-[#D4AF37] cursor-pointer transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <div>
                      {/* Weight Selector tabs inside card */}
                      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
                        {product.weights.map((w) => (
                          <button
                            key={w}
                            onClick={() => handleWeightChange(product.id, w)}
                            className={`text-xs px-2.5 py-1 rounded border whitespace-nowrap font-medium transition-all ${
                              currentWeight === w 
                                ? 'bg-[#112E24] text-white border-[#112E24]' 
                                : 'bg-transparent text-[#5A6561] border-[#EAE6DF] hover:border-[#112E24]'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-baseline justify-between pt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-[#112E24]">₹{product.price}</span>
                          <span className="text-xs text-[#5A6561] line-through">₹{product.originalPrice}</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#2E7D32]">Save {Math.round(((product.originalPrice - product.price)/product.originalPrice)*100)}%</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setCartCount(prev => prev + 1)}
                      className="w-full bg-[#112E24] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#112E24] transition-all active:scale-[0.98]"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PREMIUM RICE COLLECTION */}
      <section className="py-20 bg-[#112E24] text-[#FDFBF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold block">The Royal Reserve</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Meticulously Aged 24-Month Basmati</h2>
            <p className="text-[#FDFBF7]/80 leading-relaxed">
              Much like fine wine, exceptional Basmati requires patience. Our Royal Reserve grains are stored in moisture-controlled chambers for 2 full years. This process completely dehydrates the grain, ensuring maximal elongation, fluffiness, and zero stickiness when cooked.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <div className="text-2xl font-serif font-bold text-[#D4AF37]">8.4mm+</div>
                <div className="text-xs text-[#FDFBF7]/60 uppercase tracking-wider mt-0.5">Average Grain Length</div>
              </div>
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <div className="text-2xl font-serif font-bold text-[#D4AF37]">100%</div>
                <div className="text-xs text-[#FDFBF7]/60 uppercase tracking-wider mt-0.5">Purity Guaranteed</div>
              </div>
            </div>
            <div className="pt-4">
              <button className="bg-[#D4AF37] text-[#112E24] px-8 py-3.5 rounded-lg font-bold hover:bg-[#FDFBF7] transition-all shadow-lg flex items-center gap-2 group">
                Reserve Luxury Grain <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <img 
              src={basmathi} 
              alt="Luxury Aged Basmati Showcase" 
              className="w-full h-[400px] object-cover rounded-xl shadow-2xl filter brightness-90"
            />
          </div>
        </div>
      </section>

      {/* 7. ORGANIC RICE COLLECTION */}
      {/* <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2E7D32] text-xs uppercase tracking-widest font-bold px-2.5 py-1 bg-[#2E7D32]/10 rounded-full inline-block mb-3">100% Certified Organic</span>
          <h2 className="text-3xl font-serif font-bold mb-3">Conscious Grains for Optimal Fitness</h2>
          <p className="text-[#5A6561]">Unpolished, native superfoods loaded with high fiber, essential trace minerals, and low glycemic indices.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: 'Ancient Black Forbidden Rice', benefit: 'Immunity & Antioxidants', price: '₹240/kg', img: 'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=500&q=80' },
            { name: 'Himalayan Red Organic Rice', benefit: 'High Fiber & Iron-Rich', price: '₹160/kg', img: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&w=500&q=80' },
            { name: 'Low-GI Diabetic Friendly Brown Rice', benefit: 'Sustained Energy Control', price: '₹120/kg', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#EAE6DF] p-4 hover:shadow-lg transition-all group flex flex-col justify-between col-span-1 odd:last-child:col-span-2 md:odd:last-child:col-span-1">
              <div>
                <img src={item.img} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <span className="text-[10px] text-[#2E7D32] bg-[#2E7D32]/5 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{item.benefit}</span>
                <h3 className="font-serif font-bold text-base mt-2 text-[#112E24]">{item.name}</h3>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EAE6DF]/60">
                <span className="font-bold text-[#112E24]">{item.price}</span>
                <button className="text-xs font-bold text-[#112E24] group-hover:text-[#D4AF37] flex items-center gap-0.5 transition-colors">Buy Now <ChevronRight size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* 8. SHOP BY RICE TYPE (BENTO GRID USE-CASES) */}
      <section className="py-16 bg-[#EAE6DF]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold mb-3">Match Your Dish Perfectly</h2>
            <p className="text-[#5A6561]">Different culinary expressions deserve targeted grain compositions. Select your master recipe.</p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-4 auto-rows-[220px]">
            <div className="md:col-span-7 relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src={biryaniBanner} alt="Biryani" className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif font-bold">The Royal Biryani Collection</h3>
                <p className="text-xs text-white/80 mt-1">Extra-long non-sticky grains that absorb authentic flavor masalas flawlessly.</p>
              </div>
            </div>

            <div className="md:col-span-5 relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src={dailyStaples} alt="Daily South Indian Staples" className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif font-bold">Daily Staples (Sona / Kolam)</h3>
                <p className="text-xs text-white/80 mt-1">Lightweight, comforting varieties optimized for everyday home dining.</p>
              </div>
            </div>

            <div className="md:col-span-5 relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src={idliDosaRice} alt="Idli Batter Rice" className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif font-bold">Idli & Dosa Specialty Rice</h3>
                <p className="text-xs text-white/80 mt-1">High starch optimization to drive ultra-fluffy fermentation mapping.</p>
              </div>
            </div>

            <div className="md:col-span-7 relative rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src={dessertRice} alt="Desserts" className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-serif font-bold">Rich Kheer & Desserts</h3>
                <p className="text-xs text-white/80 mt-1">Fragrant, broken milky grains designed to thick-gel luxury sweet preparations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SEASONAL OFFERS BANNER */}
      <section className="my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#112E24] to-[#1C4A3A] text-white rounded-2xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full filter blur-2xl"></div>
          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <span className="bg-[#D4AF37] text-[#112E24] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1"><Percent size={14} /> Mega Festive Allocation</span>
            <h2 className="text-3xl font-serif font-bold">Grand Feast Wholesale Stockup Sale</h2>
            <p className="text-white/80 text-sm">Purchase a collective tier of 20kg or higher and receive flat 15% instant reduction along with automated custom brass serving spoons.</p>
          </div>
          <div className="shrink-0 relative z-10 w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#D4AF37] text-[#112E24] px-8 py-4 rounded-lg font-bold hover:bg-[#FDFBF7] transition-all whitespace-nowrap shadow-md">
              Unlock Bulk Fest Discounts
            </button>
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE US */}
      <section id="whyus" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold">Setting the Absolute Benchmark for Grain Purity</h2>
          <p className="text-[#5A6561]">We eliminated every standard grocery supply line flaw to guarantee unprecedented consumer safety.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <CheckCircle className="text-[#D4AF37]" size={28} />, title: 'Naturally Aged up to 24 Months', desc: 'Ensures maximally non-sticky, separated fluffy grains when prepared.' },
            { icon: <ShieldCheck className="text-[#D4AF37]" size={28} />, title: 'Zero Chemical Adulteration', desc: '100% clean-label processing void of synthetic aroma boosters or artificial polish.' },
            { icon: <Award className="text-[#D4AF37]" size={28} />, title: 'Multi-Stage Laser Sorting', desc: 'Advanced AI cameras strip out every broken, yellow, or immature grain variant.' },
            { icon: <Truck className="text-[#D4AF37]" size={28} />, title: 'Moisture-Locked Packaging', desc: 'Thick food-safe seals completely lock out standard pantry weevils and bugs.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#EAE6DF] p-6 rounded-xl hover:translate-y-[-4px] transition-all duration-300 shadow-sm">
              <div className="mb-4 bg-[#112E24]/5 w-14 h-14 rounded-lg flex items-center justify-center">{item.icon}</div>
              <h3 className="font-serif font-bold text-lg text-[#112E24] mb-2">{item.title}</h3>
              <p className="text-sm text-[#5A6561] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FARMER DIRECT SECTION */}
      <section className="py-16 bg-[#F5F1E9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=800&q=80" 
              alt="Ethical Sourcing Rice Fields" 
              className="w-full h-[380px] object-cover rounded-xl shadow-lg border border-white"
            />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold block">Radical Supply Transparency</span>
            <h2 className="text-3xl font-serif font-bold">Direct From The Heritage Basmati Belts</h2>
            <p className="text-[#5A6561] leading-relaxed">
              We eliminate traditional layered middle-men brokers completely. By creating micro-contracts directly with heritage crop farmers in the fertile Himalayan foothills and Indo-Gangetic plains, we lock in unmatched grain selection while feeding 100% of the financial profits right back to farm roots.
            </p>
            <div className="pt-2">
              <button className="border-2 border-[#112E24] text-[#112E24] font-bold px-6 py-3 rounded-lg hover:bg-[#112E24] hover:text-white transition-all text-sm flex items-center gap-2">
                Trace Sourcing Batches <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. QUALITY ASSURANCE SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#112E24] text-white rounded-2xl p-8 lg:p-12 text-center max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-bold">Precision Lab-Tested Food Security</h2>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base">
            Every harvest batch undergoes critical scientific examination. We generate open quality assurance data reports for heavy metal screening, moisture calibration mapping, and pesticide metrics ensuring unmatched purity validation.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xl sm:text-2xl font-bold text-[#D4AF37]">0%</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase mt-1">Heavy Metals Found</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xl sm:text-2xl font-bold text-[#D4AF37]">12%</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase mt-1">Optimum Moisture Target</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-xl sm:text-2xl font-bold text-[#D4AF37]">100%</div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase mt-1">Traceable Batches</div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CUSTOMER REVIEWS */}
      <section className="py-16 bg-[#112E24]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-serif font-bold">Endorsed By Culinary Connoisseurs</h2>
            <p className="text-[#5A6561]">See how family heads and veteran five-star chefs evaluate our premium crop distributions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "“The elongation on this Basmati is absolutely magical. Every single grain acts independently—completely structural, fluffy, and the intense natural aroma sweeps through the entire estate kitchen instantly.”", author: "Chef Vikram M.", role: "Executive Master Chef" },
              { text: "“Switching my household to Fathima Rice Land's unpolished Sona Masoori completely restructured our routine bloating problems. Highly nutritious, uncompromised natural quality standard.”", author: "Priya Sharma", role: "Verified Premium Buyer" },
              { text: "“I was thoroughly skeptical about sourcing agricultural commodities online. But the completely secure weevil-proof thick packaging combined with stellar purity completely converted me.”", author: "Rajesh K.", role: "Culinary Enthusiast" }
            ].map((rev, index) => (
              <div key={index} className="bg-[#FDFBF7] p-6 rounded-xl border border-[#EAE6DF] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-current" />)}
                  </div>
                  <p className="text-sm italic text-[#5A6561] leading-relaxed">{rev.text}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#112E24]">{rev.author}</h4>
                    <p className="text-[11px] text-[#5A6561]">{rev.role}</p>
                  </div>
                  <span className="text-[10px] bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded font-bold uppercase">Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. TRUST & CERTIFICATIONS */}
      {/* <section className="py-10 bg-white border-y border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 filter grayscale contrast-200">
          <div className="font-serif font-bold text-lg tracking-wider text-black">FSSAI COMPLIANT</div>
          <div className="font-serif font-bold text-lg tracking-wider text-black">ISO 22000</div>
          <div className="font-serif font-bold text-lg tracking-wider text-black">USDA ORGANIC</div>
          <div className="font-serif font-bold text-lg tracking-wider text-black">NON-GMO VERIFIED</div>
          <div className="font-serif font-bold text-lg tracking-wider text-black">INDIA ORGANIC</div>
        </div>
      </section> */}

      {/* 15. DELIVERY COVERAGE SECTION */}
      {/* <section className="py-16 max-w-md mx-auto px-4 text-center">
        <div className="bg-white border border-[#EAE6DF] p-6 rounded-2xl shadow-md space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#112E24]/5 flex items-center justify-center text-[#112E24]">
            <MapPin size={24} />
          </div>
          <h3 className="text-xl font-serif font-bold">Check Superfast Priority Dispatch</h3>
          <p className="text-xs text-[#5A6561]">Enter your operational location pincode to check immediate priority availability matrices.</p>
          
          <form onSubmit={verifyPincode} className="flex gap-2">
            <input 
              type="text" 
              maxLength={6}
              placeholder="Enter 6-Digit Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 border border-[#EAE6DF] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#112E24]"
            />
            <button type="submit" className="bg-[#112E24] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#D4AF37] hover:text-[#112E24] transition-colors">
              Verify
            </button>
          </form>
          {pincodeStatus && (
            <p className={`text-xs font-semibold mt-2 ${pincodeStatus.success ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>
              {pincodeStatus.message}
            </p>
          )}
        </div>
      </section> */}

      {/* 16. BULK & WHOLESALE ORDERS SECTION */}
      {/* <section id="bulk" className="py-16 bg-[#112E24] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl font-serif font-bold">Commercial B2B Procurement Operations</h2>
            <p className="text-white/80 text-sm sm:text-base">
              Are you managing a fine-dining culinary restaurant chain, commercial catering enterprise, or luxury resort? Access personalized commercial container pricing structures for volumetric custom orders extending past 100 Kilograms.
            </p>
            <div className="space-y-2 text-sm text-white/70 pt-2">
              <p className="flex items-center gap-2">🔹 Custom Moisture & Sorting Target Control</p>
              <p className="flex items-center gap-2">🔹 Dedicated Port Freight & Logistics Support</p>
              <p className="flex items-center gap-2">🔹 GST Invoice Compliance Tax Structuring</p>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#FDFBF7] text-[#112E24] p-6 sm:p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-serif font-bold mb-4">Request Commercial Quotation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Corporate/Contact Name" className="border border-[#EAE6DF] rounded-lg p-3 text-sm focus:outline-none focus:border-[#112E24]" />
              <input type="text" placeholder="Corporate WhatsApp/Phone" className="border border-[#EAE6DF] rounded-lg p-3 text-sm focus:outline-none focus:border-[#112E24]" />
              <select className="border border-[#EAE6DF] rounded-lg p-3 text-sm focus:outline-none focus:border-[#112E24] bg-white">
                <option>Select Expected Target Volume</option>
                <option>100kg - 500kg</option>
                <option>500kg - 2 Tons</option>
                <option>More than 2 Tons</option>
              </select>
              <button className="bg-[#112E24] text-white font-bold rounded-lg p-3 text-sm hover:bg-[#D4AF37] hover:text-[#112E24] transition-all">
                Connect With Wholesale Desks
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* 17. MOBILE APP PROMOTION BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-[#F5F1E9] to-[#EAE6DF] rounded-2xl p-8 lg:p-12 grid md:grid-cols-12 gap-8 items-center border border-[#EAE6DF]">
          <div className="md:col-span-7 space-y-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">1-Click Replenishment via Native App</h2>
            <p className="text-[#5A6561] text-sm max-w-lg">
              Download our signature ultra-fast application. Set recurring automated family staple deliveries, track precision global container shipping vectors, and receive instant app-only flash offers.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <div className="bg-[#112E24] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-xs cursor-pointer hover:bg-[#D4AF37] hover:text-[#112E24] transition-colors">
                <Smartphone size={16} /> GOOGLE PLAY STORE
              </div>
              <div className="bg-[#112E24] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-xs cursor-pointer hover:bg-[#D4AF37] hover:text-[#112E24] transition-colors">
                <Smartphone size={16} /> APPLE APP STORE
              </div>
            </div>
          </div>
          <div className="md:col-span-5 flex justify-center">
            <div className="w-48 h-48 bg-white border border-[#EAE6DF] rounded-xl p-3 flex flex-col items-center justify-center shadow-inner">
              {/* Micro Placeholder Mocking QR Architecture */}
              <div className="w-36 h-36 bg-gradient-to-br from-black to-gray-700 rounded p-2 grid grid-cols-4 gap-1 opacity-20">
                {[...Array(16)].map((_, i) => <div key={i} className="bg-black rounded-sm"></div>)}
              </div>
              <span className="text-[10px] text-[#5A6561] font-bold mt-2">SCAN DETECTOR TO DOWNLOAD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 18. FAQ SECTION */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold flex items-center justify-center gap-2"><HelpCircle size={26} className="text-[#D4AF37]" /> Essential Product Intelligence FAQs</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "Why is natural grain aging critical for Premium Basmati?", a: "Aging natural grains naturally structures complete structural dehydration over 12-24 months. This makes the grain non-sticky and long when boiled." },
            { q: "How do you guarantee protection against bugs without toxic chemicals?", a: "We utilize multi-layer food-grade polymers mapped to oxygen extraction technology that completely starves insect vectors without altering grain safety profiles." },
            { q: "Can I cancel or alter my subscription deliveries later?", a: "Absolutely. Our fully modular operational settings allow seamless cancellations or interval adjustments anytime from your personal user dashboard system." }
          ].map((faq, index) => (
            <div key={index} className="border border-[#EAE6DF] rounded-xl bg-white overflow-hidden shadow-sm">
              <button 
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left p-5 font-medium text-sm sm:text-base flex justify-between items-center bg-[#FDFBF7] hover:bg-[#112E24]/5 transition-colors focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transform transition-transform ${activeFaq === index ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>
              {activeFaq === index && (
                <div className="p-5 text-xs sm:text-sm text-[#5A6561] border-t border-[#EAE6DF] bg-white leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

     

      {/* 20. PREMIUM FOOTER */}
      {/* <footer className="bg-[#112E24] text-white/90 pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          <div className="col-span-2 space-y-4">
            <div className="text-2xl font-serif font-bold tracking-tight text-white">
              Fathima Rice Land<span className="text-[#D4AF37]">.</span>
            </div>
            <p className="text-xs text-white/60 max-w-sm leading-relaxed">
              Engineering the absolute highest echelons of agricultural purity and supply line mechanics across India since inception.
            </p>
            <div className="space-y-1 text-xs text-white/70">
              <p className="flex items-center gap-2"><Phone size={14} className="text-[#D4AF37]" /> +91 98765 43210</p>
              <p className="flex items-center gap-2"><Mail size={14} className="text-[#D4AF37]" /> concierge@Fathima Rice Landgrains.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">Core Portfolios</h4>
            <div className="flex flex-col gap-2.5 text-xs text-white/70">
              <a href="#" className="hover:text-white transition-colors">Royal Aged Basmati</a>
              <a href="#" className="hover:text-white transition-colors">Organic Fiber Variants</a>
              <a href="#" className="hover:text-white transition-colors">Everyday Superfine Rice</a>
              <a href="#" className="hover:text-white transition-colors">Exotic Local Collections</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">Corporate Ecosystem</h4>
            <div className="flex flex-col gap-2.5 text-xs text-white/70">
              <a href="#" className="hover:text-white transition-colors">Our Ethical Farm Network</a>
              <a href="#" className="hover:text-white transition-colors">Lab Assay Quality Reports</a>
              <a href="#" className="hover:text-white transition-colors">B2B Institutional Orders</a>
              <a href="#" className="hover:text-white transition-colors">Environmental Sustainability</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">Regulatory Protocol</h4>
            <div className="flex flex-col gap-2.5 text-xs text-white/70">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><FileText size={12} /> Privacy Provisions</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><FileText size={12} /> Terms of Logistics</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><FileText size={12} /> Refund Architecture</a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© 2026  Fathima Rice Land  Luxury Agri-Foods Private Limited. Secure transactional verification standard.</p>
          <div className="flex gap-3 text-lg font-bold tracking-widest filter contrast-50 opacity-50">
            <span>UPI</span> <span>VISA</span> <span>MC</span> <span>RUPAY</span>
          </div>
        </div>
      </footer> */}

    </div>
  );
}