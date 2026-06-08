import { useState, useEffect, useRef } from "react";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  dur: 6 + Math.random() * 10,
  delay: Math.random() * 8,
  opacity: 0.15 + Math.random() * 0.35,
}));

const STATS = [
  { value: "10,000+", label: "Tons Delivered", icon: "🌾" },
  { value: "5,000+", label: "Retailers", icon: "🏪" },
  { value: "25+", label: "States Supply", icon: "📦" },
  { value: "100%", label: "Quality Checked", icon: "✅" },
];

const BADGES = [
  { label: "FSSAI Certified", icon: "🛡️" },
  { label: "PAN India Delivery", icon: "🚚" },
  { label: "GST Billing", icon: "🧾" },
  { label: "5000+ Retailers", icon: "🤝" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [countAnimated, setCountAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountAnimated(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
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
      minHeight: "100vh",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatImg {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-18px) rotate(1deg); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,176,65,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(245,176,65,0); }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        @keyframes grainScroll {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-1%, -1%); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes sunray {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.13; }
        }

        .hero-btn-primary {
          position: relative;
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 32px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          box-shadow: 0 4px 20px rgba(46,125,50,0.35);
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 32px rgba(46,125,50,0.5), 0 0 0 4px rgba(46,125,50,0.12);
          animation: pulseGlow 1.5s ease infinite;
        }
        .hero-btn-secondary {
          position: relative;
          background: linear-gradient(135deg, #F5B041 0%, #E67E22 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          padding: 14px 32px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          box-shadow: 0 4px 20px rgba(245,176,65,0.35);
        }
        .hero-btn-secondary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 32px rgba(245,176,65,0.55), 0 0 0 4px rgba(245,176,65,0.15);
        }
        .arrow-icon {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .hero-btn-primary:hover .arrow-icon,
        .hero-btn-secondary:hover .arrow-icon {
          transform: translateX(5px);
        }
        .stat-card {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 12px 36px rgba(46,125,50,0.12);
        }
        .badge-item {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
          animation: badgeFloat 3s ease-in-out infinite;
        }
        .badge-item:hover {
          transform: scale(1.08) translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(245,176,65,0.25) !important;
        }
        .count-animated {
          animation: countUp 0.6s cubic-bezier(.34,1.56,.64,1) both;
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #F8F5EC 0%, #FFFDF7 40%, #F0F7F0 100%)",
      }}>

        {/* Background paddy field image with overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          opacity: 0.08,
        }} />

        {/* Golden sunray effect */}
        <div style={{
          position: "absolute", top: "-10%", right: "5%",
          width: "600px", height: "600px",
          background: "radial-gradient(ellipse at center, rgba(245,176,65,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "sunray 4s ease-in-out infinite",
          zIndex: 0,
        }} />

        {/* Subtle grain texture overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.025,
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

       

        {/* MAIN CONTENT */}
        <div style={{
          position: "relative", zIndex: 5,
          maxWidth: "1280px", margin: "0 auto",
          padding: "120px 48px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
          width: "100%",
        }}>

          {/* LEFT CONTENT */}
          <div>
            {/* Eyebrow tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(46,125,50,0.09)",
              border: "1px solid rgba(46,125,50,0.18)",
              borderRadius: "50px",
              padding: "6px 16px",
              marginBottom: "24px",
              animation: mounted ? "fadeUp 0.6s 0.1s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2E7D32", display: "inline-block" }} />
              <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", fontWeight: 700, color: "#2E7D32", letterSpacing: "1px", textTransform: "uppercase" }}>
                India's Trusted Rice Wholesale Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(34px, 4vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.12,
              color: "#1F2937",
              marginBottom: "20px",
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
              fontSize: "clamp(14px, 1.3vw, 17px)",
              color: "#4B5563",
              lineHeight: 1.7,
              fontWeight: 500,
              marginBottom: "32px",
              animation: mounted ? "fadeUp 0.7s 0.3s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              Direct from Rice Mills &nbsp;•&nbsp; Bulk Orders &nbsp;•&nbsp; Best Wholesale Pricing Across India
              <br />
              <span style={{ color: "#6B7280", fontSize: "14px" }}>
                Serving 5,000+ retailers, distributors & food brands with consistent quality and timely delivery.
              </span>
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: "flex", gap: "16px", flexWrap: "wrap",
              marginBottom: "40px",
              animation: mounted ? "fadeUp 0.7s 0.4s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              <button
                className="hero-btn-primary"
                onMouseEnter={() => setHoveredBtn("explore")}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={(e) => handleRipple(e, "explore")}
              >
                {ripple?.id === "explore" && (
                  <span style={{
                    position: "absolute",
                    left: ripple.x, top: ripple.y,
                    width: "60px", height: "60px",
                    marginLeft: "-30px", marginTop: "-30px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.35)",
                    animation: "rippleEffect 0.7s ease-out forwards",
                    pointerEvents: "none",
                  }} />
                )}
                <span style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}>
                  🌾 Explore Rice Collection
                  <span className="arrow-icon">→</span>
                </span>
              </button>

              <button
                className="hero-btn-secondary"
                onMouseEnter={() => setHoveredBtn("quote")}
                onMouseLeave={() => setHoveredBtn(null)}
                onClick={(e) => handleRipple(e, "quote")}
              >
                {ripple?.id === "quote" && (
                  <span style={{
                    position: "absolute",
                    left: ripple.x, top: ripple.y,
                    width: "60px", height: "60px",
                    marginLeft: "-30px", marginTop: "-30px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.35)",
                    animation: "rippleEffect 0.7s ease-out forwards",
                    pointerEvents: "none",
                  }} />
                )}
                <span style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}>
                  📋 Request Bulk Quote
                  <span className="arrow-icon">→</span>
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: "10px",
              animation: mounted ? "fadeUp 0.7s 0.5s ease both" : "none",
              opacity: mounted ? undefined : 0,
            }}>
              {BADGES.map((badge, i) => (
                <div key={badge.label} className="badge-item" style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "rgba(255,253,247,0.9)",
                  border: "1px solid rgba(245,176,65,0.3)",
                  borderRadius: "50px",
                  padding: "7px 14px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1F2937",
                  fontFamily: "'Manrope', sans-serif",
                  boxShadow: "0 2px 10px rgba(245,176,65,0.12)",
                  animationDelay: `${i * 0.5}s`,
                  backdropFilter: "blur(8px)",
                }}>
                  <span style={{ fontSize: "14px" }}>{badge.icon}</span>
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
              width: "420px", height: "420px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(245,176,65,0.18) 0%, rgba(46,125,50,0.08) 60%, transparent 100%)",
              zIndex: 0,
            }} />

            {/* Rice warehouse background card */}
            <div style={{
              position: "relative", zIndex: 2,
              width: "100%", maxWidth: "520px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(46,125,50,0.15), 0 8px 32px rgba(0,0,0,0.1)",
              animation: "floatImg 6s ease-in-out infinite",
            }}>
              {/* Main rice sack image */}
              <img
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=85"
                alt="Premium rice sacks"
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(46,125,50,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
              }} />
              {/* Bottom info on image */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "20px 24px",
              }}>
                <div style={{
                  display: "flex", gap: "10px",
                }}>
                  {[
                    { label: "Basmati Rice", sub: "Premium Long Grain" },
                    { label: "Sona Masoori", sub: "Daily Use Grade A" },
                  ].map(item => (
                    <div key={item.label} style={{
                      flex: 1,
                      background: "rgba(255,253,247,0.15)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "12px",
                      padding: "10px 14px",
                    }}>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "13px", fontWeight: 700, color: "#fff" }}>{item.label}</div>
                      <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating glassmorphism card - top left */}
            <div style={{
              position: "absolute", top: "8%", left: "-10%", zIndex: 6,
              background: "rgba(255,253,247,0.88)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(245,176,65,0.25)",
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 8px 32px rgba(46,125,50,0.12)",
              minWidth: "150px",
              animation: "floatBadge 4s ease-in-out infinite",
              animationDelay: "1s",
            }}>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "4px" }}>Today's Rate</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "20px", fontWeight: 800, color: "#2E7D32" }}>₹42/kg</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", color: "#10B981", fontWeight: 600, marginTop: "2px" }}>↑ 2.4% Basmati Premium</div>
            </div>

            {/* Floating glassmorphism card - bottom right */}
            <div style={{
              position: "absolute", bottom: "10%", right: "-8%", zIndex: 6,
              background: "rgba(255,253,247,0.88)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(46,125,50,0.2)",
              borderRadius: "16px",
              padding: "14px 18px",
              boxShadow: "0 8px 32px rgba(46,125,50,0.12)",
              animation: "floatBadge 5s ease-in-out infinite",
              animationDelay: "0.5s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.8px" }}>Live Orders</span>
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "22px", fontWeight: 800, color: "#1F2937" }}>247</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", color: "#6B7280" }}>Bulk orders today</div>
            </div>

            {/* Certified badge */}
            <div style={{
              position: "absolute", top: "42%", right: "-12%", zIndex: 6,
              background: "linear-gradient(135deg, #2E7D32, #388E3C)",
              borderRadius: "16px",
              padding: "12px 16px",
              boxShadow: "0 8px 24px rgba(46,125,50,0.35)",
              animation: "floatBadge 3.5s ease-in-out infinite",
              animationDelay: "2s",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "22px", marginBottom: "2px" }}>🛡️</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", fontWeight: 800, color: "#fff", letterSpacing: "0.5px" }}>FSSAI</div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.75)" }}>Certified</div>
            </div>
          </div>
        </div>

        {/* STATISTICS STRIP */}
        <div ref={statsRef} style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
          background: "rgba(255,253,247,0.92)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(46,125,50,0.1)",
          padding: "0 48px",
        }}>
          <div style={{
            maxWidth: "1280px", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="stat-card" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "22px 20px",
                borderRight: i < 3 ? "1px solid rgba(46,125,50,0.1)" : "none",
                gap: "4px",
                animation: countAnimated ? `countUp 0.5s ${0.1 * i}s ease both` : "none",
                opacity: countAnimated ? undefined : 0,
              }}>
                <span style={{ fontSize: "20px", marginBottom: "2px" }}>{stat.icon}</span>
                <span style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #2E7D32, #F5B041)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.1,
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#6B7280",
                  letterSpacing: "0.5px",
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}