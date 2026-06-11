import api from './api.js'

// Helper function to get valid company_id
const getValidCompanyId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let companyId = user?.company_id;
    // If company_id is 0, null, or undefined, use 1
    if (!companyId || companyId === 0 || companyId === '0') {
        companyId = 1;
    }
    return companyId;
}

/*
|--------------------------------------------------------------------------
| GET ACTIVE MAIN CATEGORIES
|--------------------------------------------------------------------------
*/
export const getActiveMainCategories = async () => {
    try {
        const companyId = getValidCompanyId();
        const { data } = await api.get('/main-category/get-active.php', {
            params: { company_id: companyId },
        })
        return data
    } catch (error) {
        console.error('Error fetching active main categories:', error)
        return { status: false, data: [] }
    }
}

/*
|--------------------------------------------------------------------------
| GET ALL MAIN CATEGORIES
|--------------------------------------------------------------------------
*/
export const getAllMainCategories = async () => {
    try {
        const companyId = getValidCompanyId();
        const { data } = await api.get('/main-category/get-all.php', {
            params: { company_id: companyId },
        })
        return data
    } catch (error) {
        console.error('Error fetching all main categories:', error)
        return { status: false, data: [] }
    }
}

/*
|--------------------------------------------------------------------------
| GET MAIN CATEGORY BY ID
|--------------------------------------------------------------------------
*/
export const getMainCategoryById = async (id) => {
    try {
        const { data } = await api.get('/main-category/get-by-id.php', {
            params: { id },
        })
        return data
    } catch (error) {
        console.error('Error fetching main category:', error)
        return {
            status: false,
            message: 'Failed to fetch main category',
            data: null,
        }
    }
}

/*
|--------------------------------------------------------------------------
| CREATE MAIN CATEGORY
|--------------------------------------------------------------------------
*/
export const createMainCategory = async (payload) => {
    try {
        const companyId = getValidCompanyId();
        const finalPayload = { ...payload, company_id: companyId };
        const { data } = await api.post('/main-category/create.php', finalPayload)
        return data
    } catch (error) {
        console.error('Error creating main category:', error)
        return { status: false, message: 'Failed to create main category' }
    }
}

/*
|--------------------------------------------------------------------------
| UPDATE MAIN CATEGORY
|--------------------------------------------------------------------------
*/
export const updateMainCategory = async (payload) => {
    try {
        const { data } = await api.post('/main-category/update.php', payload)
        return data
    } catch (error) {
        console.error('Error updating main category:', error)
        return { status: false, message: 'Failed to update main category' }
    }
}

/*
|--------------------------------------------------------------------------
| DELETE MAIN CATEGORY
|--------------------------------------------------------------------------
*/
export const deleteMainCategory = async (id) => {
    try {
        const { data } = await api.post('/main-category/delete.php', { id })
        return data
    } catch (error) {
        console.error('Error deleting main category:', error)
        return { status: false, message: 'Failed to delete main category' }
    }
}

/*
|--------------------------------------------------------------------------
| TOGGLE MAIN CATEGORY STATUS
|--------------------------------------------------------------------------
*/
export const toggleMainCategoryStatus = async (id, status) => {
    try {
        const { data } = await api.post('/main-category/toggle-status.php', { id, status })
        return data
    } catch (error) {
        console.error('Error toggling status:', error)
        return { status: false, message: 'Failed to update status' }
    }
}