"use client";
import { motion } from "framer-motion";
import { FiSmartphone, FiWifi, FiLayers, FiGlobe, FiCheckCircle, FiCpu, FiCommand } from "react-icons/fi";
import Link from "next/link";

export default function MobileDevelopment() {
  const features = [
    {
      icon: <FiSmartphone />,
      title: "Native Performance",
      desc: "Apps that feel buttery smooth and leverage the full power of the device hardware.",
    },
    {
      icon: <FiWifi />,
      title: "Offline First",
      desc: "Robust local databases ensure your users can work seamlessly even without internet.",
    },
    {
      icon: <FiLayers />,
      title: "Cross-Platform",
      desc: "Write once, run everywhere. We use React Native and Flutter to cut development time in half.",
    },
    {
      icon: <FiGlobe />,
      title: "Global Scale",
      desc: "Localization, internationalization, and global CDN delivery ready from day one.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 font-medium text-sm mb-6 border border-purple-500/20">
              Mobile App Engineering
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-purple-300 text-transparent bg-clip-text mb-8 leading-tight">
              Apps Your Users Will <br /> Love to Touch.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
              In a mobile-first world, "good enough" doesn't cut it. We build intuitive, powerful mobile experiences that earn 5-star reviews and high retention rates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-meeting">
                <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                  Start Your Project
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
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Native vs. Cross-Platform?</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                It's the most common question we get. The answer? It depends on your goals. We help you choose the right path.
              </p>

              <div className="space-y-8">
                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
                    <FiCommand className="text-blue-400" /> React Native / Flutter
                  </h4>
                  <p className="text-zinc-400 text-sm mb-4">Best for: Startups, rapid MVP, sharing code between web & mobile.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-zinc-500"><FiCheckCircle className="mr-2 text-green-500" /> Single codebase for iOS & Android</li>
                    <li className="flex items-center text-sm text-zinc-500"><FiCheckCircle className="mr-2 text-green-500" /> Faster time to market</li>
                  </ul>
                </div>

                <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
                    <FiCpu className="text-purple-400" /> Native (Swift / Kotlin)
                  </h4>
                  <p className="text-zinc-400 text-sm mb-4">Best for: High-performance games, AR/VR, heavy hardware integration.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-zinc-500"><FiCheckCircle className="mr-2 text-green-500" /> Maximum performance</li>
                    <li className="flex items-center text-sm text-zinc-500"><FiCheckCircle className="mr-2 text-green-500" /> Full access to latest OS features</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative h-[600px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 overflow-hidden shadow-2xl">
              {/* Abstract Phone UI Representation */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-zinc-800 rounded-b-2xl z-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
              <div className="p-8 pt-20 space-y-6">
                <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                  <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Have an app idea?
          </h2>
          <Link href="/book-meeting">
            <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
              Let's Build It
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
