"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import ScrollReveal from "@/components/ScrollReveal";
import { FcGoogle } from "react-icons/fc";
import { MdPerson, MdEmail, MdLock, MdArrowForward } from "react-icons/md";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState("buyer"); // Schema baseline: 'buyer' | 'seller'
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const chosenRole = formData.get("role");

    // 1. Password Match Validation
    if (password !== confirmPassword) {
      const msg = "Passwords do not match.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    // 2. Complexity Check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      const msg =
        "Password must be at least 6 characters long and include both uppercase and lowercase letters.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      // 3. Register standard credentials via better-auth
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        data: { role: chosenRole },
        callbackURL: "/auth/signin",
      });

      if (error) {
        setErrorMessage(error?.message || "Signup failed. Please try again.");
        toast.error(error?.message || "Signup failed.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/auth/signin");
    } catch (err) {
      toast.error("An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `/dashboard?role=${role}`, // Synchronizes state choice to server DB hooks
      });
    } catch (error) {
      toast.error("Google sign up failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4 py-12 transition-colors">
      {/* 🔮 Glassmorphism Single-Border Motion Wrapper Container */}
      <ScrollReveal className="w-full max-w-4xl bg-[#16161a]/70 border border-gray-800/80 rounded-3xl shadow-2xl backdrop-blur-xl p-6 md:p-10 flex flex-col gap-8">
        {/* ==================== 🥭 1. TOP GLOBAL SECTION: ACCOUNT SELECTION ==================== */}
        <div className="w-full text-center border-b border-gray-800/50 pb-8">
          <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            BuyMango
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Choose your account type to configure your specialized marketplace
            ecosystem
          </p>

          <div className="w-full max-w-md mx-auto relative bg-[#0c0c0e] p-1.5 rounded-2xl border border-gray-800 flex gap-2">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                role === "buyer"
                  ? "bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border border-emerald-500/50 text-emerald-400 shadow-lg"
                  : "border border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              🛒 Direct Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                role === "seller"
                  ? "bg-gradient-to-r from-orange-600/20 to-orange-500/10 border border-orange-500/50 text-orange-400 shadow-lg"
                  : "border border-transparent text-gray-500 hover:text-gray-300"
              }`}
            >
              👨‍🌾 Mango Seller
            </button>
          </div>
        </div>

        {/* ==================== ⚡ BOTTOM RESPONSIVE SPLIT FLEX LAYOUT ==================== */}
        <div className="flex flex-col md:flex-row w-full gap-8 lg:gap-12 items-stretch">
          {/* 👈 BOTTOM-LEFT: Google Social OAuth Portal */}
          <div className="w-full md:w-5/12 flex flex-col justify-center items-center p-6 rounded-2xl bg-[#0c0c0e]/40 border border-gray-800/40 text-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

            <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
              Instantly activate your workspace credentials securely using
              external validation protocols.
            </p>

            {/* Dynamic Status Indicator Tag Pill */}
            <div
              className={`mb-6 text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                role === "seller"
                  ? "bg-orange-950/20 border-orange-900/40 text-orange-400"
                  : "bg-emerald-950/20 border-emerald-900/40 text-emerald-400"
              }`}
            >
              Redirection choice:{" "}
              <span className="underline font-bold capitalize">
                {role} Account
              </span>{" "}
              [cite: 135]
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 py-3 px-5 rounded-xl text-sm font-bold shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              type="button"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* 🔀 Aesthetic Vertical Divider Line for Desktops */}
          <div className="hidden md:block w-[1px] bg-gradient-to-b from-gray-800/20 via-gray-800 to-gray-800/20 self-stretch" />

          {/* 👉 BOTTOM-RIGHT: Premium Credentials Standard Registration Form */}
          <div className="w-full md:w-7/12 flex flex-col justify-center">
            <form onSubmit={onSubmit} className="w-full space-y-4">
              {/* Hidden configuration element explicitly mapping state values into event target extractions */}
              <input type="hidden" name="role" value={role} />

              {[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "John Doe",
                  icon: <MdPerson />,
                },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "you@domain.com",
                  icon: <MdEmail />,
                },
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "••••••••",
                  icon: <MdLock />,
                },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                  placeholder: "••••••••",
                  icon: <MdLock />,
                },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-xs font-bold tracking-wide uppercase px-1">
                    {field.label}
                  </label>
                  <div className="relative w-full group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 group-focus-within:text-orange-500 transition-colors duration-200 text-lg">
                      {field.icon}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      className="w-full bg-[#0c0c0e]/80 border border-gray-800/80 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500/80 focus:ring-1 focus:ring-orange-500/20 transition-all duration-200"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                </div>
              ))}

              {errorMessage && (
                <p className="mt-3 rounded-xl border border-red-900/50 bg-red-950/20 px-4 py-2.5 text-center text-xs font-semibold text-red-400">
                  {errorMessage}
                </p>
              )}

              <button
                className="w-full mt-4 flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-orange-600 hover:from-emerald-500 hover:to-orange-500 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                disabled={isLoading}
              >
                <span>
                  {isLoading ? "Provisioning..." : "Sign Up with Email"}
                </span>
                <MdArrowForward className="text-lg" />
              </button>

              <p className="mt-4 text-center text-xs text-gray-400 tracking-wide">
                Already registered in our orchards?{" "}
                <Link
                  href="/auth/signin"
                  className="text-orange-400 hover:text-orange-300 hover:underline font-bold transition-colors ml-1"
                >
                  Sign In Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
