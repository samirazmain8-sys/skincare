import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { Star, Award } from 'lucide-react';

export default function Bestsellers() {
  const { products, navigate, setShopFilters } = useShop();

  // Filter products by isBestseller
  const bestsellers = products.filter(p => p.isBestseller);

  const handleSeeAll = () => {
    setShopFilters({
      brand: null,
      subCategory: null,
      priceRange: null,
      sortBy: 'rating'
    });
    navigate('shop');
  };

  if (bestsellers.length === 0) return null;

  return (
    <section className="bg-[#fbfcff]/70 py-12 border-y border-neutral-100 font-sans" id="bestsellers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 text-neutral-900 p-1.5 rounded-full">
              <Award className="h-4 w-4" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Best Selling Products
            </h2>
          </div>
          <button
            onClick={handleSeeAll}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
          >
            Sort All by Popularity
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} showStars={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
