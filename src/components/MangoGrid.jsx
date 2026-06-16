// src/components/MangoGrid.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStorefrontProductsAction } from "@/app/dashboard/actions";

const DISTRICTS = [
  { value: "all", label: "All Districts" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "chapainawabganj", label: "Chapainawabganj" },
  { value: "satkhira", label: "Satkhira" },
];

export default function MangoGrid() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await getStorefrontProductsAction();
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to load storefront products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // 1. Core Filter Pipeline
  const filteredProducts = products.filter((product) => {
    if (filterDistrict !== "all" && product.district !== filterDistrict)
      return false;
    return product.status !== "deleted";
  });

  // 2. Pagination Calculation Engine
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Dynamic page selection boundary adjustment checks
  const activePage = currentPage > totalPages ? totalPages : currentPage;
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsSlice = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDistrictFilter = (districtValue) => {
    setFilterDistrict(districtValue);
    setCurrentPage(1); // Force reset baseline page index counter on filter swap
  };

  return (
    <section className="w-full py-16 bg-[#04140e] text-[#a3b899] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header & Interactive Filter Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Glowing Cream/Ivory Header Text */}
            <h2 className="text-3xl font-black text-[#f4f7f4] tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
              Explore Fresh Batches
            </h2>
            {/* Deep Muted Olive-Green description */}
            <p className="text-sm text-[#628271] font-medium max-w-md">
              Filter by district to find harvest points near you and save on
              logistical overhead.
            </p>
          </div>

          {/* Filter Controls mimicking the UI card frames */}
          <div className="flex items-center gap-3 bg-[#08241a]/60 border border-[#0d3d2c] p-1.5 rounded-xl backdrop-blur-sm">
            {DISTRICTS.map((dist) => (
              <button
                key={dist.value}
                onClick={() => handleDistrictFilter(dist.value)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
                  filterDistrict === dist.value
                    ? "bg-brand-orange text-[#04140e] shadow-lg shadow-brand-orange/20"
                    : "text-[#537362] hover:text-[#a3b899]"
                }`}
              >
                {dist.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Core Grid Layout */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl p-5 flex flex-col justify-between space-y-4 h-full min-h-[380px]"
              >
                <div className="w-full aspect-[4/3] bg-[#030f0a] rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 bg-[#0d3d2c] rounded w-2/3" />
                  <div className="h-3 bg-[#0d3d2c] rounded w-full" />
                </div>
                <div className="pt-3 border-t border-[#0d3d2c]/40 flex items-center justify-between">
                  <div className="h-4 bg-[#0d3d2c] rounded w-1/4" />
                  <div className="h-4 bg-[#0d3d2c] rounded w-1/4" />
                </div>
                <div className="h-11 bg-[#0d3d2c] rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : currentItemsSlice.length === 0 ? (
          <div className="text-center py-16 bg-[#061e15]/40 border border-[#0d3d2c]/40 rounded-2xl">
            <p className="text-sm text-[#537362] font-bold">
              No active harvest batches running in this region.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItemsSlice.map((product) => {
              const isOutOfStock = product.status === "out_of_stock";
              const imageSrc = product.imageUrl || product.image || "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600";

              return (
                <div
                  key={product._id}
                  className="group relative flex flex-col bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#145c43] hover:shadow-xl hover:shadow-[#0ed194]/[0.02]"
                >
                  {/* Image Wrapper with Deep Green Mix-blend styling */}
                  <div className="relative w-full aspect-[4/3] bg-[#030f0a] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      unoptimized={imageSrc.startsWith("http")}
                    />

                    {/* Glowing Teal/Green Origin Badge */}
                    <span className="absolute top-3 left-3 bg-[#04140e]/90 text-[#0ed194] border border-[#0ed194]/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                      📍 {product.district}
                    </span>

                    {/* Darkened Out of Stock Overlay */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-[#030f0a]/85 backdrop-blur-xs flex items-center justify-center">
                        <span className="bg-[#061e15] text-[#cc5200] border border-[#cc5200]/30 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-lg">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Payload Block */}
                  <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg text-[#e1ece6] group-hover:text-white transition-colors duration-200">
                          {product.title}
                        </h3>
                        <div className="text-right flex-shrink-0">
                          {/* Highlighted core utility data in signature mango orange */}
                          <span className="text-xl font-black text-brand-orange">
                            ৳{product.pricePerKg}
                          </span>
                          <span className="text-[10px] text-[#426351] block font-bold">
                            / KG
                          </span>
                        </div>
                      </div>

                      {/* Sage Green body text for natural integration */}
                      <p className="text-xs text-[#7ea08d] font-medium leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Quantitative Weights Status Row */}
                    <div className="pt-3 border-t border-[#0d3d2c]/40 flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#426351]">Available Stock:</span>
                      <span
                        className={`font-bold ${isOutOfStock ? "text-[#283d32]" : "text-[#a3b899]"}`}
                      >
                        {isOutOfStock
                          ? "0 kg"
                          : `${product.weightAvailable} kg`}
                      </span>
                    </div>

                    {/* Deep Teal Button styling containing subtle glowing hover states */}
                    <button
                      disabled={isOutOfStock}
                      onClick={() => router.push(`/checkout?productId=${product._id}`)}
                      className="w-full h-11 bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20 rounded-xl font-bold text-xs transition-all duration-200 hover:bg-brand-orange hover:text-[#04140e] hover:border-transparent disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Order Batch</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. PAGINATION INTERACTION BLOCK */}
        {!loading && totalPages > 1 && (
          <div className="pt-6 border-t border-[#0d3d2c]/20 flex items-center justify-center gap-2">
            {/* Backward Button */}
            <button
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#030f0a] border border-[#0d3d2c]/60 text-[#a3b899] disabled:opacity-20 disabled:pointer-events-none hover:border-[#145c43] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Generated Page Toggles */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 ${
                    activePage === pageNum
                      ? "bg-[#0ed194] text-[#04140e] font-black"
                      : "bg-[#030f0a] border border-[#0d3d2c]/40 text-[#537362] hover:text-[#a3b899] hover:border-[#145c43]"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            {/* Forward Button */}
            <button
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#030f0a] border border-[#0d3d2c]/60 text-[#a3b899] disabled:opacity-20 disabled:pointer-events-none hover:border-[#145c43] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

