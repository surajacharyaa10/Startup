"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { FiTarget, FiTrendingUp } from "react-icons/fi";
import API_URL from "@/app/api/url";

// Animated Counter Component
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number | string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (typeof value === "number" && isInView) motionValue.set(value);
    else if (typeof value === "string" && ref.current)
      ref.current.textContent = value;
  }, [value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && typeof value === "number") {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

// About Component
export default function About() {
  const [data, setData] = useState<{
    vision?: string;
    mission?: string;
    coreValues?: {
      icon: string;
      title: string;
      desc: string;
      bg: string;
    }[];
    stats?: {
      ProjectComplete?: number;
      HappyClient?: number;
      ClientSatisfaction?: number;
      Experience?: number;
      Support?: string;
    };
    whatWeOffer?: {
      section: string;
      items: { title: string }[];
    }[];
  } | null>(null);

  // Normalize BSON to JS values
  const normalizeBSON = (value: any): any => {
    if (value === null || typeof value !== "object") return value;

    const keys = Object.keys(value);
    if (keys.length === 1) {
      const k = keys[0];
      if (k === "$numberInt" || k === "$numberLong") return Number(value[k]);
      if (k === "$oid") return String(value[k]);
      if (k === "$date") {
        const dv = value[k];
        if (dv && typeof dv === "object") {
          if (dv.$numberLong)
            return new Date(Number(dv.$numberLong)).toISOString();
        }
        return new Date(String(dv)).toISOString();
      }
    }

    if (Array.isArray(value)) return value.map(normalizeBSON);

    const out: any = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = normalizeBSON(v);
    }
    return out;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/about`);
        const result = await res.json();
        let aboutObj = result?.success && result.data ? result.data : result;
        if (Array.isArray(aboutObj) && aboutObj.length > 0)
          aboutObj = aboutObj[0];

        if (aboutObj) {
          const normalized = normalizeBSON(aboutObj);

          // If stats are missing, fetch separately
          if (!normalized.stats) {
            try {
              const statsRes = await fetch(`${API_URL}/stats`);
              const statsJson = await statsRes.json();
              normalized.stats =
                statsJson?.success && statsJson.data
                  ? normalizeBSON(statsJson.data)
                  : {};
            } catch (statsErr) {
              console.warn("Failed to fetch /stats:", statsErr);
            }
          }

          setData(normalized);
        }
      } catch (err) {
        console.error("Failed to fetch About data:", err);
      }
    };
    fetchData();
  }, []);

  const safeStats = {
    ProjectComplete: data?.stats?.ProjectComplete ?? 0,
    HappyClient: data?.stats?.HappyClient ?? 0,
    ClientSatisfaction: data?.stats?.ClientSatisfaction ?? 0,
    Experience: data?.stats?.Experience ?? 0,
    Support: data?.stats?.Support ?? "N/A",
  };

  const displayStats = [
    {
      value: safeStats.ProjectComplete,
      suffix: "+",
      label: "Projects Completed",
    },
    { value: safeStats.HappyClient, suffix: "+", label: "Happy Clients" },
    {
      value: safeStats.ClientSatisfaction,
      suffix: "%",
      label: "Client Satisfaction",
    },
    { value: safeStats.Experience, suffix: "", label: "Years Experience" },
    { value: safeStats.Support, suffix: "", label: "Support Available" },
  ];

  const safeCoreValues = data?.coreValues ?? [];
  const safeOffers = data?.whatWeOffer ?? [];

  const servicesSection = safeOffers.find((s) =>
    s.section.toLowerCase().includes("service")
  ) ?? { section: "Services-Based Solutions", items: [] };

  const productsSection = safeOffers.find((s) =>
    s.section.toLowerCase().includes("product")
  ) ?? { section: "Product-Based Solutions", items: [] };

  return (
    <section className="w-full min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            About Eagle Infotech
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mt-6 leading-relaxed max-w-4xl mx-auto">
            {data
              ? "We deliver innovative services and cutting-edge products that empower organizations through intelligent automation, scalable solutions, and future-ready digital ecosystems."
              : "Loading company description..."}
          </p>

          {/* Stats */}
          {data ? (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8">
              {displayStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-gray-400 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-16">Loading stats...</p>
          )}
        </motion.div>
      </div>

      {/* Vision & Mission */}
      {data && (
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
              <FiTarget className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {data.vision}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
              <FiTrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {data.mission}
            </p>
          </motion.div>
        </div>
      )}

      {/* Core Values */}
      {data && (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-400 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeCoreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300 group"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 ${value.bg} rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}
                >
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* What We Offer */}
      {safeOffers.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What We Offer
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive solutions tailored to your needs
            </p>
          </motion.div>

          <div className="mt-20 grid md:grid-cols-2 gap-8">
            {/* Services Card */}
            {servicesSection && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-6xl mb-6">🛠️</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {servicesSection.section}
                </h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Custom-tailored services designed to meet your unique business
                  requirements.
                </p>
                <ul className="space-y-3 text-gray-300">
                  {servicesSection.items.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">{item.icon || "✓"}</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Products Card */}
            {productsSection && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-6xl mb-6">📦</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {productsSection.section}
                </h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Ready-to-deploy products and platforms that scale with your
                  business growth.
                </p>
                <ul className="space-y-3 text-gray-300">
                  {productsSection.items.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">{item.icon || "✓"}</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
