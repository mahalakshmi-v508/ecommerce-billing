import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { searchProductsByQuery } from '../services/productService.js'
import { buildProductImageUrl } from '../services/api.js'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      performSearch()
    }
  }, [query])

  const performSearch = async () => {
    try {
      setLoading(true)
      const response = await searchProductsByQuery(user?.company_id, query)
      if (response.status) {
        setProducts(response.data || [])
      }
    } catch (error) {
      console.error('Error searching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">
        Search Results for "{query}"
      </h1>
      <p className="text-slate-600 mb-8">
        Found {products.length} products
      </p>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No products found. Try a different search term.</p>
          <Link
            to="/categories"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Browse Categories →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={buildProductImageUrl(product.image)}
                alt={product.product_name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/300/200'
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                  {product.product_name}
                </h3>
                <p className="text-indigo-600 font-bold text-lg">₹{parseFloat(product.price).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
                  