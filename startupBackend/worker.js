const { Hono } = require("hono");
const { cors } = require("hono/cors");
const { connectToDatabase, getDb } = require("./utils/mongo-worker");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = new Hono();

app.use("*", cors());

app.use("*", async (c, next) => {
  try {
    await connectToDatabase(process.env.MONGO_URL);
    await next();
  } catch (err) {
    return c.json(
      {
        success: false,
        message: "Database connection error",
        error: err.message,
      },
      500
    );
  }
});

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Server is running and Database is connected!",
  });
});

app.get("/stats", async (c) => {
  try {
    const db = getDb();
    const stats = await db.collection("stats").findOne({});
    if (!stats)
      return c.json({
        success: false,
        message: "No stats found",
        data: null,
      });
    return c.json({ success: true, data: stats });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.post("/stats", async (c) => {
  try {
    const db = getDb();
    const body = await c.req.json();
    const result = await db.collection("stats").insertOne(body);
    const newStats = await db.collection("stats").findOne({ _id: result.insertedId });
    return c.json({ success: true, data: newStats }, 201);
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.put("/stats/:id", async (c) => {
  try {
    const db = getDb();
    const { ObjectId } = require("mongodb");
    const id = c.req.param("id");
    const body = await c.req.json();
    const result = await db.collection("stats").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { returnDocument: "after" }
    );
    if (!result)
      return c.json({ success: false, message: "Stats not found" }, 404);
    return c.json({ success: true, data: result });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.delete("/stats/:id", async (c) => {
  try {
    const db = getDb();
    const { ObjectId } = require("mongodb");
    const id = c.req.param("id");
    const result = await db.collection("stats").findOneAndDelete({ _id: new ObjectId(id) });
    if (!result)
      return c.json({ success: false, message: "Stats not found" }, 404);
    return c.json({ success: true, message: "Stats deleted successfully" });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

const createCrudRoutes = (collectionName, basePath) => {
  app.get(basePath, async (c) => {
    try {
      const db = getDb();
      const items = await db.collection(collectionName).find({}).toArray();
      return c.json({ success: true, data: items });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.get(`${basePath}/:id`, async (c) => {
    try {
      const db = getDb();
      const { ObjectId } = require("mongodb");
      const id = c.req.param("id");
      const item = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
      if (!item) return c.json({ success: false, message: "Not found" }, 404);
      return c.json({ success: true, data: item });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.post(basePath, async (c) => {
    try {
      const db = getDb();
      const body = await c.req.json();
      const result = await db.collection(collectionName).insertOne(body);
      const newItem = await db.collection(collectionName).findOne({ _id: result.insertedId });
      return c.json({ success: true, data: newItem }, 201);
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.put(`${basePath}/:id`, async (c) => {
    try {
      const db = getDb();
      const { ObjectId } = require("mongodb");
      const id = c.req.param("id");
      const body = await c.req.json();
      const result = await db.collection(collectionName).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: body },
        { returnDocument: "after" }
      );
      if (!result) return c.json({ success: false, message: "Not found" }, 404);
      return c.json({ success: true, data: result });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.delete(`${basePath}/:id`, async (c) => {
    try {
      const db = getDb();
      const { ObjectId } = require("mongodb");
      const id = c.req.param("id");
      const result = await db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(id) });
      if (!result) return c.json({ success: false, message: "Not found" }, 404);
      return c.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });
};

createCrudRoutes("founders", "/founder");
createCrudRoutes("abouts", "/about");
createCrudRoutes("services", "/services");
createCrudRoutes("projects", "/projects");
createCrudRoutes("events", "/events");
createCrudRoutes("getinvolveds", "/get-involved");
createCrudRoutes("testimonials", "/testimonials");
createCrudRoutes("meetings", "/meetings");
createCrudRoutes("contributors", "/contributors");
createCrudRoutes("teamdepartments", "/team-department");
createCrudRoutes("reels", "/reels");
createCrudRoutes("blogs", "/blogs");
createCrudRoutes("comments", "/comments");

app.post("/contact", async (c) => {
  try {
    const db = getDb();
    const body = await c.req.json();
    const result = await db.collection("contacts").insertOne({ ...body, createdAt: new Date() });
    const newContact = await db.collection("contacts").findOne({ _id: result.insertedId });
    return c.json({ success: true, data: newContact }, 201);
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.post("/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file");
    if (!file) return c.json({ success: false, message: "No file provided" }, 400);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "uploads" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return c.json({ success: true, data: { url: result.secure_url, publicId: result.public_id } });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({ success: false, message: "Internal server error", error: err.message }, 500);
});

export default app;