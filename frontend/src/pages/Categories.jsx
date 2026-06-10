import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getActiveCategories } from '../services/categoryService.js'
import { getProducts, getProductsByCategory } from '../services/productService.js'
import { buildProductImageUrl } from '../services/api.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import toast from 'react-hot-toast'
import { addToCart } from '../services/cartService.js'
import {
    ShoppingBag,
    Heart,
    ShoppingCart as CartIcon,
    IndianRupee,
} from 'lucide-react'

import {
    addToWishlist,
    removeFromWishlist,
    getWishlistItems,
} from '../services/wishlistService.js'

export default function Categories() {


    const { user } = useAuth()
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [productsLoading, setProductsLoading] = useState(false)
    const [wishlistItems, setWishlistItems] = useState([])
const [selectedWeights, setSelectedWeights] = useState({})
    /*
    |--------------------------------------------------------------------------
    | LOAD INITIAL DATA
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        loadCategoriesAndProducts()
    }, [user])

    useEffect(() => {
        if (user?.id) {
            loadWishlist()
        }
    }, [user])

    /*
    |--------------------------------------------------------------------------
    | DATA FETCHING & LOGIC
    |--------------------------------------------------------------------------
    */
    const loadCategoriesAndProducts = async () => {
        try {
            if (!user?.company_id) {
                toast.error('Company ID not found')
                setLoading(false)
                return
            }

            setLoading(true)
            const categoriesResponse = await getActiveCategories()

            if (categoriesResponse.status && categoriesResponse.data?.length > 0) {
                setCategories(categoriesResponse.data)
                const firstCategory = categoriesResponse.data[0]
                setSelectedCategory(firstCategory.id)

                const productsResponse = await getProductsByCategory(
                    firstCategory.company_id,
                    firstCategory.id
                )

                if (productsResponse.status) {
                    setAllProducts(productsResponse.data || [])
                } else {
                    toast.error(productsResponse.message || 'Failed to load products')
                }
            } else {
                toast.error('No categories found')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error loading data')
        } finally {
            setLoading(false)
        }
    }

    const loadWishlist = async () => {
        try {
            const response = await getWishlistItems(user.id)
            if (response.status) {
                setWishlistItems(response.data || [])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleWishlist = async (product) => {
        try {
            if (!user?.id) {
                toast.error('Please login')
                return
            }

            const exists = wishlistItems.some(
                (item) => parseInt(item.product_id) === parseInt(product.id)
            )

            if (exists) {
                const item = wishlistItems.find(
                    (wishlistItem) => parseInt(wishlistItem.product_id) === parseInt(product.id)
                )
                if (item) {
                    await removeFromWishlist(item.id)
                    toast.success('Removed from wishlist')
                }
            } else {
                const response = await addToWishlist(user.id, product.id)
                if (response.status) {
                    toast.success('Added to wishlist!')
                }
            }

            loadWishlist()
            window.dispatchEvent(new Event('wishlistUpdated'))
        } catch (error) {
            console.error(error)
            toast.error('Wishlist update failed')
        }
    }

    const handleCategoryClick = async (categoryId, companyId) => {
        try {
            setSelectedCategory(categoryId)
            setProductsLoading(true)

            const response = await getProductsByCategory(companyId, categoryId)
            if (response.status) {
                setAllProducts(response.data || [])
            } else {
                toast.error(response.message || 'Failed to load products')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error loading products')
        } finally {
            setProductsLoading(false)
        }

        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        })
    }

    const handleAddToCart = async (product) => {
        try {
            if (!user?.id) {
                toast.error('Please login')
                return
            }

            if (parseInt(product.stock) <= 0) {
                toast.error('Out of stock')
                return
            }

const weight = selectedWeights[product.id] || 5

const response = await addToCart(
  user.id,
  product.id,
  weight
)
            if (response.status) {
                toast.success(`${product.product_name} added to cart!`)
                window.dispatchEvent(new Event('cartUpdated'))
            } else {
                toast.error(response.message || 'Failed to add to cart')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error adding to cart')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
                    <p className="mt-4 text-lg font-semibold text-purple-600">Loading categories...</p>
                </div>
            </div>
        )
    }

    if (!categories || categories.length === 0) {
        return (
            <EmptyState
                title="No Categories"
                message="No categories available"
            />
        )
    }

    
    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-4">
                        {/* <ShoppingBag className="w-8 h-8 text-purple-600" /> */}
                        <h1 className="text-3xl font-bold text-black">
                            Shop by Category
                        </h1>
                    </div>
                    {/* <p className="text-gray-600 mt-2">Browse and discover products from our collections</p> */}
                </div>

                {/* Category Selection Section */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex bg-white/60 rounded-full p-2 gap-2 flex-wrap justify-center backdrop-blur-sm">
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category.id
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id, category.company_id)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none ${isSelected
                                            ? 'bg-[#0B3B2E] text-white shadow-lg'
                                            : 'bg-white text-[#0B3B2E] border border-[#0B3B2E] hover:bg-[#D4AF37] hover:text-[#112E24] hover:border-[#D4AF37]'
                                        }`}                                >
                                    {category.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Products Section */}
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {categories.find((c) => c.id === selectedCategory)?.name || 'Category'} Collection
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Showing {allProducts.length} {allProducts.length === 1 ? 'product' : 'products'}
                        </p>
                    </div>

                    {productsLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                                <p className="mt-4 text-gray-600 font-semibold">Loading products...</p>
                            </div>
                        </div>
                    ) : allProducts.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                                <ShoppingBag className="w-16 h-16 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                            <p className="text-gray-600">This category doesn't have any products yet. Try another category!</p>
                        </div>
                    ) : (
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                               {allProducts.map((product) => {

    const selectedWeight =
        selectedWeights[product.id] || 5

    const finalPrice =
        parseFloat(product.price || 0) * selectedWeight

    const isInWishlist = wishlistItems.some(
                                    (item) => parseInt(item.product_id) === parseInt(product.id)
                                )
                                const isOutOfStock = parseInt(product.stock) <= 0

                                return (
                                    <div
                                        key={product.id}
                                        className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-40 w-full overflow-hidden bg-gray-100">

                                            {/* Wishlist Button */}
                                            <button
                                                onClick={() => handleWishlist(product)}
                                                className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 shadow-md ${isInWishlist
                                                    ? 'bg-red-500 text-white scale-110'
                                                    : 'bg-white/90 text-gray-400 hover:text-red-500'
                                                    }`}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''
                                                        }`}
                                                />
                                            </button>

                                            {product.image ? (
                                                <img
                                                    src={buildProductImageUrl(product.image)}
                                                    alt={product.product_name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex h-full flex-col items-center justify-center">
                                                    <ShoppingBag className="w-10 h-10 text-gray-400 mb-2" />
                                                    <span className="text-xs text-gray-500">
                                                        No Image
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-3">
                                            <div className="mb-2">
                                                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-[#0B3B2E] transition-colors">                                                    {product.product_name}
                                                </h3>

                                                <p className="text-[11px] text-gray-500 mt-1">
                                                    SKU: {product.product_code || 'N/A'}
                                                </p>
                                            </div>

<div className="flex items-center gap-2 mb-4">
  {[5, 10, 15, 30].map((weight) => {
    const active = (selectedWeights[product.id] || 5) === weight

    return (
      <button
        key={weight}
        type="button"
        onClick={() =>
          setSelectedWeights({
            ...selectedWeights,
            [product.id]: weight
          })
        }
        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 border ${
         active
? "bg-[#DFF5E8] text-[#0B3B2E] border-[#0B3B2E] shadow-sm"
            : "bg-white text-gray-600 border-gray-300 hover:border-[#0B3B2E] hover:text-[#0B3B2E]"
        }`}
      >
        {weight}kg
      </button>
    )
  })}
</div>
                                            {/* Price & Stock */}
                                            <div className="flex items-center justify-between border-t pt-2 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <IndianRupee className="w-4 h-4 text-[#0B3B2E]" />                                                    <span className="text-xl font-bold text-red-600">
{finalPrice.toFixed(2)}                                                    </span>
                                                </div>

                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${!isOutOfStock
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {!isOutOfStock
                                                        ? `${product.stock} in stock`
                                                        : 'Sold Out'}
                                                </span>
                                            </div>

                                            {/* Add To Cart */}
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                disabled={isOutOfStock}
                                              className={`w-full rounded-lg py-2 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase ${
    isOutOfStock
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-[#0B3B2E] text-white hover:bg-[#D4AF37] hover:text-[#112E24]'
}`}
                                            >
                                                <CartIcon className="w-4 h-4" />
                                                {isOutOfStock ? 'Sold Out' : 'Add To Cart'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}