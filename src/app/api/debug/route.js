import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    const count = await db.collection("products").countDocuments();
    const products = await db.collection("products").find({}).toArray();
    const activeProducts = await db.collection("products").find({ status: { $ne: "deleted" } }).toArray();
    
    return NextResponse.json({
      success: true,
      totalCount: count,
      activeCount: activeProducts.length,
      allProducts: products,
      activeProducts: activeProducts
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
