import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getDealProducts } from '../services/productService.js'
import { buildProductImageUrl } from '../services/api.js'

export default function Deals() {
  const { user } = useAuth()
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.company_id) {
      loadDeals()
    }
  }, [user])

  const loadDeals = async () => {
    try {
      setLoading(true)
      const response = await getDealProducts(user?.company_id)
      if (response.status) {
        setDeals(response.data || [])
      }
    } catch (error) {
      console.error('Error loading deals:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user?.company_id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Please login first</p>
      </div>
    )
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
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 mb-8 text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          🔥 Hot Deals & Discounts 🔥
        </h1>
        <p className="text-lg">Limited time offers - Shop now before they're gone!</p>
      </div>

      {deals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No active deals at the moment. Check back soon!</p>
          <Link
            to="/categories"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Browse Categories →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all relative group"
              >
                {/* Discount Badge */}
                {product.discount_percentage && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                    -{product.discount_percentage}%
                  </div>
                )}
                
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={buildProductImageUrl(product.image)}
                    alt={product.product_name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/200'
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                    {product.product_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-600 font-bold text-lg">
                      ₹{parseFloat(product.price).toFixed(2)}
                    </span>
                    {product.original_price && (
                      <span className="text-slate-400 line-through text-sm">
                        ₹{parseFloat(product.original_price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {product.discount_percentage && (
                    <div className="text-green-600 text-xs font-semibold">
                      Save {product.discount_percentage}%
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}