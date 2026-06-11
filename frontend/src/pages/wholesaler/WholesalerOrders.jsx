import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getWholesalerOrders } from '../../services/wholesalerOrderService.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom"; 

const WholesalerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getWholesalerOrders(user.id);
      
      if (response.status) {
        setOrders(response.data || []);
      } else {
        setError(response.message || 'Failed to load orders');
        toast.error(response.message || 'Failed to load orders');
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Error loading orders');
      toast.error('Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
      case 'delivered':
        return '✓';
      case 'pending':
        return '⏳';
      case 'processing':
        return '🔄';
      case 'cancelled':
        return '✗';
      default:
        return '📦';
    }
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.payment_status?.toLowerCase() === selectedStatus);

  const stats = {
    total: orders.length,
    paid: orders.filter(o => o.payment_status === 'paid').length,
    pending: orders.filter(o => o.payment_status === 'pending').length,
    totalValue: orders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-green-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-10">
        <EmptyState
          title="No Orders"
          message={error || 'No wholesale orders found'}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="inline-block mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Order History
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-3xl">🌾</span>
                Wholesale Purchase History
              </h1>
              <p className="text-gray-600 mt-1">Track your bulk shipments and invoices</p>
            </div>
            
            {/* Filter Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Filter:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-white border border-green-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="paid">Paid / Delivered</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Value</p>
                  <p className="text-xl font-bold text-gray-800">₹{stats.totalValue.toLocaleString('en-IN')}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="hidden md:block overflow-x-auto rounded-xl bg-white shadow-lg border border-green-100">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50">
                <th className="p-4 text-sm font-semibold text-gray-700">Order ID</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Bulk Items</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Total Amount</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-700">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const itemsCount = Array.isArray(order.products) ? order.products.length : 0;
                  const itemsList = Array.isArray(order.products)
                    ? order.products.map(p => `${p.product_name} (x${p.quantity || 1})`).join(', ')
                    : 'N/A';

                  return (
                    <tr key={order.id} className="hover:bg-green-50/50 transition-colors duration-200">
                      <td className="p-4">
                        <span className="font-mono font-semibold text-green-700 bg-green-50 px-2 py-1 rounded text-xs">
                          {order.invoice_no || `INV-${order.id}`}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">
                        {new Date(order.created_at).toLocaleDateString('en-GB')}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 font-medium">{itemsCount} item(s)</span>
                          {itemsCount > 0 && (
                            <span className="text-xs text-gray-400 truncate max-w-[200px]" title={itemsList}>
                              ({itemsList.substring(0, 40)}...)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-gray-800">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.payment_status)}`}>
                          <span>{getStatusIcon(order.payment_status)}</span>
                          {(order.payment_status || 'Pending').charAt(0).toUpperCase() + (order.payment_status || 'pending').slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => navigate(`/wholesaler/invoice/${order.invoice_no}`)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p>No orders found for selected filter</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-mono text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                      {order.invoice_no || `INV-${order.id}`}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.created_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.payment_status)}`}>
                    <span>{getStatusIcon(order.payment_status)}</span>
                    {(order.payment_status || 'Pending').charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Items:</span>
                    <span className="text-gray-700 text-sm font-medium">
                      {Array.isArray(order.products) ? order.products.length : 0} item(s)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Total:</span>
                    <span className="text-gray-800 font-bold">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/wholesaler/invoice/${order.invoice_no}`)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Invoice
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-green-100">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WholesalerOrders;