"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import API_URL from "@/app/api/url";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { Blog } from "../components/BlogCard";
import { mockBlogs } from "../data/mockBlogs";

const formatContent = (content: string) => {
  if (!content) return "";

  // If content already has markdown code blocks or headings, return as is
  if (content.includes("```") || content.includes("## ")) return content;

  let formatted = content;

  // Format Headings
  const headings = [
    "Introduction:",
    "What Are React Server Components?",
    "Benefits of React Server Components",
    "Example: Creating a Server Component",
    "What Are Server Actions?",
    "Benefits of Server Actions",
    "Example: Using Server Actions",
    "Conclusion:"
  ];

  headings.forEach(heading => {
    // Replace heading with markdown heading, handling potential newlines before it
    formatted = formatted.replace(new RegExp(`(\\r\\n|\\n|^)${heading.replace("?", "\\?")}`, "g"), `\n\n## ${heading}`);
  });

  // Format Code Blocks
  // Look for code starting with // app/ and ending before the next section or double newline
  formatted = formatted.replace(
    /(\/\/ app\/[\s\S]*?)(?=\s*(?:In this example|What Are|Benefits|Example|Conclusion|\/\/ app\/|$))/g,
    "\n```javascript\n$1\n```\n"
  );

  return formatted;
};

import { motion, useScroll, useSpring } from "framer-motion";
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiShare2, FiBookmark } from "react-icons/fi";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs/${slug}`);
        if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);

        const text = await res.text();
        const result = JSON.parse(text);
        setBlog(result?.data ?? result);
      } catch (err) {
        const foundBlog = mockBlogs.find((b) => b.slug === slug);
        if (foundBlog) {
          console.warn(
            `Backend fetch failed (${err instanceof Error ? err.message : "Unknown error"}). Using mock data.`
          );
          setBlog(foundBlog);
          setError(null);
        } else {
          setError("Failed to load blog details. Please try again later.");
        }
      }
    };

    fetchBlog();
  }, [slug]);

  if (error)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Link
            href="/blogs"
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );

  if (!blog)
    return <div className="text-white text-center py-40 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 pb-20 relative">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-0 z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={blog.image}
            className="w-full h-full object-cover"
            alt={blog.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white mb-6 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-black/50"
            >
              <FiArrowLeft /> Back to Blogs
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-zinc-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {blog.author ? blog.author[0] : "A"}
                </div>
                <span className="font-medium text-white">{blog.author || "Admin"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-blue-400" />
                <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-pink-400" />
                <span>{blog.readTime || "5 min read"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
            <div className="flex gap-3">
              {blog.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
                  {tag}
                </span>
              ))}
            </div>

          </div>

          <MarkdownRenderer content={formatContent(blog.content)} />
        </motion.div>
      </div>
    </div>
  );
}
