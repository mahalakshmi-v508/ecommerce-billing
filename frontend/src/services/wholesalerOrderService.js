import api from './api.js'

export const getWholesalerOrders = async (wholesalerId) => {
  try {
    const { data } = await api.post(
      '/wholesaler/get_orders.php',
      { wholesaler_id: wholesalerId }
    )

    return {
      status: data.status,
      message: data.message || '',
      data: data.data ?? data.orders ?? [],
    }
  } catch (error) {
    console.error('Error fetching wholesaler orders:', error)
    return {
      status: false,
      message: 'Failed to fetch orders',
      data: [],
    }
  }
}
