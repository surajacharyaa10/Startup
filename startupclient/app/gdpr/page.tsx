"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiUser,
  FiLock,
  FiFileText,
  FiTrash2,
  FiDownload,
} from "react-icons/fi";
import { contactApi } from "@/lib/api/contact";
import { ContactInfo } from "@/lib/types/contact";

export default function GDPR() {
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      const response = await contactApi.getContact();
      if (response.success && response.data) {
        setContact(response.data);
      }
    };
    fetchContactData();
  }, []);

  const rights = [
    {
      icon: FiUser,
      title: "Right to Access",
      description:
        "You have the right to request copies of your personal data.",
    },
    {
      icon: FiFileText,
      title: "Right to Rectification",
      description:
        "You have the right to request correction of inaccurate or incomplete data.",
    },
    {
      icon: FiTrash2,
      title: "Right to Erasure",
      description:
        "You have the right to request deletion of your personal data.",
    },
    {
      icon: FiLock,
      title: "Right to Restrict Processing",
      description:
        "You have the right to request restriction of processing your data.",
    },
    {
      icon: FiDownload,
      title: "Right to Data Portability",
      description:
        "You have the right to request transfer of your data to another organization.",
    },
    {
      icon: FiShield,
      title: "Right to Object",
      description:
        "You have the right to object to processing of your personal data.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
            <FiShield className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            GDPR Compliance
          </h1>
          <p className="text-gray-400 text-lg">
            General Data Protection Regulation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Our Commitment to GDPR</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Eagle Infotech is committed to protecting your personal data and
            respecting your privacy rights under the General Data Protection
            Regulation (GDPR). We ensure that all personal data is processed
            lawfully, fairly, and transparently.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We collect and process personal data only when we have a legal basis
            to do so, and we take appropriate security measures to protect your
            information.
          </p>
        </motion.div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Your GDPR Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rights.map((right, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <right.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {right.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{right.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 bg-white/5 border border-white/10 rounded-xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Data Protection Officer</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We have appointed a Data Protection Officer (DPO) who is responsible
            for overseeing our data protection strategy and implementation to
            ensure compliance with GDPR requirements.
          </p>
          <p className="text-gray-300">
            You can contact our DPO at:{" "}
            <span className="text-blue-400">{contact?.email || "Loading..."}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="p-6 bg-white/5 border border-white/10 rounded-xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">
            How to Exercise Your Rights
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            To exercise any of your GDPR rights, please submit a request to our
            Data Protection Officer. We will respond to your request within 30
            days.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Verify your identity for security purposes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Specify which right you wish to exercise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>
                Provide any relevant details to help us process your request
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about GDPR or how we handle your personal
            data:
          </p>
          <div className="space-y-2">
            <p className="text-gray-300">
              Email:{" "}
              <span className="text-blue-400">{contact?.email || "Loading..."}</span>
            </p>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
