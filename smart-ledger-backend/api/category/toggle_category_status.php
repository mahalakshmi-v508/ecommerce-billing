import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getAllCategories } from '../services/categoryService.js'
import { getProducts, getProductsByCategory } from '../services/productService.js'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import toast from 'react-hot-toast'
import { addToCart } from '../services/cartService.js'

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

    useEffect(() => {
        loadCategoriesAndProducts()
    }, [user])

    const loadCategoriesAndProducts = async () => {
        try {
            if (!user?.company_id) {
                toast.error('Company ID not found')
                setLoading(false)
                return
            }
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

    useEffect(() => {
        if (user?.id) {
            loadWishlist()
        }
    }, [user])

    const loadWishlist = async () => {
        try {
            const response = await getWishlistItems(user.id)
            if (response.status) {
                setWishlistItems(response.data || [])
            }
        } catch (error) {
            console.log(error)
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
            console.log(error)
            toast.error('Wishlist failed')
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

            const response = await addToCart(user.id, product.id, 1)

            if (response.status) {
                toast.success(`${product.product_name} added to cart!`)
                window.dispatchEvent(new Event('cartUpdated'))
            } else {
                toast.error(response.message || 'Failed to add cart')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error adding to cart')
        }
    }

    if (loading) {
        return (
            <div className="grid min-h-screen place-items-center bg-white px-4">
                <LoadingSpinner />
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
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                
                {/* =========================================================================
                   1. MINIMAL LIGHT CATEGORY SECTION
                ========================================================================= */}
                <div className="mb-14">
                    <div className="text-left mb-8 pb-4 border-b border-slate-200">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                            Browse Catalog
                        </span>
                        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            Shop by Category
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Select a category to explore our premium selected items.
                        </p>
                    </div>

                    {/* Light Mode Pills for Categories */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => {
                            const isSelected = selectedCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id, category.company_id)}
                                    className={`group relative px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 transform active:scale-95 ${
                                        isSelected
                                            ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span>📦</span>
                                        <span>{category.name}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* =========================================================================
                   2. MINIMAL LIGHT PRODUCTS SECTION
                ========================================================================= */}
                <div>
                    <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-slate-200">
                        <div>
                            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                                <span className="h-5 w-1 bg-indigo-600 rounded-full inline-block"></span>
                                {categories.find((c) => c.id === selectedCategory)?.name || 'Category'} Collection
                            </h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {allProducts.length} {allProducts.length === 1 ? 'item' : 'items'} found
                            </p>
                        </div>
                    </div>

                    {/* Loader & Empty Template */}
                    {productsLoading ? (
                        <div className="grid place-items-center py-32">
                            <LoadingSpinner />
                        </div>
                    ) : allProducts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center max-w-xl mx-auto">
                            <span className="text-3xl block mb-3">🔍</span>
                            <h3 className="text-base font-bold text-slate-700">No products listed</h3>
                            <p className="mt-1 text-xs text-slate-400">There are no items available under this tab at the moment.</p>
                        </div>
                    ) : (
                        
                        /* Clean Light Grid */
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {allProducts.map((product) => {
                                const isWishlisted = wishlistItems.some(
                                    (item) => parseInt(item.product_id) === parseInt(product.id)
                                );
                                const isOutOfStock = parseInt(product.stock) <= 0;

                                return (
                                    <div
                                        key={product.id}
                                        className="group relative rounded-2xl bg-white border border-slate-200/80 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-slate-300"
                                    >
                                        {/* Image Box */}
                                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
                                            
                                            {/* Wishlist Button */}
                                            <button
                                                onClick={() => handleWishlist(product)}
                                                className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-sm border transition-all duration-200 active:scale-90 ${
                                                    isWishlisted 
                                                        ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                                        : 'bg-white text-slate-400 hover:text-slate-600 border-slate-200'
                                                }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" className="w-[16px] h-[16px]" strokeWidth={2.5}>
                                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                </svg>
                                            </button>

                                            {/* Code Label */}
                                            <span className="absolute left-3 top-3 z-10 px-1.5 py-0.5 rounded bg-slate-200/70 text-[9px] font-mono font-bold tracking-wider text-slate-600">
                                                {product.product_code || 'CODE'}
                                            </span>

                                            {/* Product Image */}
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.product_name}
                                                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-102"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-1 text-slate-300">
                                                    <span className="text-xl">🖼️</span>
                                                    <span className="text-[9px] font-bold uppercase tracking-wider">No Image</span>
                                                </div>
                                            )}

                                            {/* Out of Stock Overlay */}
                                            {isOutOfStock && (
                                                <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
                                                    <span className="rounded-lg bg-slate-900 text-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                                        Sold Out
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Box */}
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                                {product.product_name}
                                            </h3>

                                            {/* Price Row */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-medium text-slate-400 uppercase">Price</span>
                                                    <span className="text-base font-black tracking-tight text-slate-900">
                                                        ₹{parseFloat(product.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>

                                                {/* Stock Status */}
                                                <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${
                                                    !isOutOfStock
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                        : 'bg-slate-100 text-slate-400 border-slate-200'
                                                }`}>
                                                    {!isOutOfStock ? `${product.stock} left` : 'OOS'}
                                                </span>
                                            </div>

                                            {/* Minimalist Button */}
                                            <div className="mt-4">
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={isOutOfStock}
                                                    className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-[0.98] ${
                                                        isOutOfStock
                                                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                                            : 'bg-slate-900 text-white hover:bg-slate-800'
                                                    }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                    Add To Bag
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}