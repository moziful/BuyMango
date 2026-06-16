"use server";

import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export async function updateUserRoleAction(email, newRole) {
  try {
    console.log(`[updateUserRoleAction] Attempting to update user email: "${email}" to role: "${newRole}"`);
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    // Better Auth stores user details in the "user" collection by default
    const result = await db.collection("user").updateOne(
      { email: { $regex: new RegExp(`^${email}$`, "i") } },
      { $set: { role: newRole } }
    );
    
    console.log(`[updateUserRoleAction] DB update result: matchedCount=${result.matchedCount}, modifiedCount=${result.modifiedCount}`);
    
    if (result.matchedCount === 0) {
      return { success: false, error: `User with email "${email}" not found in database.` };
    }
    
    return { success: true };
  } catch (error) {
    console.error("[updateUserRoleAction] Error:", error);
    return { success: false, error: error.message };
  }
}

export async function createMangoListingAction(payload) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return { success: false, error: "Unauthorized access" };
    }
    
    const sellerEmail = session.user.email;
    
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    const product = {
      ...payload,
      sellerEmail: sellerEmail,
      createdAt: new Date(),
    };
    
    const result = await db.collection("products").insertOne(product);
    
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to create mango listing:", error);
    return { success: false, error: error.message };
  }
}

export async function getSellerProductsAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return { success: false, error: "Unauthorized access" };
    }
    
    const sellerEmail = session.user.email;
    
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    const products = await db.collection("products")
      .find({ sellerEmail: sellerEmail })
      .sort({ createdAt: -1 })
      .toArray();
      
    // Convert ObjectId to string for Client Components serialization
    const serializedProducts = products.map(p => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt && typeof p.createdAt.toISOString === "function" ? p.createdAt.toISOString() : p.createdAt || null,
    }));
    
    return { success: true, data: serializedProducts };
  } catch (error) {
    console.error("Failed to fetch seller products:", error);
    return { success: false, error: error.message };
  }
}

export async function createOrderAction(payload) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return { success: false, error: "Unauthorized access" };
    }
    
    const buyerEmail = session.user.email;
    
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    const order = {
      ...payload,
      buyerEmail: buyerEmail,
      createdAt: new Date(),
    };
    
    const result = await db.collection("orders").insertOne(order);
    
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: error.message };
  }
}

export async function getBuyerOrdersAction() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    
    if (!session?.user) {
      return { success: false, error: "Unauthorized access" };
    }
    
    const buyerEmail = session.user.email;
    
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    const orders = await db.collection("orders")
      .find({ buyerEmail: buyerEmail })
      .sort({ createdAt: -1 })
      .toArray();
      
    // Convert ObjectId to string for Client Components serialization
    const serializedOrders = orders.map(o => ({
      ...o,
      _id: o._id.toString(),
      createdAt: o.createdAt && typeof o.createdAt.toISOString === "function" ? o.createdAt.toISOString() : o.createdAt || null,
      date: o.createdAt ? (typeof o.createdAt.toISOString === "function" ? o.createdAt.toISOString().split("T")[0] : String(o.createdAt).split("T")[0]) : null,
    }));
    
    return { success: true, data: serializedOrders };
  } catch (error) {
    console.error("Failed to fetch buyer orders:", error);
    return { success: false, error: error.message };
  }
}

export async function getStorefrontProductsAction() {
  try {
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    // Fetch products that are not deleted
    let products = await db.collection("products")
      .find({ status: { $ne: "deleted" } })
      .sort({ createdAt: -1 })
      .toArray();
      
    // Seed database if empty
    if (products.length === 0) {
      console.log("[getStorefrontProductsAction] Products collection empty. Seeding default mangoes.");
      const defaultProducts = [
        {
          title: "Premium Khirsapat (Himsagar)",
          description: "Naturally ripened, exceptionally sweet, and fiberless. Harvested fresh from the orchard upon order confirmation.",
          pricePerKg: 95,
          weightAvailable: 450,
          district: "rajshahi",
          status: "available",
          imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600",
          rating: "5.0",
          totalReviews: 48,
          tagline: "The King of Flavor",
          isFeatured: true,
          sellerEmail: "admin@buymango.com",
          createdAt: new Date()
        },
        {
          title: "Authentic Langra Mangoes",
          description: "Known for its distinct strong aroma and rich, sweet green-tinged flesh. Sourced directly from old orchards.",
          pricePerKg: 85,
          weightAvailable: 120,
          district: "chapainawabganj",
          status: "available",
          imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=600",
          rating: "4.9",
          totalReviews: 36,
          tagline: "Intense Rich Aroma",
          isFeatured: true,
          sellerEmail: "admin@buymango.com",
          createdAt: new Date()
        },
        {
          title: "Amrapali Bulk Batch",
          description: "Deep orange flesh with a high sugar profile. Perfect for families or local retail shops looking for premium weight.",
          pricePerKg: 110,
          weightAvailable: 0,
          district: "satkhira",
          status: "out_of_stock",
          imageUrl: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=600",
          rating: "4.7",
          totalReviews: 24,
          tagline: "Sweet Delight",
          isFeatured: false,
          sellerEmail: "admin@buymango.com",
          createdAt: new Date()
        }
      ];
      await db.collection("products").insertMany(defaultProducts);
      
      products = await db.collection("products")
        .find({ status: { $ne: "deleted" } })
        .sort({ createdAt: -1 })
        .toArray();
    }
    
    const serializedProducts = products.map(p => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt && typeof p.createdAt.toISOString === "function" ? p.createdAt.toISOString() : p.createdAt || null,
    }));
    
    return { success: true, data: serializedProducts };
  } catch (error) {
    console.error("Failed to fetch storefront products:", error);
    return { success: false, error: error.message };
  }
}

export async function getProductByIdAction(productId) {
  try {
    if (!productId) {
      return { success: false, error: "Product ID is required" };
    }
    const client = await clientPromise;
    const db = client.db("BuyMango");
    
    const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });
    
    if (!product) {
      return { success: false, error: "Product not found" };
    }
    
    return {
      success: true,
      data: {
        ...product,
        _id: product._id.toString(),
        createdAt: product.createdAt && typeof product.createdAt.toISOString === "function" ? product.createdAt.toISOString() : product.createdAt || null,
      }
    };
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
    return { success: false, error: error.message };
  }
}

