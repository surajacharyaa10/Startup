"use client";
import { motion } from "framer-motion";
import {
  FiBook,
  FiCode,
  FiSearch,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import { useState } from "react";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const docCategories = [
    {
      title: "Getting Started",
      icon: <FiBook className="w-6 h-6" />,
      docs: [
        { name: "Quick Start Guide", pages: 5, updated: "2 days ago" },
        { name: "Installation", pages: 8, updated: "1 week ago" },
        { name: "Configuration", pages: 12, updated: "3 days ago" },
        { name: "First Project", pages: 10, updated: "5 days ago" },
      ],
    },
    {
      title: "API Reference",
      icon: <FiCode className="w-6 h-6" />,
      docs: [
        { name: "REST API", pages: 45, updated: "1 day ago" },
        { name: "GraphQL API", pages: 32, updated: "4 days ago" },
        { name: "WebSocket API", pages: 18, updated: "1 week ago" },
        { name: "Authentication", pages: 25, updated: "2 days ago" },
      ],
    },
    {
      title: "Guides & Tutorials",
      icon: <FiBook className="w-6 h-6" />,
      docs: [
        { name: "Best Practices", pages: 28, updated: "3 days ago" },
        { name: "Performance Optimization", pages: 22, updated: "1 week ago" },
        { name: "Security Guidelines", pages: 35, updated: "2 days ago" },
        { name: "Deployment Guide", pages: 40, updated: "5 days ago" },
      ],
    },
    {
      title: "Advanced Topics",
      icon: <FiCode className="w-6 h-6" />,
      docs: [
        {
          name: "Microservices Architecture",
          pages: 50,
          updated: "1 week ago",
        },
        { name: "Scaling Strategies", pages: 38, updated: "4 days ago" },
        { name: "Monitoring & Logging", pages: 30, updated: "3 days ago" },
        { name: "CI/CD Pipeline", pages: 42, updated: "6 days ago" },
      ],
    },
  ];

  const popularDocs = [
    {
      title: "API Authentication Guide",
      description: "Complete guide to implementing secure authentication",
      views: "12.5K",
      rating: 4.9,
    },
    {
      title: "Database Integration",
      description: "Connect and manage databases efficiently",
      views: "9.8K",
      rating: 4.8,
    },
    {
      title: "Deployment Checklist",
      description: "Essential steps before going to production",
      views: "15.2K",
      rating: 4.9,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Documentation
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Comprehensive technical documentation for all our products and
            services
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Total Pages", value: "500+" },
            { label: "API Endpoints", value: "150+" },
            { label: "Code Examples", value: "1000+" },
            { label: "Monthly Views", value: "50K+" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Popular Docs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Most Popular</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularDocs.map((doc, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {doc.title}
                </h3>
                <p className="text-gray-400 mb-4">{doc.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{doc.views} views</span>
                  <span className="text-yellow-400">★ {doc.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Documentation Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {docCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-3">
                {category.docs.map((doc, docIndex) => (
                  <div
                    key={docIndex}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group/doc cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1 group-hover/doc:text-blue-400 transition-colors">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{doc.pages} pages</span>
                        <span>Updated {doc.updated}</span>
                      </div>
                    </div>
                    <FiExternalLink className="text-gray-400 group-hover/doc:text-blue-400 transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Download Complete Documentation
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get offline access to all our documentation in PDF format
          </p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            <span className="flex items-center gap-2">
              <FiDownload />
              Download PDF (25 MB)
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
