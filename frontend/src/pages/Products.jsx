import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getProducts, getProductsByCategory } from '../services/productService.js'
import CategorySection from '../components/CategorySection.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductSkeleton from '../components/ProductSkeleton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import toast from 'react-hot-toast'

export default function Products() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [user])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, searchQuery, sortBy])

  const loadProducts = async () => {
    try {
      if (!user?.company_id) return

      setLoading(true)
      const response = await getProducts(user.company_id)

      if (response.status) {
        setProducts(response.data || [])
      } else {
        toast.error(response.message || 'Failed to load products')
      }
    } catch (error) {
      toast.error('Error loading products')
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let result = [...products]

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => parseInt(p.category_id) === parseInt(selectedCategory))
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.product_name.toLowerCase().includes(query) ||
          p.product_code.toLowerCase().includes(query) ||
          p.category_name.toLowerCase().includes(query)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        break
      case 'price-high':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        break
      case 'newest':
      default:
        result.sort((a, b) => (b.id || 0) - (a.id || 0))
        break
    }

    setFilteredProducts(result)
  }

  const handleSearch = (value) => {
    setSearchQuery(value)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-1">Browse our collection of products</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {/* Search */}
          <div className="relative sm:col-span-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Categories */}
        <CategorySection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          loading={loading}
        />

        {/* Products Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> products
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No Products Found"
            description={
              searchQuery || selectedCategory ? 'Try adjusting your search or filters' : 'No products available'
            }
          />
        )}
      </div>
    </div>
  )
}
