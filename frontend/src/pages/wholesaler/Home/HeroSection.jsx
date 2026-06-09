import { useState, useEffect } from "react";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  dur: 6 + Math.random() * 10,
  delay: Math.random() * 8,
  opacity: 0.15 + Math.random() * 0.35,
}));

const BADGES = [
  { label: "FSSAI Certified", icon: "🛡️" },
  { label: "PAN India Delivery", icon: "🚚" },
  { label: "GST Billing", icon: "🧾" },
  { label: "5000+ Retailers", icon: "🤝" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleRipple = (e, id) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id, ts: Date.now() });
    setTimeout(() => setRipple(null), 700);
  };

  return (
    <div className="font-['Manrope','Poppins',sans-serif] bg-[#FFFDF7] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rippleEffect {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46,125,50,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(46,125,50,0); }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-4px) scale(1.01); }
        }
        @keyframes grainScroll {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-0.5%, -0.5%); }
        }
        @keyframes sunray {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }

        .hero-btn-primary {
          position: relative;
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(46,125,50,0.25);
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 24px rgba(46,125,50,0.4), 0 0 0 3px rgba(46,125,50,0.1);
          animation: pulseGlow 1.5s ease infinite;
        }
        .hero-btn-secondary {
          position: relative;
          background: linear-gradient(135deg, #F5B041 0%, #E67E22 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 12px 28px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(245,176,65,0.25);
        }
        .hero-btn-secondary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 24px rgba(245,176,65,0.4), 0 0 0 3px rgba(245,176,65,0.1);
        }
        .arrow-icon {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .hero-btn-primary:hover .arrow-icon,
        .hero-btn-secondary:hover .arrow-icon {
          transform: translateX(4px);
        }
        .badge-item {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
          animation: badgeFloat 3s ease-in-out infinite;
        }
        .badge-item:hover {
          transform: scale(1.05) translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(245,176,65,0.2) !important;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8F5EC] via-[#FFFDF7] to-[#F0F7F0] pt-10 pb-10 min-h-[calc(100vh-70px)]">
        
        {/* Background paddy field image with overlay */}
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-6" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1920&q=80')`,
        }} />

        {/* Golden sunray effect */}
        <div className="absolute -top-[10%] right-[5%] w-[500px] h-[500px] rounded-full z-0 animate-[sunray_4s_ease-in-out_infinite]" style={{
          background: "radial-gradient(ellipse at center, rgba(245,176,65,0.15) 0%, transparent 70%)",
        }} />

        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 z-0 opacity-2 animate-[grainScroll_8s_ease-in-out_infinite]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Floating rice grain particles */}
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute z-1" style={{
            left: `${p.x}%`,
            top: `${100 - p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 2.5}px`,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#F5B041" : p.id % 3 === 1 ? "#2E7D32" : "#C8B89A",
            opacity: p.opacity,
            animation: `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }} />
        ))}

        {/* MAIN CONTENT CONTAINER - Centered with max width */}
        <div className="relative z-5 max-w-[1200px] mx-auto px-6 py-5 text-center w-full">
          
          {/* LEFT CONTENT - Centered */}
          <div className="max-w-3xl mx-auto">
            {/* Eyebrow tag */}
            <div className={`inline-flex items-center gap-1.5 bg-[rgba(46,125,50,0.08)] border border-[rgba(46,125,50,0.15)] rounded-full px-3.5 py-1.25 mb-4.5 ${mounted ? 'animate-[fadeUp_0.6s_0.1s_ease_both]' : 'opacity-0'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] inline-block" />
              <span className="font-['Manrope',sans-serif] text-[11px] font-bold text-[#2E7D32] tracking-[0.8px] uppercase">
                India's Trusted Rice Wholesale Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 className={`font-['Playfair_Display',Georgia,serif] text-[clamp(32px,3.8vw,52px)] font-extrabold leading-[1.15] text-[#1F2937] mb-4 ${mounted ? 'animate-[fadeUp_0.7s_0.2s_ease_both]' : 'opacity-0'}`}>
              Premium Quality{" "}
              <span className="bg-gradient-to-r from-[#2E7D32] via-[#68A84A] to-[#F5B041] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
                Rice Wholesale
              </span>{" "}
              Supply
            </h1>

            {/* Subheading */}
            <div className={`${mounted ? 'animate-[fadeUp_0.7s_0.3s_ease_both]' : 'opacity-0'}`}>
              <p className="font-['Manrope',sans-serif] text-[clamp(13px,1.2vw,15px)] text-[#4B5563] leading-relaxed font-medium mb-3">
                Direct from Rice Mills &nbsp;•&nbsp; Bulk Orders &nbsp;•&nbsp; Best Wholesale Pricing Across India
              </p>
              <span className="text-[#6B7280] text-[13px] inline-block">
                Serving 5,000+ retailers, distributors & food brands with consistent quality and timely delivery.
              </span>
            </div>

            {/* CTA Buttons */}
            <div className={`flex gap-3.5 flex-wrap justify-center mb-8 ${mounted ? 'animate-[fadeUp_0.7s_0.4s_ease_both]' : 'opacity-0'}`}>
              <button
                className="hero-btn-primary"
                onClick={(e) => handleRipple(e, "explore")}
              >
                {ripple?.id === "explore" && (
                  <span className="absolute left-0 top-0 w-[50px] h-[50px] -ml-[25px] -mt-[25px] rounded-full bg-white/30 animate-[rippleEffect_0.7s_ease-out_forwards] pointer-events-none"
                    style={{ left: ripple.x, top: ripple.y }}
                  />
                )}
                <span className="flex items-center gap-1.5 relative z-1">
                  🌾 Explore Rice Collection
                  <span className="arrow-icon">→</span>
                </span>
              </button>

              <button
                className="hero-btn-secondary"
                onClick={(e) => handleRipple(e, "quote")}
              >
                {ripple?.id === "quote" && (
                  <span className="absolute left-0 top-0 w-[50px] h-[50px] -ml-[25px] -mt-[25px] rounded-full bg-white/30 animate-[rippleEffect_0.7s_ease-out_forwards] pointer-events-none"
                    style={{ left: ripple.x, top: ripple.y }}
                  />
                )}
                <span className="flex items-center gap-1.5 relative z-1">
                  📋 Request Bulk Quote
                  <span className="arrow-icon">→</span>
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className={`flex flex-wrap gap-2 justify-center ${mounted ? 'animate-[fadeUp_0.7s_0.5s_ease_both]' : 'opacity-0'}`}>
              {BADGES.map((badge, i) => (
                <div key={badge.label} className="badge-item flex items-center gap-1.5 bg-[rgba(255,253,247,0.9)] border border-[rgba(245,176,65,0.25)] rounded-full py-1.5 px-3 text-[11px] font-bold text-[#1F2937] font-['Manrope',sans-serif] shadow-[0_2px_8px_rgba(245,176,65,0.08)] backdrop-blur-sm"
                  style={{ animationDelay: `${i * 0.4}s` }}>
                  <span className="text-xs">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}