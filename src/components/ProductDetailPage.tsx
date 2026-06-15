import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Gift, Heart, ShoppingCart, Star, Share2, Shield, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { Review } from '../types';

export default function ProductDetailPage() {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addReview,
    navigate
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'reviews'>('desc');

  // Review form states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Sync active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setReviewSubmitted(false);
  }, [product]);

  const isFav = isInWishlist(product.id);
  const isSoldOut = product.stockStatus === 'SOLD' || product.stockStatus === 'Out of Stock';

  // Calculate discount percentage
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const review: Review = {
      id: `REV-${Math.floor(1000 + Math.random() * 9000)}`,
      author: newAuthor,
      rating: newRating,
      text: newText,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    addReview(product.id, review);
    setReviewSubmitted(true);
    setNewAuthor('');
    setNewText('');
  };

  // Find 4 related products (shares same brand OR subcategory, excluding this product itself)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.subCategory === product.subCategory))
    .slice(0, 4);

  // Fallback related if too few
  const finalRelated = relatedProducts.length >= 4 
    ? relatedProducts 
    : [...relatedProducts, ...products.filter(p => p.id !== product.id && !relatedProducts.includes(p))].slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans select-none">
      
      {/* Breadcrumbs navigation */}
      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold mb-6 sm:mb-8">
        <button onClick={() => navigate('home')} className="hover:text-neutral-700 cursor-pointer">Home</button>
        <span>/</span>
        <button onClick={() => navigate('shop')} className="hover:text-neutral-700 cursor-pointer">Products</button>
        <span>/</span>
        <span className="text-neutral-800 truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-14">
        {/* Left Column: Image gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full bg-neutral-50 rounded-xl overflow-hidden border border-neutral-100 flex items-center justify-center">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {discountPercent > 0 && !isSoldOut && (
              <span className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow uppercase tracking-wider">
                -{discountPercent}% OFF
              </span>
            )}
            {isSoldOut && (
              <div className="absolute inset-0 bg-neutral-950/50 flex items-center justify-center">
                <span className="bg-neutral-900 border border-neutral-700 text-white font-bold tracking-widest text-xs px-4 py-2 rounded-lg shadow-lg">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>

          {/* Gallery thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 bg-neutral-50 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                    activeImage === img ? 'border-neutral-900 shadow-sm ring-1 ring-neutral-900' : 'border-neutral-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Buying controls */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              {/* Brand tag */}
              <span className="text-xs font-bold text-neutral-400 tracking-wider font-mono uppercase bg-neutral-100 px-2.5 py-1 rounded">
                AUTHORIZED {product.brand} DISTRIBUTOR
              </span>
              
              {/* Star review average widget */}
              <div className="flex items-center gap-1 text-xs font-bold text-neutral-600">
                <div className="flex text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span>{product.rating ? product.rating.toFixed(2) : '4.50'}</span>
                <span className="text-neutral-400 font-medium">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* SKU and Stock level status */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-500 mb-5 border-b border-neutral-100 pb-3">
              <span>SKU: <span className="font-semibold text-neutral-800">{product.sku}</span></span>
              <span>Category: <span className="font-semibold text-neutral-800">{product.subCategory}</span></span>
              <span>Availability: 
                <span className={`font-semibold ml-1 ${isSoldOut ? 'text-red-500' : 'text-emerald-600'}`}>
                  {isSoldOut ? 'SOLD' : 'In Stock'}
                </span>
              </span>
            </div>

            {/* Pricing Card */}
            <div className="flex items-center gap-3.5 mb-5 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100">
              {product.salePrice ? (
                <>
                  <span className="text-sm text-neutral-400 line-through">
                    ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-2xl font-extrabold text-neutral-950">
                    ৳{product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100">
                    SAVE {discountPercent}% NOW
                  </span>
                </>
              ) : (
                <span className="text-2xl font-extrabold text-neutral-950">
                  ৳{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>

            {/* Short Ingredients / description */}
            <div className="text-sm text-neutral-600 leading-relaxed mb-6 space-y-2">
              <p>{product.shortDescription}</p>
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {product.tags.map(t => (
                    <span key={t} className="text-[10px] font-semibold bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            {/* Purchase quantity, Cart, Wishlist actions */}
            {!isSoldOut ? (
              <div className="space-y-4 border-t border-neutral-100 pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-xs font-bold text-neutral-700">Quantity Selection:</span>
                  <div className="flex items-center border border-neutral-250 rounded-lg overflow-hidden h-10 bg-neutral-50 shrink-0">
                    <button
                      onClick={handleDecrease}
                      className="px-3.5 hover:bg-neutral-150 text-neutral-600 font-extrabold text-sm transition-all h-full cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-5 text-sm font-bold text-neutral-850">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="px-3.5 hover:bg-neutral-150 text-neutral-600 font-extrabold text-sm transition-all h-full cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Place In Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`px-4 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                      isFav 
                        ? 'border-red-200 bg-red-50 text-red-500' 
                        : 'border-neutral-250 text-neutral-500 hover:bg-neutral-50 hover:text-red-500'
                    }`}
                    title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className="h-5 w-5 fill-current" strokeWidth={isFav ? 0 : 2} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 border-t border-neutral-100 pt-6">
                <p className="text-xs text-red-600 font-bold p-3 bg-red-50 border border-red-100 rounded-lg text-center animate-pulse">
                  Sold Out alert: This is currently out of stock due to heavy seasonal demands.
                </p>
                <div className="flex gap-3">
                  <button
                    disabled
                    className="flex-grow bg-neutral-200 text-neutral-400 font-bold text-sm py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Out of Stock
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`px-4 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                      isFav 
                        ? 'border-red-200 bg-red-50 text-red-500' 
                        : 'border-neutral-250 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    <Heart className="h-5 w-5 fill-current" strokeWidth={isFav ? 0 : 2} />
                  </button>
                </div>
              </div>
            )}

            {/* Free sample signal block */}
            <div className="flex items-center gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl mt-6">
              <Gift className="h-5 w-5 text-amber-500 shrink-0" />
              <div className="text-xs">
                <span className="font-extrabold text-neutral-900 block leading-tight">FREE SAMPLE SECURED</span>
                <span className="text-neutral-600 block mt-0.5 font-medium">An authentic Korean custom sample is automatically added with this order delivery.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation: Desc, Ingredients, Reviews */}
      <div className="border-b border-neutral-100 mb-6">
        <div className="flex gap-6 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-sm font-extrabold uppercase tracking-wider relative cursor-pointer whitespace-nowrap ${
              activeTab === 'desc' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 text-sm font-extrabold uppercase tracking-wider relative cursor-pointer whitespace-nowrap ${
              activeTab === 'ingredients' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Ingredients & Directions
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-extrabold uppercase tracking-wider relative cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Customer Reviews ({product.reviews?.length || 0})
          </button>
        </div>
      </div>

      {/* Tab panel displays */}
      <div className="bg-white rounded-xl min-h-[220px] mb-16">
        {activeTab === 'desc' && (
          <div className="space-y-4 text-sm text-neutral-600 leading-relaxed max-w-4xl p-2">
            <h3 className="font-extrabold text-neutral-800 text-base mb-2">Detailed Product Specifications</h3>
            <p>{product.description || product.shortDescription}</p>
            <div className="grid grid-cols-2 gap-4 border-t border-neutral-50 pt-4 mt-4">
              <div>
                <span className="font-bold text-neutral-400 text-xs block uppercase tracking-wide">Brand Origin</span>
                <span className="font-extrabold text-neutral-800 text-sm">{product.brand} (South Korea)</span>
              </div>
              <div>
                <span className="font-bold text-neutral-400 text-xs block uppercase tracking-wide">Authenticity Guarantee</span>
                <span className="font-extrabold text-emerald-600 text-sm flex items-center gap-1">100% Original Certified</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-6 text-sm text-neutral-600 leading-relaxed max-w-4xl p-2">
            <div>
              <h3 className="font-extrabold text-neutral-800 text-base mb-2">How to Professionally Use</h3>
              <p className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 italic">
                "{product.howToUse || 'At the final step of skin cleansing routines, smooth an appropriate layer over problematic dermal areas.'}"
              </p>
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-800 text-base mb-2">Complete Key Ingredients</h3>
              <p className="font-mono text-xs text-neutral-500 leading-relaxed bg-neutral-50/50 p-4 rounded-xl border border-neutral-100">
                {product.ingredients || 'Hydrolyzed Centella Asiatica leaf extracts, Rice Ferments, Butylene Glycols, Adenosine peptide blends, Shea Oils.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-2">
            {/* Reviews list */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-extrabold text-neutral-800 text-base mb-4">Verified Customer Ratings</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="divide-y divide-neutral-100">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="py-4 first:pt-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-neutral-800 text-sm">{rev.author}</span>
                        <span className="text-[10px] text-neutral-400 font-bold">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 fill-current ${
                              i < rev.rating ? 'text-amber-400' : 'text-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed italic">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border border-dashed border-neutral-100">
                  <p className="text-xs font-bold">No ratings recorded yet.</p>
                  <p className="text-[10px] mt-1">Be the first client to register a rating for this formula!</p>
                </div>
              )}
            </div>

            {/* Write a review Form */}
            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100 self-start">
              <h3 className="font-extrabold text-neutral-850 text-sm mb-4 uppercase tracking-wider">Leave a Star Review</h3>
              {reviewSubmitted ? (
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100 text-center text-xs font-bold">
                  🎉 Thank you! Your verified rating was successfully added to the product catalogue.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Samir Azmain"
                      className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs focus:outline-hidden focus:border-neutral-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Rating Stars</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`h-5 w-5 ${star <= newRating ? 'fill-current' : 'text-neutral-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Review Comments</label>
                    <textarea
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Tell customers about texture, scent, and hydration results..."
                      className="w-full bg-white border border-neutral-200 rounded-lg p-2 text-xs focus:outline-hidden focus:border-neutral-400 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-2 px-4 rounded-lg cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Section: Related products */}
      <section className="border-t border-neutral-100 pt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-0.5">Complementary formulas</span>
            <h2 className="text-lg md:text-xl font-extrabold text-neutral-900 tracking-tight">Related Products</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {finalRelated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </main>
  );
}
