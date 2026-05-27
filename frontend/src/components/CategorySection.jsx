import { useEffect, useState } from 'react'
import { getActiveCategories } from '../services/categoryService.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function CategorySection({ selectedCategory, onCategoryChange, loading }) {
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [user])

  const loadCategories = async () => {
    try {
      if (!user?.company_id) return
      setLoadingCategories(true)
      const response = await getActiveCategories(user.company_id)
      if (response.status) {
        setCategories(response.data || [])
      }
    } catch (error) {
      console.error('Failed to load categories:', error)
    } finally {
      setLoadingCategories(false)
    }
  }

  return (
    <div className="mb-12">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Categories</h2>
        <p className="text-sm text-slate-600">Browse by category</p>
      </div>

      {/* Category Scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-min">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryChange(null)}
            className={`flex-shrink-0 rounded-lg px-6 py-3 font-semibold text-sm transition whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
            }`}
          >
            All Products
          </button>

          {/* Categories */}
          {loadingCategories ? (
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 w-32 rounded-lg bg-slate-200 flex-shrink-0 animate-pulse"
                />
              ))}
            </div>
          ) : (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 rounded-lg px-6 py-3 font-semibold text-sm transition whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-300'
                }`}
              >
                {category.name}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
