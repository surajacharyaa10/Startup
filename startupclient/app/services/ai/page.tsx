"use client";
import { motion } from "framer-motion";
import { FiCpu, FiEye, FiMessageSquare, FiTrendingUp, FiGitBranch, FiDatabase } from "react-icons/fi";
import Link from "next/link";

export default function AISolutions() {
    const features = [
        {
            icon: <FiTrendingUp />,
            title: "Predictive Analytics",
            desc: "Forecast trends, demand, and user behavior with high accuracy using historical data.",
        },
        {
            icon: <FiMessageSquare />,
            title: "NLP & Chatbots",
            desc: "Intelligent conversational agents that understand context, sentiment, and intent.",
        },
        {
            icon: <FiEye />,
            title: "Computer Vision",
            desc: "Automate visual inspections, facial recognition, and object detection workflows.",
        },
        {
            icon: <FiGitBranch />,
            title: "Custom Models",
            desc: "We don't just use APIs. We train and fine-tune models specifically for your unique dataset.",
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-6 border border-emerald-500/20">
                            Artificial Intelligence
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-emerald-100 to-emerald-300 text-transparent bg-clip-text mb-8 leading-tight">
                            Turn Data Into <br /> Superpowers.
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
                            AI isn't just a buzzword—it's a competitive advantage. We help you harness the power of machine learning to automate the mundane and discover the impossible.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/book-meeting">
                                <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)]">
                                    Explore AI Solutions
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
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 text-2xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Real World Applications</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FiCpu size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Automated Support</h3>
                            <p className="text-zinc-400 mb-6">Reduce support ticket volume by 60% with AI agents that can resolve common queries instantly and accurately.</p>
                            <div className="text-emerald-400 font-mono text-sm">Result: 24/7 Availability</div>
                        </div>

                        <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FiDatabase size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Fraud Detection</h3>
                            <p className="text-zinc-400 mb-6">Analyze transaction patterns in real-time to flag and block suspicious activity before it causes damage.</p>
                            <div className="text-emerald-400 font-mono text-sm">Result: 99.9% Accuracy</div>
                        </div>

                        <div className="p-8 bg-zinc-900 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <FiTrendingUp size={100} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Demand Forecasting</h3>
                            <p className="text-zinc-400 mb-6">Optimize inventory and resource allocation by predicting future demand based on seasonality and trends.</p>
                            <div className="text-emerald-400 font-mono text-sm">Result: 30% Cost Reduction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Ready to innovate?
                    </h2>
                    <Link href="/book-meeting">
                        <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
                            Consult with AI Experts
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
