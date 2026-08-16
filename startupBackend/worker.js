const { Hono } = require("hono");
const { cors } = require("hono/cors");
const cloudinary = require("cloudinary").v2;
const { findOne, find, insertOne, updateOne, deleteOne } = require("./utils/mongo-data-api");

const app = new Hono();

app.use("*", cors());

app.use("*", async (c, next) => {
  cloudinary.config({
    cloud_name: c.env.CLOUDINARY_CLOUD_NAME,
    api_key: c.env.CLOUDINARY_API_KEY,
    api_secret: c.env.CLOUDINARY_API_SECRET,
  });
  await next();
});

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Server is running and Database is connected!",
  });
});

app.get("/stats", async (c) => {
  try {
    const stats = await findOne(c.env, "stats", {});
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
    const body = await c.req.json();
    const newStats = await insertOne(c.env, "stats", body);
    return c.json({ success: true, data: newStats }, 201);
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.put("/stats/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedStats = await updateOne(c.env, "stats", { _id: id }, body);
    if (!updatedStats)
      return c.json({ success: false, message: "Stats not found" }, 404);
    return c.json({ success: true, data: updatedStats });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

app.delete("/stats/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deleted = await deleteOne(c.env, "stats", { _id: id });
    if (!deleted)
      return c.json({ success: false, message: "Stats not found" }, 404);
    return c.json({ success: true, message: "Stats deleted successfully" });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

const createCrudRoutes = (collectionName, basePath) => {
  app.get(basePath, async (c) => {
    try {
      const items = await find(c.env, collectionName, {});
      return c.json({ success: true, data: items });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.get(`${basePath}/:id`, async (c) => {
    try {
      const id = c.req.param("id");
      const item = await findOne(c.env, collectionName, { _id: id });
      if (!item) return c.json({ success: false, message: "Not found" }, 404);
      return c.json({ success: true, data: item });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.post(basePath, async (c) => {
    try {
      const body = await c.req.json();
      const newItem = await insertOne(c.env, collectionName, body);
      return c.json({ success: true, data: newItem }, 201);
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.put(`${basePath}/:id`, async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const updatedItem = await updateOne(c.env, collectionName, { _id: id }, body);
      if (!updatedItem) return c.json({ success: false, message: "Not found" }, 404);
      return c.json({ success: true, data: updatedItem });
    } catch (err) {
      return c.json({ success: false, message: err.message }, 500);
    }
  });

  app.delete(`${basePath}/:id`, async (c) => {
    try {
      const id = c.req.param("id");
      const deleted = await deleteOne(c.env, collectionName, { _id: id });
      if (!deleted) return c.json({ success: false, message: "Not found" }, 404);
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
    const body = await c.req.json();
    const newContact = await insertOne(c.env, "contacts", { ...body, createdAt: new Date().toISOString() });
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

    cloudinary.config({
      cloud_name: c.env.CLOUDINARY_CLOUD_NAME,
      api_key: c.env.CLOUDINARY_API_KEY,
      api_secret: c.env.CLOUDINARY_API_SECRET,
    });

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