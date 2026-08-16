"use client";
import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "E-Commerce Platform Transformation",
      client: "RetailCo",
      industry: "Retail",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      results: [
        { label: "Revenue Increase", value: "+150%" },
        { label: "User Growth", value: "+200K" },
        { label: "Load Time", value: "-60%" },
      ],
      description:
        "Complete platform redesign and migration to modern cloud infrastructure, resulting in significant performance improvements and revenue growth.",
    },
    {
      title: "Healthcare Data Analytics Platform",
      client: "MedTech Solutions",
      industry: "Healthcare",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      results: [
        { label: "Data Processing", value: "10x Faster" },
        { label: "Cost Savings", value: "$2M/year" },
        { label: "Accuracy", value: "99.9%" },
      ],
      description:
        "Built a scalable analytics platform processing millions of healthcare records with real-time insights and compliance.",
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
            Case Studies
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Real results from real clients. See how we've helped businesses
            transform and grow.
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="p-8">
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">
                    {study.industry}
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-4 mb-2">
                    {study.title}
                  </h2>
                  <p className="text-gray-400 mb-6">{study.description}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {result.value}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
