"use client";

import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* 🚀 Mounts your pre-existing login layout component directly */}
      <SignInForm />
    </div>
  );
}
