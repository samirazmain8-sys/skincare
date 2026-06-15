import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function NewArrival() {
  const { products, navigate, setShopFilters } = useShop();

  // Filter products by isNewArrival
  const newArrivals = products.filter(p => p.isNewArrival);

  const handleSeeAll = () => {
    setShopFilters({
      brand: null,
      subCategory: null,
      priceRange: null,
      sortBy: 'newness'
    });
    navigate('shop');
  };

  if (newArrivals.length === 0) return null;

  return (
    <section className="bg-neutral-50/50 py-12 border-y border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-neutral-900 text-white rounded text-[10px] font-extrabold uppercase tracking-wide">
              NEW
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">
              New Arrival
            </h2>
          </div>
          <button
            onClick={handleSeeAll}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors cursor-pointer"
          >
            See All New Items
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-thin snap-x scroll-smooth">
          {newArrivals.map((product) => (
            <div key={product.id} className="w-[180px] sm:w-[220px] md:w-[260px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
