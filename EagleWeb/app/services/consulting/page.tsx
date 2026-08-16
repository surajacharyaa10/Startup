"use client";
import { motion } from "framer-motion";
import { FiTrendingUp, FiSearch, FiMap, FiShield, FiBriefcase, FiTarget } from "react-icons/fi";
import Link from "next/link";

export default function Consulting() {
  const features = [
    {
      icon: <FiSearch />,
      title: "Tech Audits",
      desc: "A comprehensive review of your current stack, code quality, and security posture to identify risks and opportunities.",
    },
    {
      icon: <FiMap />,
      title: "Roadmapping",
      desc: "Strategic planning to align your technology initiatives with your long-term business goals.",
    },
    {
      icon: <FiTrendingUp />,
      title: "Digital Transformation",
      desc: "Modernizing legacy systems and processes to improve efficiency and agility.",
    },
    {
      icon: <FiShield />,
      title: "Compliance & Security",
      desc: "Ensuring your systems meet industry standards (GDPR, HIPAA, SOC2) and are protected against threats.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-amber-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 font-medium text-sm mb-6 border border-amber-500/20">
              Strategic IT Consulting
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-amber-100 to-amber-300 text-transparent bg-clip-text mb-8 leading-tight">
              Clarity in a <br /> Complex World.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
              Technology moves fast. We help you navigate the noise, make informed decisions, and build a strategy that future-proofs your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-meeting">
                <button className="px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                  Get Strategic Advice
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:bg-zinc-900 transition-colors"
              >
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FiBriefcase className="text-zinc-500" /> Common Challenges
              </h3>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex gap-3"><span className="text-red-500">✕</span> Legacy systems slowing down innovation</li>
                <li className="flex gap-3"><span className="text-red-500">✕</span> Unclear technical direction</li>
                <li className="flex gap-3"><span className="text-red-500">✕</span> Security vulnerabilities and compliance risks</li>
                <li className="flex gap-3"><span className="text-red-500">✕</span> Difficulty scaling infrastructure</li>
              </ul>
            </div>

            <div className="p-8 bg-zinc-900 rounded-3xl border border-amber-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/5" />
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <FiTarget className="text-amber-400" /> Our Solutions
              </h3>
              <ul className="space-y-4 text-zinc-300 relative z-10">
                <li className="flex gap-3"><span className="text-green-500">✓</span> Modernization roadmaps & cloud migration</li>
                <li className="flex gap-3"><span className="text-green-500">✓</span> CTO-as-a-Service & architectural guidance</li>
                <li className="flex gap-3"><span className="text-green-500">✓</span> Comprehensive security audits & hardening</li>
                <li className="flex gap-3"><span className="text-green-500">✓</span> Scalable, cost-effective infrastructure design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Need a technical partner?
          </h2>
          <Link href="/book-meeting">
            <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
              Speak with a Consultant
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
