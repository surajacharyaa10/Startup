"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import Link from "next/link";
import { contactApi } from "@/lib/api/contact";
import { ContactInfo } from "@/lib/types/contact";

export default function CTA() {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await contactApi.getContact();
        if (response.success && response.data) {
          setContact(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch contact details", error);
      }
    };
    fetchContactData();
  }, []);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center"
        >
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Build Something{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Amazing?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Let's turn your vision into reality. Get in touch with our team and
            start your digital transformation journey today.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <Link href="/contact">
              <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Start Your Project
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

            {contact?.whatsapp ? (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full font-semibold text-white backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2">
                  <FiMessageSquare /> Schedule a Call
                </button>
              </a>
            ) : (
              <Link href="/schedule">
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full font-semibold text-white backdrop-blur-sm transition-all duration-300">
                  Schedule a Call
                </button>
              </Link>
            )}
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <FiMail className="text-blue-400" />
              <span>{contact?.email || "Loading..."}</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-gray-600" />

            <div className="flex items-center gap-2">
              <FiPhone className="text-blue-400" />
              <span>{contact?.phone || "Loading..."}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
