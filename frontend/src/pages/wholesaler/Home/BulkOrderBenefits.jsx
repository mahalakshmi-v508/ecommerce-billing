import riceFieldVideo from '../../../assets/Videos/rice-field.mp4';

export default function WholesaleShowcase() {
  const features = [
    { text: "Direct from premium rice mills" },
    { text: "Bulk orders with best prices" },
    { text: "FSSAI certified quality" },
    { text: "Pan-India fast delivery" },
  ];

  const stats = [
    { value: "5000+", label: "Wholesalers" },
    { value: "50+", label: "Rice Varieties" },
    { value: "4.9★", label: "Avg Rating" },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, rgba(22,163,74,0.05) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(5,150,105,0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ─── LEFT: Content ─── */}
          <div className="flex-1 lg:flex-[1.1] space-y-7">

            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="block w-6 h-0.5 bg-green-600 rounded-full" />
              <span
                className="text-green-700 font-semibold tracking-widest uppercase"
                style={{ fontSize: '0.7rem', letterSpacing: '0.18em' }}
              >
                Why Choose Us
              </span>
            </div>

            {/* Headline */}
            <div>
              <h2
                className="font-extrabold text-gray-900 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.12 }}
              >
                India's Trusted
              </h2>
              <h2
                className="font-extrabold leading-tight"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  lineHeight: 1.12,
                  WebkitTextStroke: '2px #16a34a',
                  color: 'transparent',
                }}
              >
                Rice Wholesale
              </h2>
              <h2
                className="font-extrabold text-gray-900 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.12 }}
              >
                Platform
              </h2>
            </div>

            {/* Divider accent */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 rounded-full bg-green-600" />
              <div className="w-4 h-1 rounded-full bg-green-300" />
              <div className="w-2 h-1 rounded-full bg-green-200" />
            </div>

            {/* Body copy */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
              Fathima Rice Land connects businesses directly with premium rice mills across India —
              eliminating middlemen and ensuring the best wholesale prices on certified quality rice.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
              Every bulk order ships with a GST invoice and is backed by our quality guarantee.
              50+ rice varieties, pan-India delivery, FSSAI compliant at every step.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3"
                >
                  <span className="text-lg flex-shrink-0">{f.icon}</span>
                  <span className="text-gray-700 text-sm font-medium leading-snug">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">{s.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Video Panel ─── */}
          <div className="flex-1 lg:flex-[1.4] w-full">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(22,163,74,0.15), 0 30px 70px -12px rgba(22,163,74,0.2), 0 20px 40px -8px rgba(0,0,0,0.15)',
              }}
            >
              {/* Video */}
              <div className="relative aspect-[4/3] bg-gray-900">
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

                {/* Gradient scrim at bottom for text overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 42%, transparent 70%)',
                  }}
                />

                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-green-400 text-xs font-semibold tracking-widest uppercase mb-1">
                        From the Fields
                      </p>
                      <p className="text-white font-bold text-lg leading-tight">
                        Premium quality, <br />straight to your business
                      </p>
                    </div>
                    {/* Live badge */}
                    <div className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                </div>

                {/* Top-left watermark badge */}
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none">
                  🌾 Fathima Rice Land
                </div>
              </div>

              {/* Info strip below video */}
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-300 text-xs font-medium">Field-to-warehouse verified</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-400 text-xs ml-1">4.9 / 5</span>
                </div>
              </div>
            </div>

            {/* Caption below card */}
            <p className="text-center text-gray-400 text-xs mt-3 tracking-wide">
              Trusted by 5,000+ wholesalers across India
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}