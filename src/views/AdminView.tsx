import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';
import { Product } from '../types';

export const AdminView: React.FC = () => {
  const { inventory, restockItem, orders, addProduct, showToast, setCursorText } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    subtitle: '',
    category: 'Shirts',
    price: 1999,
    originalPrice: 2499,
    stock: 25,
    description: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZBeXz3M2JaOtBZzgwSSkNJPxUYMKE6FXcOXRVNnBbt6zvw-RXtghEWGYlRJCgqaUIpYUeR1CDueIiggNXZwFH86QZ6kp9EvYw406u-6MQWAfnIHays564P8R7GJ1YVKY3NqcsTP8vc6dvUNXD_1yZqEQx-nNTbd39TV04Ki3PPspA7jzbWnkG50pu4H2vcs00XsXBOV6LngJ9XvflJu2-yeGyE9ic57qkZ7yjg9QsESDCvmbJBIm8'
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 128500;
  const lowStockCount = inventory.filter((item) => item.stock <= item.lowStockThreshold).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    addProduct({
      name: newProduct.name,
      subtitle: newProduct.subtitle || 'Utilitarian Cut',
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice),
      stock: Number(newProduct.stock),
      description: newProduct.description || 'Heavyweight tailoring piece crafted in Varangaon.',
      image: newProduct.image,
      badge: 'NEW',
      specs: ['100% Cotton', 'Boxy utilitarian fit', 'Varangaon Studio'],
      availableSizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Bone', hex: '#e8e2d6' }]
    });

    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      subtitle: '',
      category: 'Shirts',
      price: 1999,
      originalPrice: 2499,
      stock: 25,
      description: '',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZBeXz3M2JaOtBZzgwSSkNJPxUYMKE6FXcOXRVNnBbt6zvw-RXtghEWGYlRJCgqaUIpYUeR1CDueIiggNXZwFH86QZ6kp9EvYw406u-6MQWAfnIHays564P8R7GJ1YVKY3NqcsTP8vc6dvUNXD_1yZqEQx-nNTbd39TV04Ki3PPspA7jzbWnkG50pu4H2vcs00XsXBOV6LngJ9XvflJu2-yeGyE9ic57qkZ7yjg9QsESDCvmbJBIm8'
    });
  };

  const handleExportCSV = () => {
    const rows = [
      ['Order ID', 'Date', 'Customer', 'Total', 'Status'],
      ...orders.map((o) => [
        o.id,
        o.date,
        o.address?.fullName || o.customerName,
        String(o.total),
        o.status,
      ]),
    ];
    const csvContent = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AMW_Orders_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Export Complete', 'Orders report downloaded.');
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-[#1d1c14] pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
            // ATELIER BACKOFFICE & INVENTORY
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1d1c14]">
            Studio Management
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="font-mono-custom text-xs uppercase px-4 py-2.5 border border-[#1d1c14] hover:bg-[#e8e2d6] transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">file_download</span>
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            onMouseEnter={() => setCursorText('NEW ITEM')}
            onMouseLeave={() => setCursorText('')}
            className="bg-[#1d1c14] text-white font-body-custom text-xs uppercase tracking-widest px-5 py-2.5 font-bold hover:bg-[#a53c1b] transition-colors flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(29,28,20,1)]"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add Garment</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <div className="bg-[#fff9ed] p-5 sm:p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#7e766f]">
            TOTAL REVENUE
          </span>
          <div className="font-headline text-2xl sm:text-3xl font-bold text-[#1d1c14] mt-2">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <span className="font-mono-custom text-[10px] text-green-700 font-bold block mt-1">
            +18.4% VS LAST MONTH
          </span>
        </div>

        <div className="bg-[#fff9ed] p-5 sm:p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#7e766f]">
            ACTIVE FULFILLMENTS
          </span>
          <div className="font-headline text-2xl sm:text-3xl font-bold text-[#1d1c14] mt-2">
            {orders.length} Orders
          </div>
          <span className="font-mono-custom text-[10px] text-[#a53c1b] font-bold block mt-1">
            VARANGAON STUDIO
          </span>
        </div>

        <div className="bg-[#fff9ed] p-5 sm:p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#7e766f]">
            INVENTORY HEALTH
          </span>
          <div className="font-headline text-2xl sm:text-3xl font-bold text-[#1d1c14] mt-2">
            {inventory.length} SKUs
          </div>
          <span
            className={`font-mono-custom text-[10px] font-bold block mt-1 ${
              lowStockCount > 0 ? 'text-[#ba1a1a]' : 'text-green-700'
            }`}
          >
            {lowStockCount} LOW STOCK ALERTS
          </span>
        </div>

        <div className="bg-[#fff9ed] p-5 sm:p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#7e766f]">
            FLAGSHIP FOOTFALL
          </span>
          <div className="font-headline text-2xl sm:text-3xl font-bold text-[#1d1c14] mt-2">
            48 / Day
          </div>
          <span className="font-mono-custom text-[10px] text-[#4c4640] font-bold block mt-1">
            GANDHI CHOWK IN-STORE
          </span>
        </div>
      </div>

      {/* Inventory Management Table */}
      <div className="bg-[#fff9ed] border-2 border-[#1d1c14] shadow-[6px_6px_0px_0px_rgba(29,28,20,1)] mb-10 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#1d1c14] flex justify-between items-center bg-[#f3ede1]">
          <div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold uppercase text-[#1d1c14]">
              Inventory Stock & Restocking
            </h3>
            <p className="font-mono-custom text-xs text-[#7e766f] mt-0.5">
              Instant one-click restock for Gandhi Chowk workshop
            </p>
          </div>
          <span className="font-mono-custom text-xs font-bold text-[#a53c1b]">
            LIVE SYNC
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-custom text-xs">
            <thead>
              <tr className="bg-[#1d1c14] text-white uppercase border-b border-[#1d1c14]">
                <th className="p-3.5">Garment</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Current Units</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cfc5bd] bg-[#fff9ed]">
              {inventory.map((item) => {
                const isLow = item.stock <= item.lowStockThreshold;
                return (
                  <tr key={item.id} className="hover:bg-[#f3ede1] transition-colors">
                    <td className="p-3.5 font-bold text-[#1d1c14] flex items-center gap-2">
                      <img
                        src={upgradeImageUrl(item.image, 'thumb')}
                        alt={item.name}
                        className="w-8 h-8 object-cover border border-[#cfc5bd]"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-3.5 text-[#7e766f]">{item.sku}</td>
                    <td className="p-3.5 text-[#4c4640]">{item.category}</td>
                    <td className="p-3.5 font-bold text-[#1d1c14]">₹{item.price.toLocaleString()}</td>
                    <td className="p-3.5 font-bold text-sm text-[#1d1c14]">{item.stock}</td>
                    <td className="p-3.5">
                      {isLow ? (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-400 uppercase font-bold text-[10px]">
                          Low Stock ({item.stock})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 border border-green-400 uppercase font-bold text-[10px]">
                          Adequate
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => restockItem(item.id, 15)}
                        className="bg-[#1d1c14] text-white px-3 py-1 text-[11px] uppercase font-bold hover:bg-[#a53c1b] transition-colors"
                      >
                        +15 Units
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Garment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-[#1d1c14]/75 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xl bg-[#fff9ed] border-2 border-[#1d1c14] shadow-[8px_8px_0px_0px_rgba(29,28,20,1)] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#1d1c14] pb-4 mb-6">
              <h3 className="font-headline text-2xl font-bold uppercase text-[#1d1c14]">
                Add Garment to Archive
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 hover:text-[#a53c1b]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 font-mono-custom text-xs">
              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Garment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Utility Cargo Pant"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#7e766f] uppercase mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14]"
                  >
                    <option value="Shirts">Shirts</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Denim">Denim</option>
                    <option value="Knitwear">Knitwear</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#7e766f] uppercase mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Subtitle / Cut Spec</label>
                <input
                  type="text"
                  placeholder="e.g. Heavy Cotton · Boxy Fit"
                  value={newProduct.subtitle}
                  onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14]"
                />
              </div>

              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Initial Stock Units</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14]"
                />
              </div>

              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Garment Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14]"
                />
              </div>

              <div className="pt-4 flex gap-3 border-t border-[#cfc5bd]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 border border-[#1d1c14] uppercase font-bold hover:bg-[#e8e2d6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1d1c14] text-white uppercase font-bold hover:bg-[#a53c1b]"
                >
                  Publish Garment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
