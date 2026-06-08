import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService.js'
import AuthCard from '../components/AuthCard.jsx'
import FormField from '../components/FormField.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import toast from 'react-hot-toast'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9]{10}$/

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error('Please fill out all fields.')
      return
    }
    if (!emailPattern.test(email)) {
      toast.error('Enter a valid email address.')
      return
    }
    if (!phonePattern.test(phone)) {
      toast.error('Phone number must be 10 digits.')
      return
    }
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        name,
        email,
        password,
        role: 'user',
        company_id: 0,
      }
      const response = await registerUser(payload)
      if (!response.status) {
        toast.error(response.message || 'Registration failed.')
        return
      }
      toast.success(response.message || 'Registration successful. Please login.')
      navigate('/login', { replace: true })
    } catch (error) {
      toast.error(error.message || 'Unable to register.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AuthCard
          title="Create an account"
          subtitle="Register now and access the user portal through our secure PHP-powered backend."
          footer={
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          }
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Full Name"
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
              required
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
            <FormField
              label="Phone Number"
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0123456789"
              required
            />
            <FormField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
            />
            <FormField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <LoadingSpinner /> : 'Create account'}
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  )
}