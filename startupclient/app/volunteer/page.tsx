"use client";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiUsers,
  FiCalendar,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { getInvolvedApi } from "@/app/api/getInvolved";

interface VolunteerRole {
  id: string;
  title: string;
  description?: string;
  commitment?: string;
  skills: string[];
  openings: number;
  benefits: string[];
  link?: string;
  featured?: boolean;
  icon?: string;
}

export default function Volunteer() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [volunteerRoles, setVolunteerRoles] = useState<VolunteerRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getInvolvedApi.getOptions();
        // some backends use `category` instead of `type` — normalize by filtering both
        const filtered = (data ?? []).filter(
          (item: any) =>
            ((item?.type || item?.category || "") as string).toLowerCase() ===
            "volunteer"
        );

        setVolunteerRoles(
          filtered.map((item) => ({
            id: item._id,
            title: item.title,
            description: item.description,
            commitment: "Flexible",
            skills: (item.requirements ?? []) as string[],
            openings: Math.floor(Math.random() * 5) + 1,
            benefits: (item.benefits ?? []) as string[],
            link: item.link,
            icon: item.icon,
            featured: (item as any).featured ?? false,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch volunteer roles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Volunteer With Us
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Make a difference in the tech community. Share your skills, inspire
            others, and grow together.
          </p>
        </motion.div>

        {/* Why Volunteer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Volunteer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiHeart className="w-8 h-8" />,
                title: "Give Back",
                description: "Help others succeed in their tech journey",
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Build Network",
                description: "Connect with like-minded professionals",
              },
              {
                icon: <FiAward className="w-8 h-8" />,
                title: "Gain Experience",
                description: "Develop leadership and mentoring skills",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Volunteer Roles */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">
            Available Positions
          </h2>

          {/* Featured Roles */}
          {(volunteerRoles ?? []).filter((r: any) => r.featured).length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Featured Roles
              </h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {volunteerRoles
                  .filter((r: any) => r.featured)
                  .map((role, index) => (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative overflow-hidden rounded-3xl p-8 transition-all duration-300"
                      style={
                        (role as any).icon
                          ? ({
                              backgroundImage: `url(${(role as any).icon})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            } as any)
                          : undefined
                      }
                    >
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">
                            {role.title}
                          </h3>
                          <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full">
                            {role.openings} openings
                          </span>
                        </div>

                        <p className="text-gray-200 mb-6">{role.description}</p>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-2 text-gray-200">
                            <FiCalendar className="text-blue-400" />
                            <span>Commitment: {role.commitment}</span>
                          </div>

                          <div>
                            <p className="text-gray-200 mb-2">
                              Required Skills:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {role.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-lg"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setSelectedRole(
                              selectedRole === role.id ? null : role.id
                            )
                          }
                          className="text-blue-200 hover:text-blue-100 font-semibold mb-4 transition-colors"
                        >
                          {selectedRole === role.id
                            ? "Hide Benefits"
                            : "View Benefits"}
                        </button>

                        {selectedRole === role.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 mb-6"
                          >
                            {role.benefits.map((benefit, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 text-gray-200"
                              >
                                <FiCheckCircle className="text-green-400 shrink-0" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {role.link && (
                          <a
                            href={role.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block text-center px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full font-semibold text-blue-200 transition-all duration-300"
                          >
                            Apply Now
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          {/* Other Roles */}
          <div className="grid md:grid-cols-2 gap-8">
            {volunteerRoles
              .filter((r) => !r.featured)
              .map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl p-8 transition-all duration-300"
                  style={
                    (role as any).icon
                      ? ({
                          backgroundImage: `url(${(role as any).icon})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        } as any)
                      : undefined
                  }
                >
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">
                        {role.title}
                      </h3>
                      <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full">
                        {role.openings} openings
                      </span>
                    </div>

                    <p className="text-gray-200 mb-6">{role.description}</p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-200">
                        <FiCalendar className="text-blue-400" />
                        <span>Commitment: {role.commitment}</span>
                      </div>

                      <div>
                        <p className="text-gray-200 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {role.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white/5 text-gray-300 text-sm rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedRole(
                          selectedRole === role.id ? null : role.id
                        )
                      }
                      className="text-blue-200 hover:text-blue-100 font-semibold mb-4 transition-colors"
                    >
                      {selectedRole === role.id
                        ? "Hide Benefits"
                        : "View Benefits"}
                    </button>

                    {selectedRole === role.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 mb-6"
                      >
                        {role.benefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-gray-200"
                          >
                            <FiCheckCircle className="text-green-400 shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {role.link && (
                      <a
                        href={role.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full font-semibold text-blue-200 transition-all duration-300"
                      >
                        Apply Now
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Don't see a role that fits? We'd still love to hear from you!
          </p>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-white transition-all duration-300">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
