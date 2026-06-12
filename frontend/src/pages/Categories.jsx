import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { buildProductImageUrl } from '../services/api';
import toast from 'react-hot-toast';
import {
    ShoppingBag,
    Heart,
    ShoppingCart as CartIcon,
    IndianRupee,
    ChevronDown,
    AlertCircle,
    CheckCircle,
    TrendingUp,
    Star,
    Truck,
    Shield,
    Sparkles,
    Menu,
    X
} from 'lucide-react';
import { addToCart } from '../services/cartService';
import { addToWishlist, removeFromWishlist, getWishlistItems } from '../services/wishlistService';

export default function Categories() {
    const { user } = useAuth();

    const [mainCategories, setMainCategories] = useState([]);
    const [selectedMain, setSelectedMain] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSub, setSelectedSub] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [weights, setWeights] = useState({});
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const weightOptions = [
        { label: '½', value: 0.5 },
        { label: '¾', value: 0.75 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '5', value: 5 }
    ];

    // Load all data at once
    const loadAllData = async () => {
        try {
            setLoading(true);
            const companyId = user?.company_id;
            
            if (!companyId) return;

            const mainRes = await api.get(`/main-category/get-all.php?company_id=${companyId}`);
            const catRes = await api.get(`/category/get_all.php?company_id=${companyId}`);
            const prodRes = await api.get(`/product/get.php?company_id=${companyId}`);

            if (mainRes.data.status && mainRes.data.data.length > 0) {
                setMainCategories(mainRes.data.data);
                setSelectedMain(mainRes.data.data[0]);
                
                if (catRes.data.status) {
                    setAllCategories(catRes.data.data);
                    const filteredCats = catRes.data.data.filter(cat => cat.main_category_id == mainRes.data.data[0].id);
                    setSubCategories(filteredCats);
                    
                    if (filteredCats.length > 0) {
                        setSelectedSub(filteredCats[0].id);
                        if (prodRes.data.status) {
                            setAllProducts(prodRes.data.data);
                            const filteredProds = prodRes.data.data.filter(p => p.category_id == filteredCats[0].id);
                            setProducts(filteredProds);
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const loadWishlist = async () => {
        if (!user?.id) return;
        try {
            const res = await getWishlistItems(user.id);
            if (res.status) {
                setWishlist(res.data || []);
                localStorage.setItem('wishlist_count', (res.data || []).length);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user?.company_id) {
            loadAllData();
            loadWishlist();
        }
    }, [user]);

    const handleMainChange = async (main) => {
        if (selectedMain?.id === main.id) return;
        
        setSelectedMain(main);
        setShowDropdown(false);
        setShowMobileMenu(false);
        
        const filteredCats = allCategories.filter(cat => cat.main_category_id == main.id);
        setSubCategories(filteredCats);
        
        if (filteredCats.length > 0) {
            setSelectedSub(filteredCats[0].id);
            const filteredProds = allProducts.filter(p => p.category_id == filteredCats[0].id);
            setProducts(filteredProds);
        } else {
            setSelectedSub(null);
            setProducts([]);
        }
    };

    const handleSubChange = (sub) => {
        setSelectedSub(sub.id);
        const filteredProds = allProducts.filter(p => p.category_id == sub.id);
        setProducts(filteredProds);
    };

    // Fixed Wishlist Toggle Function
    const toggleWishlist = async (product) => {
        if (!user?.id) {
            toast.error('Please login');
            return;
        }
        
        const exists = wishlist.some(item => parseInt(item.product_id) === product.id);
        
        try {
            if (exists) {
                const item = wishlist.find(item => parseInt(item.product_id) === product.id);
                if (item) {
                    await removeFromWishlist(item.id);
                    toast.success('Removed from wishlist');
                }
            } else {
                await addToWishlist(user.id, product.id);
                toast.success('Added to wishlist!');
            }
            await loadWishlist();
            
            // Dispatch event to update header count
            window.dispatchEvent(new Event('wishlistUpdated'));
            
        } catch (error) {
            console.error(error);
            toast.error('Failed to update wishlist');
        }
    };

    // Fixed Add to Cart Function
    const addToCartHandler = async (product) => {
        if (!user?.id) {
            toast.error('Please login');
            return;
        }
        
        const stockAmount = parseInt(product.stock);
        if (isNaN(stockAmount) || stockAmount <= 0) {
            toast.error('Out of stock');
            return;
        }
        
        const weightValue = weights[product.id] || 1;
        const weightText = weightValue === 0.5 ? '1/2kg' : weightValue === 0.75 ? '3/4kg' : `${weightValue}kg`;
        
        try {
            const res = await addToCart(user.id, product.id, 1);
            if (res.status) {
                const cartWeights = JSON.parse(localStorage.getItem('frontend_cart_weights') || '{}');
                cartWeights[product.id] = { text: weightText, value: weightValue };
                localStorage.setItem('frontend_cart_weights', JSON.stringify(cartWeights));
                
                toast.success(`${product.product_name} (${weightText}) added to cart!`);
                window.dispatchEvent(new Event('cartUpdated'));
            } else {
                toast.error(res.message || 'Failed to add to cart');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding to cart');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-200 border-t-emerald-600"></div>
                        <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-600 animate-pulse" />
                    </div>
                    <p className="mt-6 text-gray-600 font-medium">Loading premium collection...</p>
                </div>
            </div>
        );
    }

    if (mainCategories.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-16 h-16 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Categories Found</h2>
                    <p className="text-gray-500">Premium products coming soon. Stay tuned!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            
            {/* Hero Section with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-medium">Premium Quality Since 2024</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                            Shop by Category
                        </h1>
                        <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
                            Discover our curated collection of premium products sourced from trusted farms and manufacturers
                        </p>
                        
                        {/* Desktop Category Dropdown */}
                        <div className="hidden md:block relative inline-block">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="group bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full font-semibold flex items-center gap-3 hover:bg-white/20 transition-all duration-300"
                            >
                                <span className="text-lg">{selectedMain?.name}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {showDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 min-w-[250px] animate-fadeInUp">
                                    {mainCategories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleMainChange(cat)}
                                            className={`w-full text-left px-6 py-3 transition-all duration-200 flex items-center justify-between group ${
                                                selectedMain?.id === cat.id 
                                                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="font-medium">{cat.name}</span>
                                            {selectedMain?.id === cat.id && (
                                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Mobile Category Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full font-semibold flex items-center gap-3 mx-auto"
                            >
                                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                <span>{selectedMain?.name}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {showMobileMenu && (
                <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-lg animate-slideInRight">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Categories</h3>
                            <button onClick={() => setShowMobileMenu(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {mainCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleMainChange(cat)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                                        selectedMain?.id === cat.id 
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                
                {/* Sub Categories - Modern Chips */}
                {subCategories.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                            <h2 className="text-xl font-bold text-gray-800">Browse by Collection</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => handleSubChange(null)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    !selectedSub
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200'
                                        : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                                }`}
                            >
                                ✨ All Products
                                <span className="ml-2 text-xs opacity-75">
                                    ({products.length})
                                </span>
                            </button>
                            {subCategories.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => handleSubChange(sub)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedSub === sub.id
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200'
                                            : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                                    }`}
                                >
                                    {sub.name}
                                    <span className="ml-2 text-xs opacity-75">
                                        ({allProducts.filter(p => p.category_id == sub.id).length})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {[
                        { icon: Truck, label: "Free Shipping", desc: "On orders ₹500+" },
                        { icon: Shield, label: "Secure Payment", desc: "100% protected" },
                        { icon: TrendingUp, label: "Quality Guarantee", desc: "Fresh products" },
                        { icon: Star, label: "24/7 Support", desc: "Customer first" }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-300">
                            <item.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                            <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Products Section */}
                {products.length > 0 ? (
                    <>
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {selectedSub 
                                        ? subCategories.find(c => c.id === selectedSub)?.name 
                                        : selectedMain?.name}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    <span className="font-semibold text-emerald-600">{products.length}</span> premium products available
                                </p>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-xs text-gray-400">★ 4.8 • 2k+ reviews</p>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product, idx) => {
                                const weightVal = weights[product.id] || 1;
                                const finalPrice = (parseFloat(product.price) || 0) * weightVal;
                                const inWishlist = wishlist.some(i => parseInt(i.product_id) === product.id);
                                const stockAmount = parseInt(product.stock);
                                const outOfStock = isNaN(stockAmount) || stockAmount <= 0;
                                const lowStock = !outOfStock && stockAmount <= 10;
                                const isHovered = hoveredProduct === product.id;
                                
                                return (
                                    <div
                                        key={product.id}
                                        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        {/* Discount Badge */}
                                        <div className="absolute top-3 left-3 z-20">
                                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                                                -{Math.floor(Math.random() * 20) + 5}%
                                            </div>
                                        </div>
                                        
                                        {/* Image Container */}
                                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                className={`absolute right-3 top-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                    inWishlist 
                                                        ? 'bg-red-500 text-white scale-110' 
                                                        : 'bg-white/90 text-gray-400 hover:bg-white hover:text-red-500'
                                                }`}
                                            >
                                                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                                            </button>
                                            
                                            {product.image ? (
                                                <img
                                                    src={buildProductImageUrl(product.image)}
                                                    alt={product.product_name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full">
                                                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                                                </div>
                                            )}
                                            
                                            {/* Overlay on Hover */}
                                            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                                            
                                            {/* Quick View Button */}
                                            <button className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:bg-emerald-600 hover:text-white ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                                Quick View
                                            </button>
                                            
                                            {/* Stock Badge */}
                                            {outOfStock && (
                                                <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium z-20">
                                                    Out of Stock
                                                </div>
                                            )}
                                            {lowStock && !outOfStock && (
                                                <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium z-20 animate-pulse">
                                                    Only {stockAmount} left
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="p-4">
                                            <div className="mb-2">
                                                <h3 className="font-bold text-gray-800 text-base line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                                    {product.product_name}
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-1">SKU: {product.product_code || 'N/A'}</p>
                                            </div>
                                            
                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                                ))}
                                                <span className="text-xs text-gray-500 ml-1">(128)</span>
                                            </div>
                                            
                                            {/* Stock Status */}
                                            <div className="mb-3">
                                                {!outOfStock ? (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <CheckCircle className="w-3 h-3" />
                                                        <span className="text-xs font-medium">{stockAmount} in stock</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-red-500">
                                                        <AlertCircle className="w-3 h-3" />
                                                        <span className="text-xs font-medium">Out of stock</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Weight Options */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {weightOptions.map(opt => {
                                                    const active = weightVal === opt.value;
                                                    return (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => setWeights({...weights, [product.id]: opt.value})}
                                                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                                                                active
                                                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                                                                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'
                                                            } ${outOfStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            disabled={outOfStock}
                                                        >
                                                            {opt.label}kg
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            
                                            {/* Price */}
                                            <div className="flex items-baseline gap-2 mb-4">
                                                <IndianRupee className="w-4 h-4 text-emerald-600" />
                                                <span className="text-2xl font-bold text-gray-800">{finalPrice.toFixed(2)}</span>
                                                {weightVal !== 1 && (
                                                    <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                                                )}
                                                <span className="text-xs text-green-600 font-medium ml-auto">Save 10%</span>
                                            </div>
                                            
                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() => addToCartHandler(product)}
                                                disabled={outOfStock}
                                                className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                                    outOfStock
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:scale-105'
                                                }`}
                                            >
                                                <CartIcon className="w-4 h-4" />
                                                {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-12 h-12 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                        <p className="text-gray-500">This collection is coming soon. Stay tuned for amazing products!</p>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.4s ease-out;
                }
                
                .animate-slideInRight {
                    animation: slideInRight 0.3s ease-out;
                }
                
                @keyframes delay {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .group {
                    animation: delay 0.5s ease-out backwards;
                }
            `}</style>
        </div>
    );
}