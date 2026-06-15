import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, UserProfile, AddressBook, Review } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  profile: UserProfile | null;
  addresses: AddressBook;
  currentScreen: string;
  selectedProductId: string | null;
  quickViewProduct: Product | null;
  searchQuery: string;
  searchResult: Product[];
  shopFilters: {
    brand: string | null;
    subCategory: string | null;
    priceRange: [number, number] | null;
    sortBy: string;
  };
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingId'>) => Order;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateAddresses: (addresses: AddressBook) => void;
  updateProfile: (profile: UserProfile) => void;
  navigate: (screen: string, productId?: string | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setShopFilters: React.Dispatch<React.SetStateAction<{
    brand: string | null;
    subCategory: string | null;
    priceRange: [number, number] | null;
    sortBy: string;
  }>>;
  resetFilters: () => void;
  addReview: (productId: string, review: Review) => void;
  isLoggedIn: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial addresses
const defaultAddresses: AddressBook = {
  billingName: 'Samir Azmain',
  billingPhone: '01712345678',
  billingAddress: 'House 45, Road 12, Dhanmondi R/A',
  shippingName: 'Samir Azmain',
  shippingPhone: '01712345678',
  shippingAddress: 'House 45, Road 12, Dhanmondi R/A'
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('sbd_products');
    return local ? JSON.parse(local) : PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('sbd_cart');
    return local ? JSON.parse(local) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const local = localStorage.getItem('sbd_wishlist');
    return local ? JSON.parse(local) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('sbd_orders');
    return local ? JSON.parse(local) : [
      {
        id: 'ORD-9841',
        date: '2026-06-10T14:30:00Z',
        total: 3100,
        subtotal: 3000,
        deliveryCharge: 100,
        items: [
          {
            productId: 'boj-sun-rice',
            name: 'Relief Sun : Rice + Probiotics SPF50+',
            brand: 'Beauty of Joseon',
            price: 1450,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=600&auto=format&fit=crop&q=80'
          }
        ],
        status: 'Delivered',
        paymentMethod: 'bKash',
        fullName: 'Samir Azmain',
        phoneNumber: '01712345678',
        division: 'Dhaka',
        district: 'Dhaka',
        area: 'Dhanmondi',
        address: 'House 45, Road 12, Dhanmondi R/A',
        trackingId: 'TRK-BOJ-98412'
      }
    ];
  });

  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const local = localStorage.getItem('sbd_profile');
    if (local) return JSON.parse(local);
    // Bootstrapped user from system context MD
    return {
      name: 'Samir Azmain',
      email: 'samirazmain8@gmail.com',
      phone: '01712345678'
    };
  });

  const [addresses, setAddresses] = useState<AddressBook>(() => {
    const local = localStorage.getItem('sbd_addresses');
    return local ? JSON.parse(local) : defaultAddresses;
  });

  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const [shopFilters, setShopFilters] = useState<{
    brand: string | null;
    subCategory: string | null;
    priceRange: [number, number] | null;
    sortBy: string;
  }>({
    brand: null,
    subCategory: null,
    priceRange: null,
    sortBy: 'default'
  });

  // Save changes to localStorage helper
  useEffect(() => {
    localStorage.setItem('sbd_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sbd_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sbd_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('sbd_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('sbd_profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('sbd_profile');
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sbd_addresses', JSON.stringify(addresses));
  }, [addresses]);

  // LIVE SEARCH handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResult([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q))
    );
    setSearchResult(filtered);
  }, [searchQuery, products]);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stockStatus === 'SOLD') return;
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingId'>) => {
    const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingId = `TRK-${orderData.items[0]?.brand.replace(/\s+/g, '').toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      date: new Date().toISOString(),
      status: 'Processing',
      trackingId
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const login = (email: string, name: string) => {
    setProfile({
      name,
      email,
      phone: '01712345678'
    });
  };

  const logout = () => {
    setProfile(null);
    setCurrentScreen('home');
  };

  const updateAddresses = (newAddresses: AddressBook) => {
    setAddresses(newAddresses);
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const navigate = (screen: string, productId: string | null = null) => {
    setCurrentScreen(screen);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  const resetFilters = () => {
    setShopFilters({
      brand: null,
      subCategory: null,
      priceRange: null,
      sortBy: 'default'
    });
  };

  const addReview = (productId: string, review: Review) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedReviews = [review, ...(p.reviews || [])];
          const averageRating = parseFloat(
            (
              (updatedReviews.reduce((sum, r) => sum + r.rating, 0)) /
              updatedReviews.length
            ).toFixed(2)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: averageRating
          };
        }
        return p;
      })
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        profile,
        addresses,
        currentScreen,
        selectedProductId,
        quickViewProduct,
        searchQuery,
        searchResult,
        shopFilters,
        setProducts,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        login,
        logout,
        updateAddresses,
        updateProfile,
        navigate,
        setQuickViewProduct,
        setSearchQuery,
        setShopFilters,
        resetFilters,
        addReview,
        isLoggedIn: !!profile
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
