"use client";
import { motion } from "framer-motion";
import { FiCode, FiZap, FiShield, FiTrendingUp, FiLayout, FiServer, FiDatabase, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export default function WebDevelopment() {
  const features = [
    {
      icon: <FiLayout />,
      title: "Responsive & Adaptive",
      desc: "Interfaces that flow naturally across every device size, from 4K monitors to the smallest phones.",
    },
    {
      icon: <FiZap />,
      title: "Performance First",
      desc: "Sub-second load times and 60fps animations. We optimize every byte for speed.",
    },
    {
      icon: <FiShield />,
      title: "Fortress Security",
      desc: "Bank-grade encryption, secure headers, and regular penetration testing baked in.",
    },
    {
      icon: <FiTrendingUp />,
      title: "SEO Native",
      desc: "Built with semantic HTML and server-side rendering to dominate search rankings.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      desc: "We dive deep into your business goals, user needs, and market landscape to build a roadmap for success."
    },
    {
      step: "02",
      title: "UX/UI Design",
      desc: "Crafting intuitive user journeys and stunning visuals that align with your brand identity."
    },
    {
      step: "03",
      title: "Agile Development",
      desc: "Iterative coding sprints with regular demos, ensuring you're always in the loop."
    },
    {
      step: "04",
      title: "Launch & Scale",
      desc: "Seamless deployment to global CDNs, followed by monitoring and continuous improvement."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm mb-6 border border-blue-500/20">
              Web Application Development
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text mb-8 leading-tight">
              We Build The Web's <br /> Next Big Thing.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
              Forget cookie-cutter templates. We engineer bespoke web applications that are fast, secure, and designed to convert visitors into loyal users.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-meeting">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Start Your Project
                </button>
              </Link>
              <Link href="/projects/graduated">
                <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-full font-bold transition-all">
                  View Our Work
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
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Technology Stack</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                We don't chase trends blindly. We choose battle-tested technologies that offer the best balance of performance, developer experience, and long-term maintainability.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-blue-400"><FiCheckCircle size={20} /></div>
                  <div>
                    <h4 className="font-bold text-white">Frontend Excellence</h4>
                    <p className="text-zinc-500 text-sm">React, Next.js, Tailwind CSS, Framer Motion</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-purple-400"><FiServer size={20} /></div>
                  <div>
                    <h4 className="font-bold text-white">Robust Backend</h4>
                    <p className="text-zinc-500 text-sm">Node.js, Python, Go, Serverless Functions</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 text-pink-400"><FiDatabase size={20} /></div>
                  <div>
                    <h4 className="font-bold text-white">Scalable Data</h4>
                    <p className="text-zinc-500 text-sm">PostgreSQL, MongoDB, Redis, Supabase</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
              <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 grid grid-cols-2 gap-4">
                {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((tech) => (
                  <div key={tech} className="bg-zinc-950/50 p-4 rounded-xl text-center font-mono text-sm text-zinc-300 border border-white/5">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How We Work</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              A transparent, collaborative process designed to deliver results, not just code.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-white/5 mb-4 font-mono">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                {index !== process.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to upgrade your web presence?
          </h2>
          <Link href="/book-meeting">
            <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
              Schedule a Consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
