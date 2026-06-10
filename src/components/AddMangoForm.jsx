// src/components/AddMangoForm.jsx
"use client";

import { useState } from "react";

const BANGLADESH_DISTRICTS = [
  "Rajshahi",
  "Chapainawabganj",
  "Satkhira",
  "Dinajpur",
  "Naogaon",
  "Natore",
  "Gopalganj",
];

export default function AddMangoForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerKg: "",
    weightAvailable: "",
    district: "",
    imageUrl: "", // New state tracking for the image asset link
    status: "available",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        ...formData,
        pricePerKg: parseFloat(formData.pricePerKg),
        weightAvailable: parseFloat(formData.weightAvailable),
        createdAt: new Date(),
        attributes: {},
      };

      console.log("Submitting Product Data to Next.js Server Action:", payload);

      // Example call:
      // const response = await createMangoListingAction(payload);

      setMessage({ type: "success", text: "Mango batch listed successfully!" });
      setFormData({
        title: "",
        description: "",
        pricePerKg: "",
        weightAvailable: "",
        district: "",
        imageUrl: "",
        status: "available",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to publish mango batch.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#04140e] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-xl w-full bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-black/50">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-[#f4f7f4] tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
            List New Mango Batch
          </h2>
          <p className="text-xs text-[#628271] font-medium">
            Fill in the orchard harvest details to list your produce on the
            active marketplace.
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-3 rounded-xl text-xs font-semibold text-center border ${
              message.type === "success"
                ? "bg-[#08241a] border-[#0ed194]/30 text-[#0ed194]"
                : "bg-red-950/40 border-red-900/50 text-red-400"
            }`}
          >
            {message.type === "success" ? "✅" : "⚠️"} {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input: Title */}
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Mango Variety / Batch Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Premium Rajshahi Fazli (Bulk)"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          {/* Input: Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Batch Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe maturation state, organic practices, etc..."
              className="w-full bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl p-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200 resize-none"
            />
          </div>

          {/* NEW INPUT: Mango Image URL link */}
          <div className="space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Mango Image Link (URL)
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/your-mango-image.jpg"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          {/* Price & Weight Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="pricePerKg"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Price per KG (৳ BDT)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#426351]">
                  ৳
                </span>
                <input
                  id="pricePerKg"
                  name="pricePerKg"
                  type="number"
                  min="1"
                  required
                  value={formData.pricePerKg}
                  onChange={handleChange}
                  placeholder="95"
                  className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl pl-8 pr-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="weightAvailable"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Total Available Weight (KG)
              </label>
              <input
                id="weightAvailable"
                name="weightAvailable"
                type="number"
                min="1"
                required
                value={formData.weightAvailable}
                onChange={handleChange}
                placeholder="500"
                className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
              />
            </div>
          </div>

          {/* District Selector & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="district"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Origin / Dispatch District
              </label>
              <div className="relative">
                <select
                  id="district"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl pl-4 pr-10 text-sm text-[#e1ece6] appearance-none cursor-pointer focus:outline-none focus:border-[#145c43] transition-colors duration-200"
                >
                  <option value="" disabled className="text-[#426351]">
                    Select District...
                  </option>
                  {BANGLADESH_DISTRICTS.map((dist) => (
                    <option
                      key={dist}
                      value={dist.toLowerCase()}
                      className="bg-[#061e15]"
                    >
                      {dist}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#537362]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="status"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Initial Listing Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl pl-4 pr-10 text-sm text-[#e1ece6] appearance-none cursor-pointer focus:outline-none focus:border-[#145c43] transition-colors duration-200"
                >
                  <option value="available" className="bg-[#061e15]">
                    Available / Live
                  </option>
                  <option value="archived" className="bg-[#061e15]">
                    Archived / Hidden
                  </option>
                  <option value="out_of_stock" className="bg-[#061e15]">
                    Out of Stock
                  </option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#537362]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-4 bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:bg-brand-orange hover:text-[#04140e] hover:border-transparent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-md shadow-black/20"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Publish Mango Batch</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
