"use client";
import { motion } from "framer-motion";
import { FiCloud, FiServer, FiLock, FiActivity, FiSettings, FiDatabase, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

export default function CloudSolutions() {
  const features = [
    {
      icon: <FiCloud />,
      title: "Cloud Native",
      desc: "Architectures designed specifically for the cloud, utilizing microservices and serverless functions.",
    },
    {
      icon: <FiRefreshCw />,
      title: "CI/CD Pipelines",
      desc: "Automated testing and deployment flows that let you ship code multiple times a day with confidence.",
    },
    {
      icon: <FiLock />,
      title: "DevSecOps",
      desc: "Security isn't an afterthought. It's integrated into every step of the build and deploy process.",
    },
    {
      icon: <FiActivity />,
      title: "24/7 Monitoring",
      desc: "Real-time observability stacks that alert us to issues before your users even notice them.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-zinc-950 to-zinc-950" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-medium text-sm mb-6 border border-cyan-500/20">
              Cloud & DevOps
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-100 to-cyan-300 text-transparent bg-clip-text mb-8 leading-tight">
              Scale Without <br /> Growing Pains.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
              Your infrastructure should be an asset, not a bottleneck. We build resilient, auto-scaling cloud systems that handle millions of requests without breaking a sweat.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/book-meeting">
                <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)]">
                  Optimize Your Cloud
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
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure as Code */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Infrastructure as Code (IaC)</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                We don't manually click buttons in the AWS console. We define your entire infrastructure in code (Terraform, Pulumi), making it version-controlled, reproducible, and audit-ready.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-zinc-900 rounded-xl border border-white/5">
                  <FiSettings className="text-cyan-400 text-2xl mb-3" />
                  <h4 className="font-bold text-white mb-1">Reproducible</h4>
                  <p className="text-xs text-zinc-500">Spin up staging envs in minutes.</p>
                </div>
                <div className="p-4 bg-zinc-900 rounded-xl border border-white/5">
                  <FiDatabase className="text-cyan-400 text-2xl mb-3" />
                  <h4 className="font-bold text-white mb-1">Disaster Recovery</h4>
                  <p className="text-xs text-zinc-500">Restore entire stacks instantly.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-white/10 shadow-2xl font-mono text-sm overflow-hidden">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-blue-400">resource <span className="text-yellow-300">"aws_s3_bucket"</span> <span className="text-green-300">"app_data"</span> {`{`}</div>
              <div className="pl-4 text-white">bucket = <span className="text-green-300">"startup-production-data"</span></div>
              <div className="pl-4 text-white">acl    = <span className="text-green-300">"private"</span></div>
              <div className="pl-4 text-white">tags = {`{`}</div>
              <div className="pl-8 text-white">Environment = <span className="text-green-300">"Production"</span></div>
              <div className="pl-8 text-white">ManagedBy   = <span className="text-green-300">"Terraform"</span></div>
              <div className="pl-4 text-white">{`}`}</div>
              <div className="text-blue-400">{`}`}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Stop worrying about downtime.
          </h2>
          <Link href="/book-meeting">
            <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
              Talk to an Architect
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
