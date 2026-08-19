import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
  useNavigate, useParams, useLocation, Navigate
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShopProvider, useShop, navigateRef } from './context/ShopContext';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer } from './components/Toast';

// Views
import { LandingView }       from './views/LandingView';
import { LoginView }         from './views/LoginView';
import { HomeView }          from './views/HomeView';
import { ShopView }          from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView }          from './views/CartView';
import { CheckoutView }      from './views/CheckoutView';
import { OrdersView }        from './views/OrdersView';
import { AdminView }         from './views/AdminView';
import { AboutView }         from './views/AboutView';
import { SavedView }         from './views/SavedView';
import { TabType }           from './types';

// ── NavigationBridge ─────────────────────────────────────────────────────────
// Registers the router navigate function into navigateRef so ShopContext
// can call it directly. Also syncs activeTab when the URL changes
// (browser back/forward).
const NavigationBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveTabOnly, setSelectedProduct, products } = useShop();

  // Always keep navigateRef current
  navigateRef.current = navigate;

  // Sync tab state when URL changes (back/forward navigation)
  useEffect(() => {
    const p = location.pathname;
    let tab: TabType = 'landing';
    if      (p === '/')          tab = 'landing';
    else if (p === '/login')     tab = 'login';
    else if (p === '/home')      tab = 'home';
    else if (p === '/shop')      tab = 'shop';
    else if (p.startsWith('/product')) {
      tab = 'product-detail';
      const id = p.replace('/product/', '');
      const prod = products.find(x => x.id === id);
      if (prod) setSelectedProduct(prod);
    }
    else if (p === '/cart')      tab = 'cart';
    else if (p === '/checkout')  tab = 'checkout';
    else if (p === '/orders')    tab = 'orders';
    else if (p === '/admin')     tab = 'admin';
    else if (p === '/about')     tab = 'about';
    else if (p === '/saved')     tab = 'saved';

    setActiveTabOnly(tab);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};

// ── ProductDetailRoute ────────────────────────────────────────────────────────
const ProductDetailRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, setSelectedProduct } = useShop();
  useEffect(() => {
    if (id) {
      const p = products.find(x => x.id === id);
      if (p) setSelectedProduct(p);
    }
  }, [id, products, setSelectedProduct]);
  return <ProductDetailView />;
};

// ── AppShell ─────────────────────────────────────────────────────────────────
const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-[#fff9ed] text-[#1d1c14] selection:bg-[#a53c1b] selection:text-white font-body-custom antialiased">
      <CustomCursor />
      <TopAppBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <SearchModal />
      <SizeGuideModal />
      <ToastContainer />
      <Footer />
      <BottomNavBar />
    </div>
  );
};

// ── LandingShell ─────────────────────────────────────────────────────────────
const LandingShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div className="min-h-screen font-body-custom antialiased">
      <CustomCursor />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

// ── LoginNav ─────────────────────────────────────────────────────────────────
const LoginNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-[#fff9ed] border-b border-[#cfc5bd] px-6 md:px-16 py-4 flex items-center justify-between">
      <button onClick={() => navigate('/')}
        className="font-headline text-xl font-bold tracking-[0.08em] text-[#1d1c14] uppercase hover:opacity-75 transition-opacity">
        AMAR MEN'S WEAR
      </button>
      <span className="font-mono-custom text-[10px] uppercase tracking-widest text-[#7e766f] hidden sm:block">
        GANDHI CHOWK · VARANGAON
      </span>
      <button onClick={() => navigate('/shop')}
        className="font-mono-custom text-xs uppercase tracking-wider text-[#a53c1b] hover:underline">
        Browse without login →
      </button>
    </div>
  );
};

// ── All Routes ────────────────────────────────────────────────────────────────
const AllRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      {/* Pre-auth — no TopAppBar/Footer */}
      <Route path="/"      element={<LandingShell><LandingView /></LandingShell>} />
      <Route path="/login" element={<LandingShell><LoginNav /><LoginView /></LandingShell>} />

      {/* App pages — full layout */}
      <Route path="/home"        element={<AppShell><HomeView /></AppShell>} />
      <Route path="/shop"        element={<AppShell><ShopView /></AppShell>} />
      <Route path="/product/:id" element={<AppShell><ProductDetailRoute /></AppShell>} />
      <Route path="/cart"        element={<AppShell><CartView /></AppShell>} />
      <Route path="/checkout"    element={<AppShell><CheckoutView /></AppShell>} />
      <Route path="/orders"      element={<AppShell><OrdersView /></AppShell>} />
      <Route path="/admin"       element={<AppShell><AdminView /></AppShell>} />
      <Route path="/about"       element={<AppShell><AboutView /></AppShell>} />
      <Route path="/saved"       element={<AppShell><SavedView /></AppShell>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// ── App Root ──────────────────────────────────────────────────────────────────
export function App() {
  const [loading, setLoading] = useState(true);
  return (
    <BrowserRouter>
      <ShopProvider>
        <NavigationBridge>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} duration={1200} />}
          <AllRoutes />
        </NavigationBridge>
      </ShopProvider>
    </BrowserRouter>
  );
}

export default App;
