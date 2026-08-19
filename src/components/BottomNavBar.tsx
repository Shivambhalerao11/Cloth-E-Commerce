import React from 'react';
import { useShop } from '../context/ShopContext';
import { TabType } from '../types';

export const BottomNavBar: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, wishlist } = useShop();

  const navItems: { id: TabType; icon: string; label: string; badge?: number }[] = [
    { id: 'home',   icon: 'home',          label: 'Home'  },
    { id: 'shop',   icon: 'grid_view',     label: 'Shop'  },
    { id: 'saved',  icon: 'favorite',      label: 'Saved', badge: wishlist.length > 0 ? wishlist.length : undefined },
    { id: 'cart',   icon: 'shopping_cart', label: 'Bag',   badge: cartCount > 0 ? cartCount : undefined },
    { id: 'login',  icon: 'person',        label: 'Sign In' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-[#1e1b18] border-t border-[#4c4640] shadow-[0_-4px_20px_rgba(0,0,0,0.25)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 relative transition-all duration-200 ${
              isActive
                ? 'text-[#fe7e57] scale-110 -translate-y-0.5'
                : 'text-white/60 hover:text-white/90'
            }`}
            aria-label={item.label}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isActive ? 'fill-1' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="font-body-custom text-[9px] uppercase tracking-wider mt-0.5 font-bold">
              {item.label}
            </span>

            {/* Badge */}
            {typeof item.badge === 'number' && item.badge > 0 && (
              <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-[#a53c1b] text-white font-mono-custom text-[8px] font-bold flex items-center justify-center rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
