export type TabType = 'landing' | 'home' | 'shop' | 'cart' | 'checkout' | 'orders' | 'admin' | 'about' | 'saved' | 'product-detail' | 'login';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Shirts' | 'Jackets' | 'Denim' | 'Knitwear' | 'T-Shirts' | 'Accessories';
  price: number;
  originalPrice?: number;
  badge?: 'NEW' | 'LIMITED' | 'RESTOCKED' | 'POPULAR';
  image: string;
  detailImages?: string[];
  description: string;
  specs: string[];
  availableSizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  stock: number;
  sku: string;
  featured?: boolean;
  isHero?: boolean;
}

export interface CartItem {
  id: string; // cart item unique ID (productId + size + color)
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  quantity: number;
}

export interface OrderItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string; // e.g. #AMW-9901
  customerName: string;
  customerPhone?: string;
  address: {
    fullName: string;
    street: string;
    landmark?: string;
    city: string;
    state?: string;
    pinCode: string;
    phone?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod?: string;
  trackingNumber?: string;
  status: OrderStatus;
  statusDetails?: string;
  date: string;
  time: string;
  timeline: {
    step: OrderStatus;
    date: string;
    time?: string;
    completed: boolean;
    active?: boolean;
    note?: string;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  lowStockThreshold: number;
  price: number;
  image: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}
