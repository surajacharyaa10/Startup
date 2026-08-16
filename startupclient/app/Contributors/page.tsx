"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useEffect, useState } from "react";
import API_URL from "@/app/api/url";

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  contributions: number;
  github: string;
  linkedin: string;
  twitter: string;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/contributors`);
        const result = await res.json();

        const data =
          result?.success && Array.isArray(result.data)
            ? result.data
            : Array.isArray(result)
              ? result
              : [];

        setContributors(data);
      } catch (err) {
        console.error("Failed to fetch contributors:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Our Contributors
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Meet the talented individuals who bring magic to life through their
            dedication, creativity, and exceptional skills.
          </p>
        </motion.div>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((contributor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    className="relative w-full h-full rounded-full border-4 border-white/20"
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {contributor.name}
                </h3>
                <p className="text-blue-400 mb-4">{contributor.role}</p>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-gray-400">Contributions:</span>
                  <span className="text-white font-semibold">
                    {contributor.contributions}
                  </span>
                </div>

                <div className="flex gap-4">
                  <a
                    href={contributor.github}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <FiGithub className="w-5 h-5 text-gray-300 hover:text-white" />
                  </a>
                  <a
                    href={contributor.linkedin}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <FiLinkedin className="w-5 h-5 text-gray-300 hover:text-blue-400" />
                  </a>
                  <a
                    href={contributor.twitter}
                    className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <FiTwitter className="w-5 h-5 text-gray-300 hover:text-blue-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to contribute to our
            projects.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105">
            Become a Contributor
          </button>
        </motion.div>
      </div>
    </section>
  );
}
