import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../../services/categoryService.js'
import { getProducts, getProductsByCategory } from '../../services/productService.js'
import { buildProductImageUrl } from '../../services/api.js'
import LoadingSpinner from '../../components/LoadingSpinner.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import toast from 'react-hot-toast'
import { addToCart } from '../../services/cartService.js'
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
} from '../../services/wishlistService.js'

export default function WholesalerProducts() {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [productsLoading, setProductsLoading] = useState(false)
    const [wishlistItems, setWishlistItems] = useState([])
    const [selectedWeights, setSelectedWeights] = useState({})

    // Get wholesaler from localStorage
    const [wholesaler, setWholesaler] = useState(null)

    // Load wholesaler from localStorage
    useEffect(() => {
        const storedWholesaler = localStorage.getItem('wholesaler_user')
        if (storedWholesaler) {
            try {
                const parsed = JSON.parse(storedWholesaler)
                setWholesaler(parsed)
            } catch (error) {
                console.error('Error parsing wholesaler:', error)
                setWholesaler(null)
            }
        }
    }, [])

    useEffect(() => {
        if (wholesaler?.id) {
            loadCategoriesAndProducts()
        }
    }, [wholesaler])

    useEffect(() => {
        if (wholesaler?.id) {
            loadWishlist()
        }
    }, [wholesaler])

    const loadCategoriesAndProducts = async () => {
        try {
            setLoading(true)
            const categoriesResponse = await getAllCategories()

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
            const response = await getWishlistItems(wholesaler.id, 'wholesaler')
            if (response.status) {
                setWishlistItems(response.data || [])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleWishlist = async (product) => {
        try {
            if (!wholesaler?.id) {
                toast.error('Please login as wholesaler')
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
                const response = await addToWishlist(wholesaler.id, product.id, 'wholesaler')
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
            if (!wholesaler?.id) {
                toast.error('Please login as wholesaler')
                return
            }

            if (parseInt(product.stock) <= 0) {
                toast.error('Out of stock')
                return
            }

            // Default weight choice is 5 if nothing is selected
            const weight = selectedWeights[product.id] || 5
            const finalQuantity = weight

            // 🌟 இங்கேயும் ஒரு கிலோவுக்கான சரியான பேஸ் விலையை எடுக்கிறோம்
            const basePrice = parseFloat(product.wholesale_price || product.price || 0)

            const response = await addToCart(
                wholesaler.id,
                product.id,
                finalQuantity,
                'wholesaler',
                basePrice // ஒருவேளை உங்கள் addToCart function விலையை ஒரு பேராமீட்டராக ஏற்றுக்கொண்டால் இதைப் பயன்படுத்தலாம்
            )

            if (response.status) {
                toast.success(`${product.product_name} (${weight}kg) added to cart!`)
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
                    <p className="mt-4 text-lg font-semibold text-green-600">Loading categories...</p>
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
                    <div className="inline-block mb-4">
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Premium Collection
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Speciality Rice Collection
                    </h1>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse and discover premium rice products from our collections
                    </p>
                </div>

                {/* Category Selection Section */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex bg-gray-50 rounded-full p-2 gap-2 flex-wrap justify-center border border-green-100">
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category.id
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id, category.company_id)}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none ${
                                        isSelected
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                                            : 'bg-white text-green-700 border border-green-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white'
                                    }`}
                                >
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
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
                                <p className="mt-4 text-gray-600 font-semibold">Loading products...</p>
                            </div>
                        </div>
                    ) : allProducts.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-green-100">
                            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6">
                                <ShoppingBag className="w-16 h-16 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                            <p className="text-gray-600">This category doesn't have any products yet. Try another category!</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {allProducts.map((product) => {
                                const selectedWeight = selectedWeights[product.id] || 5
                                
                                // Price checking logic matching wholesale type
                                const basePrice = parseFloat(product.wholesale_price || product.price || 0)
                                const finalPrice = (basePrice * selectedWeight).toFixed(2)
                                
                                const isInWishlist = wishlistItems.some(
                                    (item) => parseInt(item.product_id) === parseInt(product.id)
                                )
                                const isOutOfStock = parseInt(product.stock) <= 0

                                return (
                                    <div
                                        key={product.id}
                                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-300 animate-fadeIn"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                                            <button
                                                onClick={() => handleWishlist(product)}
                                                className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 shadow-md ${
                                                    isInWishlist
                                                        ? 'bg-red-500 text-white scale-110'
                                                        : 'bg-white/90 text-gray-400 hover:text-red-500'
                                                }`}
                                            >
                                                <Heart
                                                    className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`}
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
                                                    <span className="text-xs text-gray-500">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-4 space-y-3">
                                            <div>
                                                <h3 className="text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors">
                                                    {product.product_name}
                                                </h3>
                                                <p className="text-[11px] text-gray-500 mt-0.5">
                                                    SKU: {product.product_code || 'N/A'}
                                                </p>
                                            </div>

                                            {/* Weight Selection Section (From categories style) */}
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 block mb-1.5">Select Weight:</label>
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    {[5, 10, 15, 30].map((weight) => {
                                                        const active = selectedWeight === weight
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
                                                                className={`px-2.5 py-1.5 rounded-md text-xs font-bold transition-all duration-300 border ${
                                                                    active
                                                                        ? "bg-green-600 text-white border-green-600 shadow-sm scale-105"
                                                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-green-600 hover:text-green-600"
                                                                }`}
                                                            >
                                                                {weight}kg
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            {/* Price & Stock */}
                                            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                                                <div className="flex items-center gap-0.5">
                                                    <IndianRupee className="w-4 h-4 text-green-600" />
                                                    <span className="text-xl font-black text-green-600">
                                                        {finalPrice}
                                                    </span>
                                                </div>

                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                        !isOutOfStock
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {!isOutOfStock ? `${product.stock} kg left` : 'Sold Out'}
                                                </span>
                                            </div>

                                            {/* Add To Cart */}
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                disabled={isOutOfStock}
                                                className={`w-full rounded-lg py-2.5 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider ${
                                                    isOutOfStock
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md'
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

                {/* Decorative Footer */}
                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                        <span className="text-green-600">🌾</span>
                        <span>Premium Quality Rice | Direct from Mills | Best Prices</span>
                        <span className="text-green-600">🌾</span>
                    </div>
                </div>
            </div>
        </div>
    )
}