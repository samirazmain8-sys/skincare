import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, ClipboardList, Heart, Home, Key, LogOut, CheckCircle, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import ProductCard from './ProductCard';

export default function AccountPage() {
  const {
    profile,
    orders,
    wishlist,
    addresses,
    updateAddresses,
    updateProfile,
    logout,
    navigate,
    login
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'details'>('orders');

  // Address fields edit states
  const [bName, setBName] = useState(addresses.billingName);
  const [bPhone, setBPhone] = useState(addresses.billingPhone);
  const [bAddr, setBAddr] = useState(addresses.billingAddress);
  const [sName, setSName] = useState(addresses.shippingName);
  const [sPhone, setSPhone] = useState(addresses.shippingPhone);
  const [sAddr, setSAddr] = useState(addresses.shippingAddress);
  const [addrSuccess, setAddrSuccess] = useState(false);

  // Profile details edit states
  const [profName, setProfName] = useState(profile ? profile.name : '');
  const [profEmail, setProfEmail] = useState(profile ? profile.email : '');
  const [profPass, setProfPass] = useState('••••••••••••');
  const [profSuccess, setProfSuccess] = useState(false);

  // Guest/Login simulation if not logged in
  const [simEmail, setSimEmail] = useState('');
  const [simName, setSimName] = useState('');

  const handleApplyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simEmail || !simName) return;
    login(simEmail, simName);
  };

  const handleUpdateAddresses = (e: React.FormEvent) => {
    e.preventDefault();
    updateAddresses({
      billingName: bName,
      billingPhone: bPhone,
      billingAddress: bAddr,
      shippingName: sName,
      shippingPhone: sPhone,
      shippingAddress: sAddr
    });
    setAddrSuccess(true);
    setTimeout(() => setAddrSuccess(false), 3000);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profName,
      email: profEmail,
      phone: profile?.phone || '01712345678'
    });
    setProfSuccess(true);
    setTimeout(() => setProfSuccess(false), 3000);
  };

  // If user is not authenticated, show sign-in portal
  if (!profile) {
    return (
      <main className="max-w-md mx-auto px-4 py-16 font-sans select-none">
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="text-center">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">SKIN CARE BD AUTHENTICATION</span>
            <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight leading-none mb-2">My Account Portal</h1>
            <p className="text-xs text-neutral-400 font-semibold leading-relaxed">Log in using email parameters to manage orders logbooks and saved items list:</p>
          </div>

          <form onSubmit={handleApplyLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                placeholder="e.g. Samir Azmain"
                className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-500 uppercase mb-1">Your Registered Email *</label>
              <input
                type="email"
                required
                value={simEmail}
                onChange={(e) => setSimEmail(e.target.value)}
                placeholder="samirazmain8@gmail.com"
                className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs py-3 rounded-lg cursor-pointer"
            >
              Sign In to Store
            </button>
          </form>

          <p className="text-[10px] text-neutral-400 text-center leading-relaxed">
            By registering, you obtain instant order tracking links, wholesale directories support, and checkout coupon perks automatically.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans select-none">
      
      {/* Account Banner Row */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 border border-neutral-850 mb-10 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-neutral-800 opacity-40"></div>
        <div className="relative flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="h-14 w-14 bg-amber-400 text-neutral-950 font-black text-xl rounded-full flex items-center justify-center shrink-0 border-2 border-white/20">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 tracking-widest block mb-0.5">DASHBOARD OWNER</span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none">{profile.name}</h1>
            <span className="text-xs text-neutral-400 block mt-1.5 font-bold font-mono">{profile.email}</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="relative bg-neutral-800 hover:bg-red-950/60 text-neutral-300 hover:text-red-300 border border-neutral-700 hover:border-red-550 py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0"
        >
          <LogOut className="h-4 w-4" />
          Logout Safely
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sub-tabs List sidebar */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <div className="border border-neutral-100 rounded-2xl p-4 bg-white shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left text-xs font-bold p-3.5 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'orders' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <ClipboardList className="h-4.5 w-4.5 shrink-0" />
              <span>Purchase History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left text-xs font-bold p-3.5 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'wishlist' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <Heart className="h-4.5 w-4.5 shrink-0" />
              <span>Saved Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left text-xs font-bold p-3.5 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'addresses' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <Home className="h-4.5 w-4.5 shrink-0" />
              <span>Address Books</span>
            </button>

            <button
              onClick={() => setActiveTab('details')}
              className={`w-full text-left text-xs font-bold p-3.5 rounded-lg transition-colors flex items-center gap-2.5 cursor-pointer ${
                activeTab === 'details' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50 text-neutral-600'
              }`}
            >
              <Key className="h-4.5 w-4.5 shrink-0" />
              <span>Account Details</span>
            </button>
          </div>
        </aside>

        {/* Content detail display panel */}
        <section className="flex-1 bg-white border border-neutral-100 rounded-2xl p-5 md:p-7 shadow-xs">
          
          {/* Sub Tab: Orders list */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-neutral-950 text-sm tracking-wide border-b border-neutral-50 pb-3 uppercase">
                Purchase Order Registry
              </h3>
              {orders.length === 0 ? (
                <text className="text-center py-10 text-xs text-neutral-400 font-bold block bg-neutral-50 rounded-xl border border-dashed border-neutral-100">
                  No orders have been recorded against your email yet. Secure glowing radiance catalog items!
                </text>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="border border-neutral-150 rounded-xl overflow-hidden shadow-xs">
                      {/* Order main row headings */}
                      <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-150 flex flex-wrap justify-between items-center gap-3 text-xs font-bold text-neutral-600">
                        <div className="flex gap-4">
                          <span>Date: <span className="text-neutral-850 font-extrabold">{new Date(ord.date).toLocaleDateString()}</span></span>
                          <span>ID: <span className="text-neutral-850 font-extrabold">{ord.id}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">COURIER TRACKING: <span className="text-amber-500 font-mono font-black">{ord.trackingId}</span></span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border ${
                            ord.status === 'Completed' || ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                      </div>

                      {/* Items row details list */}
                      <div className="p-4 space-y-3">
                        {ord.items.map((line, idx) => (
                          <div key={idx} className="flex gap-3 justify-between items-center text-xs">
                            <div className="flex gap-2.5 items-center min-w-0">
                              <img src={line.image} alt={line.name} className="w-8 h-8 rounded-md bg-neutral-50 object-cover shrink-0" referrerPolicy="no-referrer" />
                              <div className="min-w-0">
                                <span className="font-extrabold text-neutral-800 line-clamp-1 truncate">{line.name}</span>
                                <span className="text-neutral-400 block font-semibold text-[10px] mt-0.5">Brand: {line.brand} | Qty: {line.quantity}</span>
                              </div>
                            </div>
                            <span className="font-extrabold text-neutral-900 shrink-0">৳{(line.price * line.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Invoice sums price row footer */}
                      <div className="bg-[#fafbfc] px-4 py-3 border-t border-neutral-150/50 flex justify-between items-center text-xs text-neutral-500 font-bold">
                        <span>Invoice total (including delivery charge)</span>
                        <span className="text-neutral-950 font-extrabold text-sm">৳{ord.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sub Tab: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-neutral-950 text-sm tracking-wide border-b border-neutral-50 pb-3 uppercase">
                My Saved Wishlist
              </h3>
              {wishlist.length === 0 ? (
                <text className="text-center py-10 text-xs text-neutral-400 font-bold block bg-neutral-50 rounded-xl border border-dashed border-neutral-100">
                  Your saved items list is empty. Click heart icons on items card to save details.
                </text>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sub Tab: Addresses */}
          {activeTab === 'addresses' && (
            <form onSubmit={handleUpdateAddresses} className="space-y-6">
              <div className="border-b border-neutral-50 pb-3 flex justify-between items-center">
                <h3 className="font-extrabold text-neutral-950 text-sm tracking-wide uppercase">
                  Address Books Directories
                </h3>
                {addrSuccess && (
                  <span className="text-emerald-600 text-xs font-bold animate-pulse">✓ Saved directories!</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Billing Address Card */}
                <div className="space-y-4 border border-neutral-150 p-4 rounded-xl shadow-xs">
                  <h4 className="font-black text-neutral-800 text-[11px] uppercase tracking-wider block border-b border-neutral-100 pb-2">Billing Address Config</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Billing Receiver Name *</label>
                      <input
                        type="text"
                        required
                        value={bName}
                        onChange={(e) => setBName(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Billing Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={bPhone}
                        onChange={(e) => setBPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Billing Street Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={bAddr}
                        onChange={(e) => setBAddr(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address Card */}
                <div className="space-y-4 border border-neutral-150 p-4 rounded-xl shadow-xs">
                  <h4 className="font-black text-neutral-800 text-[11px] uppercase tracking-wider block border-b border-neutral-100 pb-2">Shipping Transit Destination</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Shipping Receiver Name *</label>
                      <input
                        type="text"
                        required
                        value={sName}
                        onChange={(e) => setSName(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Shipping Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={sPhone}
                        onChange={(e) => setSPhone(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wide mb-1">Shipping Street Address *</label>
                      <textarea
                        required
                        rows={2}
                        value={sAddr}
                        onChange={(e) => setSAddr(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs py-2 px-4 rounded-lg cursor-pointer"
              >
                Save Addresses
              </button>
            </form>
          )}

          {/* Sub Tab: Account Details */}
          {activeTab === 'details' && (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="border-b border-neutral-50 pb-3 flex justify-between items-center">
                <h3 className="font-extrabold text-neutral-950 text-sm tracking-wide uppercase">
                  Account Particulars Config
                </h3>
                {profSuccess && (
                  <span className="text-emerald-600 text-xs font-bold animate-pulse">✓ Saved profile!</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Primary Full Name *</label>
                  <input
                    type="text"
                    required
                    value={profName}
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Primary Email Address *</label>
                  <input
                    type="email"
                    required
                    value={profEmail}
                    onChange={(e) => setProfEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
                  />
                </div>
              </div>

              <div className="border-t border-neutral-50 pt-4 space-y-3.5">
                <h4 className="font-black text-neutral-800 text-[11px] uppercase tracking-wider block">Credentials Parameters Change</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new credentials pass"
                      className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Verify new credentials pass"
                      className="w-full bg-neutral-50 border border-neutral-250 rounded-lg p-2.5 text-xs font-semibold focus:outline-hidden focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs py-2 px-4 rounded-lg cursor-pointer"
              >
                Update Profile particulars
              </button>
            </form>
          )}

        </section>

      </div>
    </div>
  );
}
