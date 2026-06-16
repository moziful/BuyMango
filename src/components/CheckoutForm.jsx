// src/components/CheckoutForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { createOrderAction } from "@/app/dashboard/actions";
import { toast } from "react-toastify";

const REGIONAL_LOCATION_MAP = {
  rajshahi: [
    "Boalia",
    "Matihar",
    "Rajpara",
    "Shah Makhdum",
    "Paba",
    "Godagari",
    "Tanore",
    "Bagha",
    "Charghat",
    "Durgapur",
  ],
  chapainawabganj: [
    "Chapainawabganj Sadar",
    "Shibganj",
    "Bholahat",
    "Nachole",
    "Gomastapur",
  ],
  satkhira: [
    "Satkhira Sadar",
    "Assasuni",
    "Debhata",
    "Kalaroa",
    "Kaliganj",
    "Shyamnagar",
    "Tala",
  ],
  dinajpur: [
    "Dinajpur Sadar",
    "Birganj",
    "Kaharole",
    "Bochaganj",
    "Eshwargonj",
    "Phulbari",
    "Parbatipur",
  ],
  naogaon: [
    "Naogaon Sadar",
    "Atrai",
    "Badalgachhi",
    "Dhamoirhat",
    "Manda",
    "Niamatpur",
    "Patnitala",
  ],
  natore: [
    "Natore Sadar",
    "Baraigram",
    "Gurudaspur",
    "Lalpur",
    "Singra",
    "Bagatipara",
  ],
  gopalganj: [
    "Gopalganj Sadar",
    "Kashiani",
    "Kotalipara",
    "Muksudpur",
    "Tungipara",
  ],
};

export default function CheckoutForm({
  product = {
    title: "Premium Khirsapat (Himsagar)",
    pricePerKg: 95,
    weightAvailable: 450,
  },
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const activeUser = session?.user;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    area: "",
    streetAddress: "",
    requestedDate: "",
    quantityWeight: "10",
    sellerMessage: "",
  });

  useEffect(() => {
    if (activeUser) {
      setFormData((prev) => ({
        ...prev,
        name: activeUser.name || prev.name,
      }));
    }
  }, [activeUser]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
      area: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (!activeUser) {
      const msg = "You must be signed in to purchase mango batches!";
      toast.error(msg);
      setMessage({ type: "error", text: msg });
      setLoading(false);
      return;
    }

    const orderQty = parseFloat(formData.quantityWeight);
    if (orderQty > product.weightAvailable) {
      setMessage({
        type: "error",
        text: `Requested weight exceeds total available stock of ${product.weightAvailable}kg.`,
      });
      setLoading(false);
      return;
    }

    try {
      const fullCompiledAddress = `${formData.streetAddress}, ${formData.area}, ${formData.district.toUpperCase()}`;

      const payload = {
        productId: product._id,
        productName: product.title || product.name || "Premium Mangoes",
        pricePerKg: product.pricePerKg,
        priceTotal: orderQty * product.pricePerKg,
        buyerEmail: activeUser.email,
        quantityWeight: orderQty,
        deliveryDetails: {
          name: formData.name,
          phone: formData.phone,
          address: fullCompiledAddress,
          requestedDate: new Date(formData.requestedDate),
        },
        sellerMessage: formData.sellerMessage.trim(),
        status: "pending",
        createdAt: new Date(),
        metadata: {
          structuredDistrict: formData.district,
          structuredArea: formData.area,
        },
      };

      console.log(
        "Sending secure structured order data to Server Action:",
        payload,
      );
      const res = await createOrderAction(payload);

      if (res.success) {
        toast.success("Order placed successfully!");
        router.push("/dashboard");
      } else {
        setMessage({
          type: "error",
          text: res.error || "Failed to complete order booking.",
        });
        toast.error(res.error || "Failed to place order.");
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to complete order booking.",
      });
      toast.error(err.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const availableAreas = formData.district
    ? REGIONAL_LOCATION_MAP[formData.district]
    : [];

  return (
    <div className="w-full min-h-[85vh] bg-[#04140e] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-xl w-full bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-black/50 grid grid-cols-1 gap-6">
        <div>
          <h2 className="text-2xl font-black text-[#f4f7f4] tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
            Secure Delivery Checkout
          </h2>
          <p className="text-xs text-[#628271] font-medium">
            Review product specifics and adjust batch shipment dispatch tracking
            endpoints.
          </p>
        </div>

        <div className="bg-[#030f0a] border border-[#0d3d2c]/40 p-4 rounded-xl flex justify-between items-center text-xs">
          <div>
            <span className="text-[#426351] block uppercase tracking-wider font-bold text-[9px] mb-0.5">
              Selected Variety
            </span>
            <span className="font-bold text-[#e1ece6] text-sm">
              {product.title}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[#426351] block uppercase tracking-wider font-bold text-[9px] mb-0.5">
              Price Bracket
            </span>
            <span className="text-[#ff8c00] font-black text-base">
              ৳{product.pricePerKg}{" "}
              <span className="text-[10px] text-[#426351] font-bold">/ KG</span>
            </span>
          </div>
        </div>

        {message.text && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold text-center border ${
              message.type === "success"
                ? "bg-[#08241a] border-[#0ed194]/30 text-[#0ed194]"
                : "bg-red-950/40 border-red-900/50 text-red-400"
            }`}
          >
            {message.type === "success" ? "✅" : "⚠️"} {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="quantityWeight"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Order Weight (KG)
              </label>
              <input
                id="quantityWeight"
                name="quantityWeight"
                type="number"
                min="1"
                required
                value={formData.quantityWeight}
                onChange={handleChange}
                placeholder="10"
                className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="requestedDate"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Wanted Delivery Date
              </label>
              <input
                id="requestedDate"
                name="requestedDate"
                type="date"
                required
                value={formData.requestedDate}
                onChange={handleChange}
                className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] focus:outline-none focus:border-[#145c43] transition-colors duration-200 uppercase"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Recipient Name (Prefilled)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter delivery target name"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Contact Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +88017XXXXXXXX"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="district"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Delivery District
              </label>
              <div className="relative">
                <select
                  id="district"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleDistrictChange}
                  className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl pl-4 pr-10 text-sm text-[#e1ece6] appearance-none cursor-pointer focus:outline-none focus:border-[#145c43] transition-colors duration-200"
                >
                  <option value="" disabled className="text-[#426351]">
                    Select District...
                  </option>
                  {Object.keys(REGIONAL_LOCATION_MAP).map((dist) => (
                    <option
                      key={dist}
                      value={dist}
                      className="bg-[#061e15] capitalize"
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
                htmlFor="area"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Delivery Area / Thana
              </label>
              <div className="relative">
                <select
                  id="area"
                  name="area"
                  required
                  disabled={!formData.district}
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl pl-4 pr-10 text-sm text-[#e1ece6] appearance-none cursor-pointer focus:outline-none focus:border-[#145c43] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <option value="" disabled className="text-[#426351]">
                    Select Area...
                  </option>
                  {availableAreas.map((area) => (
                    <option key={area} value={area} className="bg-[#061e15]">
                      {area}
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
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="streetAddress"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Remaining Full Address (House, Road, Holding)
            </label>
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              required
              value={formData.streetAddress}
              onChange={handleChange}
              placeholder="e.g. House #24B, Road #5, Sector 3"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          {/* NEW FIELD: Message to Seller Textarea */}
          <div className="space-y-1.5">
            <label
              htmlFor="sellerMessage"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Message to Seller (Optional)
            </label>
            <textarea
              id="sellerMessage"
              name="sellerMessage"
              rows={2}
              value={formData.sellerMessage}
              onChange={handleChange}
              placeholder="Add courier instructions, ripening state requests, or custom packaging preferences..."
              className="w-full bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl p-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:bg-[#ff8c00] hover:text-[#04140e] hover:border-transparent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Confirm & Lock Order Batch</span>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
