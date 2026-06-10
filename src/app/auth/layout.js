"use client";

import Image from "next/image";
import { motion } from "framer-motion";
// 📂 Import directly from your public folder to ensure Next.js resolves it perfectly
import authBgImage from "@/../public/authbg.png";

export default function AuthLayout({ children }) {
    return (
        <div className="relative w-full overflow-hidden bg-[#0c0c0e] flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">

            {/* 🖼️ Premium Blurred Background Image Container */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={authBgImage}
                    alt="BuyMango Auth Background"
                    fill
                    priority
                    placeholder="blur" // Creates a smooth native loading transition
                    className="object-cover opacity-100 blur scale-105" // Optimized opacity & blur balance so it remains visible
                />

                {/* Deep dark canvas vignette overlay for pristine text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-[#0c0c0e]" />
                <div className="absolute inset-0 bg-[#0c0c0e]/50" />
            </div>

            {/* 🔓 Dynamic Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl rounded-2xl border border-gray-800 bg-[#16161a]/80 backdrop-blur-md p-8 shadow-2xl"
            >
                {children}
            </motion.div>
        </div>
    );
}