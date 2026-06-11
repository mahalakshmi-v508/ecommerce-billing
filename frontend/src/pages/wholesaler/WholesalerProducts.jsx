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

    // Get wholesaler from localStorage (NOT from useAuth)
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

    /*
    |--------------------------------------------------------------------------
    | LOAD INITIAL DATA
    |--------------------------------------------------------------------------
    */
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

    /*
    |--------------------------------------------------------------------------
    | DATA FETCHING & LOGIC
    |--------------------------------------------------------------------------
    */
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
            // Use wholesaler ID from localStorage
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

            const response = await addToCart(
                wholesaler.id,
                product.id,
                1,
                'wholesaler'
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
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
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

    const getDisplayPrice = (product) => {
        const type = product.product_type;

        if (type === "wholesale") {
            return Number(product.wholesale_price || 0).toFixed(2);
        }

        if (type === "both") {
            return Number(product.wholesale_price || 0).toFixed(2);
        }

        return Number(product.price || 0).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md border border-green-100 mb-4">
                        <ShoppingBag className="w-8 h-8 text-green-600" />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Speciality Rice Collection
                        </h1>
                    </div>
                    <p className="text-gray-600 mt-2">Browse and discover premium rice products from our collections</p>
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
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${
                                        isSelected
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md'
                                            : 'bg-transparent text-gray-600 hover:bg-green-50 hover:text-green-600'
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
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            {allProducts.map((product) => {
                                const isInWishlist = wishlistItems.some(
                                    (item) => parseInt(item.product_id) === parseInt(product.id)
                                )
                                const isOutOfStock = parseInt(product.stock) <= 0

                                return (
                                    <div
                                        key={product.id}
                                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100 hover:border-green-300"
                                    >
                                        {/* Product Image */}
                                        <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
                                            {/* Rice Icon Decoration */}
                                            <div className="absolute top-2 left-2 opacity-20">
                                                <span className="text-2xl">🌾</span>
                                            </div>

                                            {/* Wishlist Button */}
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
                                                    <span className="text-4xl mb-2">🌾</span>
                                                    <span className="text-xs text-gray-500">
                                                        Rice Product
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-3">
                                            <div className="mb-2">
                                                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
                                                    {product.product_name}
                                                </h3>

                                                <p className="text-[11px] text-gray-500 mt-1">
                                                    SKU: {product.product_code || 'N/A'}
                                                </p>
                                            </div>

                                            {/* Price & Stock */}
                                            <div className="flex items-center justify-between border-t border-green-100 pt-2 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <IndianRupee className="w-4 h-4 text-green-600" />
                                                    <div>
                                                        <span className="text-xl font-bold text-green-600">
                                                            {getDisplayPrice(product)}
                                                        </span>

                                                        {(product.product_type === "wholesale" ||
                                                          product.product_type === "both") && (
                                                            <p className="text-[10px] text-gray-500">
                                                                Min Qty : {product.min_wholesale_qty}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${
                                                        !isOutOfStock
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
                                                className={`w-full rounded-lg py-2 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 uppercase ${
                                                    isOutOfStock
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                        : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg'
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

                {/* Decorative Rice Field Footer */}
                <div className="mt-12 pt-8 border-t border-green-100 text-center">
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