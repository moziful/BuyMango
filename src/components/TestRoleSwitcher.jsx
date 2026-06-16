"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { updateUserRoleAction } from "@/app/dashboard/actions";
import { toast } from "react-toastify";

export default function TestRoleSwitcher() {
  const { data: session } = authClient.useSession();
  const [loadingRole, setLoadingRole] = useState(null);

  if (!session?.user) return null;

  const currentRole = session.user.role || "buyer";
  const userEmail = session.user.email;

  const handleRoleSwitch = async (newRole) => {
    if (currentRole === newRole) return;
    setLoadingRole(newRole);
    try {
      const res = await updateUserRoleAction(userEmail, newRole);
      if (res.success) {
        toast.success(`Role switched to ${newRole} in database!`);
        // Reload page to refresh the session
        window.location.reload();
      } else {
        toast.error(`Failed to switch role: ${res.error}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div className="hidden md:flex items-center gap-1 bg-[#030f0a]/90 border border-amber-500/30 px-2 py-1 rounded-xl shadow-lg shadow-amber-950/5">
      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest mr-1.5 pl-1">
        🧪 Switch:
      </span>
      {["buyer", "seller", "admin"].map((role) => (
        <button
          key={role}
          disabled={loadingRole !== null}
          onClick={() => handleRoleSwitch(role)}
          className={`px-2 py-1 text-[9px] font-extrabold uppercase rounded-lg border transition-all duration-200 ${
            currentRole === role
              ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
              : "bg-[#04140e] border-transparent text-[#537362] hover:text-[#a3b899] hover:bg-[#061e15]"
          }`}
        >
          {loadingRole === role ? "..." : role}
        </button>
      ))}
    </div>
  );
}
