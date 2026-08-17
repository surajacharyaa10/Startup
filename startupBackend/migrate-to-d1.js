const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL || "mongodb+srv://surajacharya993_db_user:eagle123@cluster0.15o3dza.mongodb.net/?appName=Cluster0";

const DB_BINDING = "DB";

async function migrate() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const mongo = client.db();

  const wrangler = require("wrangler");
  
  // Use local D1 for migration
  const { execSync } = require("child_process");
  
  const collections = [
    "stats", "founders", "abouts", "services", "projects", "events",
    "getinvolveds", "testimonials", "meetings", "contributors",
    "teamdepartments", "reels", "blogs", "comments", "contacts"
  ];

  for (const collName of collections) {
    const data = await mongo.collection(collName).find({}).toArray();
    if (data.length === 0) {
      console.log(`${collName}: empty, skipping`);
      continue;
    }

    console.log(`Migrating ${collName}: ${data.length} documents`);

    for (const doc of data) {
      const id = doc._id?.toString() || crypto.randomUUID();
      const fields = Object.keys(doc).filter(k => k !== "_id" && k !== "__v");
      const values = fields.map(f => {
        const v = doc[f];
        if (v === null || v === undefined) return "NULL";
        if (typeof v === "object") return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
        if (typeof v === "string") return `'${v.replace(/'/g, "''")}'`;
        return v;
      });

      const columns = "id, " + fields.join(", ");
      const placeholders = values.join(", ");

      const sql = `INSERT OR REPLACE INTO ${collName} (${columns}) VALUES (${placeholders});`;
      
      try {
        execSync(`npx wrangler d1 execute startup-db --local --command "${sql}"`, { 
          stdio: "pipe",
          cwd: "/Users/suraj/development/Startup 3/startupBackend"
        });
      } catch (e) {
        console.error(`Error inserting into ${collName}:`, e.message);
        console.log("SQL:", sql.substring(0, 200));
      }
    }
  }

  await client.close();
  console.log("Migration complete!");
}

migrate().catch(console.error);