"use client";
import { motion } from "framer-motion";
import { FiGithub, FiCode, FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getInvolvedApi } from "@/app/api/getInvolved";

export default function Contribute() {
  // raw options from API (keep raw so we can render featured items)
  const [rawOptions, setRawOptions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // contributionTypes removed — we now drive UI directly from API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // fetch all options and let client-side filters handle 'type' vs 'category'
        const data = await getInvolvedApi.getOptions();
        setRawOptions(data ?? []);
      } catch (error) {
        console.error("Failed to fetch contribution options", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600/20 text-green-400";
      case "Intermediate":
        return "bg-yellow-600/20 text-yellow-400";
      case "Advanced":
        return "bg-red-600/20 text-red-400";
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
            Contribute to Projects
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Join our open-source community and help build amazing software that
            makes a difference.
          </p>

          <div className="mb-6 flex items-center justify-center">
            <div className="w-full max-w-2xl relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects, skills, tags..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Featured Projects (driven from API) + All Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {(rawOptions ?? [])
              .filter(
                (o) =>
                  ((o?.type || o?.category || "") as string).toLowerCase() ===
                  "contribute"
              )
              .filter((o) => o?.featured)
              .filter((o) => {
                if (!searchTerm) return true;
                const s = searchTerm.toLowerCase();
                return (
                  String(o.title || "")
                    .toLowerCase()
                    .includes(s) ||
                  (o.benefits || []).join(" ").toLowerCase().includes(s) ||
                  (o.requirements || []).join(" ").toLowerCase().includes(s)
                );
              })
              .map((item: any, index: number) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl p-8 transition-all duration-300 group"
                  style={
                    item.icon
                      ? ({
                          backgroundImage: `url(${item.icon})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        } as any)
                      : undefined
                  }
                >
                  {/* dark overlay so text is readable */}
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-200">{item.description}</p>
                      </div>
                      <FiGithub className="w-8 h-8 text-gray-200 group-hover:text-white transition-colors shrink-0" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                      {(item.benefits && item.benefits[0]) || "Open Source"}
                    </span>
                    <span className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                      {item.requirements?.slice(0, 2).join(", ") || "Skills"}
                    </span>
                  </div>

                  <div className="flex gap-3 items-center">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transform rounded-full font-semibold text-white transition-all duration-300"
                      >
                        <FiGithub />
                        Contribute on GitHub
                      </a>
                    ) : (
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-white transition-all duration-300">
                        <FiGithub />
                        View
                      </button>
                    )}
                    <span className="ml-auto text-xs text-gray-400">
                      {new Date(
                        item.createdAt || item.createdAtISO || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-white">All Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {(rawOptions ?? [])
              .filter(
                (o) =>
                  ((o?.type || o?.category || "") as string).toLowerCase() ===
                  "contribute"
              )
              .filter((o) => !o?.featured)
              .filter((o) => {
                if (!searchTerm) return true;
                const s = searchTerm.toLowerCase();
                return (
                  String(o.title || "")
                    .toLowerCase()
                    .includes(s) ||
                  (o.benefits || []).join(" ").toLowerCase().includes(s) ||
                  (o.requirements || []).join(" ").toLowerCase().includes(s)
                );
              })
              .map((item: any, index: number) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl p-8 transition-all duration-300 group"
                  style={
                    item.icon
                      ? ({
                          backgroundImage: `url(${item.icon})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        } as any)
                      : undefined
                  }
                >
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-200">{item.description}</p>
                      </div>
                      <FiGithub className="w-8 h-8 text-gray-200 group-hover:text-white transition-colors shrink-0" />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                        {(item.benefits && item.benefits[0]) || "Open Source"}
                      </span>
                      <span className="px-3 py-1 bg-white/5 text-shadow-gray-950 text-sm rounded-full">
                        {item.requirements?.slice(0, 2).join(", ") || "Skills"}
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transform rounded-full font-semibold text-white transition-all duration-300"
                        >
                          <FiGithub />
                          Contribute on GitHub
                        </a>
                      ) : (
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-white transition-all duration-300">
                          <FiGithub />
                          View
                        </button>
                      )}
                      <span className="ml-auto text-xs text-gray-200">
                        {new Date(
                          item.createdAt || item.createdAtISO || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Getting Started removed — streamlined contribute UI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Ready to Get Started?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                step: "1",
                title: "Pick a Project",
                desc: "Choose a project that interests you",
              },
              {
                step: "2",
                title: "Read Guidelines",
                desc: "Review contribution guidelines",
              },
              {
                step: "3",
                title: "Start Contributing",
                desc: "Submit your first PR",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              View All Projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
