"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { servicesData, whyChooseUs } from "./data";
import { FiArrowRight } from "react-icons/fi";

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text mb-6">
                            Our Expertise
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            We deliver comprehensive digital solutions that transform businesses.
                            From concept to code, we are your partners in innovation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:bg-zinc-900 transition-colors duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-900/10">
                                        <service.icon size={28} />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-200 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-zinc-400 mb-8 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-zinc-500">
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={service.link}
                                        className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors group/link"
                                    >
                                        Learn more
                                        <FiArrowRight className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-32 bg-zinc-900/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            We bring more than just technical skills to the table. We bring a partnership mindset.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-900/20">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-zinc-400 text-transparent bg-clip-text">
                        Ready to Build Something Amazing?
                    </h2>
                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Let's turn your vision into reality. Schedule a consultation with our experts today.
                    </p>
                    <Link href="/book-meeting">
                        <button className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                            Start Your Project
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
