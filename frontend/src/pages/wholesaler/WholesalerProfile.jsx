import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Calendar,
  Award,
  Building,
  Phone,
  MapPin
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function WholesalerProfile() {
  const navigate = useNavigate()
  
  // Get wholesaler from localStorage
  const [wholesaler, setWholesaler] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gstNumber, setGstNumber] = useState('')
  const [password, setPassword] = useState('')
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load wholesaler from localStorage
  useEffect(() => {
    const storedWholesaler = localStorage.getItem('wholesaler_user')
    if (storedWholesaler) {
      try {
        const parsed = JSON.parse(storedWholesaler)
        setWholesaler(parsed)
        setName(parsed.name || '')
        setEmail(parsed.email || '')
        setBusinessName(parsed.business_name || parsed.name || '')
        setPhone(parsed.phone || '')
        setAddress(parsed.address || '')
        setGstNumber(parsed.gst_number || '')
      } catch (error) {
        console.error('Error parsing wholesaler:', error)
        toast.error('Failed to load profile data')
      }
    } else {
      // Redirect to login if not logged in
      navigate('/wholesaler-login')
    }
  }, [navigate])

  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required')
      return
    }

    setLoading(true)
    try {
      // Update API call for wholesaler profile
      const response = await fetch('http://localhost/ecommerce-billing/smart-ledger-backend/api/wholesaler/update-profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: wholesaler.id,
          name,
          email,
          business_name: businessName,
          phone,
          address,
          gst_number: gstNumber,
          password: password || undefined
        })
      })

      const data = await response.json()

      if (data.status) {
        const updatedWholesaler = { 
          ...wholesaler, 
          name, 
          email,
          business_name: businessName,
          phone,
          address,
          gst_number: gstNumber
        }
        localStorage.setItem('wholesaler_user', JSON.stringify(updatedWholesaler))
        setWholesaler(updatedWholesaler)
        toast.success('Profile Updated Successfully! ✨')
        setEditing(false)
        setPassword('')
      } else {
        toast.error(data.message || 'Failed to update profile')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setName(wholesaler?.name || '')
    setEmail(wholesaler?.email || '')
    setBusinessName(wholesaler?.business_name || wholesaler?.name || '')
    setPhone(wholesaler?.phone || '')
    setAddress(wholesaler?.address || '')
    setGstNumber(wholesaler?.gst_number || '')
    setPassword('')
    setEditing(false)
  }

  // Member since (from createdAt or current year)
  const memberSince = wholesaler?.created_at 
    ? new Date(wholesaler.created_at).getFullYear() 
    : new Date().getFullYear()

  if (!wholesaler) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-green-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md border border-green-100 mb-4">
            <User className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Wholesaler Profile
            </h1>
          </div>
          <p className="text-gray-600 mt-2">Manage your wholesale account information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Card & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
              <div className="bg-gradient-to-r from-green-700 to-emerald-700 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {name?.charAt(0).toUpperCase() || 'W'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{name || 'Wholesaler'}</h2>
                <p className="text-green-100 text-sm mt-1">Wholesaler Partner</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{email}</span>
                </div>
                {phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm capitalize">Role: Wholesaler</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Member since {memberSince}</span>
                </div>
                <div className="pt-4 border-t border-green-100">
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">100+</p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">50+</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">4.9</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-bold text-gray-800">Account Status</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Your wholesale account is verified and active
              </p>
              {gstNumber && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <Building className="w-3 h-3" />
                  <span>GST: {gstNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="w-6 h-6 text-green-600" />
                  Business Information
                </h2>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2 text-green-600" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    disabled={!editing}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Your business name"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-green-600" />
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    disabled={!editing}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2 text-green-600" />
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
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2 text-green-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    disabled={!editing}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* GST Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2 text-green-600" />
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    disabled={!editing}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="GSTIN (if applicable)"
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                    Business Address
                  </label>
                  <textarea
                    value={address}
                    disabled={!editing}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Your business address"
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      editing 
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } focus:outline-none`}
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2 text-green-600" />
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
                        ? 'border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 bg-white' 
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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                    <Fingerprint className="w-3 h-3 inline mr-1" />
                    Wholesaler ID
                  </label>
                  <code className="text-sm font-mono text-green-700">
                    {wholesaler?.id || 'WHO_123456'}
                  </code>
                  <p className="text-xs text-gray-400 mt-2">This identifier is unique and cannot be changed</p>
                </div>

                {/* Partner Badge */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <Award className="w-10 h-10 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Premium Wholesaler Partner</p>
                    <p className="text-xs text-gray-600">You have access to exclusive wholesale pricing</p>
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
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
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
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Security Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Use a strong, unique password for your wholesale account
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Never share your login credentials with anyone
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Keep your business information up to date
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}