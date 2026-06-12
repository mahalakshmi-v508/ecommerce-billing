import api from './api.js'

export const getActiveCategories = async (companyId) => {
  const { data } = await api.get('/category/get_active_category.php', {
    params: { company_id: companyId },
  })
  return data
}

export const getAllCategories = async (companyId) => {
  const { data } = await api.get('/category/get_all.php', {
    params: { company_id: companyId },
  })
  return data
}


/*
|--------------------------------------------------------------------------
| GET CATEGORY BY ID
|--------------------------------------------------------------------------
*/

export const getCategoryById = async (id) => {

  try {

    const { data } = await api.get(
      '/category/get_by_id.php',
      {
        params: { id },
      }
    )

    return data

  } catch (error) {

    console.error('Error fetching category:', error)

    return {
      status: false,
      message: 'Failed to fetch category',
      data: null,
    }
  }
}
