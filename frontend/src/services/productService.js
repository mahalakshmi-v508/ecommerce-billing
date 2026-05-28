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