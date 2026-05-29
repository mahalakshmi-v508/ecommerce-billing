import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("auth_user") || "{}");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders(user.id);
      if (res.status) {
        setOrders(res.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6">
      
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          My Orders
        </h2>

        {orders.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Orders Found 😢
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition"
            >

              {/* Top Bar */}
              <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4">
                <h5 className="font-semibold text-lg">
                  Invoice: {order.invoice_no}
                </h5>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                    order.payment_status
                  )} bg-white`}
                >
                  {order.payment_status}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">

                {/* Price Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  
                  <div className="bg-indigo-50 p-3 rounded-xl">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{order.total_amount}
                    </p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-xl">
                    <p className="text-sm text-gray-500">Paid</p>
                    <p className="text-lg font-bold text-green-600">
                      ₹{order.paid_amount}
                    </p>
                  </div>

                  <div className="bg-red-50 p-3 rounded-xl">
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="text-lg font-bold text-red-600">
                      ₹{order.balance_amount}
                    </p>
                  </div>

                </div>

                {/* Payment Method */}
                <p className="mb-3 text-gray-600">
                  💳 Payment:{" "}
                  <span className="font-medium text-gray-800">
                    {order.payment_method}
                  </span>
                </p>

                {/* Products */}
                <h6 className="font-semibold mb-2 text-gray-700">
                  🛍 Products
                </h6>

                <div className="space-y-2">
                  {order.products?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border rounded-xl p-3 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>

                      <p className="font-semibold text-indigo-600">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-500">
                  📅 Ordered On:{" "}
                  <span className="text-gray-700">
                    {order.created_at}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;