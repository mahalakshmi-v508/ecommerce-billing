import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { getWholesalerOrders } from '../../services/wholesalerOrderService.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import toast from 'react-hot-toast';

const WholesalerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
        <EmptyState
          title="No Orders"
          message={error || 'No wholesale orders found'}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100">Wholesale Purchase History</h1>
        <p className="text-sm text-gray-400">Track your current bulk shipments and past invoices.</p>
      </div>

      {/* Desktop Responsive Table */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-sm font-medium text-gray-400">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Bulk Items</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Shipping Status</th>
              <th className="p-4">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm text-gray-300">
            {orders.length > 0 ? (
              orders.map((order) => {
                const itemsCount = Array.isArray(order.products) ? order.products.length : 0;
                const itemsList = Array.isArray(order.products)
                  ? order.products.map(p => `${p.product_name} (x${p.quantity || 1})`).join(', ')
                  : 'N/A';

                return (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-semibold text-amber-400">{order.invoice_no || `INV-${order.id}`}</td>
                    <td className="p-4 text-gray-400">{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
                    <td className="p-4 font-medium max-w-xs truncate" title={itemsList}>{itemsCount} item(s)</td>
                    <td className="p-4 font-bold text-gray-100">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.payment_status === 'paid' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : order.payment_status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {(order.payment_status || 'Pending').charAt(0).toUpperCase() + (order.payment_status || 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-xs bg-slate-800 hover:bg-slate-700 text-gray-200 px-3 py-1.5 rounded border border-slate-700 transition-colors">
                        View Invoice
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WholesalerOrders;