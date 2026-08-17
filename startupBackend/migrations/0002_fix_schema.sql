-- Fix schema to match actual MongoDB data

-- stats: add missing columns (already correct, just need proper casing)
-- The columns are snake_case in SQL but camelCase in MongoDB

-- founders: add missing columns
ALTER TABLE founders ADD COLUMN socialMedia TEXT;
ALTER TABLE founders ADD COLUMN details TEXT;
ALTER TABLE founders ADD COLUMN quote TEXT;
ALTER TABLE founders ADD COLUMN whatsapp TEXT;

-- abouts: rename columns to match MongoDB
ALTER TABLE abouts ADD COLUMN vision TEXT;
ALTER TABLE abouts ADD COLUMN mission TEXT;
ALTER TABLE abouts ADD COLUMN coreValues TEXT;
ALTER TABLE abouts ADD COLUMN createdAt TEXT;
ALTER TABLE abouts ADD COLUMN updatedAt TEXT;
ALTER TABLE abouts ADD COLUMN whatWeOffer TEXT;

-- services: fix column names
ALTER TABLE services ADD COLUMN icon TEXT;
ALTER TABLE services ADD COLUMN desc TEXT;
ALTER TABLE services ADD COLUMN bg TEXT;

-- events: fix column names
ALTER TABLE events ADD COLUMN date TEXT;
ALTER TABLE events ADD COLUMN attendees INTEGER;
ALTER TABLE events ADD COLUMN category TEXT;
ALTER TABLE events ADD COLUMN featured INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN type TEXT;
ALTER TABLE events ADD COLUMN registrationLink TEXT;
ALTER TABLE events ADD COLUMN recordingLink TEXT;
ALTER TABLE events ADD COLUMN createdAt TEXT;

-- getinvolveds: fix column names
ALTER TABLE getinvolveds ADD COLUMN icon TEXT;
ALTER TABLE getinvolveds ADD COLUMN department TEXT;
ALTER TABLE getinvolveds ADD COLUMN jobType TEXT;
ALTER TABLE getinvolveds ADD COLUMN applyLink TEXT;
ALTER TABLE getinvolveds ADD COLUMN link TEXT;
ALTER TABLE getinvolveds ADD COLUMN featured INTEGER DEFAULT 0;
ALTER TABLE getinvolveds ADD COLUMN createdAt TEXT;

-- testimonials: fix column names
ALTER TABLE testimonials ADD COLUMN image TEXT;
ALTER TABLE testimonials ADD COLUMN createdAt TEXT;

-- contributors: fix column names
ALTER TABLE contributors ADD COLUMN github TEXT;
ALTER TABLE contributors ADD COLUMN linkedin TEXT;
ALTER TABLE contributors ADD COLUMN twitter TEXT;
ALTER TABLE contributors ADD COLUMN createdAt TEXT;
ALTER TABLE contributors ADD COLUMN updatedAt TEXT;

-- teamdepartments: fix column names (stores leadership and departments as JSON)
ALTER TABLE teamdepartments ADD COLUMN leadership TEXT;
ALTER TABLE teamdepartments ADD COLUMN departments TEXT;

-- blogs: fix column names
ALTER TABLE blogs ADD COLUMN content TEXT;
ALTER TABLE blogs ADD COLUMN image TEXT;
ALTER TABLE blogs ADD COLUMN publicId TEXT;
ALTER TABLE blogs ADD COLUMN author TEXT;
ALTER TABLE blogs ADD COLUMN type TEXT;
ALTER TABLE blogs ADD COLUMN createdAt TEXT;

-- comments: fix column names
ALTER TABLE comments ADD COLUMN blogId TEXT;
ALTER TABLE comments ADD COLUMN name TEXT;
ALTER TABLE comments ADD COLUMN email TEXT;
ALTER TABLE comments ADD COLUMN createdAt TEXT;

-- contacts: fix column names
ALTER TABLE contacts ADD COLUMN address TEXT;
ALTER TABLE contacts ADD COLUMN phone TEXT;
ALTER TABLE contacts ADD COLUMN socials TEXT;
ALTER TABLE contacts ADD COLUMN whatsapp TEXT;
ALTER TABLE contacts ADD COLUMN updatedAt TEXT;

-- meetings: add missing columns
ALTER TABLE meetings ADD COLUMN meeting_date TEXT;
ALTER TABLE meetings ADD COLUMN start_time TEXT;
ALTER TABLE meetings ADD COLUMN end_time TEXT;
ALTER TABLE meetings ADD COLUMN timezone TEXT DEFAULT 'UTC';
ALTER TABLE meetings ADD COLUMN meeting_link TEXT;
ALTER TABLE meetings ADD COLUMN meeting_id TEXT;
ALTER TABLE meetings ADD COLUMN passcode TEXT;
ALTER TABLE meetings ADD COLUMN host_email TEXT;
ALTER TABLE meetings ADD COLUMN status TEXT DEFAULT 'scheduled';
ALTER TABLE meetings ADD COLUMN type TEXT;