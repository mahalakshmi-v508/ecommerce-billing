import { useState, useEffect } from "react";
import riceOne from "../../../assets/banner/rice one.jpg";
import riceTwo from "../../../assets/banner/rice two.jpeg";
import riceThree from "../../../assets/banner/rice three.jpeg";

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
  { label: "FSSAI Certified" },
  { label: "PAN India Delivery" },
  { label: "GST Billing" },
  { label: "5000+ Retailers" },
];

const BANNERS = [riceOne, riceTwo, riceThree];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BANNERS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleRipple = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id,
    });

    setTimeout(() => setRipple(null), 700);
  };

  return (
    <div className="font-['Manrope','Poppins',sans-serif] overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes rippleEffect {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(4); opacity: 0; }
        }

        .hero-btn-primary {
          background: linear-gradient(135deg,#2E7D32,#43A047);
          color: #fff;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }

        .hero-btn-secondary {
          background: linear-gradient(135deg,#F5B041,#E67E22);
          color: #fff;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative flex items-center justify-center min-h-[100vh] overflow-hidden">

        {/* BACKGROUND CAROUSEL */}
        <div className="absolute inset-0 z-0">
          {BANNERS.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${img})`,
                opacity: currentBg === index ? 1 : 0,
              }}
            />
          ))}

          {/* Darker overlay for high text contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute z-10 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "#fff",
              opacity: p.opacity,
              animation: `float ${p.dur}s linear ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* CONTENT */}
        <div className="relative z-20 text-center px-6 max-w-3xl">

          {/* Premium Tag Badge */}
          <div className="inline-block mb-4">
            <span className="bg-green-100 text-green-800 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
              India's Trusted Rice Wholesale Platform
            </span>
          </div>

          {/* title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Premium Quality{" "}
            <span className="bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent font-extrabold">
              Rice Wholesale
            </span>
          </h1>

          {/* subtitle */}
          <p className="text-gray-100 text-base md:text-lg mb-8 font-medium drop-shadow-sm">
            Direct from Mills • Bulk Orders • Best Prices Across India
          </p>

          {/* buttons */}
          <div className="flex gap-4 justify-center flex-wrap mb-8">

            <button
              className="hero-btn-primary shadow-lg shadow-green-900/30 hover:scale-105 transition-transform"
              onClick={(e) => handleRipple(e, "explore")}
            >
              Explore Rice Collection
              {ripple?.id === "explore" && (
                <span
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 20,
                    height: 20,
                    transform: "translate(-50%,-50%)",
                    animation: "rippleEffect 0.7s ease-out",
                  }}
                />
              )}
            </button>

            <button
              className="hero-btn-secondary shadow-lg shadow-orange-900/30 hover:scale-105 transition-transform"
              onClick={(e) => handleRipple(e, "quote")}
            >
              Request Bulk Quote
              {ripple?.id === "quote" && (
                <span
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 20,
                    height: 20,
                    transform: "translate(-50%,-50%)",
                    animation: "rippleEffect 0.7s ease-out",
                  }}
                />
              )}
            </button>

          </div>

          {/* ✅ FIXED BADGES (ICONS REMOVED) */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {BADGES.map((b, i) => (
              <span
                key={i}
                className="bg-green-900/80 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-white border border-green-700/50 flex items-center justify-center shadow-md"
              >
                <span className="text-green-50">{b.label}</span>
              </span>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}