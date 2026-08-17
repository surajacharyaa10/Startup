-- D1 Schema for Startup Backend
-- Based on MongoDB models

CREATE TABLE stats (
  id TEXT PRIMARY KEY,
  project_complete INTEGER NOT NULL,
  happy_client INTEGER NOT NULL,
  client_satisfaction INTEGER NOT NULL,
  experience INTEGER NOT NULL,
  support TEXT NOT NULL DEFAULT '24/7',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE founders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  about TEXT,
  quote TEXT,
  details TEXT,
  avatar TEXT,
  whatsapp TEXT,
  social_media TEXT, -- JSON
  socials TEXT, -- JSON
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE abouts (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  mission TEXT,
  vision TEXT,
  values_json TEXT, -- JSON
  image TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  icon TEXT,
  features TEXT, -- JSON
  image TEXT,
  order_index INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  image TEXT,
  images TEXT, -- JSON
  category TEXT,
  technologies TEXT, -- JSON
  client TEXT,
  project_url TEXT,
  github_url TEXT,
  start_date TEXT,
  end_date TEXT,
  status TEXT,
  featured INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  image TEXT,
  event_date TEXT,
  start_time TEXT,
  end_time TEXT,
  location TEXT,
  venue TEXT,
  is_online INTEGER DEFAULT 0,
  meeting_link TEXT,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'upcoming',
  featured INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE getinvolveds (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  image TEXT,
  type TEXT,
  requirements TEXT, -- JSON
  benefits TEXT, -- JSON
  contact_email TEXT,
  contact_phone TEXT,
  is_active INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar TEXT,
  is_featured INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE meetings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  meeting_date TEXT,
  start_time TEXT,
  end_time TEXT,
  timezone TEXT DEFAULT 'UTC',
  meeting_link TEXT,
  meeting_id TEXT,
  passcode TEXT,
  host_email TEXT,
  status TEXT DEFAULT 'scheduled',
  type TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE contributors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  avatar TEXT,
  social_links TEXT, -- JSON
  contributions TEXT, -- JSON
  is_active INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE teamdepartments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  head_id TEXT,
  members TEXT, -- JSON array of member IDs
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE reels (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  duration INTEGER,
  platform TEXT,
  platform_id TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  author_id TEXT,
  category TEXT,
  tags TEXT, -- JSON
  status TEXT DEFAULT 'draft',
  published_at TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT, -- JSON
  view_count INTEGER DEFAULT 0,
  read_time INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE comments (
  id TEXT PRIMARY KEY,
  blog_id TEXT,
  parent_id TEXT,
  author_name TEXT NOT NULL,
  author_email TEXT,
  author_avatar TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (blog_id) REFERENCES blogs(id),
  FOREIGN KEY (parent_id) REFERENCES comments(id)
);

CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Indexes for performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_comments_blog ON comments(blog_id);
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);