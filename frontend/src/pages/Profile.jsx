import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from '../services/profileService'
import api from '../services/api' // Make sure this path matches your axios setup
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
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, setUser } = useAuth()
  
  // Core Profile Data States
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  
  // Control States
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Password Popup Modal States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('') // Optional/Required depending on verification
  const [newPassword, setNewPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // 1. Fetch Live Profile Metrics on Mount
  useEffect(() => {
    if (!user?.id) {
      setFetching(false)
      return
    }

    const fetchLiveMetrics = async () => {
      try {
        // dynamic routing using your backend structure
        const response = await api.get(`/users/get_by_id.php?id=${user.id}`)
        const resData = response.data

        if (resData.status && resData.data) {
          const liveData = resData.data
          setName(liveData.name || '')
          setEmail(liveData.email || '')
          
          // Context & LocalStorage auto sync
          const updatedContext = { ...user, ...liveData }
          localStorage.setItem('auth_user', JSON.stringify(updatedContext))
          setUser(updatedContext)
        }
      } catch (err) {
        console.error("Profile metrics sync failed:", err)
      } finally {
        setFetching(false)
      }
    }

    fetchLiveMetrics()
  }, [user?.id])

  // 2. Handle Personal Profile Information Updates
  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email parameters are required')
      return
    }

    setLoading(true)
    try {
      const response = await updateProfile({
        id: user.id,
        name: name.trim(),
        email: email.trim()
      })

      if (response.status) {
        const updatedUser = { ...user, name: name.trim(), email: email.trim() }
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        toast.success('Profile Data Updated Successfully! ✨')
        setEditing(false)
      } else {
        toast.error(response.message || 'Failed to update ledger parameters')
      }
    } catch (error) {
      console.error(error)
      toast.error('Internal update routine failure executed')
    } finally {
      setLoading(false)
    }
  }

  // 3. Handle Secure Password Mutation (Modal Form Action)
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault()

    if (!newPassword.trim()) {
      toast.error('New security passphrase cannot be blank')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Security keys must be at least 6 characters')
      return
    }

    setPasswordLoading(true)
    try {
      // Re-using core profile service update config passing password
      const response = await updateProfile({
        id: user.id,
        name: name,
        email: email,
        password: newPassword.trim()
      })

      if (response.status) {
        toast.success('Security password deployed successfully! 🔐')
        closeModal()
      } else {
        toast.error(response.message || 'Failed to modify passphrase')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error processing password processing payload')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setEditing(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setNewPassword('')
    setShowNewPassword(false)
  }

  // Mock indicators retaining framework layout
  const memberSince = new Date().getFullYear()
  const orderCount = 24 
  const reviewCount = 12 

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-green-700">Syncing live account parameters...</p>
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
            <User className="w-8 h-8 text-green-700" />
            <h1 className="text-3xl font-bold text-gray-900">My Profile Dashboard</h1>
          </div>
          <p className="text-gray-700 font-medium mt-2">Manage your core account signatures and system parameters</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Card & Stats Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200">
              <div className="bg-gradient-to-r from-green-700 to-emerald-700 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">{user?.name || 'User Identity'}</h2>
                <p className="text-green-100 font-medium text-sm mt-1 capitalize">{user?.role || 'Customer Node'}</p>
              </div>
              
              <div className="p-6 space-y-4 bg-white">
                <div className="flex items-center gap-3 text-black font-medium">
                  <Mail className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm truncate max-w-[220px]">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-black font-medium">
                  <Shield className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm capitalize">Role Token: <span className="font-bold text-green-800">{user?.role || 'Customer'}</span></span>
                </div>
                <div className="flex items-center gap-3 text-black font-medium">
                  <Calendar className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm">Session Established {memberSince}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-700">{orderCount}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase">Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-700">{reviewCount}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase">Reviews</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-700">100%</p>
                      <p className="text-xs font-bold text-gray-500 uppercase">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Metadata Status */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-md border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-700" />
                <h3 className="font-bold text-gray-900">Security Ledger Active</h3>
              </div>
              <p className="text-sm text-gray-800 font-medium mb-3">
                Your authentication matrix is active, audited and synced with 2FA configurations.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase">
                <Fingerprint className="w-4 h-4 text-green-700" />
                <span>Device Signatures Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column - Edit Form Attributes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-green-700" />
                  Personal Information
                </h2>
                
                <div className="flex gap-2">
                  {/* GREEN PASSWORD POPUP TRIGGER TRIGGER BUTTON */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-bold hover:from-emerald-700 hover:to-green-700 hover:shadow-md transition-all"
                  >
                    <KeyRound className="w-4 h-4" />
                    Change Password
                  </button>

                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 text-white text-sm font-bold hover:shadow-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Modify Parameters
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Full Name Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Registered Full Name</label>
                  <input
                    type="text"
                    value={name}
                    disabled={!editing}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-black font-semibold text-base shadow-sm ${
                      editing 
                        ? 'border-green-500 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Email Address Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Communication Email Endpoint</label>
                  <input
                    type="email"
                    value={email}
                    disabled={!editing}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-black font-semibold text-base shadow-sm ${
                      editing 
                        ? 'border-green-500 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>

                {/* Secure Account Index Reference Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase mb-1">
                      <Fingerprint className="w-3.5 h-3.5 text-gray-500" /> Core System Index
                    </label>
                    <code className="text-sm font-bold text-green-800 font-mono block">
                      {`USER_KEY_${user?.id || 'UNASSIGNED'}`}
                    </code>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase mb-1">
                      <Award className="w-3.5 h-3.5 text-gray-500" /> Tier Privilege
                    </label>
                    <span className="text-sm font-bold text-black block uppercase tracking-wider">
                      Gold Member Status
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger Save Cancel Group UI */}
              {editing && (
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-bold hover:bg-gray-50 transition-all text-base"
                  >
                    <X className="w-4 h-4 inline mr-1" /> Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 text-white font-bold transition-all text-base shadow-md inline-flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Deploy Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* POPUP MODAL COMPONENT INTEGRATED FOR SECURE PASSWORD ROTATION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-green-100 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header Title Ribbon */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Update Authentication Key
              </h3>
              <button 
                onClick={closeModal}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Payload */}
            <form onSubmit={handlePasswordChangeSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">New Account Passphrase</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters configuration"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 text-black font-semibold placeholder-gray-500 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none text-base shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-emerald-700" />
                  Changing this value alters your direct encryption signature node.
                </p>
              </div>

              {/* Action Grid Buttons inside popup context */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm"
                >
                  Cancel Close
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 py-2.5 bg-gradient-to-r from-green-700 to-emerald-700 text-white font-bold rounded-xl hover:from-green-800 hover:to-emerald-800 transition-all disabled:opacity-50 text-sm shadow-md"
                >
                  {passwordLoading ? "Deploying..." : "Update Token Key"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}