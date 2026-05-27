import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getProductById } from '../services/productService.js'
import ProductSkeleton from '../components/ProductSkeleton.jsx'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  const { user } = useAuth()
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.company_id && productId) {
      loadProduct()
    }
  }, [user, productId])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await getProductById(productId)
      if (response.status) {
        setProduct(response.data)
      } else {
        toast.error(response.message || 'Failed to load product')
      }
    } catch (error) {
      toast.error('Error loading product')
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const price = parseFloat(product?.price || 0)
  const discount = parseFloat(product?.discount_percentage || 0)
  const discountedPrice = price - (price * discount) / 100

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Product Details</h1>
            <p className="text-slate-600 mt-1">Review the product information and stock details.</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <ProductSkeleton />
        ) : !product ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <div className="text-5xl mb-4">❌</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Product not found</h3>
            <p className="text-sm text-slate-600 mb-6">This product may no longer be available.</p>
            <Link
              to="/products"
              className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Back to products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-100 flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">{product.category_name || 'Uncategorized'}</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-900">{product.product_name}</h2>
                  <p className="text-sm text-slate-500">SKU: {product.product_code}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Stock</p>
                    <p className={`mt-2 text-lg font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{product.status || 'active'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-600 p-4 text-white text-2xl">₹</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                  <div className="mt-2 flex items-end gap-3">
                    <p className="text-3xl font-bold text-slate-900">₹{discountedPrice.toFixed(2)}</p>
                    {discount > 0 && (
                      <span className="text-sm text-slate-500 line-through">₹{price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>

              {discount > 0 && (
                <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  Discount: {discount}% off
                </p>
              )}

              <div className="mt-8 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Description</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Company</p>
                  <p className="mt-2 text-sm text-slate-700">{product.company_id ? `Company ID ${product.company_id}` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
