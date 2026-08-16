"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArchive, FiUsers, FiGitBranch } from "react-icons/fi";
import { projectsApi, Project } from "@/app/api/projects";
import API_URL from "@/app/api/url";

export default function ArchivedProjects() {
  const [products, setProducts] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectsApi.getProjects("archived").then((data) => {
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const getImageUrl = (img: string) => img?.startsWith('/uploads') ? `${API_URL}${img}` : img;

  if (loading) return <div className="min-h-screen bg-gray-900 pt-32 flex items-center justify-center"><p className="text-white text-xl">Loading...</p></div>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600/20 text-gray-400 rounded-full mb-6">
            <FiArchive className="w-5 h-5" /><span className="font-semibold">Archived</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">Archived Projects</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">Projects that have been deprecated or superseded by newer solutions.</p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-400 text-lg">No archived projects.</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden opacity-75 hover:opacity-100 transition-all">
                <div className="relative h-32 overflow-hidden bg-gray-800 grayscale">
                  {product.image && <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.tagline}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><FiUsers /> {product.contributors}</span>
                    <span className="flex items-center gap-1"><FiGitBranch /> {product.stars}</span>
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
