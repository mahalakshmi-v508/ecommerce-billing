import React from 'react';

const WholesalerOrders = () => {
  // மாதிரி பிசினஸ் ஆர்டர் தரவு (Sample B2B Orders)
  const orders = [
    { id: "B2B-9843", date: "04-06-2026", items: "Wireless Earbuds (x50)", total: "₹72,500", status: "Processing", payment: "Paid" },
    { id: "B2B-9612", date: "28-05-2026", items: "Smart Fitness Watch (x30)", total: "₹87,000", status: "Delivered", payment: "Paid" },
  ];

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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono font-semibold text-amber-400">{order.id}</td>
                <td className="p-4 text-gray-400">{order.date}</td>
                <td className="p-4 font-medium">{order.items}</td>
                <td className="p-4 font-bold text-gray-100">{order.total}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-xs bg-slate-800 hover:bg-slate-700 text-gray-200 px-3 py-1.5 rounded border border-slate-700 transition-colors">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WholesalerOrders;