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
    <div style={{
      fontFamily: "'Manrope', 'Poppins', sans-serif",
      background: "#FFFDF7",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatImg {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
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
      <section style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #F8F5EC 0%, #FFFDF7 40%, #F0F7F0 100%)",
        paddingTop: "40px",
        paddingBottom: "40px",
        minHeight: "calc(100vh - 70px)", /* Adjusted viewport ratio for eliminating whitespace */
      }}>

        {/* Background paddy field image with overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
          opacity: 0.06,
        }} />

        {/* Golden sunray effect */}
        <div style={{
          position: "absolute", top: "-10%", right: "5%",
          width: "500px", height: "500px",
          background: "radial-gradient(ellipse at center, rgba(245,176,65,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "sunray 4s ease-in-out infinite",
          zIndex: 0,
        }} />

        {/* Subtle grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: "grainScroll 8s ease-in-out infinite",
        }} />

        {/* Floating rice grain particles */}
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${100 - p.y}%`,
            width: `${p.size}px`,
            height: `${p.size * 2.5}px`,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#F5B041" : p.id % 3 === 1 ? "#2E7D32" : "#C8B89A",
            opacity: p.opacity,
            animation: `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
            zIndex: 1,
            transform: `rotate(${Math.random() * 360}deg)`,
          }} />
        ))}

        {/* MAIN CONTENT CONTAINER */}
        <div style={{
          position: "relative", zIndex: 5,
          maxWidth: "1200px", margin: "0 auto",
          padding: "20px 24px", 
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "40px",
          alignItems: "center",
          width: "100%",
        }}>

          {/* LEFT CONTENT */}
          <div>
            {/* Eyebrow tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(46,125,50,0.08)",
              border: "1px solid rgba(46,125,50,0.15)",
              borderRadius: "50px",
              padding: "5px 14px",
              marginBottom: "18px",
              animation: mounted ? "fadeUp 0.6s 0.1s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2E7D32", display: "inline-block" }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, color: "#2E7D32", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                India's Trusted Rice Wholesale Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 3.8vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#1F2937",
              marginBottom: "16px",
              animation: mounted ? "fadeUp 0.7s 0.2s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              Premium Quality{" "}
              <span style={{
                background: "linear-gradient(135deg, #2E7D32 0%, #68A84A 50%, #F5B041 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                animation: "shimmer 4s linear infinite",
              }}>
                Rice Wholesale
              </span>{" "}
              Supply
            </h1>

            {/* Subheading */}
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "#4B5563",
              lineHeight: 1.6,
              fontWeight: 500,
              marginBottom: "28px",
              animation: mounted ? "fadeUp 0.7s 0.3s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              Direct from Rice Mills &nbsp;•&nbsp; Bulk Orders &nbsp;•&nbsp; Best Wholesale Pricing Across India
              <br />
              <span style={{ color: "#6B7280", fontSize: "13px", marginTop: "4px", display: "inline-block" }}>
                Serving 5,000+ retailers, distributors & food brands with consistent quality and timely delivery.
              </span>
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: "flex", gap: "14px", flexWrap: "wrap",
              marginBottom: "32px",
              animation: mounted ? "fadeUp 0.7s 0.4s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              <button
                className="hero-btn-primary"
                onClick={(e) => handleRipple(e, "explore")}
              >
                {ripple?.id === "explore" && (
                  <span style={{
                    position: "absolute",
                    left: ripple.x, top: ripple.y,
                    width: "50px", height: "50px",
                    marginLeft: "-25px", marginTop: "-25px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                    animation: "rippleEffect 0.7s ease-out forwards",
                    pointerEvents: "none",
                  }} />
                )}
                <span style={{ display: "flex", alignItems: "center", gap: "6px", position: "relative", zIndex: 1 }}>
                  🌾 Explore Rice Collection
                  <span className="arrow-icon">→</span>
                </span>
              </button>

              <button
                className="hero-btn-secondary"
                onClick={(e) => handleRipple(e, "quote")}
              >
                {ripple?.id === "quote" && (
                  <span style={{
                    position: "absolute",
                    left: ripple.x, top: ripple.y,
                    width: "50px", height: "50px",
                    marginLeft: "-25px", marginTop: "-25px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                    animation: "rippleEffect 0.7s ease-out forwards",
                    pointerEvents: "none",
                  }} />
                )}
                <span style={{ display: "flex", alignItems: "center", gap: "6px", position: "relative", zIndex: 1 }}>
                  📋 Request Bulk Quote
                  <span className="arrow-icon">→</span>
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "8px",
              animation: mounted ? "fadeUp 0.7s 0.5s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              {BADGES.map((badge, i) => (
                <div key={badge.label} className="badge-item" style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  background: "rgba(255,253,247,0.9)",
                  border: "1px solid rgba(245,176,65,0.25)",
                  borderRadius: "50px",
                  padding: "6px 12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#1F2937",
                  fontFamily: "'Manrope', sans-serif",
                  boxShadow: "0 2px 8px rgba(245,176,65,0.08)",
                  animationDelay: `${i * 0.4}s`,
                  backdropFilter: "blur(6px)",
                }}>
                  <span style={{ fontSize: "12px" }}>{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE VISUAL */}
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: mounted ? "fadeIn 0.8s 0.4s ease both" : "none",
            opacity: mounted ? undefined : 0,
          }}>
            {/* Soft glow blob behind image */}
            <div style={{
              position: "absolute",
              width: "360px", height: "360px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(245,176,65,0.15) 0%, rgba(46,125,50,0.06) 60%, transparent 100%)",
              zIndex: 0,
            }} />

            {/* Rice image background card */}
            <div style={{
              position: "relative", zIndex: 2,
              width: "100%", maxWidth: "440px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(46,125,50,0.12), 0 8px 24px rgba(0,0,0,0.08)",
              animation: "floatImg 5s ease-in-out infinite",
            }}>
              {/* Main image */}
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=85"
                alt="Premium rice sacks"
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(46,125,50,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
              }} />
              {/* Bottom tag list inside visual */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "16px 20px",
              }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[
                    { label: "Basmati Rice", sub: "Premium Long Grain" },
                    { label: "Sona Masoori", sub: "Daily Use Grade A" },
                  ].map(item => (
                    <div key={item.label} style={{
                      flex: 1,
                      background: "rgba(255,253,247,0.12)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "10px",
                      padding: "8px 12px",
                    }}>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", fontWeight: 700, color: "#fff" }}>{item.label}</div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glassmorphism Floating Badge - Today's Rate */}
            <div style={{
              position: "absolute", top: "10%", left: "-6%", zIndex: 6,
              background: "rgba(255,253,247,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(245,176,65,0.2)",
              borderRadius: "14px",
              padding: "12px 16px",
              boxShadow: "0 6px 24px rgba(46,125,50,0.1)",
              minWidth: "135px",
              animation: "floatBadge 4s ease-in-out infinite",
              animationDelay: "0.8s",
            }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>Today's Rate</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "18px", fontWeight: 800, color: "#2E7D32" }}>₹42/kg</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", color: "#10B981", fontWeight: 600 }}>↑ 2.4% Basmati</div>
            </div>

            {/* Glassmorphism Floating Badge - Live Orders */}
            <div style={{
              position: "absolute", bottom: "12%", right: "-4%", zIndex: 6,
              background: "rgba(255,253,247,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(46,125,50,0.15)",
              borderRadius: "14px",
              padding: "12px 16px",
              boxShadow: "0 6px 24px rgba(46,125,50,0.1)",
              animation: "floatBadge 5s ease-in-out infinite",
              animationDelay: "0.3s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 700, color: "#374151", textTransform: "uppercase" }}>Live Orders</span>
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, color: "#1F2937" }}>247</div>
            </div>

            {/* FSSAI Certified Badge */}
            <div style={{
              position: "absolute", top: "42%", right: "-6%", zIndex: 6,
              background: "linear-gradient(135deg, #2E7D32, #388E3C)",
              borderRadius: "14px",
              padding: "10px 14px",
              boxShadow: "0 6px 20px rgba(46,125,50,0.3)",
              animation: "floatBadge 3.5s ease-in-out infinite",
              animationDelay: "1.5s",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "18px", marginBottom: "1px" }}>🛡️</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", fontWeight: 800, color: "#fff" }}>FSSAI</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "9px", color: "rgba(255,255,255,0.8)" }}>Certified</div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}