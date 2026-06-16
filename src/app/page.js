import Hero from "@/components/Hero";
import MangoGrid from "@/components/MangoGrid";
import FeaturedMangoes from "@/components/FeaturedMangoes";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-[#04140e] font-sans">
      <Hero />
      <FeaturedMangoes />
      <MangoGrid />
    </div>
  );
}
