import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getProducts } from '../services/productService.js'
import CategorySection from '../components/CategorySection.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductSkeleton from '../components/ProductSkeleton.jsx'
import EmptyState from '../components/EmptyState.jsx'
import toast from 'react-hot-toast'

export default function Products() {

  const { user } = useAuth()

  const { categoryId } = useParams()

  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [filteredProducts, setFilteredProducts] = useState([])

  const [selectedCategory, setSelectedCategory] =
    useState(categoryId ? String(categoryId) : null)

  const [searchQuery, setSearchQuery] = useState('')

  const [sortBy, setSortBy] = useState('newest')

  const [loading, setLoading] = useState(true)

  /*
  |--------------------------------------------------------------------------
  | CATEGORY PARAM CHANGE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (categoryId) {

      setSelectedCategory(String(categoryId))

    } else {

      setSelectedCategory(null)

    }

  }, [categoryId])

  /*
  |--------------------------------------------------------------------------
  | LOAD PRODUCTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadProducts()

  }, [user])

  /*
  |--------------------------------------------------------------------------
  | FILTER PRODUCTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    filterAndSortProducts()

  }, [
    products,
    selectedCategory,
    searchQuery,
    sortBy,
  ])

  /*
  |--------------------------------------------------------------------------
  | LOAD PRODUCTS
  |--------------------------------------------------------------------------
  */

  const loadProducts = async () => {

    try {

      if (!user?.company_id) {

        console.warn(
          'No company_id found for user:',
          user
        )

        toast.error('Company ID not found')

        setLoading(false)

        return
      }

      setLoading(true)

      const response =
        await getProducts(user.company_id)

      console.log(
        'Products Response:',
        response
      )

      if (response.status) {

        setProducts(response.data || [])

      } else {

        toast.error(
          response.message ||
          'Failed to load products'
        )

      }

    } catch (error) {

      toast.error('Error loading products')

      console.error(
        'Error loading products:',
        error
      )

    } finally {

      setLoading(false)

    }
  }

  /*
  |--------------------------------------------------------------------------
  | FILTER + SORT
  |--------------------------------------------------------------------------
  */

  const filterAndSortProducts = () => {

    let result = [...products]

    /*
    |--------------------------------------------------------------------------
    | CATEGORY FILTER
    |--------------------------------------------------------------------------
    */

    if (selectedCategory) {

      result = result.filter(
        (p) =>
          parseInt(p.category_id) ===
          parseInt(selectedCategory)
      )

    }

    /*
    |--------------------------------------------------------------------------
    | SEARCH FILTER
    |--------------------------------------------------------------------------
    */

    if (searchQuery) {

      const query =
        searchQuery.toLowerCase()

      result = result.filter(
        (p) =>
          p.product_name
            ?.toLowerCase()
            .includes(query) ||

          p.barcode
            ?.toLowerCase()
            .includes(query) ||

          p.category_name
            ?.toLowerCase()
            .includes(query)
      )

    }

    /*
    |--------------------------------------------------------------------------
    | SORT
    |--------------------------------------------------------------------------
    */

    switch (sortBy) {

      case 'price-low':

        result.sort(
          (a, b) =>
            parseFloat(a.price || 0) -
            parseFloat(b.price || 0)
        )

        break

      case 'price-high':

        result.sort(
          (a, b) =>
            parseFloat(b.price || 0) -
            parseFloat(a.price || 0)
        )

        break

      case 'newest':

      default:

        result.sort(
          (a, b) =>
            (b.id || 0) -
            (a.id || 0)
        )

        break
    }

    setFilteredProducts(result)
  }

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const handleSearch = (value) => {

    setSearchQuery(value)

  }

  /*
  |--------------------------------------------------------------------------
  | CATEGORY CHANGE
  |--------------------------------------------------------------------------
  */

  const handleCategoryChange = (categoryId) => {

    const nextCategory =
      categoryId
        ? String(categoryId)
        : null

    setSelectedCategory(nextCategory)

    navigate(
      nextCategory
        ? `/category/${nextCategory}`
        : '/products'
    )
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 p-6">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {[1,2,3,4,5,6,7,8].map((i) => (

            <ProductSkeleton key={i} />

          ))}

        </div>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-slate-950">

      {/* HEADER */}

      <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <h1 className="text-3xl font-bold text-white">

            Products

          </h1>

          <p className="mt-1 text-slate-400">

            Browse our collection of products

          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* SEARCH + SORT */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* SEARCH */}

          <div className="relative sm:col-span-2">

            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">

              🔍

            </span>

          </div>

          {/* SORT */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >

            <option value="newest">

              Newest

            </option>

            <option value="price-low">

              Price: Low to High

            </option>

            <option value="price-high">

              Price: High to Low

            </option>

          </select>

        </div>

        {/* CATEGORY */}

        <CategorySection
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          loading={loading}
        />

        {/* PRODUCTS */}

        {filteredProducts.length > 0 ? (

          <div>

            {/* COUNT */}

            <div className="mb-4 flex items-center justify-between">

              <p className="text-sm text-slate-400">

                Showing{' '}

                <span className="font-semibold text-white">

                  {filteredProducts.length}

                </span>{' '}

                products

              </p>

            </div>

            {/* GRID */}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          </div>

        ) : (

          <EmptyState
            title="No Products Found"
            description={
              searchQuery || selectedCategory
                ? 'Try adjusting your search or filters'
                : 'No products available'
            }
          />

        )}

      </div>

    </div>
  )
}