"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
// 🚀 FIXED: Pointing the import path directly to the standard react-icons/fa package sub-module
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { label: "Premium Varieties", href: "/all-mangoes" },
      { label: "Regional Orchards", href: "/orchards" },
      { label: "Bulk Ordering", href: "/bulk-wholesale" },
      { label: "Verified Sellers", href: "/sellers" },
    ],
    company: [
      { label: "About BuyMango", href: "/about" },
      { label: "Quality Assurance", href: "/quality-guarantee" },
      { label: "Traceability Map", href: "/traceability" },
      { label: "Contact Orchard Support", href: "/contact" },
    ],
    legal: [
      { label: "Terms of Trade", href: "/terms" },
      { label: "Privacy Blueprint", href: "/privacy" },
      { label: "Refund Architecture", href: "/refunds" },
    ],
  };

  return (
    <footer className="w-full bg-[#16161a]/60 border-t border-gray-800/80 backdrop-blur-md relative z-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* TOP LAYOUT: GRID LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12 pb-12 border-b border-gray-800/50">
          {/* Brand & Mission Segment */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                BuyMango
              </h3>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Bangladesh&apos;s premium digital orchard network connecting verified
              local growers directly with consumer tables. Experience
              high-contrast logistics transparency.
            </p>

            {/* Social Links Panel */}
            <div className="flex items-center gap-4 mt-2">
              {[
                { icon: <FaFacebook />, href: "https://facebook.com" },
                { icon: <FaTwitter />, href: "https://twitter.com" },
                { icon: <FaInstagram />, href: "https://instagram.com" },
                { icon: <FaYoutube />, href: "https://youtube.com" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="w-9 h-9 rounded-xl bg-[#0c0c0e] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 1: Marketplace Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">
              Marketplace
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.marketplace.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">
              Ecosystem
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Regional Direct Contacts */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200">
              Orchard Hubs
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400">
                <MdLocationOn className="text-orange-500 text-lg flex-shrink-0 mt-0.5" />
                <span>Rajshahi Division, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <MdPhone className="text-emerald-500 text-lg flex-shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <MdEmail className="text-yellow-500 text-lg flex-shrink-0" />
                <span>trade@buymango.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM LAYOUT: COPYRIGHT & LEGAL */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; {currentYear} BuyMango Inc. All rights reserved. Orchard
            logistics mapped directly to native database coordinates.
          </p>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {footerLinks.legal.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
