import api from './api.js'

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/

export const getProducts = async (companyId) => {

  try {

    const { data } = await api.get(
      '/product/get.php',
      {
        params: {
          company_id: companyId,
        },
      }
    )

    return data

  } catch (error) {

    console.error('Error fetching products:', error)

    return {
      status: false,
      message: 'Failed to fetch products',
      data: [],
    }
  }
}

/*
|--------------------------------------------------------------------------
| GET PRODUCTS BY CATEGORY
|--------------------------------------------------------------------------
*/

export const getProductsByCategory = async (
  companyId,
  categoryId
) => {

  try {

    // GET ALL PRODUCTS
    const response = await getProducts(companyId)

    if (!response.status) {
      return response
    }

    // FILTER CATEGORY
    const filteredProducts =
      response.data.filter(
        (product) =>
          parseInt(product.category_id) ===
          parseInt(categoryId)
      )

    return {
      status: true,
      data: filteredProducts,
    }

  } catch (error) {

    console.error(
      'Error fetching category products:',
      error
    )

    return {
      status: false,
      message: 'Failed to fetch category products',
      data: [],
    }
  }
}

/*
|--------------------------------------------------------------------------
| GET PRODUCT BY ID
|--------------------------------------------------------------------------
*/

export const getProductById = async (id) => {

  try {

    const { data } = await api.get(
      '/product/get_by_id.php',
      {
        params: { id },
      }
    )

    return data

  } catch (error) {

    console.error('Error fetching product:', error)

    return {
      status: false,
      message: 'Failed to fetch product',
      data: null,
    }
  }
}

/*
|--------------------------------------------------------------------------
| GET FEATURED PRODUCTS
|--------------------------------------------------------------------------
*/

export const getFeaturedProducts = async (companyId) => {
  try {
    const response = await getProducts(companyId)
    if (!response.status) {
      return response
    }
    // Return first 8 products as featured
    return {
      status: true,
      data: response.data?.slice(0, 8) || [],
    }
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return {
      status: false,
      message: 'Failed to fetch featured products',
      data: [],
    }
  }
}

/*
|--------------------------------------------------------------------------
| GET DEAL PRODUCTS
|--------------------------------------------------------------------------
*/

export const getDealProducts = async (companyId) => {
  try {
    const response = await getProducts(companyId)
    if (!response.status) {
      return response
    }
    // Filter products with discount_percentage
    const dealProducts = response.data?.filter(
      (product) => product.discount_percentage && parseInt(product.discount_percentage) > 0
    ) || []
    
    return {
      status: true,
      data: dealProducts,
    }
  } catch (error) {
    console.error('Error fetching deal products:', error)
    return {
      status: false,
      message: 'Failed to fetch deal products',
      data: [],
    }
  }
}

/*
|--------------------------------------------------------------------------
| SEARCH PRODUCTS
|--------------------------------------------------------------------------
*/

export const searchProductsByQuery = async (companyId, query) => {
  try {
    const response = await getProducts(companyId)
    if (!response.status) {
      return response
    }
    
    // Filter products by name or category
    const searchResults = response.data?.filter(
      (product) =>
        product.product_name?.toLowerCase().includes(query?.toLowerCase()) ||
        product.category_name?.toLowerCase().includes(query?.toLowerCase())
    ) || []
    
    return {
      status: true,
      data: searchResults,
    }
  } catch (error) {
    console.error('Error searching products:', error)
    return {
      status: false,
      message: 'Failed to search products',
      data: [],
    }
  }
}