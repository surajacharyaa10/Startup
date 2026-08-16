"use client";
import React, { useEffect, useState } from "react";
import API_URL from "../api/url";
import BlogCard, { Blog } from "./components/BlogCard";
import { motion } from "framer-motion";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Add timeout to fetch
        const controller = new AbortController();

        const res = await fetch(`${API_URL}/blogs`, {
          signal: controller.signal,
        });

        const result = await res.json();
        // Handle both { data: [...] } and [...] formats
        const blogData = Array.isArray(result) ? result : result?.data || [];
        setBlogs(blogData);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Derive unique categories from blogs
  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean))),
  ] as string[];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-7xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Our Blog
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Insights, tutorials, and thought leadership from our team of experts
          </p>
        </motion.div>

        {/* Category Filter */}
        {!loading && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-400/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10 hover:border-blue-400/30"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-zinc-900/50 h-[400px] rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog, idx) => (
              <motion.div
                key={typeof blog._id === "string" ? blog._id : blog._id.$oid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No blogs found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
