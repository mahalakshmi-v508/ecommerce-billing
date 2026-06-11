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
  MapPin,
  Package,
  TrendingUp,
  Star
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
        toast.success('Profile Updated Successfully!')
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

  const memberSince = wholesaler?.created_at 
    ? new Date(wholesaler.created_at).getFullYear() 
    : new Date().getFullYear()

  if (!wholesaler) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-green-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-2">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              My Profile
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Wholesaler Profile
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage your wholesale account information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-700 to-emerald-700 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {businessName?.charAt(0).toUpperCase() || name?.charAt(0).toUpperCase() || 'W'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{businessName || name}</h2>
                <p className="text-green-100 text-sm mt-1 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3" /> Wholesaler Partner
                </p>
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm">{email}</span>
                </div>
                {phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm">{phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm">Member since {memberSince}</span>
                </div>
                {gstNumber && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <Building className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm">GST: {gstNumber}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 p-5">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xl font-bold text-green-600">100+</p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-emerald-600">50+</p>
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-amber-600">4.9</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-800">Account Status</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Verified & Active</span>
              </div>
              <p className="text-xs text-gray-500">
                Your wholesale account is fully verified and ready for bulk orders
              </p>
            </div>
          </div>

          {/* Right Column - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="border-b border-gray-100 p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <Building className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">Business Information</h2>
                      <p className="text-xs text-gray-500">Update your business details</p>
                    </div>
                  </div>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold hover:shadow-md transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Business Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      disabled={!editing}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your business name"
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={name}
                      disabled={!editing}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled={!editing}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      disabled={!editing}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* GST Number */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={gstNumber}
                      disabled={!editing}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="GSTIN (if applicable)"
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* Address - Full width */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Business Address
                    </label>
                    <textarea
                      value={address}
                      disabled={!editing}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your business address"
                      rows={2}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                  </div>

                  {/* Password */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      {editing ? 'New Password' : 'Password'}
                    </label>
                    <input
                      type="password"
                      value={password}
                      disabled={!editing}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={editing ? "Enter new password (optional)" : "••••••••"}
                      className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                        editing 
                          ? 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 bg-white' 
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      } focus:outline-none`}
                    />
                    {editing && (
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Leave blank to keep current password
                      </p>
                    )}
                  </div>

                  {/* Wholesaler ID */}
                  <div className="md:col-span-2 bg-gray-50 rounded-lg p-3">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      <Fingerprint className="w-3 h-3 inline mr-1" />
                      Wholesaler ID
                    </label>
                    <code className="text-sm font-mono text-green-700">
                      {wholesaler?.id || 'WHO_123456'}
                    </code>
                    <p className="text-xs text-gray-400 mt-1">Unique identifier - cannot be changed</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {editing && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium text-sm hover:shadow-md transition-all disabled:opacity-50"
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
            </div>

            {/* Partner Badge */}
            <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Premium Wholesaler Partner</p>
                <p className="text-xs text-gray-500">Access to exclusive wholesale pricing and priority support</p>
              </div>
            </div>

            {/* Security Tips */}
            <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Security Tips
              </h3>
              <div className="space-y-1.5">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Use a strong, unique password
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Never share your login credentials
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Keep business information up to date
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}