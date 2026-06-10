// src/components/SellerOrderDashboard.jsx
"use client";

import { useState } from "react";

// Mock initial database state representing the Products joined with incoming Orders
const INITIAL_LISTINGS = [
  {
    _id: "prod_01",
    title: "Premium Himsagar Batch A",
    weightAvailable: 450,
    district: "rajshahi",
    status: "available",
    orderCount: 3, // Already ordered items logic check flag
  },
  {
    _id: "prod_02",
    title: "Amrapali Small Chunks",
    weightAvailable: 150,
    district: "satkhira",
    status: "archived",
    orderCount: 0, // safe to delete
  },
];

const INITIAL_ORDERS = [
  {
    _id: "ord_101",
    productTitle: "Premium Himsagar Batch A",
    quantityWeight: 50,
    buyerName: "Md. Moziful Haque (Moni)",
    phone: "+8801712345678",
    address: "House 4, Road 2, Boalia, RAJSHAHI",
    requestedDate: "2026-06-15",
    status: "pending",
  },
  {
    _id: "ord_102",
    productTitle: "Premium Himsagar Batch A",
    quantityWeight: 20,
    buyerName: "Anisur Rahman",
    phone: "+8801898765432",
    address: "Sector 3, Shibganj, CHAPAINAWABGANJ",
    requestedDate: "2026-06-18",
    status: "shipped",
  },
];

export default function SellerOrderDashboard() {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'inventory'

  // Status adjustment execution pipeline
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    console.log(`Updated Order ${orderId} status variables to: ${newStatus}`);
  };

  // Soft deletion handler block protecting ordered items
  const handleSoftDeleteListing = (productId, orderCount) => {
    if (orderCount > 0) {
      alert(
        "🔒 Access Denied: This listing cannot be deleted because active orders are attached to it. Please switch status to 'archived' instead.",
      );
      return;
    }

    // Set visibility mutation safely to 'deleted'
    setListings((prev) =>
      prev.map((prod) =>
        prod._id === productId ? { ...prod, status: "deleted" } : prod,
      ),
    );
    console.log(
      `Soft deleted listing record ${productId}. State flipped to 'deleted'.`,
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#04140e] text-[#a3b899] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Dashboard Title Panel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0d3d2c]/40 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#f4f7f4] tracking-tight drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
              Seller Control Center
            </h1>
            <p className="text-xs text-[#628271] font-medium mt-1">
              Fulfill incoming delivery queries and optimize structural orchard
              inventory configurations.
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex bg-[#030f0a] border border-[#0d3d2c]/60 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "orders"
                  ? "bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20"
                  : "text-[#537362] hover:text-[#a3b899]"
              }`}
            >
              Incoming Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "inventory"
                  ? "bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20"
                  : "text-[#537362] hover:text-[#a3b899]"
              }`}
            >
              My Listings (
              {listings.filter((l) => l.status !== "deleted").length})
            </button>
          </div>
        </div>

        {/* TAB 1: ORDERS FULFILLMENT STREAM */}
        {activeTab === "orders" && (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-xl p-6 backdrop-blur-md space-y-4"
              >
                {/* Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0d3d2c]/30 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#426351] block">
                      Batch Identity
                    </span>
                    <h3 className="text-base font-bold text-[#e1ece6]">
                      {order.productTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-brand-orange font-black text-sm">
                      {order.quantityWeight} KG Requested
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        order.status === "pending"
                          ? "bg-yellow-950/40 text-yellow-500 border border-yellow-900/40"
                          : order.status === "shipped"
                            ? "bg-blue-950/40 text-blue-400 border border-blue-900/40"
                            : "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40"
                      }`}
                    >
                      ● {order.status}
                    </span>
                  </div>
                </div>

                {/* Delivery Details Payload */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                  <div>
                    <span className="text-[#426351] block font-bold mb-0.5">
                      Recipient Info:
                    </span>
                    <p className="text-[#e1ece6] font-bold">
                      {order.buyerName}
                    </p>
                    <p className="text-[#7ea08d]">{order.phone}</p>
                  </div>
                  <div>
                    <span className="text-[#426351] block font-bold mb-0.5">
                      Destination Address:
                    </span>
                    <p className="text-[#7ea08d] leading-relaxed">
                      {order.address}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#426351] block font-bold mb-0.5">
                      Target Window:
                    </span>
                    <p className="text-[#e1ece6] font-bold">
                      📅 {order.requestedDate}
                    </p>
                  </div>
                </div>

                {/* Operational State Actions Dropdown Emulator */}
                <div className="flex justify-end gap-2 pt-2 border-t border-[#0d3d2c]/20">
                  <button
                    onClick={() =>
                      handleUpdateOrderStatus(order._id, "shipped")
                    }
                    className="px-3 py-1.5 bg-[#030f0a] hover:bg-[#08241a] border border-[#0d3d2c] text-xs font-bold text-slate-300 rounded-lg transition-colors"
                  >
                    Mark Shipped
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateOrderStatus(order._id, "delivered")
                    }
                    className="px-3 py-1.5 bg-[#08241a] border border-[#0ed194]/20 hover:bg-brand-orange hover:text-[#04140e] hover:border-transparent text-xs font-bold text-[#0ed194] rounded-lg transition-all"
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: INVENTORY LISTINGS CONTROL & DELETION BLOCK */}
        {activeTab === "inventory" && (
          <div className="bg-[#061e15]/40 border border-[#0d3d2c]/40 rounded-xl overflow-hidden shadow-xl">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-[#030f0a] border-b border-[#0d3d2c]/60 text-[#7ea08d] uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-4">Mango Batch</th>
                  <th className="p-4">Dispatch Point</th>
                  <th className="p-4">Stock Weight</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0d3d2c]/20 text-[#e1ece6] font-medium">
                {listings
                  .filter((item) => item.status !== "deleted") // Soft-delete runtime filter check
                  .map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#061e15]/60 transition-colors"
                    >
                      <td className="p-4 font-bold text-white">{item.title}</td>
                      <td className="p-4 capitalize">📍 {item.district}</td>
                      <td className="p-4">{item.weightAvailable} KG</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === "available"
                              ? "bg-emerald-950/40 text-[#0ed194]"
                              : "bg-zinc-900 text-zinc-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        {/* Dynamic Button Color/State changes if block constraints apply */}
                        <button
                          onClick={() =>
                            handleSoftDeleteListing(item._id, item.orderCount)
                          }
                          className={`h-8 px-3 rounded-md font-bold text-[11px] transition-all flex items-center gap-1 ${
                            item.orderCount > 0
                              ? "bg-zinc-900/60 text-zinc-600 border border-zinc-800/40 cursor-not-allowed"
                              : "bg-red-950/20 hover:bg-red-950/50 text-red-400 border border-red-900/30"
                          }`}
                        >
                          {item.orderCount > 0 ? "🔒 Locked" : "🗑️ Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
