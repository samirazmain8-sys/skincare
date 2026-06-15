import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { Percent, ArrowRight } from 'lucide-react';

export default function SaleSection() {
  const { products, navigate, setShopFilters } = useShop();

  // Find products that have a sale price
  const saleProducts = products.filter(p => p.isSale || p.salePrice);

  const handleSeeAll = () => {
    setShopFilters({
      brand: null,
      subCategory: null,
      priceRange: null,
      sortBy: 'price-asc'
    });
    // This is equivalent to navigating to clearance sale /product-category/sale/
    navigate('page-sale');
  };

  if (saleProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans" id="sale-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-1 rounded-md animate-pulse">
            <Percent className="h-4 w-4" />
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-neutral-900 tracking-tight">
            Special Sale Offers
          </h2>
        </div>
        <button
          onClick={handleSeeAll}
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
        >
          View All Clearance Items
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {saleProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
