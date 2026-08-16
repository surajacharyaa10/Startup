"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import API_URL from "@/app/api/url";

interface StatsType {
  ProjectComplete: number;
  HappyClient: number;
  ClientSatisfaction: number;
  Experience: number;
  Support: string;
}

// BSON/extended-JSON normalizer used by the stats endpoint
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

export default function Stats() {
  const [stats, setStats] = useState<StatsType | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/stats`);
        const data = await res.json();
        // backend may return either { success, data } or the raw object or an array.
        if (data) {
          let statsObj = data && data.success && data.data ? data.data : data;
          if (Array.isArray(statsObj) && statsObj.length > 0)
            statsObj = statsObj[0];
          if (
            statsObj &&
            (typeof statsObj.ProjectComplete !== "undefined" ||
              typeof statsObj.HappyClient !== "undefined" ||
              typeof statsObj.ClientSatisfaction !== "undefined" ||
              typeof statsObj.Experience !== "undefined" ||
              typeof statsObj.Support !== "undefined")
          ) {
            setStats(normalizeBSON(statsObj) as StatsType);
          } else {
            console.warn("/stats returned unexpected shape:", data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-center py-32">Loading stats...</p>;

  const displayStats = [
    { value: stats.ProjectComplete, suffix: "+", label: "Projects Completed" },
    { value: stats.HappyClient, suffix: "+", label: "Happy Clients" },
    {
      value: stats.ClientSatisfaction,
      suffix: "%",
      label: "Client Satisfaction",
    },
    { value: stats.Experience, suffix: "", label: "Years Experience" },
    { value: stats.Support, suffix: "", label: "Support Available" },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        {displayStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
