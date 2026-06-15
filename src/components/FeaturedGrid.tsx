import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal, Loader2 } from 'lucide-react';

const BRAND_TABS = ['All', 'APLB', 'KSECRET', 'SKIN1004', 'Celimax', 'Anua'];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 99999 },
  { label: '৳0 – ৳900', min: 0, max: 900 },
  { label: '৳900 – ৳1800', min: 900, max: 1800 },
  { label: '৳1800 – ৳2700', min: 1800, max: 2700 },
  { label: '৳2700 – ৳3600', min: 2700, max: 3600 },
  { label: '৳3600+', min: 3600, max: 99999 }
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Average Rating' },
  { value: 'newness', label: 'Newness' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

export default function FeaturedGrid() {
  const { products } = useShop();
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Simulate AJAX fetching on any filter change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Begin filtering products locally
      let result = [...products];

      // Filter by Brand
      if (selectedBrand !== 'All') {
        result = result.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
      }

      // Filter by Price range
      const range = PRICE_RANGES[selectedPriceIdx];
      result = result.filter(p => {
        const activePrice = p.salePrice || p.price;
        return activePrice >= range.min && activePrice <= range.max;
      });

      // Sorting logic
      if (sortBy === 'popularity') {
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
      } else if (sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'newness') {
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 0 : 1));
      } else if (sortBy === 'price-asc') {
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      } else if (sortBy === 'price-desc') {
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      }

      setFilteredProducts(result);
      setLoading(false);
    }, 450); // 450ms smooth visual async transition

    return () => clearTimeout(timer);
  }, [selectedBrand, selectedPriceIdx, sortBy, products]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="featured-products">
      <div className="border-b border-neutral-100 pb-5 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Featured Products
            </h2>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-200">
            <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-semibold text-neutral-700 focus:outline-hidden cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Brand tabs */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-100">
          <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider mr-2 hidden sm:inline-block">
            Brands:
          </span>
          {BRAND_TABS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedBrand === brand
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Price filter tabs */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold uppercase text-neutral-400 tracking-wider mr-2 hidden sm:inline-block">
            Price Range:
          </span>
          {PRICE_RANGES.map((range, index) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceIdx(index)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedPriceIdx === index
                  ? 'border-neutral-900 bg-neutral-950 text-white'
                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Feedback / Grid Stage */}
        {loading ? (
          /* Skeletons */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white border border-neutral-100 rounded-xl overflow-hidden p-4 space-y-4 animate-pulse">
                <div className="aspect-square bg-neutral-100 rounded-lg w-full"></div>
                <div className="h-3 bg-neutral-100 rounded-sm w-1/3"></div>
                <div className="h-4 bg-neutral-100 rounded-sm w-3/4"></div>
                <div className="h-3 bg-neutral-100 rounded-sm w-1/2"></div>
                <div className="h-8 bg-neutral-100 rounded-md w-full pt-2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50/50 rounded-2xl border border-dashed border-neutral-200">
            <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-neutral-700">No products found</h3>
            <p className="mt-1 text-xs text-neutral-500">Try adjusting your active brand tab or custom price range options.</p>
          </div>
        ) : (
          /* Authentic active grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
