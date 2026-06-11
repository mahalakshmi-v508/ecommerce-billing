import api from './api.js'

// Helper function to get valid company_id
const getValidCompanyId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let companyId = user?.company_id;
    if (!companyId || companyId === 0 || companyId === '0') {
        companyId = 1;
    }
    return companyId;
}

export const getActiveCategories = async (mainCategoryId = null) => {
    try {
        const companyId = getValidCompanyId();
        const { data } = await api.get('/category/get_active_category.php', {
            params: { 
                company_id: companyId,
                main_category_id: mainCategoryId 
            },
        })
        return data
    } catch (error) {
        console.error('Error fetching active categories:', error)
        return { status: false, data: [] }
    }
}

export const getAllCategories = async (mainCategoryId = null) => {
    try {
        const companyId = getValidCompanyId();
        const { data } = await api.get('/category/get_all.php', {
            params: { 
                company_id: companyId,
                main_category_id: mainCategoryId 
            },
        })
        return data
    } catch (error) {
        console.error('Error fetching all categories:', error)
        return { status: false, data: [] }
    }
}

export const getCategoryById = async (id) => {
    try {
        const { data } = await api.get('/category/get_by_id.php', {
            params: { id },
        })
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

// Create category with main_category_id
export const createCategory = async (payload) => {
    try {
        const companyId = getValidCompanyId();
        const finalPayload = { ...payload, company_id: companyId };
        const { data } = await api.post('/category/create.php', finalPayload)
        return data
    } catch (error) {
        console.error('Error creating category:', error)
        return { status: false, message: 'Failed to create category' }
    }
}

// Update category
export const updateCategory = async (payload) => {
    try {
        const { data } = await api.post('/category/update.php', payload)
        return data
    } catch (error) {
        console.error('Error updating category:', error)
        return { status: false, message: 'Failed to update category' }
    }
}

// Delete category
export const deleteCategory = async (id) => {
    try {
        const { data } = await api.post('/category/delete.php', { id })
        return data
    } catch (error) {
        console.error('Error deleting category:', error)
        return { status: false, message: 'Failed to delete category' }
    }
}

// Toggle category status
export const toggleCategoryStatus = async (id, status) => {
    try {
        const { data } = await api.post('/category/toggle-status.php', { id, status })
        return data
    } catch (error) {
        console.error('Error toggling status:', error)
        return { status: false, message: 'Failed to update status' }
    }
}

// Get sub categories by main category
export const getActiveSubCategories = async (mainCategoryId = null) => {
    try {
        const companyId = getValidCompanyId();
        const { data } = await api.get('/category/get_active_category.php', {
            params: { 
                company_id: companyId,
                main_category_id: mainCategoryId 
            },
        })
        return data
    } catch (error) {
        console.error('Error fetching sub categories:', error)
        return { status: false, data: [] }
    }
}