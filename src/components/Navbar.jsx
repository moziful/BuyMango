// src/components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  MdHome,
  MdDashboard,
  MdList,
  MdAddCircleOutline,
  MdLogin,
  MdLogout,
  MdClose,
} from "react-icons/md";
import TestRoleSwitcher from "./TestRoleSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const isLoggedIn = Boolean(session?.user);
  const userName = session?.user?.name || "User";
  const userRole = session?.user?.role || "buyer"; // buyer, seller, admin
  const userImage = session?.user?.image;
  const canUseUserImage =
    typeof userImage === "string" && /^https?:\/\//i.test(userImage.trim());

  const baseNavItems = [
    { href: "/", label: "Home", icon: <MdHome className="text-xl" /> },
    {
      href: "/all-mangoes",
      label: "Browse Mangoes",
      icon: <MdList className="text-xl" />,
    },
  ];

  if (isLoggedIn) {
    baseNavItems.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
    });

    if (userRole === "seller" || userRole === "admin") {
      baseNavItems.push({
        href: "/dashboard/add-mango",
        label: "Post Mango",
        icon: <MdAddCircleOutline className="text-xl" />,
      });
    }
  }

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setMobileMenuOpen(false);
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const linkClass = (href) => `
    px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-2 border
    ${
      pathname === href
        ? "bg-[#08241a] text-[#0ed194] border-[#0ed194]/20 shadow-md"
        : "border-transparent text-[#537362] hover:text-[#a3b899]"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#0d3d2c]/40 bg-[#04140e] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* BRAND IDENTITY (LEFT SIDE) */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-wider transition-opacity hover:opacity-90"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-brand-orange drop-shadow-[0_2px_8px_rgba(255,140,0,0.15)]">
            BuyMango
          </span>
        </Link>

        {/* TEST ROLE SWITCHER PANEL */}
        <TestRoleSwitcher />

        {/* MASTER CAPSULE CONTROL BAR (Desktop Viewports) */}
        <div className="hidden items-center bg-[#030f0a] border border-[#0d3d2c]/60 p-1.5 rounded-xl gap-3 md:flex">
          {/* Navigation links nested in the capsule */}
          <div className="flex items-center gap-1">
            {baseNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Internal Structural Capsule Splitter */}
          <div className="w-[1px] h-6 bg-[#0d3d2c]/60" />

          {/* Authentication Nodes cleanly bounded right inside the capsule frame */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg bg-[#061e15] p-1 pr-3 border border-[#0d3d2c]/30">
                  {canUseUserImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-orange text-[10px] font-black text-[#04140e]">
                      {userName[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col max-w-[80px]">
                    <span className="text-[11px] font-bold text-[#e1ece6] truncate leading-tight">
                      {userName.split(" ")[0]}
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-[#0ed194] font-extrabold leading-none">
                      {userRole}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="p-2 text-[#537362] hover:text-red-400 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <MdLogout className="text-base" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-xs font-black rounded-lg bg-[#ff8c00] text-[#04140e] hover:bg-[#ffaa33] transition-all duration-200 shadow-md flex items-center gap-1.5"
              >
                <MdLogin className="text-sm" />
                <span>Join</span>
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger Menu (Mobile viewports) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-[#a3b899] hover:bg-[#061e15] md:hidden transition-colors border border-transparent hover:border-[#0d3d2c]/60"
          aria-label="Toggle Mobile Navigation Drawer Menu"
        >
          {mobileMenuOpen ? (
            <MdClose className="text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full border-b border-[#0d3d2c]/60 bg-[#04140e] px-4 py-6 shadow-2xl md:hidden z-50"
          >
            <div className="flex flex-col gap-3 bg-[#030f0a] border border-[#0d3d2c]/60 p-2 rounded-xl">
              {baseNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${linkClass(item.href)} w-full py-3`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {isLoggedIn ? (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#0d3d2c]/20 mt-1">
                  <div className="flex items-center gap-3 px-2">
                    {canUseUserImage ? (
                      <Image
                        src={userImage}
                        alt={userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange font-black text-[#04140e]">
                        {userName[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-[#e1ece6]">
                        {userName}
                      </h4>
                      <p className="text-xs uppercase tracking-wider text-[#0ed194] font-extrabold">
                        {userRole}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <MdLogout className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="group relative flex w-full items-center justify-center rounded-xl p-[1.5px] text-sm px-4 py-2 text-xs font-black rounded-lg bg-[#ff8c00] text-[#04140e] hover:bg-[#ffaa33] transition-all duration-200 shadow-md flex items-center gap-1.5 mt-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="absolute inset-0 rounded-xl bg-brand-orange" />
                  <span className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 font-black text-[#04140e]">
                    <MdLogin className="text-lg" />
                    <span>Login / Register</span>
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
