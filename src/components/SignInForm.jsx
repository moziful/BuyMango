// src/components/SignInForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Logging in with credentials payload:", formData);
      // Example call for Better-Auth credential login execution:
      // await authClient.signIn.email({
      //   email: formData.email,
      //   password: formData.password,
      //   callbackURL: '/dashboard' // Dynamically shifts via layout middleware later
      // });
    } catch (err) {
      setError(err.message || "Invalid email or password combination.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSocialLoading(true);
    setError("");
    try {
      console.log("Initiating Google OAuth callback verification pipeline...");
      // Example Better-Auth Social login execution:
      // await authClient.signIn.social({
      //   provider: 'google',
      //   callbackURL: '/dashboard'
      // });
    } catch (err) {
      setError("Google authentication failed.");
      setSocialLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[85vh] bg-[#04140e] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl p-8 backdrop-blur-md shadow-2xl shadow-black/50">
        {/* Form Branding & Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#f4f7f4] tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(163,245,210,0.15)]">
            Welcome Back
          </h2>
          <p className="text-xs text-[#628271] font-medium">
            Access your secure marketplace dashboard profile.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-950/40 border border-red-900/50 text-red-400 text-xs font-semibold text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Third-Party Identity Action Zone (Google Login) */}
        <button
          type="button"
          disabled={socialLoading || loading}
          onClick={handleGoogleLogin}
          className="w-full h-11 bg-[#030f0a] hover:bg-[#08241a] text-[#e1ece6] border border-[#0d3d2c]/60 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-30 disabled:pointer-events-none"
        >
          {socialLoading ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg
                className="w-4 h-4 text-[#0ed194]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Visual Structural Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#0d3d2c]/40"></div>
          </div>
          <span className="relative px-3 bg-[#061e15] text-[10px] font-black uppercase tracking-widest text-[#426351]">
            Or credential verify
          </span>
        </div>

        {/* Credentials Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-bold uppercase tracking-wider text-[#7ea08d] block"
              >
                Password
              </label>
              {/* Optional Placeholder link for expansion */}
              <a
                href="#"
                className="text-[10px] font-bold text-[#0ed194] hover:underline"
              >
                Forgot?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full h-11 bg-[#030f0a] border border-[#0d3d2c]/60 rounded-xl px-4 text-sm text-[#e1ece6] placeholder-[#426351] focus:outline-none focus:border-[#145c43] transition-colors duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading}
            className="w-full h-12 mt-2 bg-[#08241a] text-[#0ed194] border border-[#0ed194]/20 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 hover:bg-brand-orange hover:text-[#04140e] hover:border-transparent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Account Swap Anchor Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#537362] font-semibold">
            Don't have a secure profile yet?{" "}
            <Link
              href="/register"
              className="text-[#0ed194] hover:underline font-bold"
            >
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
