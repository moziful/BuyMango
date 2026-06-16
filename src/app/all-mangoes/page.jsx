// src/app/all-mangoes/page.jsx
import MangoGrid from "@/components/MangoGrid";

export const metadata = {
  title: "Browse Mangoes - BuyMango",
  description: "Explore fresh mango harvest batches directly from verified local orchards across Bangladesh.",
};

export default function BrowseMangoesPage() {
  return (
    <div className="flex flex-col flex-1 bg-[#04140e] min-h-[85vh]">
      <MangoGrid />
    </div>
  );
}
