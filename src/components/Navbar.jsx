"use client"; // cite: 1

import { useState } from "react"; // cite: 2
import Link from "next/link"; // cite: 1
import Image from "next/image"; // cite: 1
import { usePathname } from "next/navigation"; // cite: 2, 7
import { motion, AnimatePresence } from "framer-motion"; // cite: 39, 101
import { authClient } from "@/lib/auth-client"; // cite: 4
import { toast } from "react-toastify"; // cite: 5
import { GiHamburgerMenu } from "react-icons/gi"; // cite: 3
import {
  MdHome,
  MdDashboard,
  MdList,
  MdAddCircleOutline,
  MdLogin,
  MdLogout,
  MdClose,
} from "react-icons/md"; // cite: 4

export default function Navbar() {
  const pathname = usePathname(); // cite: 7
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // cite: 7
  const { data: session } = authClient.useSession(); // cite: 7

  // Parse session details natively following codebase logic
  const isLoggedIn = Boolean(session?.user); // cite: 8
  const userName = session?.user?.name || "User"; // cite: 8
  const userRole = session?.user?.role || "buyer"; // buyer, seller, admin
  const userImage = session?.user?.image; // cite: 8
  const canUseUserImage =
    typeof userImage === "string" && /^https?:\/\//i.test(userImage.trim()); // cite: 8

  // Base navigation map matching the routing configuration rules
  const baseNavItems = [
    { href: "/", label: "Home", icon: <MdHome className="text-xl" /> }, // cite: 6
    {
      href: "/mangoes",
      label: "Browse Mangoes",
      icon: <MdList className="text-xl" />,
    }, // cite: 6
  ];

  // Dynamic dashboard router paths based on user session roles
  if (isLoggedIn) {
    baseNavItems.push({
      href: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
    }); // cite: 6

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
      await authClient.signOut(); // cite: 10
      setMobileMenuOpen(false); // cite: 10
      toast.success("Signed out successfully"); // cite: 11
    } catch (error) {
      toast.error("Failed to sign out"); // cite: 11
    }
  };

  // Border & text helper classes matching active routing paths
  const linkClass = (href) => `
    rounded-full border px-4 py-2 text-sm font-medium transition flex items-center gap-2
    ${
      pathname === href
        ? "border-orange/40 text-orange bg-orange/5"
        : "border-transparent text-text-light hover:border-dark-gray hover:bg-dark-gray"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-dark-gray bg-black px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* PREMIUM BRAND IDENTITY - Ripening Green-to-Orange Gradient Text Treatment */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-wider transition-opacity hover:opacity-90"
          onClick={() => setMobileMenuOpen(false)} // cite: 12
        >
          <span className="bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange bg-clip-text text-transparent">
            BuyMango
          </span>
        </Link>

        {/* Desktop Links (Hidden on Mobile viewports) */}
        <div className="hidden items-center gap-1 md:flex">
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

        {/* User Identity Badging & Session Trigger Switches */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* Dynamic Profile Wrapper with Gradient Highlight Glow Accent */}
              <div className="relative p-[1px] rounded-full bg-gradient-to-r from-emerald-500/20 to-orange/30">
                <div className="flex items-center gap-2 rounded-full bg-dark-gray p-1 pr-4">
                  {canUseUserImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    /> // cite: 1
                  ) : (
                    // Default Icon backstop featuring our organic theme colors
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-orange text-xs font-black text-black">
                      {userName[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col max-w-[100px]">
                    <span className="text-xs font-bold text-text-light truncate">
                      {userName}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-extrabold">
                      {userRole}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-full border border-red-500/20 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <MdLogout className="text-lg" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            /* PREMIUM ACCOUNT ROUTER CTAS - Smooth Outer Multi-Stop Gradient Outer Core Border */
            <Link
              href="/auth/signin"
              className="group relative flex items-center justify-center rounded-full p-[1.5px] text-sm font-bold text-black outline-none"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange transition-opacity group-hover:opacity-90" />
              <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-light px-5 py-2 font-black tracking-wide text-black transition-colors">
                <MdLogin className="text-lg" />
                <span>Login / Register</span>
              </span>
            </Link>
          )}
        </div>

        {/* Hamburger Toggle Action for Mobile Viewports */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-xl p-2 text-text-light hover:bg-dark-gray md:hidden transition-colors"
          aria-label="Toggle Mobile Navigation Drawer Menu"
        >
          {mobileMenuOpen ? (
            <MdClose className="text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Responsive Framer Motion Overlay Dropdown Menu (Mobile/Tablet Viewports) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full border-b border-dark-gray bg-black px-4 py-6 shadow-2xl md:hidden z-50"
          >
            <div className="flex flex-col gap-2">
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

              <hr className="my-2 border-dark-gray" />

              {isLoggedIn ? (
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center gap-3 px-2">
                    {canUseUserImage ? (
                      <Image
                        src={userImage}
                        alt={userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      /> // cite: 1
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-orange font-black text-black">
                        {userName[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-text-light">
                        {userName}
                      </h4>
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-extrabold">
                        {userRole}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <MdLogout className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="group relative flex w-full items-center justify-center rounded-full p-[1.5px] text-sm font-bold text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange" />
                  <span className="relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-orange-light py-3 font-black text-black">
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
