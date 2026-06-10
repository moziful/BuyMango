// src/components/Hero.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

const BANGLADESH_DISTRICTS = [
  "Rajshahi",
  "Chapainawabganj",
  "Satkhira",
  "Dinajpur",
  "Naogaon",
  "Natore",
  "Gopalganj",
];

export default function Hero() {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedDistrict) return;
    console.log(`Searching for mangoes near: ${selectedDistrict}`);
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#04140e] text-[#a3b899] overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Image Layer with Forest Green Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Premium Mango Marketplace Background"
          fill
          priority
          className="object-cover object-center opacity-100 "
        />
        {/* Radical dark green gradient to capture the depth of the new theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04140e] via-[#04140e]/90 to-transparent md:bg-radial md:from-[#04140e]/40 md:to-[#04140e]" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-16 md:py-24">
        {/* Left Column: Copywriting & Location Matcher */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-center md:text-left">
          {/* Tagline Badge with soft emerald glow */}
          <div className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#08241a]/60 text-[#0ed194] border border-[#0ed194]/20 backdrop-blur-sm">
            <span>🥭 Direct from orchards to your doorstep</span>
          </div>

          {/* Crisp Glowing Ivory Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-orange leading-[1.1] drop-shadow-[0_2px_12px_rgba(255,140,0,0.15)]">
            Find Your Perfect <br />
            <span>Mango Match</span>
          </h1>

          {/* Muted Sage Green Body Text */}
          <p className="max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-[#7ea08d] font-medium leading-relaxed">
            Skip the middlemen. Connect directly with certified local sellers
            across Bangladesh. Freshness, weight accuracy, and authentic
            regional taste guaranteed.
          </p>

          {/* Core Engine: District Dropdown Matcher styled to match card frames */}
          <form
            onSubmit={handleSearch}
            className="w-full max-w-md mx-auto md:mx-0 bg-[#061e15]/90 p-2 rounded-xl border border-[#0d3d2c]/80 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row gap-2 transition-all duration-300 focus-within:border-[#145c43]"
          >
            <div className="flex-1 relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full h-12 bg-transparent pl-4 pr-10 text-[#e1ece6] font-semibold rounded-lg appearance-none cursor-pointer focus:outline-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-[#061e15] text-[#426351]"
                >
                  Select your district...
                </option>
                {BANGLADESH_DISTRICTS.map((district) => (
                  <option
                    key={district}
                    value={district.toLowerCase()}
                    className="bg-[#061e15] text-[#e1ece6]"
                  >
                    {district}
                  </option>
                ))}
              </select>
              {/* Custom SVG chevron colored to match design accents */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#537362]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Glowing Action Button targeting brand orange on activate */}
            <button
              type="submit"
              disabled={!selectedDistrict}
              className="h-12 px-6 rounded-lg bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20 hover:bg-brand-orange hover:text-[#04140e] hover:border-transparent disabled:opacity-20 disabled:pointer-events-none font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#0ed194]/5"
            >
              <span>Explore Near Me</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
          </form>
        </div>

        {/* Right Column: Visual Feature Badges */}
        <div className="md:col-span-5 hidden md:flex flex-col space-y-4 items-end">
          <div className="bg-[#061e15]/40 border border-[#0d3d2c]/60 p-6 rounded-2xl backdrop-blur-sm max-w-xs transition-transform duration-500 hover:-translate-y-1">
            <h3 className="text-[#0ed194] font-bold text-lg mb-1">
              🛡️ Protected Escrow
            </h3>
            <p className="text-xs text-[#7ea08d] font-medium leading-relaxed">
              Funds are released to the seller only after you verify the
              physical package weight and condition.
            </p>
          </div>

          <div className="bg-[#061e15]/40 border border-[#0d3d2c]/60 p-6 rounded-2xl backdrop-blur-sm max-w-xs translate-x-[-20px] transition-transform duration-500 hover:-translate-y-1">
            <h3 className="text-[#0ed194] font-bold text-lg mb-1">
              🚀 Zero-Waste Sourcing
            </h3>
            <p className="text-xs text-[#7ea08d] font-medium leading-relaxed">
              Direct logistics ensures less sorting overhead, meaning cheaper
              bulk options for commercial buyers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
