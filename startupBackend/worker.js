const { Hono } = require("hono");
const { cors } = require("hono/cors");
const cloudinary = require("cloudinary").v2;

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

const db = (c) => c.env.DB;

const success = (data, message = "Success") => ({ success: true, message, data });
const error = (message, status = 500) => ({ success: false, message });

function parseJsonSafe(str) {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return null;
  }
}

function rowToObj(row, jsonFields = []) {
  if (!row) return null;
  const obj = { ...row };
  for (const field of jsonFields) {
    if (obj[field]) obj[field] = parseJsonSafe(obj[field]);
  }
  return obj;
}

app.get("/", (c) => {
  return c.json(success(null, "Server is running and Database is connected!"));
});

app.get("/stats", async (c) => {
  try {
    const result = await db(c).prepare("SELECT * FROM stats LIMIT 1").first();
    if (!result) return c.json(error("No stats found", 404));
    return c.json(success({
      ProjectComplete: result.project_complete,
      HappyClient: result.happy_client,
      ClientSatisfaction: result.client_satisfaction,
      Experience: result.experience,
      Support: result.support,
    }));
  } catch (err) {
    return c.json(error(err.message), 500);
  }
});

app.post("/stats", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    await db(c).prepare(`
      INSERT INTO stats (id, project_complete, happy_client, client_satisfaction, experience, support)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(id, body.ProjectComplete, body.HappyClient, body.ClientSatisfaction, body.Experience, body.Support || "24/7").run();
    const result = await db(c).prepare("SELECT * FROM stats WHERE id = ?").bind(id).first();
    return c.json(success({
      ProjectComplete: result.project_complete,
      HappyClient: result.happy_client,
      ClientSatisfaction: result.client_satisfaction,
      Experience: result.experience,
      Support: result.support,
    }, "Stats created"), 201);
  } catch (err) {
    return c.json(error(err.message), 500);
  }
});

app.put("/stats/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    await db(c).prepare(`
      UPDATE stats SET project_complete = ?, happy_client = ?, client_satisfaction = ?, experience = ?, support = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(body.ProjectComplete, body.HappyClient, body.ClientSatisfaction, body.Experience, body.Support || "24/7", id).run();
    const result = await db(c).prepare("SELECT * FROM stats WHERE id = ?").bind(id).first();
    if (!result) return c.json(error("Stats not found", 404));
    return c.json(success({
      ProjectComplete: result.project_complete,
      HappyClient: result.happy_client,
      ClientSatisfaction: result.client_satisfaction,
      Experience: result.experience,
      Support: result.support,
    }, "Stats updated"));
  } catch (err) {
    return c.json(error(err.message), 500);
  }
});

app.delete("/stats/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await db(c).prepare("DELETE FROM stats WHERE id = ?").bind(id).run();
    if (result.changes === 0) return c.json(error("Stats not found", 404));
    return c.json(success(null, "Stats deleted successfully"));
  } catch (err) {
    return c.json(error(err.message), 500);
  }
});

const createCrudRoutes = (table, basePath, fieldMap = {}, jsonFields = []) => {
  app.get(basePath, async (c) => {
    try {
      const { results } = await db(c).prepare(`SELECT * FROM ${table} ORDER BY order_index, created_at DESC`).all();
      return c.json(success(results.map(r => {
        const obj = {};
        for (const [key, dbCol] of Object.entries(fieldMap)) {
          obj[key] = r[dbCol];
        }
        for (const field of jsonFields) {
          if (obj[field]) obj[field] = parseJsonSafe(obj[field]);
        }
        return obj;
      })));
    } catch (err) {
      return c.json(error(err.message), 500);
    }
  });

  app.get(`${basePath}/:id`, async (c) => {
    try {
      const id = c.req.param("id");
      const result = await db(c).prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
      if (!result) return c.json(error("Not found", 404));
      const obj = {};
      for (const [key, dbCol] of Object.entries(fieldMap)) {
        obj[key] = result[dbCol];
      }
      for (const field of jsonFields) {
        if (obj[field]) obj[field] = parseJsonSafe(obj[field]);
      }
      return c.json(success(obj));
    } catch (err) {
      return c.json(error(err.message), 500);
    }
  });

  app.post(basePath, async (c) => {
    try {
      const body = await c.req.json();
      const id = crypto.randomUUID();
      const dbCols = Object.values(fieldMap).filter(col => col !== "id" && col !== "created_at" && col !== "updated_at");
      const placeholders = dbCols.map(() => "?").join(", ");
      const columns = dbCols.join(", ");
      const values = dbCols.map(col => {
        const key = Object.keys(fieldMap).find(k => fieldMap[k] === col);
        return body[key];
      });
      await db(c).prepare(`INSERT INTO ${table} (id, ${columns}) VALUES (?, ${placeholders})`).bind(id, ...values).run();
      const result = await db(c).prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
      const obj = {};
      for (const [key, dbCol] of Object.entries(fieldMap)) {
        obj[key] = result[dbCol];
      }
      return c.json(success(obj, "Created"), 201);
    } catch (err) {
      return c.json(error(err.message), 500);
    }
  });

  app.put(`${basePath}/:id`, async (c) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const dbCols = Object.values(fieldMap).filter(col => col !== "id" && col !== "created_at" && col !== "updated_at");
      const setClause = dbCols.map(col => `${col} = ?`).join(", ");
      const values = dbCols.map(col => {
        const key = Object.keys(fieldMap).find(k => fieldMap[k] === col);
        return body[key];
      });
      await db(c).prepare(`UPDATE ${table} SET ${setClause}, updated_at = datetime('now') WHERE id = ?`).bind(...values, id).run();
      const result = await db(c).prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
      if (!result) return c.json(error("Not found", 404));
      const obj = {};
      for (const [key, dbCol] of Object.entries(fieldMap)) {
        obj[key] = result[dbCol];
      }
      return c.json(success(obj, "Updated"));
    } catch (err) {
      return c.json(error(err.message), 500);
    }
  });

  app.delete(`${basePath}/:id`, async (c) => {
    try {
      const id = c.req.param("id");
      const result = await db(c).prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
      if (result.changes === 0) return c.json(error("Not found", 404));
      return c.json(success(null, "Deleted successfully"));
    } catch (err) {
      return c.json(error(err.message), 500);
    }
  });
};

const commonJsonFields = ["social_media", "socials", "values_json", "features", "images", "technologies", "requirements", "benefits", "social_links", "contributions", "members", "tags", "seo_keywords", "coreValues", "whatWeOffer", "socials", "leadership", "departments"];

createCrudRoutes("founders", "/founder", {
  id: "id",
  name: "name",
  position: "position",
  about: "about",
  quote: "quote",
  details: "details",
  avatar: "avatar",
  whatsapp: "whatsapp",
  socialMedia: "social_media",
  socials: "socials",
  createdAt: "created_at",
  updatedAt: "updated_at",
  orderIndex: "order_index"
}, commonJsonFields);

createCrudRoutes("abouts", "/about", {
  id: "id",
  title: "title",
  description: "description",
  mission: "mission",
  vision: "vision",
  values_json: "values_json",
  image: "image",
  createdAt: "created_at",
  updatedAt: "updated_at",
  orderIndex: "order_index"
}, commonJsonFields);

createCrudRoutes("services", "/services", {
  id: "id",
  title: "title",
  description: "description",
  short_description: "short_description",
  icon: "icon",
  features: "features",
  image: "image",
  order_index: "order_index",
  is_active: "is_active",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("projects", "/projects", {
  id: "id",
  title: "title",
  description: "description",
  short_description: "short_description",
  image: "image",
  images: "images",
  category: "category",
  technologies: "technologies",
  client: "client",
  project_url: "project_url",
  github_url: "github_url",
  start_date: "start_date",
  end_date: "end_date",
  status: "status",
  featured: "featured",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("events", "/events", {
  id: "id",
  title: "title",
  description: "description",
  short_description: "short_description",
  image: "image",
  event_date: "event_date",
  start_time: "start_time",
  end_time: "end_time",
  location: "location",
  venue: "venue",
  is_online: "is_online",
  meeting_link: "meeting_link",
  capacity: "capacity",
  registered_count: "registered_count",
  status: "status",
  featured: "featured",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("getinvolveds", "/get-involved", {
  id: "id",
  title: "title",
  description: "description",
  short_description: "short_description",
  image: "image",
  type: "type",
  requirements: "requirements",
  benefits: "benefits",
  contact_email: "contact_email",
  contact_phone: "contact_phone",
  is_active: "is_active",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("testimonials", "/testimonials", {
  id: "id",
  name: "name",
  role: "role",
  company: "company",
  content: "content",
  rating: "rating",
  avatar: "avatar",
  is_featured: "is_featured",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("meetings", "/meetings", {
  id: "id",
  title: "title",
  description: "description",
  meeting_date: "meeting_date",
  start_time: "start_time",
  end_time: "end_time",
  timezone: "timezone",
  meeting_link: "meeting_link",
  meeting_id: "meeting_id",
  passcode: "passcode",
  host_email: "host_email",
  status: "status",
  type: "type",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("contributors", "/contributors", {
  id: "id",
  name: "name",
  role: "role",
  bio: "bio",
  avatar: "avatar",
  social_links: "social_links",
  contributions: "contributions",
  is_active: "is_active",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("teamdepartments", "/team-department", {
  id: "id",
  name: "name",
  description: "description",
  head_id: "head_id",
  members: "members",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("reels", "/reels", {
  id: "id",
  title: "title",
  description: "description",
  video_url: "video_url",
  thumbnail: "thumbnail",
  duration: "duration",
  platform: "platform",
  platform_id: "platform_id",
  views: "views",
  likes: "likes",
  comments_count: "comments_count",
  is_featured: "is_featured",
  order_index: "order_index",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("blogs", "/blogs", {
  id: "id",
  title: "title",
  slug: "slug",
  content: "content",
  excerpt: "excerpt",
  featured_image: "featured_image",
  author_id: "author_id",
  category: "category",
  tags: "tags",
  status: "status",
  published_at: "published_at",
  seo_title: "seo_title",
  seo_description: "seo_description",
  seo_keywords: "seo_keywords",
  view_count: "view_count",
  read_time: "read_time",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

createCrudRoutes("comments", "/comments", {
  id: "id",
  blog_id: "blog_id",
  parent_id: "parent_id",
  author_name: "author_name",
  author_email: "author_email",
  author_avatar: "author_avatar",
  content: "content",
  status: "status",
  ip_address: "ip_address",
  user_agent: "user_agent",
  createdAt: "created_at",
  updatedAt: "updated_at"
}, commonJsonFields);

app.post("/contact", async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    await db(c).prepare(`
      INSERT INTO contacts (id, name, email, phone, subject, message, status, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?)
    `).bind(id, body.name, body.email, body.phone, body.subject, body.message, c.req.header("cf-connecting-ip") || "", c.req.header("user-agent") || "").run();
    const result = await db(c).prepare("SELECT * FROM contacts WHERE id = ?").bind(id).first();
    return c.json(success({ ...result, createdAt: result.created_at, updatedAt: result.updated_at }, "Contact submitted"), 201);
  } catch (err) {
    return c.json(error(err.message), 500);
  }
});

app.post("/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("file");
    if (!file) return c.json(error("No file provided", 400));

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

    return c.json(success({ url: result.secure_url, publicId: result.public_id }, "Uploaded"));
  } catch (err) {
    return c.json(error(err.message), 500);
  }
});

app.onError((err, c) => {
  console.error("Error:", err);
  return c.json(error("Internal server error", 500));
});

export default app;