import Hero from "@/components/Hero";
import MangoGrid from "@/components/MangoGrid";
import RegisterForm from "@/components/RegisterForm";
import SignInForm from "@/components/SignInForm";
import AddMangoForm from "@/components/AddMangoForm";
import Image from "next/image";
import CheckoutForm from "@/components/CheckoutForm";
import SellerOrderDashboard from "@/components/SellerOrderDashboard";
import BuyerOrderHistory from "@/components/BuyerOrderHistory";
import AdminControlPanel from "@/components/AdminControlPanel";
import FeaturedMangoes from "@/components/FeaturedMangoes";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <FeaturedMangoes />
      <AdminControlPanel />
      <SellerOrderDashboard />
      <BuyerOrderHistory />
      <MangoGrid />
      <AddMangoForm />
      <RegisterForm />
      <SignInForm />
      <CheckoutForm />
    </div>
  );
}
