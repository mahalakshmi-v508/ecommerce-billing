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
            <div className="grid min-h-screen place-items-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 px-4">
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

        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl space-y-10">

                <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-purple-200/30 backdrop-blur-lg">
                    <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr] lg:items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-indigo-500/80">
                                Category hub
                            </p>
                            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                                Discover curated categories
                            </h1>
                            <p className="mt-4 max-w-2xl text-slate-600 sm:text-lg">
                                Explore a modern boxed category layout with clean product cards and polished action buttons.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-violet-50 p-5 text-center shadow-lg shadow-purple-200/40">
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Categories</p>
                                <p className="mt-3 text-3xl font-bold text-purple-600">{categories.length}</p>
                            </div>
                            <div className="rounded-3xl bg-pink-50 p-5 text-center shadow-lg shadow-pink-200/40">
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Products</p>
                                <p className="mt-3 text-3xl font-bold text-pink-600">{allProducts.length}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-indigo-500/80">Top categories</p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-950">Browse by category</h2>
                    </div>

                    <div className="flex w-full gap-3 overflow-x-auto pb-3 scrollbar-none">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id, category.company_id)}
                                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200/30'
                                    : 'bg-white text-slate-700 shadow-sm hover:bg-purple-50'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id, category.company_id)}
                                className={`group rounded-[2rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 ${selectedCategory === category.id
                                    ? 'border-transparent bg-purple-50 shadow-purple-100/50 hover:-translate-y-0.5'
                                    : 'hover:border-purple-300 hover:bg-purple-50/80 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-950">{category.name}</h3>
                                        <p className="mt-2 text-sm text-slate-500">Tap to view products in this category.</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 shadow-sm">
                                        {category.name?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-purple-100/40">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Featured products</p>
                            <h3 className="text-3xl font-extrabold text-slate-950">{categories.find((c) => c.id === selectedCategory)?.name || 'Selected'} Products</h3>
                        </div>
                        <div className="rounded-3xl bg-slate-100 px-5 py-4 text-center shadow-lg shadow-slate-200/50">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total</p>
                            <p className="mt-2 text-2xl font-bold text-slate-950">{allProducts.length}</p>
                        </div>
                    </div>

                    {productsLoading ? (
                        <div className="grid place-items-center py-20">
                            <LoadingSpinner />
                        </div>
                    ) : allProducts.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-12 text-center">
                            <p className="text-slate-500">No products available in this category</p>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {allProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    <div className="relative h-44 overflow-hidden bg-slate-100">
                                        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500" />
                                        <button
                                            onClick={() => handleWishlist(product)}
                                            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
                                        >
                                            <span className="text-xl">
                                                {wishlistItems.some((item) => parseInt(item.product_id) === parseInt(product.id)) ? '❤️' : '🤍'}
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
                                                <div className="rounded-3xl bg-white/80 px-4 py-2 text-sm font-semibold text-slate-500">
                                                    No Image
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-950">{product.product_name}</h3>
                                                <p className="mt-2 text-sm text-slate-500">{product.product_code || 'No SKU available'}</p>
                                            </div>
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${parseInt(product.stock) > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                                                {parseInt(product.stock) > 0 ? 'In stock' : 'Sold out'}
                                            </span>
                                        </div>

                                        <div className="mt-5 flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Price</p>
                                                <p className="text-2xl font-extrabold text-purple-600">₹{parseFloat(product.price || 0).toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                disabled={parseInt(product.stock) === 0}
                                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-200/30 transition duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:bg-slate-300"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}