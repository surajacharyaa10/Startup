"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { contactApi } from "@/lib/api/contact";
import { ContactInfo } from "@/lib/types/contact";

export default function TermsOfService() {
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

  const sections = [
    {
      icon: FiCheckCircle,
      title: "Acceptance of Terms",
      content:
        "By accessing and using Eagle Infotech's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: FiFileText,
      title: "Use License",
      content:
        "Permission is granted to temporarily access the materials (information or software) on Eagle Infotech's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
    },
    {
      icon: FiAlertCircle,
      title: "Disclaimer",
      content:
        "The materials on Eagle Infotech's website are provided on an 'as is' basis. Eagle Infotech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
    },
    {
      icon: FiXCircle,
      title: "Limitations",
      content:
        "In no event shall Eagle Infotech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Eagle Infotech's website.",
    },
  ];

  const restrictions = [
    "Modify or copy the materials",
    "Use the materials for any commercial purpose",
    "Attempt to decompile or reverse engineer any software",
    "Remove any copyright or other proprietary notations",
    "Transfer the materials to another person",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl"
        >
          <p className="text-gray-300 leading-relaxed">
            Welcome to Eagle Infotech. These Terms of Service govern your use of
            our website and services. By using our services, you agree to these
            terms. Please read them carefully.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <section.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-16">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Restrictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 p-6 bg-red-500/5 border border-red-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-400">Restrictions</h2>
          <p className="text-gray-300 mb-4">
            You are specifically restricted from all of the following:
          </p>
          <ul className="space-y-2">
            {restrictions.map((item, i) => (
              <li key={i} className="text-gray-300 flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 bg-white/5 border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p className="text-gray-300 leading-relaxed">
            These terms and conditions are governed by and construed in
            accordance with the laws of the jurisdiction in which Eagle Infotech
            operates, and you irrevocably submit to the exclusive jurisdiction
            of the courts in that location.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-gray-300">
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <p className="text-blue-400 mt-2">{contact?.email || "Loading..."}</p>
        </motion.div>
      </div>
    </div>
  );
}
