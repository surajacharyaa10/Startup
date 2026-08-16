"use client";
import { motion } from "framer-motion";
import { FiMapPin, FiBriefcase, FiClock, FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getInvolvedApi } from "@/app/api/getInvolved";

export default function Careers() {
  const [openings, setOpenings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getInvolvedApi.getOptions();
        // backend sometimes stores category instead of type — accept both
        const filtered = (data ?? []).filter(
          (item: any) =>
            ((item?.type || item?.category || "") as string).toLowerCase() ===
            "careers"
        );

        setOpenings(filtered ?? []);
      } catch (err) {
        console.error("Failed to fetch careers", err);
        setOpenings([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Join Our Team
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Build the future with us. We're looking for passionate and talented
            individuals ready to make an impact.
          </p>
        </motion.div>

        {/* Featured jobs */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Jobs</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {openings
              .filter((j) => j.featured)
              .map((job, index) => (
                <motion.div
                  key={job._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl p-8 transition-all duration-300"
                  style={
                    job.icon || job.image
                      ? ({
                          backgroundImage: `url(${job.icon || job.image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        } as any)
                      : undefined
                  }
                >
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {job.title}
                    </h3>
                    <p className="text-gray-200 mb-6">{job.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <FiBriefcase className="text-blue-400" />
                        <span>{job.department || job.dept || ""}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <FiMapPin className="text-blue-400" />
                        <span>{job.location || "Remote"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <FiClock className="text-blue-400" />
                        <span>{job.jobType || job.type || "—"}</span>
                      </div>
                    </div>

                    <a
                      href={job.applyLink || job.link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 items-center justify-center gap-2"
                    >
                      Apply Now
                      <FiArrowRight />
                    </a>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Other jobs */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Other Openings</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {openings
              .filter((j) => !j.featured)
              .map((job, index) => (
                <motion.div
                  key={job._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl p-8 transition-all duration-300"
                  style={
                    job.icon || job.image
                      ? ({
                          backgroundImage: `url(${job.icon || job.image})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        } as any)
                      : undefined
                  }
                >
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {job.title}
                    </h3>
                    <p className="text-gray-200 mb-6">{job.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <FiBriefcase className="text-blue-400" />
                        <span>{job.department || job.dept || ""}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <FiMapPin className="text-blue-400" />
                        <span>{job.location || "Remote"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-200 text-sm">
                        <FiClock className="text-blue-400" />
                        <span>{job.jobType || job.type || "—"}</span>
                      </div>
                    </div>

                    <a
                      href={job.applyLink || job.link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 items-center justify-center gap-2"
                    >
                      Apply Now
                      <FiArrowRight />
                    </a>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
