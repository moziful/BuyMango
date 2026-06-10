import Hero from "@/components/Hero";
import MangoGrid from "@/components/MangoGrid";
import RegisterForm from "@/components/RegisterForm";
import SignInForm from "@/components/SignInForm";
import AddMangoForm from "@/components/AddMangoForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <MangoGrid />
      <AddMangoForm />
      <RegisterForm />
      <SignInForm />
    </div>
  );
}
