import React from 'react';
import { Home, User, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const { currentScreen, navigate, cart } = useShop();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 md:hidden flex justify-around items-center py-2 px-4 shadow-xl select-none font-sans">
      {/* Home Button */}
      <button
        onClick={() => navigate('home')}
        className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
          currentScreen === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-500 font-medium'
        }`}
      >
        <Home className="h-4.5 w-4.5" />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* Account Button */}
      <button
        onClick={() => navigate('account')}
        className={`flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
          currentScreen === 'account' ? 'text-neutral-950 font-bold' : 'text-neutral-500 font-medium'
        }`}
      >
        <User className="h-4.5 w-4.5" />
        <span className="text-[10px] tracking-tight">Account</span>
      </button>

      {/* Cart Button */}
      <button
        onClick={() => navigate('cart')}
        className={`relative flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
          currentScreen === 'cart' ? 'text-neutral-950 font-bold' : 'text-neutral-500 font-medium'
        }`}
      >
        <ShoppingBag className="h-4.5 w-4.5" />
        <span className="text-[10px] tracking-tight">Cart</span>
        
        {/* Live Count Badge */}
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-red-600 text-white font-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center shadow-xs border border-white">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
