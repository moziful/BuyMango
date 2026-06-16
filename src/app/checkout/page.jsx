// src/app/checkout/page.jsx
import CheckoutForm from "@/components/CheckoutForm";
import { getProductByIdAction } from "@/app/dashboard/actions";

export const metadata = {
  title: "Checkout - BuyMango",
  description: "Secure delivery checkout for your chosen mango batch.",
};

export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;
  const productId = params?.productId;

  if (!productId) {
    return (
      <div className="w-full min-h-[85vh] bg-[#04140e] flex items-center justify-center px-4 py-12 text-center">
        <div className="max-w-md bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <h2 className="text-xl font-black text-[#f4f7f4] tracking-tight mb-2">
            Missing Product ID
          </h2>
          <p className="text-xs text-[#628271]">
            Please select a mango batch from the home page or catalog to checkout.
          </p>
        </div>
      </div>
    );
  }

  const res = await getProductByIdAction(productId);

  if (!res.success || !res.data) {
    return (
      <div className="w-full min-h-[85vh] bg-[#04140e] flex items-center justify-center px-4 py-12 text-center">
        <div className="max-w-md bg-[#061e15]/80 border border-[#0d3d2c]/60 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <h2 className="text-xl font-black text-[#f4f7f4] tracking-tight mb-2">
            Product Not Found
          </h2>
          <p className="text-xs text-[#628271] mb-4">
            {res.error || "The selected mango batch does not exist or has been removed."}
          </p>
          <a href="/" className="inline-block px-4 py-2 text-xs font-bold rounded-lg bg-brand-orange text-[#04140e]">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const product = res.data;

  return (
    <div className="flex flex-col flex-1 bg-[#04140e] min-h-[85vh]">
      <CheckoutForm product={product} />
    </div>
  );
}
