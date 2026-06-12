import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Layers, Save, X } from 'lucide-react';

export default function MainCategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchMainCategory();
    }
  }, [id]);

  const fetchMainCategory = async () => {
    setFetching(true);
    try {
      const response = await api.get(`/main-category/get-by-id.php?id=${id}`);
      if (response.data.status) {
        setFormData({
          name: response.data.data.name || '',
          description: response.data.data.description || '',
          status: response.data.data.status || 'active'
        });
      } else {
        toast.error('Failed to load main category');
        navigate('/main-category');
      }
    } catch (error) {
      console.error('Error fetching main category:', error);
      toast.error('Failed to load main category');
      navigate('/main-category');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const companyId = user?.company_id;
      
      if (!companyId) {
        toast.error('Company information not found');
        return;
      }
      
      const payload = {
        id: isEditMode ? parseInt(id) : undefined,
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
        company_id: companyId
      };

      const url = isEditMode 
        ? '/main-category/update.php' 
        : '/main-category/create.php';
      
      const response = await api.post(url, payload);

      if (response.data.status) {
        toast.success(isEditMode ? 'Main Category updated successfully!' : 'Main Category added successfully!');
        setTimeout(() => {
          navigate('/main-category');
        }, 1500);
      } else {
        toast.error(response.data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving main category:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? 'Edit Main Category' : 'Add New Main Category'}
            </h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">
            {isEditMode ? 'Update main category details' : 'Create a new main category for products'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Category Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Rice, Oils, Vegetables"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter category description..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditMode ? 'Update Category' : 'Save Category'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/main-category')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}