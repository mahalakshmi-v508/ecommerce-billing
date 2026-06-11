import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Shield, 
  CheckCircle, 
  Calendar, 
  Phone, 
  KeyRound,
  FileText,
  Activity,
  Database,
  Eye,      
  EyeOff,
  X    
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api' 

export default function WholesalerProfile() {
  const navigate = useNavigate()
  
  // Core Profile Live Data States
  const [wholesaler, setWholesaler] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [idProof, setIdProof] = useState('')
  const [approvalStatus, setApprovalStatus] = useState('')
  const [accountStatus, setAccountStatus] = useState('')

  // Control States
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Password Popup Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Password Management States
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  // Visibility Toggle States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // 1. Fetch Profile Data on Mount
  useEffect(() => {
    const storedWholesaler = localStorage.getItem('wholesaler_user')
    
    if (!storedWholesaler) {
      toast.error('Session expired. Please login again.')
      navigate('/wholesaler-login')
      return
    }

    try {
      const parsed = JSON.parse(storedWholesaler)
      
      const fetchProfileData = async () => {
        try {
          const response = await api.get(`/wholesaler/get_by_id.php?id=${parsed.id}`)
          const resData = response.data

          if (resData.status && resData.data) {
            const liveData = resData.data
            setWholesaler(liveData)
            setName(liveData.name || '')
            setEmail(liveData.email || '')
            setPhone(liveData.phone || '')
            setIdProof(liveData.id_proof || '')
            setApprovalStatus(liveData.approval_status || '')
            setAccountStatus(liveData.status || '')
            
            localStorage.setItem('wholesaler_user', JSON.stringify(liveData))
          } else {
            setWholesaler(parsed)
            setName(parsed.name || '')
            setEmail(parsed.email || '')
            setPhone(parsed.phone || '')
            setIdProof(parsed.id_proof || '')
            setApprovalStatus(parsed.approval_status || '')
            setAccountStatus(parsed.status || '')
          }
        } catch (err) {
          console.error("API Fetch Error:", err)
          setWholesaler(parsed)
          setName(parsed.name || '')
          setEmail(parsed.email || '')
          setPhone(parsed.phone || '')
          setIdProof(parsed.id_proof || '')
          setApprovalStatus(parsed.approval_status || '')
          setAccountStatus(parsed.status || '')
        } finally {
          setFetching(false)
        }
      }

      fetchProfileData()

    } catch (error) {
      console.error('Error parsing data:', error)
      setFetching(false)
    }
  }, [navigate])

  // 2. Handle Profile Data Update
  const handleUpdate = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error('Name, Email and Phone number are required')
      return
    }

    if (phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/wholesaler/update.php', {
        id: wholesaler.id,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim()
      })

      const data = response.data

      if (data.status) {
        const updatedWholesaler = { ...wholesaler, name, email, phone }
        localStorage.setItem('wholesaler_user', JSON.stringify(updatedWholesaler))
        setWholesaler(updatedWholesaler)
        toast.success('Profile Updated Successfully! ✨')
        setEditing(false)
      } else {
        toast.error(data.message || 'Failed to update profile')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong during update execution')
    } finally {
      setLoading(false)
    }
  }

  // 3. Handle Password Change via Modal
  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (!currentPassword || !newPassword) {
      toast.error('Both password fields are mandatory')
      return
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    setPasswordLoading(true)
    try {
      const response = await api.post('/wholesaler/change_password.php', {
        id: wholesaler.id,
        current_password: currentPassword,
        new_password: newPassword
      })

      const data = response.data

      if (data.status) {
        toast.success('Password changed successfully! 🔐')
        setCurrentPassword('')
        setNewPassword('')
        setShowCurrentPassword(false)
        setShowNewPassword(false)
        setIsModalOpen(false) // Success aanathum popup close aiyidum
      } else {
        toast.error(data.message || 'Failed to modify password credentials')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error processing password change request')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleCancel = () => {
    setName(wholesaler?.name || '')
    setEmail(wholesaler?.email || '')
    setPhone(wholesaler?.phone || '')
    setEditing(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentPassword('')
    setNewPassword('')
    setShowCurrentPassword(false)
    setShowNewPassword(false)
  }

  const memberSince = wholesaler?.created_at 
    ? new Date(wholesaler.created_at).getFullYear() 
    : new Date().getFullYear()

  if (fetching || !wholesaler) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-green-700">Syncing live profile metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Unit */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md border border-green-100 mb-4">
            <User className="w-8 h-8 text-green-700" />
            <h1 className="text-3xl font-bold text-gray-900">Wholesaler Dashboard</h1>
          </div>
          <p className="text-gray-700 font-medium mt-2">Manage your core business data parameters securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column Profile Metric Data Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200">
              <div className="bg-gradient-to-r from-green-700 to-emerald-700 p-6 text-center">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-5xl font-bold text-white">
                      {name?.charAt(0).toUpperCase() || 'W'}
                    </span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                    accountStatus === 'active' || approvalStatus === 'approved' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">{name || 'Wholesaler Partner'}</h2>
                <p className="text-green-100 font-medium text-sm mt-1">Wholesaler Account</p>
              </div>
              
              <div className="p-6 space-y-4 bg-white">
                <div className="flex items-center gap-3 text-black font-medium">
                  <Mail className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm truncate max-w-[220px]">{email}</span>
                </div>
                {phone && (
                  <div className="flex items-center gap-3 text-black font-medium">
                    <Phone className="w-5 h-5 text-green-700 flex-shrink-0" />
                    <span className="text-sm">{phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-black font-medium">
                  <Shield className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm capitalize">Approval: <span className="font-bold text-green-800">{approvalStatus || 'Pending'}</span></span>
                </div>
                <div className="flex items-center gap-3 text-black font-medium">
                  <Activity className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm capitalize">Status: <span className="font-bold text-emerald-800">{accountStatus || 'Pending'}</span></span>
                </div>
                <div className="flex items-center gap-3 text-black font-medium">
                  <Calendar className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="text-sm">Member since {memberSince}</span>
                </div>
              </div>
            </div>

            {/* Verification Metadata Box */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-md border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-700" />
                <h3 className="font-bold text-gray-900">Data Synchronization</h3>
              </div>
              <p className="text-sm text-gray-800 font-medium">
                Your profile operations metrics are updated and validated via central secure ledger keys.
              </p>
            </div>
          </div>

          {/* Right Core Action Dynamic Blocks */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Component block 1: Business Profile Updates */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-green-700" />
                  Profile Identity Attributes
                </h2>
                
                <div className="flex gap-2">
                  {/* GREEN PASSWORD POPUP BUTTON INTEGRATED HERE */}
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
                      Modify Parameters
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Wholesaler Name</label>
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

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Communication Email</label>
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

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Registered Phone Node</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={15}
                    value={phone}
                    disabled={!editing}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, '');
                      setPhone(numericValue);
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-black font-semibold text-base shadow-sm ${
                      editing 
                        ? 'border-green-500 focus:ring-2 focus:ring-green-200 bg-white' 
                        : 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase mb-1">
                      <FileText className="w-3.5 h-3.5 text-gray-500" /> ID Proof Reference
                    </label>
                    <span className="text-sm font-bold text-black block truncate">
                      {idProof || 'Not Provided'}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase mb-1">
                      <Shield className="w-3.5 h-3.5 text-gray-500" /> Approval Status
                    </label>
                    <span className={`text-sm font-bold block capitalize ${approvalStatus === 'approved' ? 'text-green-700' : 'text-amber-600'}`}>
                      {approvalStatus || 'Pending'}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase mb-1">
                      <Activity className="w-3.5 h-3.5 text-gray-500" /> Account Status
                    </label>
                    <span className={`text-sm font-bold block capitalize ${accountStatus === 'active' ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {accountStatus || 'Pending'}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase mb-1">
                      <Database className="w-3.5 h-3.5 text-gray-500" /> System Index ID
                    </label>
                    <code className="text-sm font-bold text-green-800 font-mono block">
                      {`WHO_INDEX_${wholesaler?.id}`}
                    </code>
                  </div>
                </div>
              </div>

              {editing && (
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-bold hover:bg-gray-50 transition-all text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-700 text-white font-bold transition-all text-base shadow-md"
                  >
                    {loading ? "Saving Changes..." : "Push Modifications"}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* POPUP MODAL COMPONENT FOR PASSWORD UPDATE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-green-100 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5" />
                Change Password
              </h3>
              <button 
                onClick={closeModal}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePasswordChange} className="p-6 space-y-5">
              
              {/* Current Password */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 text-black font-semibold placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">New Passphrase</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 text-black font-semibold placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons inside Popup */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 py-2.5 bg-gradient-to-r from-green-700 to-emerald-700 text-white font-bold rounded-xl hover:from-green-800 hover:to-emerald-800 transition-all disabled:opacity-50 text-sm shadow-md"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}