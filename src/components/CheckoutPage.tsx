import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { BANGLADESH_REGIONS } from '../data/products';
import { ShieldCheck, Truck, CreditCard, ShoppingBag, CheckCircle, Gift } from 'lucide-react';
import { OrderItem } from '../types';

export default function CheckoutPage() {
  const { cart, profile, placeOrder, navigate } = useShop();

  const [activeTab, setActiveTab] = useState<'form' | 'success'>('form');
  const [successOrder, setSuccessOrder] = useState<any>(null);

  // Form Fields State
  const [fullName, setFullName] = useState(profile ? profile.name : '');
  const [phone, setPhone] = useState(profile ? profile.phone || '' : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('inside'); // 'inside' or 'outside'
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'bkash' | 'nagad' | 'card'

  // Payment simulated screens
  const [paymentStep, setPaymentStep] = useState<'none' | 'processing' | 'done'>('none');
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashPin, setBkashPin] = useState('');

  // Surcharges: Inside Dhaka = ৳60, Outside Dhaka = ৳120
  const deliveryCharge = deliveryMethod === 'inside' ? 60 : 120;

  // Active coupon discount fetch
  const [discountPercent, setDiscountPercent] = useState(0);
  useEffect(() => {
    const saved = localStorage.getItem('sbd_active_discount_pct');
    if (saved) {
      setDiscountPercent(parseInt(saved, 10));
    }
  }, []);

  const cartSubtotal = cart.reduce(
    (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const totalCost = cartSubtotal - discountAmount + deliveryCharge;

  // Sync cascading dropdown choices
  const currentDivisionObj = BANGLADESH_REGIONS.find((r) => r.division === division);
  const districtsList = currentDivisionObj ? currentDivisionObj.districts : [];
  const currentDistrictObj = districtsList.find((d) => d.name === district);
  const areasList = currentDistrictObj ? currentDistrictObj.areas : [];

  // Reset district/area when division changes
  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDivision(e.target.value);
    setDistrict('');
    setArea('');
    // Automatically toggle shipping options if they choose Dhaka division
    if (e.target.value === 'Dhaka') {
      setDeliveryMethod('inside');
    } else {
      setDeliveryMethod('outside');
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
    setArea('');
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArea(e.target.value);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Build line items
    const lineItems: OrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      brand: item.product.brand,
      price: item.product.salePrice || item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));

    const orderData = {
      subtotal: cartSubtotal,
      deliveryCharge,
      total: totalCost,
      items: lineItems,
      paymentMethod: paymentMethod.toUpperCase(),
      fullName,
      phoneNumber: phone,
      email,
      division,
      district,
      area,
      address: deliveryAddress,
      orderNotes: orderNotes || undefined
    };

    if (paymentMethod === 'bkash' || paymentMethod === 'nagad') {
      setPaymentStep('processing');
      setTimeout(() => {
        setPaymentStep('done');
        const createdOrder = placeOrder(orderData);
        setSuccessOrder(createdOrder);
        setActiveTab('success');
        localStorage.removeItem('sbd_active_discount_pct');
      }, 1500); // simulate fast mobile gateway
    } else {
      const createdOrder = placeOrder(orderData);
      setSuccessOrder(createdOrder);
      setActiveTab('success');
      localStorage.removeItem('sbd_active_discount_pct');
    }
  };

  if (activeTab === 'success') {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center font-sans select-none">
        <div className="bg-emerald-50 text-emerald-600 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight mb-2">
          Your Order Has Been Placed!
        </h1>
        <p className="text-sm font-semibold text-neutral-500 mb-6">
          Order ID: <span className="text-neutral-900 font-bold underline">{successOrder?.id}</span> | Tracking Code: <span className="text-amber-600 font-bold font-mono">{successOrder?.trackingId}</span>
        </p>

        {/* Success Card details */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-5 text-left shadow-md space-y-4 mb-8">
          <h3 className="font-extrabold text-neutral-900 text-sm border-b border-neutral-50 pb-2">SHIPMENT SUMMARY</h3>
          <div className="space-y-1.5 text-xs font-semibold text-neutral-600">
            <p>Customer Name: <span className="text-neutral-800">{successOrder?.fullName}</span></p>
            <p>Hotline Phone: <span className="text-neutral-800">{successOrder?.phoneNumber}</span></p>
            <p>Delivery Location: <span className="text-neutral-800">{successOrder?.address}, {successOrder?.area}, {successOrder?.district}, {successOrder?.division}</span></p>
            <p>Payment Setup: <span className="text-neutral-800 font-mono">{successOrder?.paymentMethod} (COD/Simulated)</span></p>
          </div>
          <div className="border-t border-neutral-50 pt-3 flex justify-between text-xs font-bold text-neutral-900">
            <span>Amount paid in cash</span>
            <span className="text-amber-600 text-sm font-extrabold">৳{successOrder?.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('account')}
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 px-6 rounded-lg cursor-pointer"
          >
            Track in My Account Dashboard
          </button>
          <button
            onClick={() => navigate('home')}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs py-3 px-6 rounded-lg cursor-pointer border border-neutral-250"
          >
            Back to Homepage
          </button>
        </div>
      </main>
    );
  }

  // Fallback if they are loading checkout with an empty cart
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 font-sans">
        <h2 className="text-lg font-extrabold text-neutral-900 mb-2">Checkout Stage Inoperative</h2>
        <p className="text-xs text-neutral-500 mb-6">Your shopping cart is empty. Secure premium skincare brands before checkout.</p>
        <button onClick={() => navigate('shop')} className="bg-neutral-900 text-white text-xs px-4 py-2.5 rounded-lg font-bold">
          Go To Products Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans select-none">
      <div className="border-b border-neutral-100 pb-5 mb-8">
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
          Checkout Purchase Order
        </h1>
        <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5 animate-pulse text-theme">
          <ShieldCheck className="h-4 w-4" /> Secure checkout session encrypted via SSLCommerz standard portals
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Form Fields: Shipping Info (Cols 1 to 3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-neutral-100 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-neutral-900 text-sm tracking-wide border-b border-neutral-50 pb-2">
              SHIPPING & BILLING PARTICULARS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Full Customer Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Samir Azmain"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:bg-white focus:outline-hidden font-semibold focus:border-neutral-450"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Bangladeshi Phone Number *</label>
                <input
                  type="tel"
                  required
                  pattern="^01[3-9]\d{8}$"
                  title="Please enter a valid 11-digit Bangladeshi mobile number e.g. 01712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:bg-white focus:outline-hidden font-semibold focus:border-neutral-450"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Email Address (Optional)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="samirazmain8@gmail.com"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:bg-white focus:outline-hidden font-semibold focus:border-neutral-450"
              />
            </div>

            {/* Cascading Dropdowns for Bangladesh Regions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Division Select */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Division *</label>
                <select
                  required
                  value={division}
                  onChange={handleDivisionChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs cursor-pointer focus:bg-white focus:outline-hidden font-bold"
                >
                  <option value="">Select Division</option>
                  {BANGLADESH_REGIONS.map((r) => (
                    <option key={r.division} value={r.division}>{r.division}</option>
                  ))}
                </select>
              </div>

              {/* District Select */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">District *</label>
                <select
                  required
                  disabled={!division}
                  value={district}
                  onChange={handleDistrictChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs cursor-pointer focus:bg-white focus:outline-hidden font-bold disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {districtsList.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Area Select */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Thana / Area *</label>
                <select
                  required
                  disabled={!district}
                  value={area}
                  onChange={handleAreaChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs cursor-pointer focus:bg-white focus:outline-hidden font-bold disabled:opacity-50"
                >
                  <option value="">Select Area</option>
                  {areasList.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Durable Street Address *</label>
              <textarea
                required
                rows={2}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="House #, Road #, Apartment details, landmarks..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:bg-white focus:outline-hidden font-semibold focus:border-neutral-450"
              />
            </div>

            {/* Delivery Methods inside/outside Dhaka */}
            <div className="space-y-2 border-t border-neutral-50 pt-4">
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Delivery Transit Zone</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`border rounded-xl p-3.5 flex items-center justify-between cursor-pointer ${
                  deliveryMethod === 'inside'
                    ? 'border-neutral-900 bg-neutral-50/50 text-neutral-900'
                    : 'border-neutral-200 text-neutral-600'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'inside'}
                      onChange={() => setDeliveryMethod('inside')}
                      className="accent-neutral-900"
                    />
                    <div className="text-xs">
                      <span className="font-extrabold block">Inside Dhaka Metropolis</span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">Delivery in 24-48 hours</span>
                    </div>
                  </div>
                  <span className="text-xs font-black shrink-0">৳60.00</span>
                </label>

                <label className={`border rounded-xl p-3.5 flex items-center justify-between cursor-pointer ${
                  deliveryMethod === 'outside'
                    ? 'border-neutral-900 bg-neutral-50/50 text-neutral-900'
                    : 'border-neutral-200 text-neutral-600'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'outside'}
                      onChange={() => setDeliveryMethod('outside')}
                      className="accent-neutral-900"
                    />
                    <div className="text-xs">
                      <span className="font-extrabold block">Outside Dhaka (Suburbs & Districts)</span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">Delivery in 3-5 days</span>
                    </div>
                  </div>
                  <span className="text-xs font-black shrink-0">৳120.00</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Additional Order Notes (Optional)</label>
              <input
                type="text"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Instructions for courier, gate locks, preferred delivery timings..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-xs focus:bg-white focus:outline-hidden font-semibold focus:border-neutral-450"
              />
            </div>

          </div>

          {/* Payment Methods */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-neutral-900 text-sm tracking-wide border-b border-neutral-50 pb-2">
              PAYMENT METHOD INTEGRATION
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* COD */}
              <label className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 cursor-pointer ${
                paymentMethod === 'cod' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 opacity-80'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-neutral-900 shrink-0"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 leading-none">Cash on Delivery</div>
              </label>

              {/* bKash */}
              <label className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 cursor-pointer ${
                paymentMethod === 'bkash' ? 'border-neutral-900 bg-[#E2136E]/5' : 'border-neutral-200 opacity-80'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="accent-[#E2136E] shrink-0"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E2136E] leading-none">bKash Account</div>
              </label>

              {/* Nagad */}
              <label className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 cursor-pointer ${
                paymentMethod === 'nagad' ? 'border-neutral-900 bg-[#F15A22]/5' : 'border-neutral-200 opacity-80'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="accent-[#F15A22] shrink-0"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#F15A22] leading-none">Nagad Wallet</div>
              </label>

              {/* Card */}
              <label className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 cursor-pointer ${
                paymentMethod === 'card' ? 'border-neutral-900 bg-neutral-100' : 'border-neutral-200 opacity-80'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="accent-neutral-900 shrink-0"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 leading-none">SSL Card / Visa</div>
              </label>
            </div>

            {/* bKash Simulated panel */}
            {paymentMethod === 'bkash' && (
              <div className="bg-[#E2136E]/5 border border-[#E2136E]/20 p-4 rounded-xl space-y-3">
                <span className="text-[10px] font-bold uppercase bg-[#E2136E] text-white px-2 py-0.5 rounded">bKash sandbox portal</span>
                <p className="text-[10px] text-neutral-600">Enter payment number and sample pin to simulate direct checkout completion:</p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="Enter payment PIN"
                    value={bkashPin}
                    onChange={(e) => setBkashPin(e.target.value)}
                    className="bg-white text-xs p-2 rounded border border-[#E2136E]/10"
                  />
                  <input
                    type="tel"
                    placeholder="017xxxxxxxx"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="bg-white text-xs p-2 rounded border border-[#E2136E]/10"
                  />
                </div>
              </div>
            )}

            {/* Nagad Simulated panel */}
            {paymentMethod === 'nagad' && (
              <div className="bg-[#F15A22]/5 border border-[#F15A22]/20 p-4 rounded-xl space-y-3">
                <span className="text-[10px] font-bold uppercase bg-[#F15A22] text-white px-2 py-0.5 rounded">Nagad sandbox portal</span>
                <p className="text-[10px] text-neutral-600">Simulate payment verification inside the Bangladeshi wallet:</p>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="Provide 11-digit Wallet No"
                    className="bg-white text-xs p-2 rounded border border-[#F15A22]/10 flex-1"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cost Review: Summaries and Order lists (Cols 4 & 5) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-950 text-white rounded-2xl p-5 md:p-6 shadow-xl space-y-5 border border-neutral-900">
            <h3 className="font-bold text-sm tracking-wider uppercase border-b border-neutral-800 pb-3">
              Order Review
            </h3>

            {/* Line items mini table */}
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 justify-between items-start text-xs border-b border-neutral-900/50 pb-2">
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-amber-400 block uppercase leading-none mb-0.5">{item.product.brand}</span>
                    <span className="font-bold text-neutral-200 line-clamp-1">{item.product.name}</span>
                    <span className="text-neutral-500 font-semibold block mt-1">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-[#f5f5f7]">৳{((item.product.salePrice || item.product.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Aggregate tally */}
            <div className="space-y-3 border-t border-neutral-800 pt-4 text-xs font-semibold text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-200">৳{cartSubtotal.toLocaleString()}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-400">
                  <span>Promo discount (-{discountPercent}%)</span>
                  <span className="font-bold">-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-neutral-200">৳{deliveryCharge.toLocaleString()}</span>
              </div>

              <div className="border-t border-neutral-800 pt-4 flex justify-between text-sm font-extrabold text-[#f5f5f7]">
                <span>Invoice Total</span>
                <span className="text-amber-400 text-base">৳{totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Free sample note */}
            <div className="bg-neutral-900/60 p-3 rounded-lg border border-neutral-800 flex items-center gap-2 text-[10px] text-neutral-300">
              <Gift className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Free clinical Korean skincare sample is secured with this order!</span>
            </div>

            {paymentStep === 'processing' ? (
              <button
                disabled
                className="w-full bg-neutral-850 text-neutral-400 font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Simulating Gateway Verification...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer uppercase tracking-wider"
              >
                Place Order
              </button>
            )}

            <div className="text-center">
              <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase">SSL GATEWAY CERTIFIED</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
