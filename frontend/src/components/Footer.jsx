import { Link } from 'react-router-dom'
import { Phone, Mail, FileText } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#112E24] text-white/90 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">

        <div className="col-span-2 space-y-4">
          <Link
            to="/"
            className="text-2xl font-serif font-bold tracking-tight text-white"
          >
            Fathima Rice Land
            <span className="text-[#D4AF37]">.</span>
          </Link>

          <p className="text-xs text-white/60 max-w-sm leading-relaxed">
            Delivering premium quality rice varieties sourced directly from
            trusted farms, ensuring purity, freshness and authentic taste for
            every home.
          </p>

          <div className="space-y-2 text-xs text-white/70">
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[#D4AF37]" />
              +91 98765 43210
            </p>

            <p className="flex items-center gap-2">
              <Mail size={14} className="text-[#D4AF37]" />
              info@fathimariceland.com
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">
            Rice Collections
          </h4>

          <div className="flex flex-col gap-2.5 text-xs text-white/70">
            <Link to="#" className="hover:text-white transition-colors">
              Premium Basmati Rice
            </Link>

            <Link to="#" className="hover:text-white transition-colors">
              Idli & Dosa Rice
            </Link>

            <Link to="#" className="hover:text-white transition-colors">
              Daily Staples (Sona / Kolam)
            </Link>

            <Link to="#" className="hover:text-white transition-colors">
              Biryani Special Rice
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">
            Company
          </h4>

          <div className="flex flex-col gap-2.5 text-xs text-white/70">
            <Link to="#" className="hover:text-white transition-colors">
              About Us
            </Link>

            <Link to="#" className="hover:text-white transition-colors">
              Our Farmers
            </Link>

            <Link to="#" className="hover:text-white transition-colors">
              Wholesale Orders
            </Link>

            <Link to="#" className="hover:text-white transition-colors">
              Quality Assurance
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#D4AF37] mb-4">
            Policies
          </h4>

          <div className="flex flex-col gap-2.5 text-xs text-white/70">
            <Link
              to="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText size={12} />
              Privacy Policy
            </Link>

            <Link
              to="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText size={12} />
              Terms & Conditions
            </Link>

            <Link
              to="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText size={12} />
              Shipping Policy
            </Link>

            <Link
              to="#"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <FileText size={12} />
              Refund Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
        <p>
          © {currentYear} Fathima Rice Land. All Rights Reserved.
        </p>

        <div className="flex gap-3 text-lg font-bold tracking-widest opacity-60">
          <span>UPI</span>
          <span>VISA</span>
          <span>MC</span>
          <span>RUPAY</span>
        </div>
      </div>
    </footer>
  )
}