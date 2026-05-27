import api from './api.js'

export const getProducts = async (companyId) => {
  const { data } = await api.post('/product/get.php', {
    company_id: companyId,
  })
  return data
}

export const getProductById = async (id) => {
  const { data } = await api.get('/product/get_by_id.php', {
    params: { id },
  })
  return data
}

export const getProductsByCategory = async (companyId, categoryId) => {
  const response = await getProducts(companyId)
  if (!response.status) {
    return response
  }

  const filteredProducts = response.data.filter((product) => parseInt(product.category_id) === parseInt(categoryId))
  return {
    status: true,
    data: filteredProducts,
  }
}

