import React, { useState } from 'react';
import { X, ShoppingCart, Star, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, navigate } = useShop();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSoldOut = product.stockStatus === 'SOLD' || product.stockStatus === 'Out of Stock';

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const increaseQty = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
    setQuantity(1);
  };

  const handleViewFullPage = () => {
    navigate('product-detail', product.id);
    setQuickViewProduct(null);
  };

  // Calculate discount percentage
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        {/* Close Button */}
        <button
          onClick={() => {
            setQuickViewProduct(null);
            setQuantity(1);
          }}
          className="absolute top-4 right-4 z-20 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 p-1.5 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Product Media (Left) */}
        <div className="md:w-1/2 bg-neutral-50 relative p-6 flex flex-col justify-center items-center aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[300px] object-contain object-center rounded-lg"
            referrerPolicy="no-referrer"
          />
          {discountPercent > 0 && !isSoldOut && (
            <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-2 py-1 rounded shadow z-10">
              -{discountPercent}% OFF
            </div>
          )}
          {isSoldOut && (
            <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center">
              <span className="bg-neutral-900 text-white font-bold tracking-wider text-xs px-3 py-1.5 rounded border border-neutral-700 shadow">
                SOLD OUT
              </span>
            </div>
          )}
        </div>

        {/* Product Info (Right) */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between max-h-[50vh] md:max-h-[600px] overflow-y-auto">
          <div>
            {/* Brand */}
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
              {product.brand}
            </span>

            {/* Title */}
            <h2 className="font-extrabold text-neutral-800 text-lg md:text-xl leading-tight mb-2">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-current text-amber-400" />
              </div>
              <span className="text-sm font-semibold text-neutral-700">{product.rating ? product.rating.toFixed(2) : '4.50'}</span>
              <span className="text-xs text-neutral-400">({product.reviewsCount ? product.reviewsCount : '45'} reviews)</span>
            </div>

            {/* SKU and Stock Status */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 mb-4 border-b border-neutral-100 pb-3">
              <span>SKU: <span className="font-semibold text-neutral-800">{product.sku}</span></span>
              <span>Availability: 
                <span className={`font-semibold ml-1 ${isSoldOut ? 'text-red-500' : 'text-emerald-600'}`}>
                  {isSoldOut ? 'SOLD' : 'In Stock'}
                </span>
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-4">
              {product.salePrice ? (
                <>
                  <span className="text-sm text-neutral-400 line-through">
                    ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xl font-extrabold text-neutral-950">
                    ৳{product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </>
              ) : (
                <span className="text-xl font-extrabold text-neutral-950">
                  ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Description Fragment */}
            <p className="text-xs text-neutral-600 leading-relaxed mb-6 line-clamp-3">
              {product.shortDescription}
            </p>
          </div>

          <div>
            {/* Purchase Options */}
            {!isSoldOut ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-700">Quantity:</span>
                  <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden h-9 bg-neutral-50">
                    <button
                      onClick={decreaseQty}
                      className="px-3 hover:bg-neutral-100 text-neutral-600 font-bold transition-all h-full cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-neutral-800">{quantity}</span>
                    <button
                      onClick={increaseQty}
                      className="px-3 hover:bg-neutral-100 text-neutral-600 font-bold transition-all h-full cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>

                  <button
                    onClick={handleViewFullPage}
                    className="px-4 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center cursor-pointer"
                    title="View Full Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleViewFullPage}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold text-xs py-3 rounded-lg border border-neutral-200 transition-colors cursor-pointer text-center"
              >
                Read full specifications
              </button>
            )}

            <div className="text-[10px] text-amber-600 font-semibold p-2 bg-amber-50 text-center rounded-md mt-4">
              ✨ Free custom sample is included with this product order automatically!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
