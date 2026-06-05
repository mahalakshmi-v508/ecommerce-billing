import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../services/categoryService.js'

const supportLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'Track Order', href: '/orders' },
  { label: 'Returns', href: '#' },
  { label: 'Contact Us', href: '#' },
]

const policyLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Shipping Policy', href: '#' },
  { label: 'Refund Policy', href: '#' },
]

const paymentMethods = ['Visa', 'Mastercard', 'UPI', 'COD']

export default function Footer() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        if (res.status) setCategories(res.data?.slice(0, 6) || [])
      })
      .catch(() => setCategories([]))
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-lg font-semibold tracking-[0.2em] text-[#111] uppercase"
            >
              SmartLedger
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#666]">
              A premium ecommerce experience built for modern living — curated
              products, secure checkout, and reliable delivery.
            </p>
            <p className="mt-6 text-sm text-[#666]">
              support@smartledger.com
              <br />
              +91 98765 43210
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111]">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/categories" className="text-sm text-[#666] hover:text-[#111]">
                  All Categories
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.id}`}
                    className="text-sm text-[#666] hover:text-[#111]"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111]">
              Support
            </h4>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-[#666] hover:text-[#111]"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-[#666] hover:text-[#111]">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111]">
              Policies
            </h4>
            <ul className="mt-4 space-y-3">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#666] hover:text-[#111]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-[#e5e7eb] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="border border-[#e5e7eb] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[#666]"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#666]">
            © {currentYear} SmartLedger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
