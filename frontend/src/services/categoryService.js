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

