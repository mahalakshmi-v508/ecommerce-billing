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
    /*
    |--------------------------------------------------------------------------
    | LOAD INITIAL DATA
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        loadCategoriesAndProducts()
    }, [user])

    /*
    |--------------------------------------------------------------------------
    | LOAD CATEGORIES + FIRST CATEGORY PRODUCTS
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

            /*
            |--------------------------------------------------------------------------
            | LOAD CATEGORIES
            |--------------------------------------------------------------------------
            */

            const categoriesResponse = await getAllCategories()

            console.log('Categories Response:', categoriesResponse)

            if (
                categoriesResponse.status &&
                categoriesResponse.data?.length > 0
            ) {

                setCategories(categoriesResponse.data)

                /*
                |--------------------------------------------------------------------------
                | SELECT FIRST CATEGORY
                |--------------------------------------------------------------------------
                */

                const firstCategory =
                    categoriesResponse.data[0]

                setSelectedCategory(firstCategory.id)

                /*
                |--------------------------------------------------------------------------
                | LOAD FIRST CATEGORY PRODUCTS
                |--------------------------------------------------------------------------
                */

                const productsResponse =
                    await getProductsByCategory(
                        firstCategory.company_id,
                        firstCategory.id
                    )
                console.log('Products Response:', productsResponse)

                if (productsResponse.status) {

                    setAllProducts(productsResponse.data || [])

                } else {

                    toast.error(
                        productsResponse.message ||
                        'Failed to load products'
                    )
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

    /*
    |--------------------------------------------------------------------------
    | CATEGORY CLICK
    |--------------------------------------------------------------------------
    */
    useEffect(() => {

        if (user?.id) {

            loadWishlist()
        }

    }, [user])

    const loadWishlist = async () => {

        try {

            const response =
                await getWishlistItems(user.id)

            if (response.status) {

                setWishlistItems(
                    response.data || []
                )
            }

        } catch (error) {

            console.log(error)
        }
    }
    const handleWishlist = async (
        product
    ) => {

        try {

            if (!user?.id) {

                toast.error('Please login')

                return
            }

            const exists =
                wishlistItems.some(
                    (item) =>
                        parseInt(item.product_id) ===
                        parseInt(product.id)
                )

            /*
            |--------------------------------------------------------------------------
            | REMOVE
            |--------------------------------------------------------------------------
            */

            if (exists) {

                const item =
                    wishlistItems.find(
                        (wishlistItem) =>
                            parseInt(
                                wishlistItem.product_id
                            ) === parseInt(product.id)
                    )

                if (item) {

                    await removeFromWishlist(
                        item.id
                    )

                    toast.success(
                        'Removed from wishlist'
                    )
                }

            } else {

                /*
                |--------------------------------------------------------------------------
                | ADD
                |--------------------------------------------------------------------------
                */

                const response =
                    await addToWishlist(
                        user.id,
                        product.id
                    )

                if (response.status) {

                    toast.success(
                        'Added to wishlist!'
                    )
                }
            }

            /*
            |--------------------------------------------------------------------------
            | RELOAD WISHLIST
            |--------------------------------------------------------------------------
            */

            loadWishlist()

            /*
            |--------------------------------------------------------------------------
            | UPDATE HEADER
            |--------------------------------------------------------------------------
            */

            window.dispatchEvent(
                new Event('wishlistUpdated')
            )

        } catch (error) {

            console.log(error)

            toast.error(
                'Wishlist failed'
            )
        }
    }
    const handleCategoryClick = async (
        categoryId,
        companyId
    ) => {

        try {

            setSelectedCategory(categoryId)

            setProductsLoading(true)

            const response = await getProductsByCategory(
                companyId,
                categoryId
            )

            console.log('Category Products:', response)

            if (response.status) {

                setAllProducts(response.data || [])

            } else {

                toast.error(
                    response.message ||
                    'Failed to load products'
                )
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

    /*
    |--------------------------------------------------------------------------
    | ADD TO CART
    |--------------------------------------------------------------------------
    */

    const handleAddToCart = async (product) => {

        try {

            /*
            |--------------------------------------------------------------------------
            | LOGIN CHECK
            |--------------------------------------------------------------------------
            */

            if (!user?.id) {

                toast.error('Please login')

                return
            }

            /*
            |--------------------------------------------------------------------------
            | STOCK CHECK
            |--------------------------------------------------------------------------
            */

            if (parseInt(product.stock) <= 0) {

                toast.error('Out of stock')

                return
            }

            /*
            |--------------------------------------------------------------------------
            | API CALL
            |--------------------------------------------------------------------------
            */

            const response = await addToCart(
                user.id,
                product.id,
                1
            )

            console.log(
                'Cart Response:',
                response
            )

            /*
            |--------------------------------------------------------------------------
            | SUCCESS
            |--------------------------------------------------------------------------
            */

            if (response.status) {

                toast.success(
                    `${product.product_name} added to cart!`
                )

                /*
                |--------------------------------------------------------------------------
                | UPDATE HEADER COUNT
                |--------------------------------------------------------------------------
                */

                window.dispatchEvent(
                    new Event('cartUpdated')
                )

            } else {

                toast.error(
                    response.message ||
                    'Failed to add cart'
                )
            }

        } catch (error) {

            console.log(error)

            toast.error(
                'Error adding to cart'
            )
        }
    }

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div className="grid min-h-screen place-items-center bg-slate-950 px-4">
                <LoadingSpinner />
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | EMPTY CATEGORY
    |--------------------------------------------------------------------------
    */

    if (!categories || categories.length === 0) {

        return (
            <EmptyState
                title="No Categories"
                message="No categories available"
            />
        )
    }

    return (

        <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_28%),#020617] p-8 shadow-2xl shadow-slate-950/60">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-blue-300/80">
                                Explore collections
                            </p>
                            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                Shop by Category
                            </h1>
                            <p className="mt-4 max-w-2xl text-slate-400 sm:text-lg">
                                Find the best products from curated categories, with colorful visuals and quick access to your favorite collections.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <div className="rounded-3xl bg-slate-900/80 p-4 text-center shadow-lg shadow-slate-950/40 backdrop-blur">
                                <p className="text-3xl font-bold text-white">{categories.length}</p>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Categories</p>
                            </div>
                            <div className="rounded-3xl bg-slate-900/80 p-4 text-center shadow-lg shadow-slate-950/40 backdrop-blur">
                                <p className="text-3xl font-bold text-indigo-300">{allProducts.length}</p>
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Products</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CATEGORY SECTION */}

                <div className="mt-10 mb-12">

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {categories.map((category) => (

                            <button
                                key={category.id}
                                onClick={() =>
                                    handleCategoryClick(
                                        category.id,
                                        category.company_id
                                    )
                                }
                                className={`group relative overflow-hidden rounded-[2rem] border p-6 text-left shadow-xl transition-transform duration-300 will-change-transform ${selectedCategory === category.id
                                    ? 'border-indigo-500/40 bg-indigo-500/10 text-white shadow-indigo-500/20 hover:-translate-y-1'
                                    : 'border-slate-800 bg-slate-900 hover:-translate-y-1 hover:bg-slate-900/90'
                                    }`}
                            >
                                <div className="absolute right-0 top-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-500/10 blur-2xl"></div>
                                <div className="absolute left-0 bottom-0 h-20 w-20 -translate-y-1/2 -translate-x-1/2 rounded-full bg-sky-400/10 blur-2xl"></div>
                                <div className="relative z-10">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        Category
                                    </p>
                                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
                                        {category.name}
                                    </h3>
                                    <p className="mt-3 text-sm text-slate-400">
                                        Tap to browse products in this category.
                                    </p>
                                </div>
                            </button>

                        ))}

                    </div>

                </div>

                {/* PRODUCTS SECTION */}

                <div>

                    <div className="mb-6">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-3xl font-extrabold text-white">
                                    {
                                        categories.find(
                                            (c) => c.id === selectedCategory
                                        )?.name
                                    }
                                    {' '}Products
                                </h2>
                                <p className="mt-2 text-slate-400 max-w-xl sm:text-base">
                                    Browse the latest items in this category and add your favorites to the cart.
                                </p>
                            </div>
                            <div className="rounded-3xl bg-slate-900/80 px-5 py-4 text-center shadow-lg shadow-slate-950/30">
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                                    Available
                                </p>
                                <p className="mt-2 text-2xl font-bold text-white">{allProducts.length}</p>
                            </div>
                        </div>

                    </div>

                    {/* PRODUCTS LOADING */}

                    {productsLoading ? (

                        <div className="grid place-items-center py-20">
                            <LoadingSpinner />
                        </div>

                    ) : allProducts.length === 0 ? (

                        <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-12 text-center">

                            <p className="text-slate-400">
                                No products available in this category
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {allProducts.map((product) => (

                                <div
                                    key={product.id}
                                    className="group overflow-hidden rounded-xl bg-slate-900/50 ring-1 ring-slate-700 hover:ring-indigo-500/50"
                                >

                                    {/* IMAGE */}

                                    <div className="relative h-48 overflow-hidden bg-slate-800">

                                        {/* WISHLIST */}

                                        <button
                                            onClick={() =>
                                                handleWishlist(product)
                                            }
                                            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg"
                                        >

                                            <span className="text-xl">

                                                {
                                                    wishlistItems.some(
                                                        (item) =>
                                                            parseInt(item.product_id) ===
                                                            parseInt(product.id)
                                                    )
                                                        ? '❤️'
                                                        : '🤍'
                                                }

                                            </span>

                                        </button>

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.product_name}
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (

                                            <div className="flex h-full items-center justify-center text-slate-500">

                                                No Image

                                            </div>

                                        )}

                                    </div>

                                    {/* CONTENT */}

                                    <div className="p-4">

                                        <h3 className="text-sm font-semibold text-white">

                                            {product.product_name}

                                        </h3>

                                        <p className="mt-1 text-xs text-slate-400">

                                            {product.product_code}

                                        </p>

                                        {/* PRICE */}

                                        {/* PRICE */}

                                        <div className="mt-3">

                                            <span className="text-lg font-bold text-indigo-400">

                                                ₹
                                                {parseFloat(
                                                    product.price || 0
                                                ).toFixed(2)}

                                            </span>

                                        </div>

                                        {/* STOCK */}

                                        <div className="mt-2">

                                            <span
                                                className={`text-xs font-medium ${parseInt(product.stock) > 0
                                                    ? 'text-green-400'
                                                    : 'text-red-400'
                                                    }`}
                                            >

                                                {parseInt(product.stock) > 0
                                                    ? `${product.stock} in stock`
                                                    : 'Out of stock'}

                                            </span>

                                        </div>

                                        {/* BUTTON */}

                                        <button
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                            disabled={
                                                parseInt(product.stock) === 0
                                            }
                                            className="mt-4 w-full rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:bg-slate-600"
                                        >

                                            Add to Cart

                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    )
}