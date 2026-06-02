import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getActiveCategories } from '../services/categoryService.js'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

export default function Footer() {
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    if (user?.company_id) {
      loadCategories()
    }
  }, [user])

  const loadCategories = async () => {
    try {
      if (!user?.company_id) return
      const response = await getActiveCategories(user.company_id)
      if (response.status) {
        setCategories(response.data?.slice(0, 6) || [])
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  const handleSubscribe = async (event) => {
    event.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email')
      return
    }

    setSubscribing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Thank you for subscribing!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setSubscribing(false)
    }
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '#' },
  ]

  const policyLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Return Policy', href: '#' },
    { label: 'Shipping Info', href: '#' },
  ]

  const socialMedia = [
    { icon: '📘', label: 'Facebook', href: '#' },
    { icon: '𝕏', label: 'Twitter', href: '#' },
    { icon: '📷', label: 'Instagram', href: '#' },
    { icon: '💼', label: 'LinkedIn', href: '#' },
    { icon: '🎥', label: 'YouTube', href: '#' },
  ]

  return (
    <footer className="bg-gradient-to-br from-indigo-50 via-cyan-50 to-white text-slate-900">
      {/* Newsletter Section */}
      <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-cyan-50 to-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">Subscribe to our newsletter</h3>
              <p className="mt-2 text-sm text-slate-600">
                Get the latest updates, exclusive offers, and insights delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
              <button
                type="submit"
                disabled={subscribing}
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {subscribing ? '…' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="mb-4 text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                SmartLedger
              </div>
              <p className="mb-6 text-sm text-slate-400">
                A modern ecommerce billing platform designed for seamless transactions and efficient inventory management.
              </p>
              <div className="space-y-2 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  📍 <span>123 Commerce Street, Tech City, TC 12345</span>
                </p>
                <p className="flex items-center gap-2">
                  📞 <span>+1 (555) 123-4567</span>
                </p>
                <p className="flex items-center gap-2">
                  ✉️ <span>support@smartledger.com</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-slate-900">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-indigo-600 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-slate-900">Categories</h4>
              <ul className="space-y-2">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/category/${cat.id}`}
                        className="text-sm text-slate-600 hover:text-indigo-600 transition"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-slate-500">Loading categories…</li>
                )}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-slate-900">Policies</h4>
              <ul className="space-y-2">
                {policyLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-indigo-600 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-slate-200" />

          {/* Bottom Section */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Social Media */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-slate-300">Follow Us</p>
              <div className="flex gap-3 flex-wrap">
                {socialMedia.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    title={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg text-slate-700 hover:border-indigo-500 hover:bg-indigo-50 transition"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-right text-sm text-slate-600 lg:text-left">
              <p className="mb-2">
                © {currentYear} SmartLedger. All rights reserved.
              </p>
              <p className="text-xs text-slate-500">
                Crafted with ❤️ for modern ecommerce businesses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>🔒 SSL Secured</span>
              <span>✓ PCI Compliant</span>
              <span>🛡️ Secure Payments</span>
            </div>
            <span>Made with React + Vite + Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
