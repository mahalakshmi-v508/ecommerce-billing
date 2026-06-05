import React from 'react';

const WholesalerProducts = () => {
  // மாதிரி தயாரிப்பு தரவு (Sample Wholesale Products)
  const products = [
    { id: 1, name: "Premium Wireless Earbuds", moq: 50, retailPrice: "₹2,499", wholesalePrice: "₹1,450", stock: "In Stock (1200+)" },
    { id: 2, name: "Smart Fitness Watch v2", moq: 30, retailPrice: "₹4,999", wholesalePrice: "₹2,900", stock: "In Stock (500+)" },
    { id: 3, name: "Mechanical Gaming Keyboard", moq: 20, retailPrice: "₹3,200", wholesalePrice: "₹1,950", stock: "Low Stock (45)" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">B2B Wholesale Catalog</h1>
          <p className="text-sm text-gray-400">Exclusive tiered pricing for bulk purchases.</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg text-xs md:text-sm text-amber-400 font-mono">
          💡 Minimum Order Quantity (MOQ) rules apply to checkout.
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-700 transition-all">
            {/* Image Placeholder */}
            <div className="h-48 bg-slate-800 flex items-center justify-center text-gray-500">
              [ Product Image Placeholder ]
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-200 line-clamp-1">{product.name}</h3>
              <p className="text-xs text-emerald-400 mt-1 font-medium">{product.stock}</p>
              
              <div className="my-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Retail Price</span>
                  <span className="line-through text-gray-400">{product.retailPrice}</span>
                </div>
                <div>
                  <span className="text-xs text-amber-400 block font-medium">Wholesale Price</span>
                  <span className="text-lg font-bold text-amber-400">{product.wholesalePrice}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg flex items-center justify-between text-xs mb-4 border border-slate-800">
                <span className="text-gray-400">Minimum Order (MOQ):</span>
                <span className="font-bold text-gray-200">{product.moq} Units</span>
              </div>

              <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg text-sm transition-colors">
                Add Bulk to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WholesalerProducts;