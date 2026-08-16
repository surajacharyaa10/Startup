const { MongoClient } = require("mongodb");

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (!uri) throw new Error("MONGO_URL is missing!");

  if (cachedClient && cachedDb) {
    try {
      await cachedClient.db().admin().ping({ maxTimeMS: 5000 });
      return { client: cachedClient, db: cachedDb };
    } catch {
      cachedClient = null;
      cachedDb = null;
    }
  }

  try {
    console.log("🔌 New MongoDB connection attempt...");
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    await client.connect();
    const db = client.db();

    cachedClient = client;
    cachedDb = db;

    console.log("✅ MongoDB connected");
    return { client, db };
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw error;
  }
}

function getDb() {
  if (!cachedDb) throw new Error("Database not initialized. Call connectToDatabase first.");
  return cachedDb;
}

function getClient() {
  if (!cachedClient) throw new Error("Client not initialized. Call connectToDatabase first.");
  return cachedClient;
}

module.exports = { connectToDatabase, getDb, getClient };