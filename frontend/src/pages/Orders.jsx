import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("auth_user") || "{}");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(user.id);
        if (res.status) setOrders(res.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      paid: { color: "bg-green-100 text-green-800 border-green-300", icon: "✅" },
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: "⏳" },
      failed: { color: "bg-red-100 text-red-800 border-red-300", icon: "❌" },
      refunded: { color: "bg-purple-100 text-purple-800 border-purple-300", icon: "↩️" },
    };
    const defaultStatus = { color: "bg-gray-100 text-gray-800 border-gray-300", icon: "📦" };
    return statusMap[status?.toLowerCase()] || defaultStatus;
  };

  const getPaymentMethodIcon = (method) => {
    const methods = {
      cash: "💵 Cash",
      upi: "📱 UPI",
      card: "💳 Card",
      online: "🌐 Online",
      bank: "🏦 Bank",
    };
    return methods[method?.toLowerCase()] || "💰 " + (method || "N/A");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
<div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-block">
            <div className="flex items-center gap-3 justify-center mb-2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black">
                My Orders
              </h1>
            </div>

            <div className="h-1 w-24 bg-black rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-8xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">Your orders will appear here once you make a purchase.</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders Table */}
        {!loading && orders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Paid
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      GST
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order, idx) => {
                    const statusBadge = getStatusBadge(order.payment_status);
                    return (
                      <tr
                        key={order.id}
className="hover:bg-green-50 transition-all duration-200 group"                      >
                        {/* Invoice No */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xs">
                              #{idx + 1}
                            </div>
                            <span className="font-semibold text-gray-800">
                              {order.invoice_no}
                            </span>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            <span className="block">{formatDate(order.created_at).split(",")[0]}</span>
                            <span className="text-xs text-gray-400">
                              {formatDate(order.created_at).split(",")[1]}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {order.products?.map((product, index) => (
                            <div key={index} className="text-sm text-gray-700">
                              {product.product_name}
                            </div>
                          ))}
                        </td>

                        {/* Total */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-blue-600">
                            ₹{order.total_amount?.toLocaleString()}
                          </div>
                        </td>

                        {/* Paid */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-green-600">
                            ₹{order.paid_amount?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-orange-600">
                            ₹{Number(order.gst_total || 0).toFixed(2)}
                          </div>
                        </td>



                        {/* Action */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => navigate(`/invoice/${order.invoice_id || order.invoice_no}`)}
className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B3B2E] border-2 border-[#0B3B2E] text-white text-sm font-semibold hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#112E24] hover:shadow-lg transform hover:scale-105 transition-all duration-200"                          >
                            {/* <span>📄</span> */}
                            View Invoice
                            <span className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-5 transition-opacity"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Order Summary Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-600">Failed</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Total Orders: <span className="font-bold text-gray-800">{orders.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;