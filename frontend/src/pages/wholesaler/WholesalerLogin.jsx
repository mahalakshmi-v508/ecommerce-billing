import { useState } from 'react'
import toast from 'react-hot-toast'

export default function WholesalerLogin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        'http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/login.php',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      // LOGIN FAILED
      if (!data.status) {

        toast.error(data.message)
        return
      }

      // 🔥 CLEAR NORMAL USER SESSION
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')

      // 🔥 SAVE WHOLESALER
      localStorage.setItem(
        'wholesaler',

        JSON.stringify({
          ...data.data,
          role: 'wholesaler'
        })
      )

      toast.success('Login successful')

      // 🔥 HARD REDIRECT
      window.location.href =
        '/wholesaler/dashboard'

    } catch (error) {

      toast.error('Login failed')
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Wholesaler Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"

          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  )
}