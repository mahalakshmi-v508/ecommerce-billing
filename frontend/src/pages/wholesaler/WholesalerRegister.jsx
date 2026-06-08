import { useState } from 'react'
import toast from 'react-hot-toast'

export default function WholesalerRegister() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const [proof, setProof] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const formData = new FormData()

    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('password', form.password)

    formData.append('proof', proof)

    try {

      const response = await fetch(
  'http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/register.php',
  {
    method: 'POST',
    body: formData
  }
)

      const data = await response.json()

      if (!data.status) {
        toast.error(data.message)
        return
      }

      toast.success(data.message)

    } catch (error) {

      toast.error('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
          Wholesaler Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(e) => setProof(e.target.files[0])}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded"
        >
          Register
        </button>

      </form>

    </div>
  )
}