"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API_URL from "@/app/api/url";

type Service = {
  title?: string;
  name?: string; // some backends use `name`
  desc?: string;
  description?: string;
  icon?: string;
  bg?: string;
  color?: string;
};

// normalize MongoDB extended JSON
function normalizeBSON(value: any): any {
  if (value === null || typeof value !== "object") return value;
  const keys = Object.keys(value);
  if (keys.length === 1) {
    const k = keys[0];
    if (k === "$numberInt" || k === "$numberLong") return Number(value[k]);
    if (k === "$oid") return String(value[k]);
    if (k === "$date") {
      const dv = value[k];
      if (dv && typeof dv === "object" && dv.$numberLong)
        return new Date(Number(dv.$numberLong)).toISOString();
      return new Date(String(dv)).toISOString();
    }
  }
  if (Array.isArray(value)) return value.map(normalizeBSON);
  const out: any = {};
  for (const [k, v] of Object.entries(value)) out[k] = normalizeBSON(v);
  return out;
}

export default function Services() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/services`);
        const data = await res.json().catch(() => null);
        let body = data && data.success && data.data ? data.data : data;
        if (!body) {
          // backend returned nothing useful
          setServices([]);
          return;
        }
        if (!Array.isArray(body)) {
          // sometimes an object is returned; attempt to find array property or wrap
          if (Array.isArray(body.services)) body = body.services;
          else body = [body];
        }
        const normalized = normalizeBSON(body) as Service[];
        setServices(normalized);
      } catch (err) {
        console.warn("Failed to fetch /services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const items = services ?? [];

  return (
    <section className="min-h-screen bg-black pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Our Services
          </h2>
          <h3 className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to accelerate your digital
            transformation journey.
          </h3>
        </div>
        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-400 col-span-3 py-12">
              Loading services...
            </p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-400 col-span-3 py-12">
              No services available.
            </p>
          ) : (
            items.map((service, index) => {
              const title = service.title || service.name || "Service";
              const desc = service.desc || service.description || "";
              const icon = service.icon || "⚙️";
              const color =
                service.bg || service.color || "from-indigo-500 to-purple-500";
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}
                  >
                    {icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-center leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>
    </section>
  );
}
