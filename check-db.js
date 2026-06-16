const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env" }); // Try to load from .env

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not defined in environment");
  process.exit(1);
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("BuyMango");
    
    const count = await db.collection("products").countDocuments();
    console.log("Total products count:", count);
    
    const products = await db.collection("products").find({}).toArray();
    console.log("All products in database:");
    console.log(JSON.stringify(products, null, 2));
    
    const ordersCount = await db.collection("orders").countDocuments();
    console.log("Total orders count:", ordersCount);
  } catch (error) {
    console.error("Error connecting to DB:", error);
  } finally {
    await client.close();
  }
}

run();
