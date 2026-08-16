"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiTrendingUp, FiUsers, FiGitBranch, FiZap } from "react-icons/fi";
import { projectsApi, Project } from "@/app/api/projects";
import API_URL from "@/app/api/url";

export default function IncubatingProjects() {
  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi
      .getProjects("incubating")
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getMaturityColor = (maturity: string) => {
    const value = parseInt(maturity);
    if (value >= 80) return "text-green-400";
    if (value >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  const getImageUrl = (img: string) =>
    img?.startsWith("/uploads") ? `${API_URL}${img}` : img;

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 pt-32 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/20 text-yellow-400 rounded-full mb-6">
            <FiZap className="w-5 h-5" />
            <span className="font-semibold">Growing Fast</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Incubating Products
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Innovative products in active development. Join early and help shape
            the future.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No incubating projects yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  {product.image && (
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-yellow-600 text-white text-sm font-semibold rounded-full">
                      {product.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-blue-400">{product.tagline}</p>
                    </div>
                    <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                      {product.version}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Maturity</span>
                      <span
                        className={`font-semibold ${getMaturityColor(
                          product.maturity
                        )}`}
                      >
                        {product.maturity}
                      </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: product.maturity }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FiUsers className="text-blue-400" />
                      <span>{product.contributors} contributors</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FiGitBranch className="text-yellow-400" />
                      <span>{product.stars} stars</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">
                      Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.techStack.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <FiTrendingUp className="text-green-400" />
                      <span>{product.roadmap}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
