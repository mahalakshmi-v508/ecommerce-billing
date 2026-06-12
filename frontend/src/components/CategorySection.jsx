import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CategorySection({ selectedCategory, onCategoryChange, loading }) {
    const { user } = useAuth();
    const [mainCategories, setMainCategories] = useState([]);
    const [expandedMainCat, setExpandedMainCat] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        fetchMainCategoriesWithSub();
    }, [user]);

    const fetchMainCategoriesWithSub = async () => {
        try {
            if (!user?.company_id) return;
            setLoadingCategories(true);
            const response = await api.get(`/main-category/get-active.php?company_id=${user.company_id}`);
            if (response.data.status) {
                setMainCategories(response.data.data);
                if (response.data.data.length > 0 && !selectedCategory) {
                    // Auto select first sub category if available
                    setExpandedMainCat(response.data.data[0].id);
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoadingCategories(false);
        }
    };

    if (loading || loadingCategories) {
        return (
            <div className="animate-pulse">
                <div className="h-10 bg-slate-800 rounded-lg w-full mb-4"></div>
                <div className="flex gap-2 overflow-x-auto pb-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-10 w-24 bg-slate-800 rounded-full flex-shrink-0"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="space-y-4">
                {mainCategories.map((mainCat) => (
                    <div key={mainCat.id} className="border-b border-slate-700 pb-3">
                        {/* Main Category Header */}
                        <button
                            onClick={() => setExpandedMainCat(expandedMainCat === mainCat.id ? null : mainCat.id)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📁</span>
                                <span className="font-semibold text-white">{mainCat.name}</span>
                                <span className="text-xs text-slate-400">
                                    ({mainCat.sub_category_count || 0} sub categories)
                                </span>
                            </div>
                            <span className="text-slate-400 text-xl">
                                {expandedMainCat === mainCat.id ? '▼' : '▶'}
                            </span>
                        </button>

                        {/* Sub Categories (visible when expanded) */}
                        {expandedMainCat === mainCat.id && (
                            <div className="mt-2 ml-4 pl-4 border-l-2 border-slate-700">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => onCategoryChange(null)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                            !selectedCategory
                                                ? 'bg-indigo-600 text-white shadow-lg'
                                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        }`}
                                    >
                                        All Products
                                    </button>
                                    {/* Note: You need to fetch sub categories separately */}
                                    {/* This is placeholder - you'll need a separate API for sub categories */}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}