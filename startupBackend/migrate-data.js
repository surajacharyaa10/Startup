const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL || "mongodb+srv://surajacharya993_db_user:eagle123@cluster0.15o3dza.mongodb.net/?appName=Cluster0";

async function migrate() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const mongo = client.db();

  const collections = [
    "stats", "founders", "abouts", "services", "projects", "events",
    "getinvolveds", "testimonials", "meetings", "contributors",
    "teamdepartments", "reels", "blogs", "comments", "contacts"
  ];

  for (const collName of collections) {
    const data = await mongo.collection(collName).find({}).toArray();
    console.log(`${collName}: ${data.length} documents`);
    
    if (data.length > 0) {
      console.log("Sample:", JSON.stringify(data[0], null, 2).substring(0, 500));
    }
  }

  await client.close();
}

migrate().catch(console.error);