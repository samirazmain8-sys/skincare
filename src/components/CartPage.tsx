import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, Tag, ShieldAlert } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, navigate } = useShop();

  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0); // active coupon discount
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  // Delivery configuration (Flat ৳100 inside Dhaka, we default to ৳100 and let them customize on checkout)
  const deliveryCharge = cart.length > 0 ? 100 : 0;
  
  // Coupon calculation
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const orderTotal = cartSubtotal - discountAmount + deliveryCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const qLabel = coupon.trim().toUpperCase();
    if (qLabel === 'EID2026' || qLabel === 'EID20') {
      setDiscountPercent(15); // 15% discount
      setCouponApplied(true);
      setCouponError('');
    } else if (qLabel === 'FREETAKE') {
      setDiscountPercent(10); // 10% discount
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid campaign coupon code or expired.');
      setCouponApplied(false);
    }
  };

  const handleCheckout = () => {
    // Navigate with state-like data
    // We can store coupon info in local storage if we want checkout to see it,
    // let's do that!
    localStorage.setItem('sbd_active_discount_pct', String(discountPercent));
    navigate('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center font-sans">
        <div className="bg-neutral-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-neutral-150">
          <ShoppingBag className="h-10 w-10 text-neutral-400" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mb-2">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs text-neutral-500 mb-8 max-w-sm mx-auto font-medium lead-loose">
          Secure healthy imported radiance products today. We include a free organic sample with every single order!
        </p>
        <button
          onClick={() => navigate('shop')}
          className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 px-6 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans select-none">
      
      <div className="border-b border-neutral-100 pb-5 mb-8">
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
          My Shopping Cart
        </h1>
        <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Check prices and secure diagnostic samples
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Product Table List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="divide-y divide-neutral-100">
              {cart.map((item) => {
                const pPrice = item.product.salePrice || item.product.price;
                const rowTotal = pPrice * item.quantity;
                return (
                  <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 hover:bg-neutral-50/50 transition-colors">
                    {/* Image block */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-neutral-100 border border-neutral-100 shrink-0 cursor-pointer"
                      onClick={() => navigate('product-detail', item.product.id)}
                      referrerPolicy="no-referrer"
                    />

                    {/* Meta Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <span className="text-[9px] font-bold text-amber-600 tracking-wider block mb-0.5 uppercase">
                        {item.product.brand}
                      </span>
                      <h4
                        onClick={() => navigate('product-detail', item.product.id)}
                        className="text-sm font-bold text-neutral-800 hover:text-neutral-900 cursor-pointer line-clamp-1 truncate"
                      >
                        {item.product.name}
                      </h4>
                      <div className="flex justify-center sm:justify-start items-center gap-2 mt-1 text-xs text-neutral-500">
                        <span>Unit: ৳{pPrice.toLocaleString()}</span>
                        <span>|</span>
                        <span>SKU: {item.product.sku}</span>
                      </div>
                    </div>

                    {/* Quantity Adjustment + Total */}
                    <div className="flex flex-row items-center gap-4 sm:gap-6 shrink-0 mt-3 sm:mt-0">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden h-8 bg-neutral-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 hover:bg-neutral-100 font-extrabold text-xs text-neutral-600 cursor-pointer h-full"
                        >
                          -
                        </button>
                        <span className="px-3.5 text-xs font-bold text-neutral-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 hover:bg-neutral-100 font-extrabold text-xs text-neutral-600 cursor-pointer h-full"
                        >
                          +
                        </button>
                      </div>

                      {/* Line row sum price */}
                      <span className="text-sm font-bold text-neutral-900 min-w-[70px] text-right">
                        ৳{rowTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>

                      {/* Remove Line Item */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all cursor-pointer shrink-0"
                        title="Remove product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Sizing Navigation links */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-bold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping Cosmetics
            </button>
          </div>
        </div>

        {/* Right Column: Calculations & Coupon summary card */}
        <div className="space-y-6">
          
          {/* Coupon Entry */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-xs">
            <h3 className="font-extrabold text-neutral-850 text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-amber-500" /> Apply Coupon Campaign
            </h3>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="EID2026 or EID20"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-neutral-50 hover:bg-neutral-100/70 border border-neutral-200 focus:bg-white focus:border-neutral-300 text-xs rounded-lg p-2.5 outline-hidden font-bold"
              />
              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-2.5 px-4 rounded-lg cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <p className="text-[11px] text-emerald-600 font-bold mt-2">
                ✓ Coupon Code Applied (15% discount successfully calculated!)
              </p>
            )}
            {couponError && (
              <p className="text-[11px] text-red-500 font-bold mt-2">
                ✗ {couponError}
              </p>
            )}
          </div>

          {/* Pricing Totals Box */}
          <div className="bg-neutral-950 text-white border border-neutral-900 rounded-2xl p-5 md:p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-sm tracking-wider uppercase border-b border-neutral-800 pb-3">
              Order Summaries
            </h3>

            <div className="space-y-3.5 text-xs font-semibold text-neutral-300">
              <div className="flex justify-between">
                <span>Subtotal (৳)</span>
                <span className="font-bold text-white">৳{cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-red-400">
                  <span>Campaign Promo Discount</span>
                  <span className="font-bold">-৳{discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Delivery Fees (COD Flat)</span>
                <span className="font-bold text-white">৳{deliveryCharge.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="border-t border-neutral-800 pt-3.5 flex justify-between text-sm font-extrabold text-[#f5f5f7]">
                <span>Order Total</span>
                <span className="text-base text-amber-400">৳{orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors mt-6 uppercase tracking-wider"
            >
              Secure Order Checkout
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>

            {/* Trust disclaimer */}
            <div className="pt-2 text-[10px] text-neutral-400 font-medium leading-relaxed flex gap-1.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-amber-500" />
              <span>Checkout processes are SSL protected. Payment gateway routes securely through local Bangladesh secure providers.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
