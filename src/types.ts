export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string; // 'Skin Care' | 'Hair' | 'Body'
  subCategory: string; // e.g. 'Serum', 'Cleanser', 'Sunscreen'
  price: number;
  salePrice?: number;
  image: string; // primary image
  images: string[]; // gallery images (including primary)
  stockStatus: 'In Stock' | 'Out of Stock' | 'SOLD';
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
  shortDescription: string;
  description: string;
  howToUse: string;
  ingredients: string;
  tags: string[]; // e.g., ['hydrating', 'dry skin', 'sensitive skin']
  isNewArrival?: boolean;
  isSale?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  items: OrderItem[];
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Completed';
  paymentMethod: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  division: string;
  district: string;
  area: string;
  address: string;
  orderNotes?: string;
  trackingId: string;
}

export interface AddressBook {
  billingName: string;
  billingPhone: string;
  billingAddress: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
}
