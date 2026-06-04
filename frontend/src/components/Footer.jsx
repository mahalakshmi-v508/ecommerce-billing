import { useEffect, useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Help Center', href: '#' },
  ]

  const policyLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Return Policy', href: '#' },
  ]

  return (
    <footer className="bg-[#0b0f19] text-white border-t border-slate-900 font-sans select-none">
      
      {/* அனிமேஷன்களுக்கான Custom CSS */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }

        @keyframes letterInOut {
          0%, 100% { transform: translateY(-10px); opacity: 0; }
          40%, 70% { transform: translateY(1px); opacity: 1; }
        }
        .animate-letter-drop {
          animation: letterInOut 2s ease-in-out infinite;
        }
      `}</style>

      {/* pb-16 லிருந்து pb-8 ஆகக் குறைக்கப்பட்டுள்ளது */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        
        {/* மெயின் கிரிட் லேஅவுட் - pb-12 லிருந்து pb-8 ஆகக் குறைக்கப்பட்டுள்ளது */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-slate-800/60">
          
          {/* பிராண்ட் ப்ரொபை */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-md bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">SL</span>
              <span className="text-xl font-extrabold text-white tracking-wider bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                SmartLedger
              </span>
            </div>
            <p className="text-sm text-white/90 leading-relaxed font-normal">
              A modern ecommerce billing platform designed for seamless transactions and efficient inventory management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm text-white hover:text-cyan-400 hover:translate-x-1 inline-block transition-all duration-200 ease-in-out font-normal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Contact Us</h4>
            <ul className="space-y-5 text-sm font-normal">
              
              {/* Location - Up Down Bounce */}
              <li className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-sky-400 shadow-md border border-slate-700/50">
                  <div className="animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Location</p>
                  <p className="text-sm text-white mt-0.5 font-medium">123 Commerce Street, Tech City, India</p>
                </div>
              </li>

              {/* Call - Phone Shake */}
              <li className="flex items-center gap-4 group">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-950/80 text-sky-400 shadow-md border border-indigo-500/40">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-sky-400 opacity-20"></span>
                  <div className="animate-wiggle relative z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622s.151-.316.44-.434c.29-.117.76-.117 1.05.05a18.256 18.256 0 0 1 4.545 3.123c.254.254.254.665-.008.917l-1.394 1.394a11.373 11.373 0 0 0 4.745 4.745l1.394-1.394a.675.675 0 0 1 .917-.007 18.257 18.257 0 0 1 3.123 4.545c.166.29.166.76.05 1.05-.118.29-.434.44-.434.44a10.825 10.825 0 0 1-13.82-13.82Z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Phone</p>
                  <a href="tel:+915551234567" className="text-sm mt-0.5 block text-white hover:text-sky-400 transition-colors font-medium">
                    +91 (555) 123-4567
                  </a>
                </div>
              </li>

              {/* Email - Envelope */}
              <li className="flex items-center gap-4 group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-sky-400 shadow-md border border-slate-700/50">
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className="absolute w-3 h-2 bg-sky-400/80 rounded-xs -top-0.5 z-0 animate-letter-drop"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 relative z-10 text-sky-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-cyan-400 text-xs uppercase tracking-wider">Email</p>
                  <a href="mailto:support@smartledger.com" className="text-sm mt-0.5 block text-white hover:text-sky-400 transition-colors font-medium">
                    support@smartledger.com
                  </a>
                </div>
              </li>

            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-cyan-400">Policies</h4>
            <ul className="space-y-3">
              {policyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm text-white hover:text-cyan-400 hover:translate-x-1 inline-block transition-all duration-200 ease-in-out font-normal">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* பாட்டம் காப்பிரைட் - mt-10 லிருந்து mt-6 ஆகக் குறைக்கப்பட்டுள்ளது */}
        <div className="mt-6 flex flex-col items-center justify-center gap-1.5 text-center">
          <p className="text-base text-slate-300 font-medium tracking-wide cursor-pointer select-none transition-all duration-300 ease-out hover:text-sky-400 hover:scale-105 origin-center">
            © {currentYear} <span className="font-bold text-white hover:text-sky-400 transition-colors">SmartLedger</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">
            <span>Built with</span>
            <span className="text-sky-400 animate-pulse text-xs">✦</span>
            <span>React & Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  )
}