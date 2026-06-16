// src/components/FeaturedMangoes.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getStorefrontProductsAction } from "@/app/dashboard/actions";

export default function FeaturedMangoes() {
  const router = useRouter();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await getStorefrontProductsAction();
        if (res.success && res.data) {
          // Select featured products: first check if any are marked isFeatured,
          // otherwise fallback to available ones, up to 2 items
          let featured = res.data.filter((p) => p.isFeatured);
          if (featured.length === 0) {
            featured = res.data.filter((p) => p.status === "available");
          }
          setBatches(featured.slice(0, 2));
        }
      } catch (err) {
        console.error("Failed to load featured batches:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="w-full py-20 bg-[#04140e] text-[#a3b899] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Top Header */}
        <div className="flex flex-col space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md bg-[#08241a] text-[#0ed194] border border-[#0ed194]/10 self-start">
            🔥 Highly Requested Batches
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f4f7f4] tracking-tight drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
            This Week&apos;s Featured Harvest
          </h2>
          <p className="text-sm text-[#628271] font-medium max-w-xl">
            Handpicked directly by our system administrators from certified
            organic growers across top mango-producing districts.
          </p>
        </div>

        {/* Core Layout Matrix Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT PANEL: Asymmetric Master Promo Feature Frame */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#061e15] to-[#030f0a] border border-[#0d3d2c] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-2xl group-hover:bg-brand-orange/10 transition-all duration-500" />

            <div className="space-y-4 z-10">
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-orange">
                Premium Sourcing
              </span>
              <h3 className="text-2xl font-black text-[#f4f7f4] leading-tight">
                Direct Orchard <br />
                Escrow Logistics
              </h3>
              <p className="text-xs text-[#7ea08d] font-medium leading-relaxed">
                Every single featured entry passes standard fruit grade checks,
                verification of packaging weight transparency, and quick local
                district shipment grouping.
              </p>
            </div>

            <div className="pt-8 border-t border-[#0d3d2c]/40 mt-8 lg:mt-0 z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#426351] block font-black uppercase tracking-wider">
                  Average Dispatch
                </span>
                <span className="text-sm font-bold text-[#e1ece6]">
                  Within 24 Hours
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#08241a] border border-[#0ed194]/20 flex items-center justify-center text-[#0ed194]">
                ⚡
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Map Curated Highly-Rated Custom Batches */}
          {loading ? (
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-[#061e15]/50 border border-[#0d3d2c]/40 rounded-3xl p-6 flex flex-col justify-between space-y-4 h-full min-h-[380px]"
                >
                  <div className="w-full aspect-[16/10] bg-[#030f0a] rounded-2xl" />
                  <div className="space-y-2">
                    <div className="h-3 bg-[#0d3d2c] rounded w-1/3" />
                    <div className="h-5 bg-[#0d3d2c] rounded w-2/3" />
                  </div>
                  <div className="pt-4 border-t border-[#0d3d2c]/30 flex items-center justify-between">
                    <div className="h-4 bg-[#0d3d2c] rounded w-1/4" />
                    <div className="h-4 bg-[#0d3d2c] rounded w-1/4" />
                  </div>
                  <div className="h-11 bg-[#0d3d2c] rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : batches.length === 0 ? (
            <div className="lg:col-span-8 flex items-center justify-center bg-[#061e15]/20 border border-[#0d3d2c]/40 rounded-3xl p-12 text-center">
              <p className="text-sm text-[#537362] font-bold">
                No featured mango batches currently highlighted.
              </p>
            </div>
          ) : (
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {batches.map((batch) => {
                const imageSrc = batch.imageUrl || batch.image || "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600";
                const rating = batch.rating || "5.0";
                const totalReviews = batch.totalReviews || 12;
                const tagline = batch.tagline || "Special Harvest Selection";

                return (
                  <div
                    key={batch._id}
                    className="group flex flex-col bg-[#061e15]/50 border border-[#0d3d2c]/40 rounded-3xl overflow-hidden transition-all duration-300 hover:border-[#145c43] hover:shadow-2xl hover:shadow-black/40"
                  >
                    {/* Visual Image container handling */}
                    <div className="relative w-full aspect-[16/10] bg-[#030f0a] overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={batch.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                        unoptimized={imageSrc.startsWith("http")}
                      />

                      {/* Localized Location Anchor */}
                      <span className="absolute top-4 left-4 bg-[#04140e]/95 text-[#0ed194] border border-[#0ed194]/20 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-md">
                        📍 {batch.district}
                      </span>

                      {/* Rating Badge Overlay */}
                      <span className="absolute top-4 right-4 bg-black/60 text-brand-orange border border-brand-orange/20 text-[9px] font-black tracking-wide px-2 py-1 rounded-md backdrop-blur-md flex items-center gap-1">
                        ⭐ {rating} ({totalReviews})
                      </span>
                    </div>

                    {/* Content Payload Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#537362] block uppercase tracking-wider">
                          {tagline}
                        </span>
                        <h4 className="font-bold text-lg text-[#e1ece6] group-hover:text-white transition-colors duration-200">
                          {batch.title}
                        </h4>
                      </div>

                      {/* Bottom Stats Grid Block */}
                      <div className="pt-4 border-t border-[#0d3d2c]/30 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-[#426351] block font-black uppercase tracking-wider">
                            Price Bracket
                          </span>
                          <span className="text-xl font-black text-brand-orange">
                            ৳{batch.pricePerKg}
                          </span>
                          <span className="text-[10px] text-[#426351] font-bold">
                            {" "}
                            / KG
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[9px] text-[#426351] block font-black uppercase tracking-wider">
                            Available Pool
                          </span>
                          <span className="text-xs font-bold text-[#e1ece6]">
                            {batch.weightAvailable} kg remaining
                          </span>
                        </div>
                      </div>

                      {/* Immediate Action Hook button wrapper */}
                      <button
                        onClick={() => router.push(`/checkout?productId=${batch._id}`)}
                        className="w-full h-11 mt-2 bg-[#08241a] group-hover:bg-brand-orange text-[#0ed194] group-hover:text-[#04140e] border border-[#0ed194]/10 group-hover:border-transparent rounded-xl font-black text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <span>Order Batch</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

