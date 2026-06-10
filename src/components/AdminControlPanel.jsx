// src/components/AdminControlPanel.jsx
"use client";

import { useState } from "react";

// Mock structural dataset representing a global administrative database query
const INITIAL_GLOBAL_ITEMS = [
  {
    _id: "prod_01",
    title: "Premium Khirsapat (Himsagar)",
    sellerEmail: "grower_rajshahi@example.com",
    district: "rajshahi",
    status: "available",
    weightAvailable: 450,
  },
  {
    _id: "prod_03",
    title: "Amrapali Bulk Batch (Damaged/Flagged)",
    sellerEmail: "satkhira_orchard@example.com",
    district: "satkhira",
    status: "deleted", // Soft-deleted item: Hidden from everyone except Admins
    weightAvailable: 0,
  },
  {
    _id: "prod_04",
    title: "Fazli Late Harvest Batch",
    sellerEmail: "chapainawabganj_orchard@example.com",
    district: "chapainawabganj",
    status: "archived",
    weightAvailable: 1200,
  },
];

export default function AdminControlPanel() {
  const [globalItems, setGlobalItems] = useState(INITIAL_GLOBAL_ITEMS);
  const [filterView, setFilterView] = useState("all"); // 'all', 'active', 'deleted_only'

  // Administrative Override Action: Force-restore a soft-deleted product back to market
  const handleRestoreItem = (productId) => {
    setGlobalItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, status: "available" } : item,
      ),
    );
    console.log(
      `[ADMIN OVERRIDE] Restored product ${productId} status to 'available'.`,
    );
  };

  // Administrative Override Action: Permanent database hard purge
  const handlePermanentHardDelete = (productId) => {
    setGlobalItems((prev) => prev.filter((item) => item._id !== productId));
    console.log(
      `[ADMIN OVERRIDE] Permanently hard-deleted product ${productId} from MongoDB storage.`,
    );
  };

  // Filter pipeline mapping admin visibility controls
  const visibleItems = globalItems.filter((item) => {
    if (filterView === "deleted_only") return item.status === "deleted";
    if (filterView === "active") return item.status !== "deleted";
    return true; // 'all' view shows absolutely everything including hidden deletions
  });

  return (
    <div className="w-full min-h-screen bg-[#04140e] text-[#a3b899] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#0d3d2c]/40 pb-6">
          <div>
            <h1 className="text-3xl font-black text-brand-orange tracking-tight drop-shadow-[0_2px_12px_rgba(255,140,0,0.15)]">
              System Admin Command Matrix
            </h1>
            <p className="text-xs text-[#628271] font-medium mt-1">
              Absolute administrative override access. Auditing system-wide
              catalogs, hidden nodes, and soft-deleted records.
            </p>
          </div>

          {/* Database Query Scope Switches */}
          <div className="flex bg-[#030f0a] border border-[#0d3d2c]/60 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setFilterView("all")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterView === "all"
                  ? "bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20"
                  : "text-[#537362] hover:text-[#a3b899]"
              }`}
            >
              All Listings ({globalItems.length})
            </button>
            <button
              onClick={() => setFilterView("active")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterView === "active"
                  ? "bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20"
                  : "text-[#537362] hover:text-[#a3b899]"
              }`}
            >
              Active Market
            </button>
            <button
              onClick={() => setFilterView("deleted_only")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterView === "deleted_only"
                  ? "bg-red-950/40 text-red-400 border border-red-900/40"
                  : "text-[#537362] hover:text-[#a3b899]"
              }`}
            >
              🔒 Soft-Deleted Only (
              {globalItems.filter((i) => i.status === "deleted").length})
            </button>
          </div>
        </div>

        {/* System Overview Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#061e15]/40 border border-[#0d3d2c]/60 p-5 rounded-xl">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#426351] block">
              Global Marketplace Scope
            </span>
            <p className="text-2xl font-black text-[#e1ece6] mt-1">
              {globalItems.length} Registered Batches
            </p>
          </div>
          <div className="bg-[#061e15]/40 border border-[#0d3d2c]/60 p-5 rounded-xl">
            <span className="text-[10px] uppercase font-black tracking-widest text-red-500 block">
              System Isolation Tank
            </span>
            <p className="text-2xl font-black text-red-400 mt-1">
              {globalItems.filter((i) => i.status === "deleted").length} Soft
              Deletions
            </p>
          </div>
          <div className="bg-[#061e15]/40 border border-[#0d3d2c]/60 p-5 rounded-xl">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#0ed194] block">
              Admin Authority Rank
            </span>
            <p className="text-2xl font-black text-[#0ed194] mt-1">
              Superuser Overlord
            </p>
          </div>
        </div>

        {/* Global Catalog Administration Table */}
        <div className="bg-[#061e15]/40 border border-[#0d3d2c]/40 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="bg-[#030f0a] border-b border-[#0d3d2c]/60 text-[#7ea08d] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4">Mango Batch info</th>
                <th className="p-4">Merchant Target Email</th>
                <th className="p-4">District</th>
                <th className="p-4">State Signature</th>
                <th className="p-4 text-right">Administrative Interventions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0d3d2c]/20 text-[#e1ece6] font-medium">
              {visibleItems.map((item) => {
                const isSoftDeleted = item.status === "deleted";

                return (
                  <tr
                    key={item._id}
                    className={`transition-colors duration-150 ${
                      isSoftDeleted
                        ? "bg-red-950/10 hover:bg-red-950/20"
                        : "hover:bg-[#061e15]/60"
                    }`}
                  >
                    <td className="p-4 font-bold text-white">
                      {item.title}
                      {isSoftDeleted && (
                        <span className="ml-2 bg-red-950 text-red-400 border border-red-900/40 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                          Invisible to Public
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-[#7ea08d] font-mono">
                      {item.sellerEmail}
                    </td>
                    <td className="p-4 uppercase tracking-wider text-slate-400">
                      📍 {item.district}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isSoftDeleted
                            ? "bg-red-950/50 text-red-400 border border-red-900/30"
                            : item.status === "archived"
                              ? "bg-zinc-900 text-zinc-500"
                              : "bg-emerald-950/40 text-[#0ed194]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-2">
                      {isSoftDeleted ? (
                        <>
                          {/* Admin Only: Override and pull back a deleted listing */}
                          <button
                            onClick={() => handleRestoreItem(item._id)}
                            className="h-8 px-3 rounded-md bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20 hover:bg-brand-orange hover:text-[#04140e] hover:border-transparent font-bold text-[11px] transition-all"
                          >
                            🔄 Restore Listing
                          </button>
                          {/* Admin Only: Absolute wipe from database collection */}
                          <button
                            onClick={() => handlePermanentHardDelete(item._id)}
                            className="h-8 px-3 rounded-md bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-700/40 font-bold text-[11px] transition-all"
                          >
                            ☣️ Hard Purge
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-[#426351] font-bold italic pr-2">
                          Standard Log Integrity Active
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
