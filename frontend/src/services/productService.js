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
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/
export const getProducts = async () => {
    try {
        // const companyId = getValidCompanyId();
        const companyId = 37;
        const { data } = await api.get('/product/get.php', {
            params: {
                company_id: companyId,
            },
        })
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
| ADD PRODUCT
|--------------------------------------------------------------------------
*/
export const addProduct = async (productData) => {
    try {
        const companyId = getValidCompanyId();
        const formData = new FormData()
        formData.append('company_id', companyId);
        
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value)
            }
        })
        
        const { data } = await api.post('/product/add.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    } catch (error) {
        console.error('Error creating product:', error)
        return {
            status: false,
            message: 'Failed to add product',
        }
    }
}

/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
*/
export const updateProduct = async (id, productData) => {
    try {
        const formData = new FormData()
        formData.append('id', id)
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value)
            }
        })
        const { data } = await api.post('/product/update.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return data
    } catch (error) {
        console.error('Error updating product:', error)
        return {
            status: false,
            message: 'Failed to update product',
        }
    }
}

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/
export const deleteProduct = async (id) => {
    try {
        const { data } = await api.post('/product/delete.php', { id })
        return data
    } catch (error) {
        console.error('Error deleting product:', error)
        return {
            status: false,
            message: 'Failed to delete product',
        }
    }
}

/*
|--------------------------------------------------------------------------
| GET PRODUCTS BY CATEGORY (Sub Category)
|--------------------------------------------------------------------------
*/
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await getProducts()
        if (!response.status) {
            return response
        }
        const filteredProducts = response.data.filter(
            (product) => parseInt(product.category_id) === parseInt(categoryId)
        )
        return {
            status: true,
            data: filteredProducts,
        }
    } catch (error) {
        console.error('Error fetching category products:', error)
        return {
            status: false,
            message: 'Failed to fetch category products',
            data: [],
        }
    }
}

/*
|--------------------------------------------------------------------------
| GET PRODUCTS BY MAIN CATEGORY
|--------------------------------------------------------------------------
*/
export const getProductsByMainCategory = async (mainCategoryId) => {
    try {
        const response = await getProducts()
        if (!response.status) {
            return response
        }
        // Filter products where category belongs to this main category
        const filteredProducts = response.data.filter(
            (product) => parseInt(product.main_category_id) === parseInt(mainCategoryId)
        )
        return {
            status: true,
            data: filteredProducts,
        }
    } catch (error) {
        console.error('Error fetching products by main category:', error)
        return {
            status: false,
            message: 'Failed to fetch products by main category',
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
        const { data } = await api.get('/product/get_by_id.php', {
            params: { id },
        })
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
export const getFeaturedProducts = async () => {
    try {
        const response = await getProducts()
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
export const getDealProducts = async () => {
    try {
        const response = await getProducts()
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
export const searchProductsByQuery = async (query) => {
    try {
        const response = await getProducts()
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

/*
|--------------------------------------------------------------------------
| GET PRODUCTS BY SUB CATEGORY ID
|--------------------------------------------------------------------------
*/
export const getProductsBySubCategoryId = async (subCategoryId) => {
    try {
        const response = await getProducts()
        if (!response.status) {
            return response
        }
        const filteredProducts = response.data.filter(
            (product) => parseInt(product.category_id) === parseInt(subCategoryId)
        )
        return {
            status: true,
            data: filteredProducts,
        }
    } catch (error) {
        console.error('Error fetching products by sub category:', error)
        return {
            status: false,
            message: 'Failed to fetch products',
            data: [],
        }
    }
}