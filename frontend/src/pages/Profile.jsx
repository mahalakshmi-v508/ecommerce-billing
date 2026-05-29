import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../services/profileService'
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Fingerprint,
  Save,
  X,
  Edit2,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Calendar,
  Award
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required')
      return
    }

    setLoading(true)
    try {
      const response = await updateProfile({
        id: user.id,
        name,
        email,
        password: password || undefined
      })

      if (response.status) {
        const updatedUser = { ...user, name, email }
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        toast.success('Profile Updated Successfully! ✨')
        setEditing(false)
        setPassword('')
      } else {
        toast.error(response.message || 'Failed to update profile')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPassword('')
    setEditing(false)
  }

  // Member since (mock data - replace with actual from backend)
  const memberSince = new Date().getFullYear()
  const orderCount = 24 // Replace with actual data
  const reviewCount = 12 // Replace with actual data

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-4">
            <User className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{user?.name || 'User'}</h2>
                <p className="text-purple-100 text-sm mt-1">{user?.role || 'Customer'}</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm capitalize">Role: {user?.role || 'Customer'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Member since {memberSince}</span>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{orderCount}</p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pink-600">{reviewCount}</p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">100%</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-gray-800">Account Status</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Your account is verified and active
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Fingerprint className="w-3 h-3" />
                <span>2FA Available</span>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="w-6 h-6 text-purple-600" />
                  Personal Information
                </h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-purple-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    disabled={!editing}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2 text-purple-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled={!editing}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2 text-purple-600" />
                    {editing ? 'New Password' : 'Password'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    disabled={!editing}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={editing ? "Enter new password (optional)" : "••••••••"}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-purple-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                  {editing && (
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Leave blank to keep current password
                    </p>
                  )}
                </div>

                {/* User ID (Read-only) */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                    <Fingerprint className="w-3 h-3 inline mr-1" />
                    User ID
                  </label>
                  <code className="text-sm font-mono text-purple-700">
                    {user?.id || 'user_123456'}
                  </code>
                  <p className="text-xs text-gray-400 mt-2">This identifier is unique and cannot be changed</p>
                </div>

                {/* Loyalty Badge */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                  <Award className="w-10 h-10 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Gold Member</p>
                    <p className="text-xs text-gray-600">You've earned 2,500 loyalty points</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons when editing */}
              {editing && (
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Security Tips Card */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Security Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Use a strong, unique password
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Enable two-factor authentication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Never share your login credentials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 