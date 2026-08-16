"use client";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiUsers,
  FiDownload,
  FiDollarSign,
  FiGlobe,
  FiActivity,
  FiAward,
  FiZap,
} from "react-icons/fi";
import { useState } from "react";

export default function ProjectMetrics() {
  const [selectedPeriod, setSelectedPeriod] = useState("All Time");
  const periods = ["Last Month", "Last Quarter", "Last Year", "All Time"];

  const overallMetrics = [
    { label: "Total Products", value: "45", icon: <FiAward />, change: "+5" },
    { label: "Active Users", value: "48K+", icon: <FiUsers />, change: "+12%" },
    {
      label: "Total Downloads",
      value: "250K+",
      icon: <FiDownload />,
      change: "+18%",
    },
    {
      label: "Revenue (ARR)",
      value: "$12M+",
      icon: <FiDollarSign />,
      change: "+25%",
    },
  ];

  const productPerformance = [
    {
      name: "Eagle Cloud Platform",
      category: "Graduated",
      users: "10,500",
      revenue: "$5.2M",
      growth: "+28%",
      satisfaction: "98%",
      uptime: "99.99%",
    },
    {
      name: "DataFlow Analytics",
      category: "Graduated",
      users: "5,200",
      revenue: "$4.1M",
      growth: "+22%",
      satisfaction: "97%",
      uptime: "99.95%",
    },
    {
      name: "SecureAuth Pro",
      category: "Graduated",
      users: "15,800",
      revenue: "$2.9M",
      growth: "+35%",
      satisfaction: "99%",
      uptime: "99.99%",
    },
    {
      name: "AI Assistant SDK",
      category: "Incubating",
      users: "1,200",
      revenue: "$180K",
      growth: "+45%",
      satisfaction: "92%",
      uptime: "99.5%",
    },
    {
      name: "DevOps Automation Hub",
      category: "Incubating",
      users: "890",
      revenue: "$120K",
      growth: "+38%",
      satisfaction: "94%",
      uptime: "99.7%",
    },
  ];

  const regionalData = [
    {
      region: "North America",
      users: "18.5K",
      revenue: "$6.2M",
      growth: "+22%",
    },
    { region: "Europe", users: "15.2K", revenue: "$3.8M", growth: "+28%" },
    {
      region: "Asia Pacific",
      users: "10.8K",
      revenue: "$1.5M",
      growth: "+42%",
    },
    {
      region: "Latin America",
      users: "2.5K",
      revenue: "$380K",
      growth: "+35%",
    },
    {
      region: "Middle East & Africa",
      users: "1.2K",
      revenue: "$220K",
      growth: "+48%",
    },
  ];

  const categoryMetrics = [
    { category: "Infrastructure", products: 8, users: "22K", revenue: "$7.5M" },
    { category: "Security", products: 6, users: "18K", revenue: "$3.2M" },
    { category: "Analytics", products: 5, users: "8K", revenue: "$1.8M" },
    { category: "AI/ML", products: 4, users: "3K", revenue: "$450K" },
    { category: "DevOps", products: 3, users: "2K", revenue: "$280K" },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Graduated":
        return "bg-green-600/20 text-green-400";
      case "Incubating":
        return "bg-yellow-600/20 text-yellow-400";
      default:
        return "bg-blue-600/20 text-blue-400";
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Project Metrics
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive analytics and performance metrics across all our
            products
          </p>
        </motion.div>

        {/* Period Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedPeriod === period
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >
              {period}
            </button>
          ))}
        </motion.div>

        {/* Overall Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {overallMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                  {metric.icon}
                </div>
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-semibold rounded-full">
                  {metric.change}
                </span>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
                {metric.value}
              </div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Product Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Product Performance
          </h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">
                      Category
                    </th>
                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm">
                      Users
                    </th>
                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm">
                      Growth
                    </th>
                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm">
                      Satisfaction
                    </th>
                    <th className="px-6 py-4 text-right text-gray-400 font-semibold text-sm">
                      Uptime
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productPerformance.map((product, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-semibold">
                        {product.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 ${getCategoryColor(
                            product.category
                          )} text-xs rounded-full`}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {product.users}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {product.revenue}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-green-400 font-semibold">
                          {product.growth}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {product.satisfaction}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {product.uptime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Regional Distribution
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalData.map((region, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiGlobe className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">
                    {region.region}
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Users</span>
                    <span className="text-white font-semibold">
                      {region.users}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Revenue</span>
                    <span className="text-white font-semibold">
                      {region.revenue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Growth</span>
                    <span className="text-green-400 font-semibold">
                      {region.growth}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Category Breakdown
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categoryMetrics.map((category, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="text-3xl font-bold text-blue-400">
                      {category.products}
                    </div>
                    <div className="text-gray-400 text-xs">Products</div>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <div className="text-sm text-gray-400">Users</div>
                    <div className="text-white font-semibold">
                      {category.users}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Revenue</div>
                    <div className="text-white font-semibold">
                      {category.revenue}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Key Insights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTrendingUp className="w-8 h-8" />,
                title: "Strong Growth",
                description: "25% YoY revenue growth across all products",
              },
              {
                icon: <FiActivity className="w-8 h-8" />,
                title: "High Engagement",
                description: "98% average customer satisfaction rate",
              },
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Reliable Performance",
                description: "99.9% average uptime across all services",
              },
            ].map((insight, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-4">
                  {insight.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {insight.title}
                </h3>
                <p className="text-gray-400">{insight.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
