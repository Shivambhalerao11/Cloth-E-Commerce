import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, CartItem, Order, InventoryItem, TabType, ToastMessage } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_INVENTORY } from '../data/products';

// ---------------------------------------------------------------------------
// A module-level ref that holds the router navigate function.
// NavigationBridge in App.tsx writes to this; setActiveTab reads it.
// This avoids monkey-patching and works reliably across renders.
// ---------------------------------------------------------------------------
export const navigateRef: React.MutableRefObject<((path: string) => void) | null> = {
  current: null,
};

const TAB_PATH_MAP: Record<TabType, string> = {
  landing:          '/',
  login:            '/login',
  home:             '/home',
  shop:             '/shop',
  'product-detail': '/product',
  cart:             '/cart',
  checkout:         '/checkout',
  orders:           '/orders',
  admin:            '/admin',
  about:            '/about',
  saved:            '/saved',
};

interface ShopContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  setActiveTabOnly: (tab: TabType) => void;
  products: Product[];
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  openProductDetail: (product: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', color: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'time' | 'status' | 'timeline'>) => Order;
  inventory: InventoryItem[];
  restockItem: (id: string, amount?: number) => void;
  addProduct: (product: Partial<Product>) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
  cursorVariant: 'default' | 'hover' | 'button' | 'image' | 'drag';
  setCursorVariant: (variant: 'default' | 'hover' | 'button' | 'image' | 'drag') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<TabType>('landing');

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amw_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch { return INITIAL_PRODUCTS; }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amw_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: `${INITIAL_PRODUCTS[0].id}-L-Bone`,           product: INITIAL_PRODUCTS[0], size: 'L', color: 'Bone',      quantity: 1 },
      { id: `${INITIAL_PRODUCTS[5].id}-M-Raw Indigo`,      product: INITIAL_PRODUCTS[5], size: 'M', color: 'Raw Indigo', quantity: 1 },
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amw_wishlist');
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[2].id];
    } catch { return [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[2].id]; }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amw_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch { return INITIAL_ORDERS; }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('amw_inventory');
      return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    } catch { return INITIAL_INVENTORY; }
  });

  const [isSearchOpen,    setIsSearchOpen]    = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [toasts,          setToasts]          = useState<ToastMessage[]>([]);
  const [cursorText,      setCursorText]       = useState('');
  const [cursorVariant,   setCursorVariant]    = useState<'default'|'hover'|'button'|'image'|'drag'>('default');

  // Persistence
  useEffect(() => { localStorage.setItem('amw_cart',      JSON.stringify(cart));      }, [cart]);
  useEffect(() => { localStorage.setItem('amw_wishlist',  JSON.stringify(wishlist));  }, [wishlist]);
  useEffect(() => { localStorage.setItem('amw_orders',    JSON.stringify(orders));    }, [orders]);
  useEffect(() => { localStorage.setItem('amw_inventory', JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { localStorage.setItem('amw_products',  JSON.stringify(products));  }, [products]);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const removeToast = (id: string) =>
    setToasts(prev => prev.filter(t => t.id !== id));

  const showToast = (title: string, message: string, type: 'success'|'info'|'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => removeToast(id), 3800);
  };

  // ── Navigation ─────────────────────────────────────────────────────────────
  // setActiveTabOnly: only updates React state (used by NavigationBridge on URL change)
  const setActiveTabOnly = (tab: TabType) => {
    setActiveTabState(tab);
  };

  // setActiveTab: updates state AND navigates the browser URL
  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const path = TAB_PATH_MAP[tab];
    if (path && navigateRef.current) {
      navigateRef.current(path);
    }
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveTabState('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigateRef.current) {
      navigateRef.current(`/product/${product.id}`);
    }
  };

  // ── Cart ───────────────────────────────────────────────────────────────────
  const addToCart = (product: Product, size: 'S'|'M'|'L'|'XL'|'XXL', color: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartItemId, product, size, color, quantity }];
    });
    showToast('Added to Bag', `${product.name} (${size}, ${color}) added.`);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== itemId) return item;
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }).filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Removed', 'Item removed from bag.', 'info');
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // ── Wishlist ───────────────────────────────────────────────────────────────
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      showToast(
        exists ? 'Removed from Saved' : 'Saved to Wishlist',
        exists ? 'Item removed from saved list.' : 'Item saved for later.'
      );
      return exists ? prev.filter(id => id !== productId) : [...prev, productId];
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // ── Orders ─────────────────────────────────────────────────────────────────
  const createOrder = (orderData: Omit<Order, 'id'|'date'|'time'|'status'|'timeline'>): Order => {
    const newId = `#AMW-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      ...orderData, id: newId, date: dateStr, time: timeStr,
      status: 'Placed',
      statusDetails: 'Order received at Varangaon Studio.',
      timeline: [
        { step: 'Placed',          date: dateStr, time: timeStr, completed: true,  active: true,  note: 'Order received.' },
        { step: 'Packed',          date: 'Upcoming',             completed: false },
        { step: 'Shipped',         date: 'Upcoming',             completed: false },
        { step: 'Out for Delivery',date: 'Upcoming',             completed: false },
        { step: 'Delivered',       date: 'Upcoming',             completed: false },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('Order Confirmed', `Order ${newId} placed successfully!`);
    return newOrder;
  };

  // ── Inventory ──────────────────────────────────────────────────────────────
  const restockItem = (id: string, amount = 15) => {
    setInventory(prev =>
      prev.map(item => item.id === id ? { ...item, stock: item.stock + amount } : item)
    );
    showToast('Stock Updated', `Restocked item by +${amount} units.`);
  };

  const addProduct = (newProd: Partial<Product>) => {
    const id = (newProd.name || 'custom-item').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created: Product = {
      id,
      name:          newProd.name        || 'New Garment',
      subtitle:      newProd.subtitle    || 'Utilitarian Streetwear',
      category:      newProd.category    || 'Shirts',
      price:         newProd.price       || 1999,
      originalPrice: newProd.originalPrice,
      badge:         'NEW',
      image:         newProd.image       || INITIAL_PRODUCTS[0].image,
      description:   newProd.description || 'Modern minimalist garment crafted from premium heavy cotton.',
      specs:         newProd.specs       || ['100% Organic Cotton', 'Tailored at Gandhi Chowk, Varangaon'],
      availableSizes:newProd.availableSizes || ['S', 'M', 'L', 'XL'],
      colors:        newProd.colors      || [{ name: 'Bone', hex: '#e8e2d6' }],
      stock:         newProd.stock       || 20,
      sku:           newProd.sku         || `SKU-${Math.floor(100 + Math.random() * 900)}`,
    };

    setProducts(prev => [created, ...prev]);
    setInventory(prev => [{
      id: `inv-${Date.now()}`, name: created.name, sku: created.sku,
      category: created.category, stock: created.stock, lowStockThreshold: 5,
      price: created.price, image: created.image,
    }, ...prev]);

    showToast('Product Added', `${created.name} added to live catalog.`);
  };

  return (
    <ShopContext.Provider value={{
      activeTab, setActiveTab, setActiveTabOnly,
      products, selectedProduct, setSelectedProduct, openProductDetail,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart,
      cartTotal, cartCount,
      wishlist, toggleWishlist, isWishlisted,
      orders, createOrder,
      inventory, restockItem, addProduct,
      isSearchOpen, setIsSearchOpen,
      isSizeGuideOpen, setIsSizeGuideOpen,
      toasts, showToast, removeToast,
      cursorText, setCursorText,
      cursorVariant, setCursorVariant,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
