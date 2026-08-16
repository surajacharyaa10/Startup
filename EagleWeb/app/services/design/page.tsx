"use client";
import { motion } from "framer-motion";
import { FiLayout, FiPenTool, FiUsers, FiGrid, FiFigma, FiLayers } from "react-icons/fi";
import Link from "next/link";

export default function ProductDesign() {
    const features = [
        {
            icon: <FiUsers />,
            title: "User Research",
            desc: "We don't guess. We interview, test, and validate assumptions with real users to ensure we're solving the right problems.",
        },
        {
            icon: <FiLayout />,
            title: "Wireframing",
            desc: "Low-fidelity blueprints that let us iterate on structure and flow rapidly before committing to pixels.",
        },
        {
            icon: <FiPenTool />,
            title: "Visual Design",
            desc: "Stunning, pixel-perfect interfaces that align with your brand and delight your users.",
        },
        {
            icon: <FiGrid />,
            title: "Design Systems",
            desc: "Scalable component libraries that ensure consistency and speed up development across your entire product suite.",
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-pink-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-900/20 via-zinc-950 to-zinc-950" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-400 font-medium text-sm mb-6 border border-pink-500/20">
                            Product Design (UI/UX)
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-pink-100 to-pink-300 text-transparent bg-clip-text mb-8 leading-tight">
                            Design That Works <br /> As Good As It Looks.
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mb-10">
                            Great design isn't just about aesthetics; it's about how it works. We craft intuitive, accessible, and beautiful experiences that drive engagement and retention.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/book-meeting">
                                <button className="px-8 py-4 bg-pink-600 hover:bg-pink-700 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)]">
                                    Start Designing
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
                                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-6 text-2xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16">Our Design Toolkit</h2>

                    <div className="flex flex-wrap justify-center gap-12 opacity-70">
                        <div className="flex flex-col items-center gap-4">
                            <FiFigma size={48} className="text-white" />
                            <span className="font-medium">Figma</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <FiLayers size={48} className="text-white" />
                            <span className="font-medium">Adobe CC</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <FiLayout size={48} className="text-white" />
                            <span className="font-medium">Sketch</span>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <FiPenTool size={48} className="text-white" />
                            <span className="font-medium">Principle</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Let's create something beautiful.
                    </h2>
                    <Link href="/book-meeting">
                        <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors">
                            Book a Design Review
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
