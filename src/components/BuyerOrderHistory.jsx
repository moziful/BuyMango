// src/components/BuyerOrderHistory.jsx
"use client";

import { useState } from "react";

// Mock database payload tracking past orders placed by this specific user session
const INITIAL_BUYER_ORDERS = [
  {
    _id: "ord_101",
    productTitle: "Premium Khirsapat (Himsagar) - Batch A",
    sellerEmail: "orchard_rajshahi@example.com",
    quantityWeight: 50,
    pricePerKg: 95,
    totalPrice: 4750,
    deliveryDetails: {
      name: "Md. Moziful Haque (Moni)",
      phone: "+8801712345678",
      address: "House 4, Road 2, Boalia, Rajshahi",
      requestedDate: "2026-06-15",
    },
    status: "pending",
    createdAt: "2026-06-10",
  },
  {
    _id: "ord_99",
    productTitle: "Authentic Langra Mangoes - Early June Harvest",
    sellerEmail: "satkhira_growers@example.com",
    quantityWeight: 20,
    pricePerKg: 85,
    totalPrice: 1700,
    deliveryDetails: {
      name: "Md. Moziful Haque (Moni)",
      phone: "+8801712345678",
      address: "House 4, Road 2, Boalia, Rajshahi",
      requestedDate: "2026-06-05",
    },
    status: "delivered",
    createdAt: "2026-06-01",
  },
];

export default function BuyerOrderHistory() {
  const [orders] = useState(INITIAL_BUYER_ORDERS);

  return (
    <div className="w-full min-h-screen bg-[#04140e] text-[#a3b899] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Portal Header */}
        <div className="border-b border-[#0d3d2c]/40 pb-6">
          <h1 className="text-3xl font-black text-[#f4f7f4] tracking-tight drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
            My Mango Orders
          </h1>
          <p className="text-xs text-[#628271] font-medium mt-1">
            Track active orchard batch logistics, verify delivery target
            metrics, and view transaction statements.
          </p>
        </div>

        {/* Orders Layout Pipeline */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#061e15]/40 border border-[#0d3d2c]/40 rounded-2xl">
              <span className="text-3xl block mb-2">🥭</span>
              <p className="text-sm text-[#537362] font-semibold">
                You haven&apos;t ordered any mango batches yet.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isPending = order.status === "pending";
              const isShipped = order.status === "shipped";
              const isDelivered = order.status === "delivered";

              return (
                <div
                  key={order._id}
                  className="bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl transition-all duration-300 hover:border-[#145c43]"
                >
                  {/* Top Summary Bar */}
                  <div className="bg-[#030f0a] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#0d3d2c]/40">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#426351] block">
                        Order ID:{" "}
                        <span className="text-brand-orange">#{order._id}</span>
                      </span>
                      <p className="text-xs text-[#628271] font-semibold">
                        Placed on {order.createdAt}
                      </p>
                    </div>

                    {/* Live Badge tracking validation states */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md border ${
                          isPending
                            ? "bg-yellow-950/40 text-yellow-500 border-yellow-900/40"
                            : isShipped
                              ? "bg-blue-950/40 text-blue-400 border-blue-900/40"
                              : "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                        }`}
                      >
                        ● {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Core Content Payload */}
                  <div className="p-6 space-y-6">
                    {/* Item Description Breakdown */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#e1ece6]">
                          {order.productTitle}
                        </h3>
                        <p className="text-xs text-[#537362] mt-0.5">
                          Seller contact string: {order.sellerEmail}
                        </p>
                      </div>

                      {/* Financial Math Display */}
                      <div className="text-left sm:text-right">
                        <span className="text-xs text-[#426351] block font-bold">
                          Total Investment
                        </span>
                        <p className="text-xl font-black text-brand-orange">
                          ৳{order.totalPrice}
                        </p>
                        <span className="text-[10px] text-[#537362] block font-semibold">
                          ({order.quantityWeight} KG × ৳{order.pricePerKg})
                        </span>
                      </div>
                    </div>

                    {/* Delivery Routing Meta Grids */}
                    <div className="pt-4 border-t border-[#0d3d2c]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
                      {/* Sub Column 1: Recipient Identity */}
                      <div className="space-y-1">
                        <span className="text-[#426351] block font-bold uppercase tracking-wide text-[10px]">
                          Recipient Destination Name:
                        </span>
                        <p className="text-[#e1ece6] font-bold">
                          {order.deliveryDetails.name}
                        </p>
                        <p className="text-[#7ea08d]">
                          {order.deliveryDetails.phone}
                        </p>
                      </div>

                      {/* Sub Column 2: Full Compiled Drop Address */}
                      <div className="space-y-1 md:col-span-1">
                        <span className="text-[#426351] block font-bold uppercase tracking-wide text-[10px]">
                          Target Delivery Address:
                        </span>
                        <p className="text-[#7ea08d] leading-relaxed">
                          {order.deliveryDetails.address}
                        </p>
                      </div>

                      {/* Sub Column 3: Calendar Window Mapping */}
                      <div className="space-y-1">
                        <span className="text-[#426351] block font-bold uppercase tracking-wide text-[10px]">
                          Wanted Delivery Window:
                        </span>
                        <p className="text-[#e1ece6] font-bold flex items-center gap-1.5">
                          <span>📅</span> {order.deliveryDetails.requestedDate}
                        </p>
                        {isPending && (
                          <span className="text-[10px] text-yellow-600 font-semibold block">
                            ⌛ Awaiting orchard tracking assignment
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contextual Buyer Escrow Safety Footer */}
                  <div className="bg-[#030f0a]/40 px-6 py-3 border-t border-[#0d3d2c]/20 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#426351]">
                      🛡️ Sourcing Escrow Protection Active
                    </span>
                    {isDelivered && (
                      <span className="text-[#0ed194]">
                        🔒 Funds released safely to grower
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
