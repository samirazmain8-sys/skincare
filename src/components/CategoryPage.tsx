import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Trash2, Grid, List, Check } from 'lucide-react';
import { BRANDS_LIST } from '../data/products';

const SKINCARE_TYPES = [
  "Cleansing Balm", "Cleansing Oil", "Water Cleanser", "Soap", "Exfoliator", "Toner", "Toner Pad",
  "Essence", "Serum/Ampoule", "Cream/Moisturizer", "Sheet Mask", "Wash-Off Mask", "Sleeping Mask",
  "Facial Mist & Oil", "Sunscreen", "Lotion", "Lip Care", "Eye Care", "Spot Treatment",
  "Fungal Acne Safe", "Soothing Gel", "Combo", "Trial Kit/Travel Kit", "Miniature", "Hair Care", "Body Care"
];

const PRICE_TIERS = [
  { label: "Under ৳1,000", max: 1000 },
  { label: "৳1,000 - ৳1,800", min: 1000, max: 1800 },
  { label: "৳1,800 - ৳2,500", min: 1800, max: 2500 },
  { label: "৳2,500+", min: 2500 }
];

export default function CategoryPage() {
  const { products, shopFilters, setShopFilters, resetFilters } = useShop();
  
  // Local list states
  const [activeProducts, setActiveProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync state and run filters
  useEffect(() => {
    let result = [...products];

    // Filter by Brand
    if (shopFilters.brand) {
      result = result.filter(p => p.brand.toLowerCase() === shopFilters.brand!.toLowerCase());
    }

    // Filter by SubCategory (Skincare Type)
    if (shopFilters.subCategory) {
      // Handle approximate match (e.g., "Serum/Ampoule" matching "Serum" or "Ampoule" or "Essence")
      const sub = shopFilters.subCategory.toLowerCase();
      result = result.filter(p => {
        const pSub = p.subCategory.toLowerCase();
        return pSub.includes(sub) || sub.includes(pSub);
      });
    }

    // Filter by Price range
    if (shopFilters.priceRange) {
      const [min, max] = shopFilters.priceRange;
      result = result.filter(p => {
        const pPrice = p.salePrice || p.price;
        return pPrice >= min && pPrice <= max;
      });
    }

    // Sorting Order
    const sortBy = shopFilters.sortBy;
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

    setActiveProducts(result);
    setCurrentPage(1); // Reset page on filter changes
  }, [shopFilters, products]);

  // Pagination bounds
  const totalPages = Math.ceil(activeProducts.length / itemsPerPage);
  const paginatedProducts = activeProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBrandSelect = (brandName: string | null) => {
    setShopFilters(prev => ({
      ...prev,
      brand: prev.brand === brandName ? null : brandName
    }));
  };

  const handleTypeSelect = (typeName: string | null) => {
    setShopFilters(prev => ({
      ...prev,
      subCategory: prev.subCategory === typeName ? null : typeName
    }));
  };

  const handlePriceSelect = (tier: typeof PRICE_TIERS[0] | null) => {
    if (!tier) {
      setShopFilters(prev => ({ ...prev, priceRange: null }));
      return;
    }
    const min = tier.min || 0;
    const max = tier.max || 99999;
    setShopFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    setShopFilters(prev => ({ ...prev, sortBy }));
  };

  // Check if any filter is active
  const isAnyFilterActive = shopFilters.brand || shopFilters.subCategory || shopFilters.priceRange;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans select-none">
      
      {/* Category Header */}
      <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 mb-8 border border-neutral-100 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 overflow-hidden relative">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neutral-100 opacity-80"></div>
        <div className="relative text-center sm:text-left">
          <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase block mb-1">Authentic Import</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight leading-none">
            {shopFilters.brand 
              ? `${shopFilters.brand} Catalogue` 
              : shopFilters.subCategory 
                ? `${shopFilters.subCategory} Products` 
                : 'All Skin Care Store'}
          </h1>
          <p className="text-xs text-neutral-500 mt-2 font-medium">
            Showing physical authentic stock imports in Bangladesh. Free product custom sample with every shipment.
          </p>
        </div>

        {isAnyFilterActive && (
          <button
            onClick={resetFilters}
            className="relative bg-white text-neutral-700 hover:text-red-500 border border-neutral-200 px-4 py-2 rounded-lg text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Reset All Filters
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Sidebar Filters (Desktop only) */}
        <aside className="w-full lg:w-1/4 shrink-0 space-y-6 hidden lg:block">
          
          {/* Brand Filter Sidebar Card */}
          <div className="border border-neutral-100 rounded-2xl p-5 bg-white space-y-4 shadow-xs">
            <h3 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider border-b border-neutral-100 pb-3">
              Filter By Brand
            </h3>
            <div className="max-h-[220px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
              {/* Filter out brands that exist in current products list to keep it highly relevant */}
              {Array.from(new Set(products.map(p => p.brand))).map((brandObj) => {
                const brand = brandObj as string;
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    className={`flex items-center justify-between w-full text-xs font-semibold py-1 px-2 rounded-md transition-colors cursor-pointer text-left ${
                      shopFilters.brand === brand
                        ? 'bg-neutral-900 text-white'
                        : 'hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    <span className="truncate">{brand}</span>
                    {shopFilters.brand === brand && <Check className="h-3 w-3 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Type (SubCategory) Filter Card */}
          <div className="border border-neutral-100 rounded-2xl p-5 bg-white space-y-4 shadow-xs">
            <h3 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider border-b border-neutral-100 pb-3">
              Product Category
            </h3>
            <div className="max-h-[220px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
              {SKINCARE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeSelect(type)}
                  className={`flex items-center justify-between w-full text-xs font-semibold py-1 px-2 rounded-md transition-colors cursor-pointer text-left ${
                    shopFilters.subCategory === type
                      ? 'bg-neutral-900 text-white'
                      : 'hover:bg-neutral-50 text-neutral-600'
                  }`}
                >
                  <span className="truncate">{type}</span>
                  {shopFilters.subCategory === type && <Check className="h-3 w-3 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter Card */}
          <div className="border border-neutral-100 rounded-2xl p-5 bg-white space-y-4 shadow-xs">
            <h3 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider border-b border-neutral-100 pb-3">
              Price Thresholds (৳)
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => handlePriceSelect(null)}
                className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded-md transition-colors cursor-pointer flex justify-between items-center ${
                  !shopFilters.priceRange ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-600'
                }`}
              >
                <span>Any Budget</span>
                {!shopFilters.priceRange && <Check className="h-3 w-3" />}
              </button>
              {PRICE_TIERS.map((tier) => {
                const isActive = shopFilters.priceRange && 
                  shopFilters.priceRange[0] === (tier.min || 0) && 
                  shopFilters.priceRange[1] === (tier.max || 99999);
                return (
                  <button
                    key={tier.label}
                    onClick={() => handlePriceSelect(tier)}
                    className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded-md transition-colors cursor-pointer flex justify-between items-center ${
                      isActive ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-600'
                    }`}
                  >
                    <span>{tier.label}</span>
                    {isActive && <Check className="h-3 w-3" />}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Right Side: Product catalogue grid */}
        <section className="flex-1 space-y-6">
          
          {/* Sorter control panel row */}
          <div className="bg-white border border-neutral-150 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-bold text-neutral-500">
              Found <span className="text-neutral-900 text-sm font-extrabold">{activeProducts.length}</span> authentic items
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              {/* Mobile-only Filter modal button triggers (simplified selection list inside dropdowns) */}
              <div className="flex lg:hidden gap-1 hover:text-amber-500 cursor-pointer">
                <span className="text-xs font-extrabold flex items-center gap-1">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filter list
                </span>
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      setShopFilters(p => ({ ...p, brand: null, subCategory: null }));
                    } else if (val.startsWith('brand:')) {
                      setShopFilters(p => ({ ...p, brand: val.split(':')[1], subCategory: null }));
                    } else if (val.startsWith('cat:')) {
                      setShopFilters(p => ({ ...p, brand: null, subCategory: val.split(':')[1] }));
                    }
                  }}
                  className="bg-transparent text-xs font-bold text-neutral-600 border-none outline-hidden cursor-pointer"
                >
                  <option value="">Quick Filters (All)</option>
                  <optgroup label="Popular Brands">
                    {Array.from(new Set(products.map(p => p.brand))).map(b => (
                      <option key={b} value={`brand:${b}`}>{b}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Categories">
                    {SKINCARE_TYPES.slice(0, 10).map(t => (
                      <option key={t} value={`cat:${t}`}>{t}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Grid Sorting Dropdown */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider hidden sm:inline">Sort:</span>
                <select
                  value={shopFilters.sortBy}
                  onChange={handleSortChange}
                  className="bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-700 cursor-pointer focus:outline-hidden"
                >
                  <option value="default">Default Sort</option>
                  <option value="popularity">Popular Rating</option>
                  <option value="rating">Average Rating Stars</option>
                  <option value="newness">New arrivals catalog</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active catalog products grid */}
          {activeProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
              <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-neutral-700">No active products match selected criteria</h3>
              <p className="mt-1 text-xs text-neutral-400">Try loosening your brand choice or sorting metrics</p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-neutral-900 text-white rounded-lg px-4 py-2 text-xs font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Catalog numeric pagination block */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6 border-t border-neutral-100">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'instant' as any });
                    }}
                    className={`h-9 w-9 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-neutral-900 text-white'
                        : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
