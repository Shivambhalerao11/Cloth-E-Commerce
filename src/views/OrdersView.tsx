import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';
import { Order } from '../types';

export const OrdersView: React.FC = () => {
  const { orders, setActiveTab, setCursorText, showToast } = useShop();
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Delivered'>('All');

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'Active') return o.status !== 'Delivered';
    if (activeFilter === 'Delivered') return o.status === 'Delivered';
    return true;
  });

  const handleDownloadInvoice = () => {
    showToast('Invoice Generated', `Invoice for ${selectedOrder?.id} generated.`);
  };

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-[#1d1c14] pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
            // REAL-TIME FULFILLMENT
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1d1c14]">
            Order Tracking & History
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 font-mono-custom text-xs">
          {(['All', 'Active', 'Delivered'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 border transition-colors ${
                activeFilter === filter
                  ? 'bg-[#1d1c14] text-white border-[#1d1c14]'
                  : 'bg-[#fff9ed] text-[#4c4640] border-[#cfc5bd] hover:border-[#1d1c14]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-[#cfc5bd] bg-[#f9f3e7] p-8">
          <span className="material-symbols-outlined text-5xl text-[#7e766f] mb-3">
            receipt_long
          </span>
          <h2 className="font-headline text-2xl font-bold uppercase text-[#1d1c14] mb-2">
            No Orders on File
          </h2>
          <p className="font-body-custom text-sm text-[#4c4640] mb-6">
            You haven't placed any orders yet. Browse our archive to craft your wardrobe.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="bg-[#1d1c14] text-white px-8 py-3.5 font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-[#a53c1b]"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Orders Selector List */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[#7e766f] mb-1">
              SELECT SHIPMENT ({filteredOrders.length})
            </span>

            {filteredOrders.map((order) => {
              const isSelected = order.id === selectedOrder?.id;
              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  onMouseEnter={() => setCursorText('VIEW')}
                  onMouseLeave={() => setCursorText('')}
                  className={`p-4 border-2 text-left transition-all ${
                    isSelected
                      ? 'bg-[#fff9ed] border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]'
                      : 'bg-[#f3ede1] border-[#cfc5bd] hover:border-[#1d1c14]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-headline text-lg font-bold text-[#1d1c14]">
                      {order.id}
                    </span>
                    <span
                      className={`font-mono-custom text-[10px] px-2 py-0.5 uppercase font-bold border ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800 border-green-700'
                          : order.status === 'Out for Delivery'
                          ? 'bg-amber-100 text-amber-900 border-amber-700'
                          : 'bg-[#1d1c14] text-white border-[#1d1c14]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="font-mono-custom text-xs text-[#4c4640] flex justify-between">
                    <span>{order.date}</span>
                    <span className="font-bold text-[#a53c1b]">₹{order.total.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Order Tracking Detail Card */}
          {selectedOrder && (
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Order Status & Stepper Banner */}
              <div className="bg-[#fff9ed] p-6 sm:p-8 border-2 border-[#1d1c14] shadow-[6px_6px_0px_0px_rgba(29,28,20,1)]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#1d1c14] pb-4 mb-6 gap-3">
                  <div>
                    <span className="font-mono-custom text-xs uppercase text-[#7e766f]">
                      SHIPMENT DETAIL
                    </span>
                    <h2 className="font-headline text-2xl sm:text-3xl font-bold uppercase text-[#1d1c14]">
                      {selectedOrder.id}
                    </h2>
                    <p className="font-mono-custom text-xs text-[#a53c1b] mt-0.5">
                      Tracking No: {selectedOrder.trackingNumber || 'BLUEDART-8839219'}
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadInvoice}
                    className="self-start sm:self-auto font-mono-custom text-xs uppercase px-4 py-2 border border-[#1d1c14] hover:bg-[#1d1c14] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Invoice PDF</span>
                  </button>
                </div>

                {/* Progress Timeline Stepper */}
                <div className="my-8">
                  <div className="relative flex justify-between items-start">
                    {/* Background line */}
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#cfc5bd] -z-0" />

                    {selectedOrder.timeline.map((step, idx) => {
                      const isComplete = step.completed;
                      const isActive = step.active;

                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[80px]">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono-custom text-xs font-bold border-2 transition-all ${
                              isActive
                                ? 'bg-[#a53c1b] text-white border-[#1d1c14] ring-4 ring-[#a53c1b]/20 scale-110'
                                : isComplete
                                ? 'bg-[#1d1c14] text-white border-[#1d1c14]'
                                : 'bg-[#fff9ed] text-[#7e766f] border-[#cfc5bd]'
                            }`}
                          >
                            {isComplete ? '✓' : idx + 1}
                          </div>
                          <span
                            className={`font-body-custom text-[11px] uppercase tracking-wider mt-2 font-bold leading-tight ${
                              isActive ? 'text-[#a53c1b]' : isComplete ? 'text-[#1d1c14]' : 'text-[#7e766f]'
                            }`}
                          >
                            {step.step}
                          </span>
                          <span className="font-mono-custom text-[9px] text-[#7e766f] mt-0.5">
                            {step.time || step.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Current Hub Note */}
                <div className="p-4 bg-[#f3ede1] border border-[#1d1c14] font-mono-custom text-xs text-[#4c4640] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a53c1b] animate-ping" />
                    <span>
                      CURRENT STATUS: <strong>{selectedOrder.statusDetails || 'In transit from Gandhi Chowk Studio.'}</strong>
                    </span>
                  </div>
                  <span className="text-[#7e766f] hidden sm:inline">VARANGAON HUB</span>
                </div>
              </div>

              {/* Items & Shipping Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Items in Package */}
                <div className="bg-[#fff9ed] p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
                  <h3 className="font-headline text-lg font-bold uppercase tracking-tight text-[#1d1c14] border-b border-[#1d1c14] pb-2 mb-4">
                    Items In Shipment ({selectedOrder.items.length})
                  </h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={`${item.product.id}-${item.size}-${item.color}-${idx}`} className="flex gap-3">
                        <img
                          src={upgradeImageUrl(item.product.image, 'thumb')}
                          alt={item.product.name}
                          className="w-14 h-16 object-cover bg-white border border-[#cfc5bd]"
                        />
                        <div className="flex-1">
                          <p className="font-headline text-base font-bold text-[#1d1c14] leading-tight">
                            {item.product.name}
                          </p>
                          <p className="font-mono-custom text-xs text-[#7e766f]">
                            Size: {item.size} · {item.color}
                          </p>
                          <p className="font-mono-custom text-xs font-bold text-[#a53c1b] mt-1">
                            ₹{item.product.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-[#fff9ed] p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
                  <h3 className="font-headline text-lg font-bold uppercase tracking-tight text-[#1d1c14] border-b border-[#1d1c14] pb-2 mb-4">
                    Delivery Address
                  </h3>
                  <div className="font-mono-custom text-xs text-[#4c4640] space-y-1">
                    <p className="font-bold text-[#1d1c14] text-sm">
                      {selectedOrder.address?.fullName || selectedOrder.customerName}
                    </p>
                    <p>{selectedOrder.address?.street}</p>
                    <p>
                      {selectedOrder.address?.city}{selectedOrder.address?.state ? `, ${selectedOrder.address.state}` : ''} -{' '}
                      {selectedOrder.address?.pinCode}
                    </p>
                    <p className="pt-2 text-[#7e766f]">Phone: {selectedOrder.address?.phone || selectedOrder.customerPhone}</p>
                    <p className="text-[#7e766f]">Payment: {selectedOrder.paymentMethod || 'N/A'}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#cfc5bd]">
                    <a
                      href="https://wa.me/919823044556?text=Hi%20Amar%20Mens%20Wear,%20inquiry%20regarding%20order%20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono-custom uppercase text-[#a53c1b] hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">support_agent</span>
                      <span>Need tailor or delivery support?</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};
