import React from 'react';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  showStars?: boolean;
}

export default function ProductCard({ product, showStars = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, navigate, setQuickViewProduct } = useShop();

  const isFav = isInWishlist(product.id);
  const isSoldOut = product.stockStatus === 'SOLD' || product.stockStatus === 'Out of Stock';

  // Calculate discount percentage
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleCardClick = () => {
    navigate('product-detail', product.id);
  };

  return (
    <div className="group relative bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full font-sans">
      {/* Upper Media Section */}
      <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden cursor-pointer" onClick={handleCardClick}>
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Gray SOLD Out of Stock Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center z-10 transition-opacity">
            <span className="bg-neutral-900 text-white font-bold tracking-widest text-xs uppercase px-3 py-1.5 rounded-md border border-neutral-700 shadow-md">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Discount Badge top-left */}
        {product.salePrice && !isSoldOut && (
          <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2 py-1 rounded shadow-sm z-10 uppercase tracking-wider">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Heart Icon top-right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md z-10 transition-colors ${
            isFav
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-white text-neutral-400 hover:text-red-500'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className="h-4 w-4 fill-current" strokeWidth={isFav ? 0 : 2} />
        </button>

        {/* Quick View Button (appears on hover) */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 hidden md:flex">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 shadow-lg shadow-neutral-900/10 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </motion.button>
          </div>
        )}
      </div>

      {/* Brand & Title Metadata */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="mb-2">
          {/* Brand */}
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1">
            {product.brand}
          </div>
          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="font-bold text-neutral-800 text-sm leading-snug hover:text-neutral-900 cursor-pointer line-clamp-2 h-10 overflow-hidden"
          >
            {product.name}
          </h3>
        </div>

        <div>
          {/* Star Rating (only for best sellers section, or toggled) */}
          {showStars && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <span className="text-[11px] text-neutral-500 font-medium">
                Rated <span className="font-bold text-neutral-700">{product.rating.toFixed(2)}</span> out of 5
              </span>
            </div>
          )}

          {/* Pricing Row */}
          <div className="flex items-center gap-2 mb-4">
            {product.salePrice ? (
              <>
                <span className="text-sm text-neutral-400 line-through">
                  ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-base font-extrabold text-neutral-900">
                  ৳{product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </>
            ) : (
              <span className="text-base font-extrabold text-neutral-900">
                ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {isSoldOut ? (
            <button
              onClick={handleCardClick}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold text-xs py-2.5 px-3 rounded-lg border border-neutral-200 transition-colors cursor-pointer text-center block"
            >
              Read more
            </button>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow active:scale-98"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          )}

          {/* Quick mobile-only Quick view trigger to align with WP WooCommerce Quick View plugin behavior */}
          <div className="flex justify-center mt-2 md:hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="text-neutral-500 text-[10px] font-semibold underline flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              Quick View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
