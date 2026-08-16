"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiCheck, FiUsers, FiGitBranch, FiAward } from "react-icons/fi";
import { projectsApi, Project } from "@/app/api/projects";
import API_URL from "@/app/api/url";

export default function GraduatedProjects() {
  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi
      .getProjects("graduated")
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-full mb-6">
            <FiAward className="w-5 h-5" />
            <span className="font-semibold">Production Ready</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Graduated Products
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Mature, production-ready products trusted by enterprises worldwide.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No graduated projects yet.</p>
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
                className="bg-white/5 backdrop-blur-sm border border-green-500/30 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-800">
                  {product.image && (
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                      <FiCheck /> Stable
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-green-400 mb-2">{product.tagline}</p>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FiUsers className="text-blue-400" />{" "}
                      {product.contributors} contributors
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitBranch className="text-yellow-400" />{" "}
                      {product.stars} stars
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded"
                      >
                        {t}
                      </span>
                    ))}
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
