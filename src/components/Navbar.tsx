import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, User, Trash2, Tag, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Brand Mega-columns
const BRAND_COL_1 = ["APLB", "April Skin", "Anua", "Abib", "AXIS-Y", "Aromatica", "Arencia", "Bonajour", "BRINGGREEN", "By Wishtrend", "Beauty of Joseon", "Benton", "Be The Skin", "Banila Co.", "Bad Skin", "Bellflower"];
const BRAND_COL_2 = ["B.LAB", "Belif", "COSRX", "Celimax", "Coxir", "FINO", "Cos De BAHA", "Dr. Althea", "Dr. Ceuracle", "Dear Klairs", "Dr.ForHair", "Eqqualberry", "Etude House", "FULLY", "Farm Stay"];
const BRAND_COL_3 = ["Goodal", "HaruHaru Wonder", "Heimish", "House of Hur", "I'M FROM", "Isntree", "Innisfree", "Iunik", "Illiyoon", "IZEZE", "Jumiso", "KSECRET", "KAINE", "Laneige", "Missha"];
const BRAND_COL_4 = ["Mixsoon", "Manyo", "Mary & May", "Mise En Scene", "Medicube", "Numbuzin", "Neogen Dermalogy", "Nineless", "Nature Republic", "Purito Seoul", "Pyunkang Yul", "Rated Green", "Rovectin", "Ryo", "Round Lab"];
const BRAND_COL_5 = ["Rom&nd", "SKIN1004", "Some By Mi", "Skin Food", "SimplyO", "Skinmiso", "TIRTIR", "Torriden", "Tocobo", "The Face Shop", "Tiam", "Healthy Place", "TONYMOLY", "VT Cosmetics", "3W Clinic"];
const BRAND_COL_6 = ["The Ordinary", "Bath & Body Works", "The Inkey List", "CeraVe", "Paula's Choice", "La Roche-Posay", "PanOxyl", "Neutrogena", "Mielle", "Bioderma", "Differin", "Cetaphil", "Topicals", "Japanese Cosmetics"];

// Skin Care columns
const SKIN_COL_1 = ["Cleansing Balm", "Cleansing Oil", "Water Cleanser", "Soap", "Exfoliator", "Toner", "Toner Pad"];
const SKIN_COL_2 = ["Essence", "Serum/Ampoule", "Cream/Moisturizer", "Sheet Mask", "Wash-Off Mask", "Sleeping Mask"];
const SKIN_COL_3 = ["Facial Mist & Oil", "Sunscreen", "Lotion", "Lip Care", "Eye Care", "Spot Treatment"];
const SKIN_COL_4 = ["Fungal Acne Safe", "Soothing Gel", "Combo", "Trial Kit/Travel Kit", "Miniature", "Makeup & Tools"];

export default function Navbar() {
  const {
    cart,
    wishlist,
    navigate,
    setShopFilters,
    searchQuery,
    setSearchQuery,
    searchResult,
    profile
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandClick = (brand: string) => {
    setShopFilters({
      brand,
      subCategory: null,
      priceRange: null,
      sortBy: 'default'
    });
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    navigate('shop');
  };

  const handleSkinCategoryClick = (subCategory: string) => {
    setShopFilters({
      brand: null,
      subCategory,
      priceRange: null,
      sortBy: 'default'
    });
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    navigate('shop');
  };

  const handleMainCategoryClick = (category: string) => {
    setShopFilters({
      brand: null,
      subCategory: category === 'Hair & Body' ? null : null, // we can deep drill if needed
      priceRange: null,
      sortBy: 'default'
    });
    // set explicit filters
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    navigate('shop');
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      navigate(`search-results`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100 font-sans shadow-xs select-none">
      {/* Promotion Line */}
      <div className="bg-amber-400 text-neutral-900 text-center py-2 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">
        🇸🇰 BD IMPORTED BEAUTY HUBS — Free skincare sample matching your routine with every order! 🌟
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('home')}>
            <div className="bg-neutral-900 text-white p-2 rounded-lg font-bold flex items-center justify-center tracking-tight shadow-sm text-sm sm:text-base">
              SKIN
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-neutral-900 text-base sm:text-lg tracking-wider leading-none">
                CARE BD
              </span>
              <span className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase leading-none mt-1">
                Authentic Korean Hub
              </span>
            </div>
          </div>

          {/* Search bar inside header (Responsive AJAX Search) */}
          <div ref={searchContainerRef} className="hidden md:block relative flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search authentic skincare products, brands..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full bg-neutral-100/90 hover:bg-neutral-100 border border-transparent focus:border-neutral-200 focus:bg-white text-xs text-neutral-800 font-medium px-4 py-2.5 pl-10 rounded-xl focus:outline-hidden transition-all duration-200"
                />
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>

            {/* AJAX Search Results Dropdown */}
            <AnimatePresence>
              {searchFocused && (searchResult.length > 0 || searchQuery.trim() !== '') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-xl shadow-xl overflow-hidden max-h-[380px] overflow-y-auto z-50 p-2"
                >
                  {searchResult.length > 0 ? (
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest px-3 py-1 pb-2 border-b border-neutral-50">
                        Search Results for "{searchQuery}"
                      </div>
                      {searchResult.slice(0, 5).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setSearchFocused(false);
                            navigate('product-detail', p.id);
                          }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-md bg-neutral-50 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow min-w-0">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block leading-none mb-0.5">{p.brand}</span>
                            <h4 className="text-xs font-bold text-neutral-800 truncate leading-tight">{p.name}</h4>
                            <span className="text-xs font-extrabold text-neutral-900 block mt-0.5">
                              ৳{(p.salePrice || p.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                      {searchResult.length > 5 && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900 border-t border-neutral-50 hover:bg-neutral-50/50 flex items-center justify-center gap-1 mt-1 cursor-pointer"
                        >
                          Show all {searchResult.length} matching products
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-400">
                      <p className="text-xs font-bold">No authentic products match "{searchQuery}"</p>
                      <p className="text-[10px] text-neutral-400 mt-1">Check spelling or search generic ingredients</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Right side utility (Cart, Wishlist, Profile) */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Wishlist Link */}
            <button
              onClick={() => navigate('wishlist')}
              className="relative p-2.5 text-neutral-600 hover:text-red-500 rounded-full hover:bg-neutral-50 transition-colors cursor-pointer hidden md:block"
              title="My Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account Link */}
            <button
              onClick={() => navigate('account')}
              className="p-2.5 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors cursor-pointer flex items-center gap-1.5"
              title="My Dashboard"
            >
              <User className="h-5 w-5" />
              <div className="hidden lg:flex flex-col items-start leading-none text-left">
                <span className="text-[10px] font-bold text-neutral-400 tracking-wider">WELCOME BACK</span>
                <span className="text-xs font-extrabold text-neutral-800 mt-0.5 truncate max-w-[80px]">
                  {profile ? profile.name.split(' ')[0] : 'Sign In'}
                </span>
              </div>
            </button>

            {/* Cart Link */}
            <button
              onClick={() => navigate('cart')}
              className="relative p-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="View Cart"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              <span className="hidden sm:inline text-xs font-extrabold px-1">৳{cart.reduce((total, item) => total + (item.product.salePrice || item.product.price) * item.quantity, 0).toLocaleString()}</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-neutral-950 font-black text-[10px] h-5 w-5 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-xl hover:bg-neutral-50 cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>

        {/* Desktop Mega menus navigation (Sticky Row) */}
        <nav className="hidden md:flex items-center justify-center gap-8 h-12 border-t border-neutral-50 text-xs font-extrabold uppercase tracking-widest text-[#2c2c2e]">
          
          {/* BRANDS Mega Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveMegaMenu('brands')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button className="hover:text-amber-500 py-4 cursor-pointer flex items-center gap-1">
              Brands
              <span className="text-[8px]">▼</span>
            </button>

            {/* Brands Mega Dropdown (6 columns) */}
            <AnimatePresence>
              {activeMegaMenu === 'brands' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="fixed left-0 right-0 top-[110px] bg-white border-y border-neutral-100 shadow-2xl py-8 px-6 z-50 block"
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-6 gap-6">
                    {/* Col 1 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100 text-amber-600">KOREAN BRANDS (A-B)</h4>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
                        {BRAND_COL_1.map(brand => (
                          <button key={brand} onClick={() => handleBrandClick(brand)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-0.5">
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 2 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100 text-amber-600">KOREAN BRANDS (B-F)</h4>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
                        {BRAND_COL_2.map(brand => (
                          <button key={brand} onClick={() => handleBrandClick(brand)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-0.5">
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 3 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100 text-amber-600">KOREAN BRANDS (G-M)</h4>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
                        {BRAND_COL_3.map(brand => (
                          <button key={brand} onClick={() => handleBrandClick(brand)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-0.5">
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 4 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100 text-amber-600">KOREAN BRANDS (M-R)</h4>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
                        {BRAND_COL_4.map(brand => (
                          <button key={brand} onClick={() => handleBrandClick(brand)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-0.5">
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 5 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100 text-amber-600">KOREAN BRANDS (R-V)</h4>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
                        {BRAND_COL_5.map(brand => (
                          <button key={brand} onClick={() => handleBrandClick(brand)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-0.5">
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 6 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100 text-neutral-500">WESTERN & JAPAN</h4>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
                        {BRAND_COL_6.map(brand => (
                          <button key={brand} onClick={() => handleBrandClick(brand)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-900 transition-colors py-0.5">
                            {brand}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SKIN CARE Mega Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveMegaMenu('skin-care')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button className="hover:text-amber-500 py-4 cursor-pointer flex items-center gap-1">
              Skin Care
              <span className="text-[8px]">▼</span>
            </button>

            {/* Skin Care Mega Dropdown (4 columns) */}
            <AnimatePresence>
              {activeMegaMenu === 'skin-care' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="fixed left-0 right-0 top-[110px] bg-white border-y border-neutral-100 shadow-2xl py-8 px-6 z-50 block"
                >
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
                    {/* Col 1 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100">CLEANSING & PREP</h4>
                      <div className="space-y-1">
                        {SKIN_COL_1.map(cat => (
                          <button key={cat} onClick={() => handleSkinCategoryClick(cat)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-950 transition-colors py-0.5">
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 2 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100">TREATMENTS & MASKS</h4>
                      <div className="space-y-1">
                        {SKIN_COL_2.map(cat => (
                          <button key={cat} onClick={() => handleSkinCategoryClick(cat)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-950 transition-colors py-0.5">
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 3 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100">HYDRATION & PROTECTION</h4>
                      <div className="space-y-1">
                        {SKIN_COL_3.map(cat => (
                          <button key={cat} onClick={() => handleSkinCategoryClick(cat)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-950 transition-colors py-0.5">
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Col 4 */}
                    <div>
                      <h4 className="font-black text-neutral-900 text-[10px] tracking-wider mb-3 pb-1 border-b border-neutral-100">SPECIAL SOLUTIONS & SETS</h4>
                      <div className="space-y-1">
                        {SKIN_COL_4.map(cat => (
                          <button key={cat} onClick={() => handleSkinCategoryClick(cat)} className="block w-full text-left text-[11px] font-bold text-neutral-600 hover:text-neutral-950 transition-colors py-0.5">
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hair & Body Simple Trigger */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveMegaMenu('hair-body')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <button className="hover:text-amber-500 py-4 cursor-pointer flex items-center gap-1">
              Hair & Body
              <span className="text-[8px]">▼</span>
            </button>

            {/* Simple Dropdown list */}
            <AnimatePresence>
              {activeMegaMenu === 'hair-body' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-[48px] bg-white border border-neutral-100 shadow-xl py-3 rounded-xl min-w-[200px] z-50 block"
                >
                  <button
                    onClick={() => {
                      setShopFilters({ brand: null, subCategory: 'Hair Care', priceRange: null, sortBy: 'default' });
                      navigate('shop');
                    }}
                    className="block w-full text-left px-5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Hair Care Solutions
                  </button>
                  <button
                    onClick={() => {
                      setShopFilters({ brand: null, subCategory: 'Body Care', priceRange: null, sortBy: 'default' });
                      navigate('shop');
                    }}
                    className="block w-full text-left px-5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    Body Care Nourishment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CLEARANCE SALE Trigger */}
          <button
            onClick={() => {
              setShopFilters({ brand: null, subCategory: null, priceRange: null, sortBy: 'price-asc' });
              navigate('page-sale');
            }}
            className="hover:text-red-650 text-red-600 font-extrabold cursor-pointer border-b-2 border-transparent hover:border-red-500 py-1 flex items-center gap-1"
          >
            <Tag className="h-3.5 w-3.5 shrink-0 animate-bounce" />
            Clearance Sale
          </button>

          {/* COMBO Trigger */}
          <button
            onClick={() => handleSkinCategoryClick('Combo')}
            className="hover:text-amber-550 text-neutral-950 font-bold cursor-pointer border-b-2 border-transparent hover:border-amber-500 py-1"
          >
            Combo
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar Navigation Drawer (WordPress Flatsome style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-neutral-950/60 backdrop-blur-xs font-sans">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ tension: 250, friction: 30 }}
              className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto ml-auto"
            >
              <div>
                {/* Drawer close button */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                  <span className="font-extrabold text-neutral-900 text-sm tracking-wider uppercase">Menu Navigation</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Search Input */}
                <div className="mb-6 relative">
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      type="text"
                      placeholder="Search cosmetics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-neutral-100 text-xs text-neutral-800 font-medium px-4 py-2.5 pl-10 rounded-xl focus:outline-hidden"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  </form>
                </div>

                {/* Main links list */}
                <div className="space-y-4">
                  {/* Category Collapse list or Direct list */}
                  <div>
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" /> Core Categories
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5 text-xs font-bold pl-1 text-neutral-700">
                      <button onClick={() => { setMobileMenuOpen(false); navigate('home'); }} className="block text-left py-1 hover:text-amber-500">
                        Home
                      </button>
                      <button onClick={() => { setMobileMenuOpen(false); navigate('shop'); }} className="block text-left py-1 hover:text-amber-500">
                        All Products Store
                      </button>
                      <button onClick={() => handleSkinCategoryClick('Sunscreen')} className="block text-left py-1 hover:text-amber-500">
                        Sunscreens
                      </button>
                      <button onClick={() => handleSkinCategoryClick('Serum/Ampoule')} className="block text-left py-1 hover:text-amber-500">
                        Serums & Ampoules
                      </button>
                      <button onClick={() => handleSkinCategoryClick('Cream/Moisturizer')} className="block text-left py-1 hover:text-amber-500">
                        Moisturizers
                      </button>
                      <button
                        onClick={() => {
                          setShopFilters({ brand: null, subCategory: 'Hair Care', priceRange: null, sortBy: 'default' });
                          setMobileMenuOpen(false);
                          navigate('shop');
                        }}
                        className="block text-left py-1 hover:text-amber-500"
                      >
                        Hair Care
                      </button>
                      <button
                        onClick={() => {
                          setShopFilters({ brand: null, subCategory: 'Body Care', priceRange: null, sortBy: 'default' });
                          setMobileMenuOpen(false);
                          navigate('shop');
                        }}
                        className="block text-left py-1 hover:text-amber-500"
                      >
                        Body Care
                      </button>
                    </div>
                  </div>

                  {/* Hot Brands section */}
                  <div className="pt-2 border-t border-neutral-100">
                    <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Distributor Brands</h4>
                    <div className="flex flex-wrap gap-2">
                      {['APLB', 'Beauty of Joseon', 'COSRX', 'Celimax', 'Anua', 'Isntree', 'SKIN1004', 'KSECRET', 'Mielle', 'The Ordinary'].map(brand => (
                        <button
                          key={brand}
                          onClick={() => handleBrandClick(brand)}
                          className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 whitespace-nowrap cursor-pointer"
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account logout or dashboard status */}
              <div className="border-t border-neutral-100 pt-6 mt-6 text-center text-xs text-neutral-500 font-bold">
                {profile ? (
                  <div className="space-y-2">
                    <p>Welcomed back, {profile.name}!</p>
                    <button
                      onClick={() => { setMobileMenuOpen(false); navigate('account'); }}
                      className="w-full py-2 bg-neutral-900 text-white rounded-lg text-xs"
                    >
                      Go to Dashboard
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('account'); }}
                    className="w-full py-2 bg-neutral-100 text-neutral-800 rounded-lg text-xs hover:bg-neutral-200"
                  >
                    Authenticate Account / Sign In
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
