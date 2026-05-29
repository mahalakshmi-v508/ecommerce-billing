
// src/services/orderService.js

import api from './api.js'

export const getMyOrders = async (customerId) => {

  try {

    const response = await api.post(
      "/order/myOrders.php",
      {
        customer_id: customerId,
      }
    );

    return response.data;

  } catch (error) {

    throw error;

  }
};
