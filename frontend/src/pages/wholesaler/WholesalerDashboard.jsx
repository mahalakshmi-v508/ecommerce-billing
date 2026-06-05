import React from 'react';
import { Link } from 'react-router-dom';

const WholesalerDashboard = () => {
  // மாதிரி தரவு (Sample Data)
  const stats = [
    { title: "Total Bulk Orders", count: "12", icon: "📦" },
    { title: "Current Tier Discount", count: "35% OFF", icon: "💰" },
    { title: "Pending Invoices", count: "2", icon: "📄" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      {/* Welcome Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
          Welcome Back, Wholesaler Partner!
        </h1>
        <p className="text-gray-400 mt-2">
          Access your exclusive B2B pricing, bulk catalog, and manage your commercial orders seamlessly.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-all duration-300 shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1 text-amber-400">{stat.count}</h3>
            </div>
            <span className="text-3xl bg-slate-800 p-3 rounded-lg">{stat.icon}</span>
          </div>
        ))}
      </div>

      {/* Actions and Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Links */}
        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Quick Actions</h2>
          <div className="space-y-4">
            <Link to="/wholesaler/products" className="flex items-center justify-between p-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg group transition-all">
              <span className="font-medium text-amber-300">Browse Wholesale Catalog (Bulk Pricing)</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link to="/wholesaler/orders" className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg group transition-all">
              <span className="font-medium text-gray-300">View Bulk Purchase History</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Tier Minimum Order Rules */}
        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-200">Wholesale Terms & Policy</h2>
            <p className="text-sm text-gray-400 mb-4">Your current pricing tier requires a minimum order volume to maintain exclusive discounts.</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">⏱️ Minimum 50 items per order checkout.</li>
              <li className="flex items-center gap-2">🚛 Free container/freight shipping included.</li>
              <li className="flex items-center gap-2">💳 GST invoice available on receipt.</li>
            </ul>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-amber-500/70 font-mono">
            * Tier automatically updates based on monthly volume.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesalerDashboard;