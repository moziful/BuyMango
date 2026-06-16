"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MdStorefront,
  MdShoppingBasket,
  MdAddCircleOutline,
  MdLocalShipping,
  MdTrendingUp,
  MdLayers,
  MdDeleteOutline,
  MdEdit,
  MdCheckCircle,
} from "react-icons/md";
import { getSellerProductsAction, getBuyerOrdersAction } from "@/app/dashboard/actions";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const userRole = session?.user?.role || "buyer";
  const userName = session?.user?.name || "Marketplace Partner";

  // State arrays for database integration
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loadingSellerProducts, setLoadingSellerProducts] = useState(true);

  const [buyerOrders, setBuyerOrders] = useState([]);
  const [loadingBuyerOrders, setLoadingBuyerOrders] = useState(true);

  const activeDeliveriesCount = buyerOrders.filter(
    (o) => o.status === "pending" || o.status === "shipped"
  ).length;
  const netSupplyProcured = buyerOrders.reduce(
    (sum, o) => sum + (o.quantityWeight || 0),
    0
  );

  // Security Firewall Redirect check
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Unauthorized access. Please authorize account.");
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  // Load seller products from database if role is seller
  useEffect(() => {
    if (session?.user && userRole === "seller") {
      setLoadingSellerProducts(true);
      getSellerProductsAction()
        .then((res) => {
          if (res.success) {
            setSellerProducts(res.data);
          } else {
            toast.error(`Failed to load inventory: ${res.error}`);
          }
        })
        .catch((err) => {
          toast.error(`Error loading inventory: ${err.message}`);
        })
        .finally(() => {
          setLoadingSellerProducts(false);
        });
    }
  }, [session, userRole]);

  // Load buyer orders from database if role is buyer
  useEffect(() => {
    if (session?.user && userRole === "buyer") {
      setLoadingBuyerOrders(true);
      getBuyerOrdersAction()
        .then((res) => {
          if (res.success) {
            setBuyerOrders(res.data);
          } else {
            toast.error(`Failed to load orders: ${res.error}`);
          }
        })
        .catch((err) => {
          toast.error(`Error loading orders: ${err.message}`);
        })
        .finally(() => {
          setLoadingBuyerOrders(false);
        });
    }
  }, [session, userRole]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#04140e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff8c00]" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#04140e] text-[#e1ece6] px-4 py-8 sm:px-6 lg:px-8 mt-14">
      <ScrollReveal className="max-w-7xl mx-auto w-full space-y-8">
        {/* ==================== 💎 HEADER HERO SECTION ==================== */}
        <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-3xl p-6 md:p-8 backdrop-blur-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl shadow-black/40">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-[#ff8c00] bg-clip-text text-transparent">
                  {userName}
                </span>
              </h1>
            </div>
            <p className="text-sm text-[#7ea08d] mt-1 font-semibold">
              Ecosystem profile authorized as an active{" "}
              <span
                className={`font-bold capitalize ${userRole === "seller" ? "text-brand-orange" : "text-[#0ed194]"}`}
              >
                {userRole === "seller"
                  ? "👨‍🌾 Orchard Seller"
                  : userRole === "admin"
                    ? "👑 Admin Portal"
                    : "🛒 Direct Buyer"}
              </span>
            </p>
          </div>

          {userRole === "seller" && (
            <Link
              href="/dashboard/add-mango"
              className="inline-flex items-center gap-2 bg-[#ff8c00] hover:bg-[#ffaa33] text-[#04140e] text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-black/40 transform hover:-translate-y-0.5 transition duration-200"
            >
              <MdAddCircleOutline className="text-lg" />
              <span>Create New Listing</span>
            </Link>
          )}
        </div>

        {/* ==================== 👨‍🌾 CONDITIONAL VIEW A: SELLER DASHBOARD ==================== */}
        {userRole === "seller" && (
          <div className="space-y-8">
            {/* 📊 High Contrast Analytical Performance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 p-6 rounded-2xl flex items-center gap-4 shadow-xl transition-all duration-300 hover:border-[#145c43]">
                <div className="p-3.5 rounded-xl bg-[#08241a]/60 border border-[#0ed194]/20 text-[#0ed194] text-2xl">
                  <MdStorefront />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                    Active Listings
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {sellerProducts.length} Varieties
                  </p>
                </div>
              </div>

              <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 p-6 rounded-2xl flex items-center gap-4 shadow-xl transition-all duration-300 hover:border-[#145c43]">
                <div className="p-3.5 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[#ff8c00] text-2xl">
                  <MdTrendingUp />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                    Gross Trade Revenue
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    ৳45,200 BDT
                  </p>
                </div>
              </div>

              <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 p-6 rounded-2xl flex items-center gap-4 col-span-1 sm:col-span-2 lg:col-span-1 shadow-xl transition-all duration-300 hover:border-[#145c43]">
                <div className="p-3.5 rounded-xl bg-[#08241a]/60 border border-[#0ed194]/20 text-[#0ed194] text-2xl">
                  <MdLayers />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                    Total Stock Loaded
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    650 KG Available
                  </p>
                </div>
              </div>
            </div>

            {/* 📋 Inventory Catalog Table */}
            <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 py-5 border-b border-[#0d3d2c]/40 bg-[#030f0a] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#e1ece6] tracking-wide">
                  Orchard Catalog Directory
                </h3>
                <span className="text-xs bg-[#04140e] px-3 py-1 rounded-full border border-[#0d3d2c]/60 text-[#a3b899] font-mono font-bold">
                  Data status: Live
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#030f0a]/50 border-b border-[#0d3d2c]/40 text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                      <th className="px-6 py-4">Variety Details</th>
                      <th className="px-6 py-4">Price / KG</th>
                      <th className="px-6 py-4">Remaining Supply</th>
                      <th className="px-6 py-4">Status Flag</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0d3d2c]/30 text-sm text-[#a3b899]">
                    {loadingSellerProducts ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#7ea08d] font-semibold font-sans">
                          <span className="inline-block animate-pulse">Loading orchard listings...</span>
                        </td>
                      </tr>
                    ) : sellerProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#7ea08d] font-semibold font-sans">
                          No listings registered. Click the button above to post your first mango batch.
                        </td>
                      </tr>
                    ) : (
                      sellerProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-[#08241a]/20 transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-[#e1ece6]">
                            {product.title || product.name}
                          </td>
                          <td className="px-6 py-4 font-mono text-[#e1ece6]">
                            ৳{product.pricePerKg} BDT
                          </td>
                          <td className="px-6 py-4">
                            {product.weightAvailable > 0 ? (
                              <span className="font-mono font-medium text-[#e1ece6]">
                                {product.weightAvailable} KG
                              </span>
                            ) : (
                              <span className="text-red-400 text-xs font-bold uppercase tracking-wider">
                                Sold Out
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                product.status === "available"
                                  ? "bg-[#08241a] border-[#0ed194]/40 text-[#0ed194]"
                                  : product.status === "out_of_stock"
                                    ? "bg-red-950/40 border-red-900/40 text-red-400"
                                    : "bg-[#04140e] border-[#0d3d2c]/60 text-[#a3b899]"
                              }`}
                            >
                              {product.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right flex items-center justify-end gap-2 text-lg">
                            <button
                              className="p-2 rounded-lg bg-[#030f0a] border border-[#0d3d2c]/60 text-[#a3b899] hover:border-[#0ed194]/40 hover:text-[#0ed194] transition"
                              title="Modify Details"
                            >
                              <MdEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                toast.info(
                                  `Soft-deleting initiated for context payload ID: ${product._id}`,
                                )
                              }
                              className="p-2 rounded-lg bg-[#030f0a] border border-[#0d3d2c]/60 text-[#a3b899] hover:border-red-500/40 hover:text-red-400 transition"
                              title="Soft-Delete Visibility State"
                            >
                              <MdDeleteOutline className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 🛒 CONDITIONAL VIEW B: BUYER DASHBOARD ==================== */}
        {userRole === "buyer" && (
          <div className="space-y-8">
            {/* 📊 Buyer Hub Micro Tracking Windows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 p-6 rounded-2xl flex items-center gap-4 shadow-xl transition-all duration-300 hover:border-[#145c43]">
                <div className="p-3.5 rounded-xl bg-[#08241a]/60 border border-[#0ed194]/20 text-[#0ed194] text-2xl">
                  <MdShoppingBasket />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                    Total Orders Placed
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {buyerOrders.length} Invoices
                  </p>
                </div>
              </div>

              <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 p-6 rounded-2xl flex items-center gap-4 shadow-xl transition-all duration-300 hover:border-[#145c43]">
                <div className="p-3.5 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[#ff8c00] text-2xl">
                  <MdLocalShipping />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                    Active Deliveries
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {activeDeliveriesCount} Shipment{activeDeliveriesCount !== 1 ? "s" : ""} Live
                  </p>
                </div>
              </div>

              <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 p-6 rounded-2xl flex items-center gap-4 col-span-1 sm:col-span-2 lg:col-span-1 shadow-xl transition-all duration-300 hover:border-[#145c43]">
                <div className="p-3.5 rounded-xl bg-[#08241a]/60 border border-[#0ed194]/20 text-[#0ed194] text-2xl">
                  <MdCheckCircle />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                    Net Supply Procured
                  </p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {netSupplyProcured} KG Total
                  </p>
                </div>
              </div>
            </div>

            {/* 📋 Order Tracking Log Manifest */}
            <div className="bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 py-5 border-b border-[#0d3d2c]/40 bg-[#030f0a] flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#e1ece6] tracking-wide">
                  Your Purchase Ledger
                </h3>
                <Link
                  href="/all-mangoes"
                  className="text-xs text-[#ff8c00] hover:text-[#ffaa33] font-bold transition"
                >
                  Browse Marketplace &rarr;
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#030f0a]/50 border-b border-[#0d3d2c]/40 text-xs font-bold text-[#7ea08d] uppercase tracking-wider">
                      <th className="px-6 py-4">Item Variety</th>
                      <th className="px-6 py-4">Order Date</th>
                      <th className="px-6 py-4">Weight Cargo</th>
                      <th className="px-6 py-4">Amount Paid</th>
                      <th className="px-6 py-4 text-right">Logistics Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0d3d2c]/30 text-sm text-[#a3b899]">
                    {loadingBuyerOrders ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#7ea08d] font-semibold font-sans">
                          <span className="inline-block animate-pulse">Loading purchase ledger...</span>
                        </td>
                      </tr>
                    ) : buyerOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#7ea08d] font-semibold font-sans">
                          No purchases recorded. Visit the marketplace to order fresh mango batches!
                        </td>
                      </tr>
                    ) : (
                      buyerOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-[#08241a]/20 transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-[#e1ece6]">
                            {order.productName}
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-[#a3b899]">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 font-mono text-[#e1ece6]">
                            {order.quantityWeight} KG
                          </td>
                          <td className="px-6 py-4 font-mono font-medium text-[#e1ece6]">
                            ৳{order.priceTotal} BDT
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                order.status === "shipped"
                                  ? "bg-blue-950/20 border-blue-900/40 text-blue-400"
                                  : order.status === "pending"
                                    ? "bg-yellow-950/20 border border-yellow-900/40 text-yellow-400"
                                    : "bg-[#08241a] border-[#0ed194]/40 text-[#0ed194]"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 👑 CONDITIONAL VIEW C: ADMIN DASHBOARD ==================== */}
        {userRole === "admin" && (
          <div className="space-y-6 text-center py-16 bg-[#061e15]/40 border border-[#0d3d2c]/40 rounded-3xl">
            <span className="text-4xl block mb-2">👑</span>
            <h2 className="text-xl font-bold text-white">Admin Dashboard Mock</h2>
            <p className="text-xs text-[#7ea08d] max-w-sm mx-auto">
              Welcome to the administrator hub. Use the controls to audit system listings, manage active sessions, and moderate marketplace content.
            </p>
          </div>
        )}
      </ScrollReveal>
    </div>
  );
}
