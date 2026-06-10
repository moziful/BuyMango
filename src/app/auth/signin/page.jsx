"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { MdEmail, MdLogin } from "react-icons/md";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(false);
    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
      toast.success("Welcome back to BuyMango!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Premium Gradient Logo Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
          BuyMango
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Sign in to access your premium orchard marketplace
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <MdEmail className="h-5 w-5" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#0c0c0e] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-[#0c0c0e] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-orange-600 hover:from-emerald-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200 disabled:opacity-50"
        >
          <MdLogin className="w-5 h-5" />
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-orange-400 hover:text-orange-300 transition"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
