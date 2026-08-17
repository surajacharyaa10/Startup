const { execSync } = require("child_process");

const sql = `
-- Stats
INSERT OR REPLACE INTO stats (id, project_complete, happy_client, client_satisfaction, experience, support) VALUES 
('69305ab74e7f0b0b7bcf4aab', 80, 50, 90, 4, '24/7');

-- Founders
INSERT OR REPLACE INTO founders (id, name, position, about, quote, details, avatar, whatsapp, social_media, socials, order_index) VALUES 
('692fda38a499ed484608a66a', 'Suraj Acharya', 'Founder & CEO', '"Technology should empower businesses to achieve their dreams, not complicate their journey. That''s why we build solutions that are powerful yet simple, innovative yet reliable."

With over 15 years of experience in technology and innovation, John founded Eagle Infotech with a vision to transform how businesses leverage technology. His passion for creating impactful solutions has driven the company to deliver exceptional results for clients worldwide.', 'Technology should empower businesses to achieve their dreams, not complicate their journey. That''s why we build solutions that are powerful yet simple, innovative yet reliable.', 'With over  3 Years of experience in technology and innovation, Suraj founded Eagle Infotech with a vision to transform how businesses leverage technology. His passion for creating impactful solutions has driven the company to deliver exceptional results for clients worldwide.', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1764756991/startupBackend/founder/uv7i6vsz5xpctlbsogbx.jpg', '', '{"linkedin":"https://linkedin.com/in/surajacharyaa","twitter":"https://x.com/SURAJAC22891334","email":"surajacharya993@gmail.com"}', '[{"platform":"LinkedIn","url":"https://www.linkedin.com/in/surajacharyaa/","_id":"697d0648988d9baa3b59a10a"},{"platform":"instagram","url":"https://www.instagram.com/suraj_acharyaa10/","_id":"697d0648988d9baa3b59a10c"},{"platform":"twitter","url":"https://x.com/SURAJAC22891334","_id":"697d0648988d9baa3b59a10d"},{"platform":"email","url":"surajacharya993@gmail.com","_id":"697d0648988d9baa3b59a10e"},{"platform":"website","url":"https://surajacharya10.com.np","_id":"697d0648988d9baa3b59a10f"},{"platform":"facebook","url":"https://www.facebook.com/auraj.acharya","_id":"697d0fcc884238b2ccf42a4b"}]', 0);

-- Abouts
INSERT OR REPLACE INTO abouts (id, title, description, mission, vision, values_json, image, order_index) VALUES 
('693001e70e3093aa2c3106e9', 'About Eagle Infotech', 'We deliver exceptional services and create future-ready products using purposeful design, advanced engineering, and strategic innovation.', 'We deliver exceptional services and create future-ready products using purposeful design, advanced engineering, and strategic innovation. Our mission is to help brands unlock new opportunities, maximize performance, and accelerate digital growth through both custom solutions and scalable products.', 'To be the global leader in delivering transformative services and innovative products that shape a smarter world. We envision seamless user experiences and technologies that empower businesses to thrive with confidence and creativity.', '[{"icon":"💡","title":"Innovation","desc":"We challenge norms and craft creative, forward-thinking solutions.","bg":"bg-blue-100 text-blue-600","_id":"6930058c0e3093aa2c310772"},{"icon":"🤝","title":"Collaboration","desc":"We build success together through teamwork and transparent communication.","bg":"bg-green-100 text-green-600","_id":"6930058c0e3093aa2c310773"},{"icon":"🏆","title":"Excellence","desc":"We deliver high-quality experiences with precision and consistency.","bg":"bg-yellow-100 text-yellow-600","_id":"6930058c0e3093aa2c310774"},{"icon":"🧭","title":"Integrity","desc":"We operate with honesty, ethics, and accountability in everything we do.","bg":"bg-purple-100 text-purple-600","_id":"6930058c0e3093aa2c310775"},{"icon":"❤️","title":"Customer-Centric","desc":"Every decision is made with empathy and understanding for real user needs.","bg":"bg-pink-100 text-pink-600","_id":"6930058c0e3093aa2c310776"},{"icon":"🔮","title":"Future-Focused","desc":"We embrace modern technologies to prepare clients for tomorrow.","bg":"bg-indigo-100 text-indigo-600","_id":"6930058c0e3093aa2c310777"}]', '', 0);

-- Services
INSERT OR REPLACE INTO services (id, title, description, short_description, icon, features, image, order_index, is_active) VALUES 
('6930529d4e7f0b0b7bcf49ba', 'Custom Software Development', 'End-to-end scalable software built around your business needs.', 'End-to-end scalable software built around your business needs.', '💻', '[]', '', 0, 1),
('6930529d4e7f0b0b7bcf49bb', 'UI/UX Design', 'Human-centered, intuitive, and modern design experiences.', 'Human-centered, intuitive, and modern design experiences.', '🎨', '[]', '', 1, 1),
('6930529d4e7f0b0b7bcf49bc', 'Mobile App Development', 'High-performance Android & iOS apps crafted with precision.', 'High-performance Android & iOS apps crafted with precision.', '📱', '[]', '', 2, 1),
('6930529d4e7f0b0b7bcf49bd', 'Digital Marketing', 'SEO, content strategy, and digital growth solutions.', 'SEO, content strategy, and digital growth solutions.', '📢', '[]', '', 3, 1),
('6930529d4e7f0b0b7bcf49be', 'Technical Support', 'Reliable, always-on technical & customer support.', 'Reliable, always-on technical & customer support.', '🤝', '[]', '', 4, 1);

-- Events
INSERT OR REPLACE INTO events (id, title, description, short_description, image, event_date, start_time, end_time, location, venue, is_online, meeting_link, capacity, registered_count, status, featured, order_index) VALUES 
('6931a9f1e2d9febbda968955', 'Web3 Hackathon', '48-hour hackathon building decentralized apps.', '48-hour hackathon building decentralized apps.', 'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800', '2024-11-09T15:45:00.000Z', '15:45', '15:45', 'London, UK', 'London, UK', 0, 'https://example.com/hackathon', 300, 0, 'past', 1, 0),
('6931a9f1e2d9febbda968956', 'Global Tech Summit 2025', 'Join industry leaders for a 3-day conference on the future of technology.', 'Join industry leaders for a 3-day conference on the future of technology.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', '2026-06-14T21:30:00.000Z', '21:30', '21:30', 'San Francisco, CA', 'San Francisco, CA', 0, 'https://example.com/register', 5000, 0, 'past', 1, 1),
('6931a9f1e2d9febbda968957', 'AI Workshop Series', 'Hands-on workshop building LLM applications.', 'Hands-on workshop building LLM applications.', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800', '2026-01-18T12:00:00.000Z', '12:00', '12:00', 'Online', 'Online', 1, 'https://surajacharya10.com.np/', 200, 0, 'past', 0, 2);

-- GetInvolved
INSERT OR REPLACE INTO getinvolveds (id, title, description, short_description, image, type, requirements, benefits, contact_email, contact_phone, is_active, order_index) VALUES 
('69330a0a05215ceadbc1b511', 'Hackathon', 'nETIOJJJKKJJ KJJ', 'nETIOJJJKKJJ KJJ', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1764952585/startup/images/etlffhqbitfxqufv1qfh.jpg', 'careers', '["REACT"]', '["lEADERSHIP"]', '', '', 1, 0),
('69330a0a05215ceadbc1b512', 'HACKATHON', 'NM,', 'NM,', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1764952689/startup/images/ngzybtyisc22xdq47ei4.jpg', 'volunteer', '["REACT GIT"]', '["LEADERSHIP"]', '', '', 1, 1),
('69330a0a05215ceadbc1b513', 'HACKATHON', 'FFFFFFFFFFFFFFFFFF', 'FFFFFFFFFFFFFFFFFF', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1764952795/startup/images/ulzlnoxsj8pbd9xrknmn.jpg', 'contribute', '["NM"]', '["NM"]', '', '', 1, 2);

-- Testimonials
INSERT OR REPLACE INTO testimonials (id, name, role, company, content, rating, avatar, is_featured, order_index) VALUES 
('6931a9f2e2d9febbda96895b', 'Michael Chen', 'Lead Developer', 'InnovateCo', 'The best developer experience I''ve had in years. Highly recommended.', 4, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 1, 0),
('6931a9f2e2d9febbda96895c', 'HEMANTA THAPA', 'GRAPHIC DESIGNER', 'The Art Studio', 'Very easy experience, thank you for keeping it painless.', 5, 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1770652692/startup/images/ixhbr13xkytptvxqgsa1.jpg', 1, 1);

-- Contributors
INSERT OR REPLACE INTO contributors (id, name, role, bio, avatar, social_links, contributions, is_active, order_index) VALUES 
('69384794556321f53d3c29b0', 'Suraj Acharya', 'CEO', '', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1765296019/startupBackend/contributors/ercylqswflkmn0xbrupx.jpg', '{"github":"https://github.com/surajacharya12","linkedin":"https://www.linkedin.com/in/surajacharyaa/","twitter":"https://x.com/SURAJAC22891334"}', 10, 1, 0);

-- Team Departments
INSERT OR REPLACE INTO teamdepartments (id, name, description, head_id, members, order_index) VALUES 
('69384a69328d1e56ee9fd633', 'Leadership', 'Company leadership team', '', '[{"name":"Robert Anderson","role":"CEO & Founder","avatar":"https://res.cloudinary.com/dx0f7h4at/image/upload/v1765296945/startupBackend/leadership/gv7cfzwkqmaglpeh8zk6.jpg","bio":"Visionary leader with 15+ years in tech innovation","linkedin":"https://linkedin.com/in/surajacharyaa","twitter":"https://x.com/SURAJAC22891334","email":"surajacharya993@gmail.com"}]', 0);

-- Blogs
INSERT OR REPLACE INTO blogs (id, title, slug, content, excerpt, featured_image, author_id, category, tags, status, published_at, seo_title, seo_description, seo_keywords, view_count, read_time) VALUES 
('69398f5716798b7ede797d06', 'Using React Server Components and Server Actions in Next.js', 'react-server-components-js-1765379918478', 'Introduction: Enhancing Next.js with React Server Components...', 'Learn how to use React Server Components and Server Actions in Next.js with practical examples.', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1765379926/startupBackend/blogs/lcsrmkqnoprhh7o2jdaw.jpg', 'Suraj Acharya', 'Development', '["Next.js","React","Server Components"]', 'published', '2025-12-10T15:18:47.661Z', '', '', '["Next.js","React","Server Components"]', 73, '5 min read'),
('69398f5716798b7ede797d07', 'Differentiating Stateless and Stateful Widgets', 'differentiating-stateless-and-stateful-widgets', '### Differentiating Stateless and Stateful Widgets...', 'Understanding the difference between these two widget types is critical for managing data and responsiveness in Flutter.', 'https://res.cloudinary.com/dx0f7h4at/image/upload/v1769849066/startupBackend/blogs/jrzvze2gdn984ybqwe3t.webp', 'Suraj Acharya', 'App Devlopment', '["Mobile App","Flutter"]', 'published', '2026-01-31T08:44:27.010Z', '', '', '["Mobile App","Flutter"]', 82, '10 min');

-- Comments
INSERT OR REPLACE INTO comments (id, blog_id, parent_id, author_name, author_email, author_avatar, content, status, ip_address, user_agent) VALUES 
('69398f5716798b7ede797d08', '69398f5716798b7ede797d06', NULL, 'Jane Doe', 'jane@example.com', NULL, 'Great article! Very helpful.', 'approved', '', '');

-- Contacts
INSERT OR REPLACE INTO contacts (id, name, email, phone, subject, message, status, ip_address, user_agent, whatsapp) VALUES 
('697cfe47e094fedf90b1cf00', 'Durgapuri', 'surajacharya993@gmail.com', '+9779801475272', '', 'Contact from website', 'new', '', '', '9801475272');
`;

try {
  execSync(`npx wrangler d1 execute startup-db --remote --command "${sql}"`, { 
    stdio: "inherit",
    cwd: "/Users/suraj/development/Startup 3/startupBackend"
  });
  console.log("Data inserted successfully!");
} catch (e) {
  console.error("Error:", e.message);
}