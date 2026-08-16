"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiEye, FiDatabase } from "react-icons/fi";
import { contactApi } from "@/lib/api/contact";
import { ContactInfo } from "@/lib/types/contact";

export default function PrivacyPolicy() {
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
      icon: FiShield,
      title: "Information We Collect",
      content: [
        "Personal identification information (Name, email address, phone number)",
        "Usage data and analytics",
        "Cookies and tracking technologies",
        "Device and browser information",
      ],
    },
    {
      icon: FiLock,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To notify you about changes to our services",
        "To provide customer support",
        "To gather analysis or valuable information to improve our services",
        "To monitor the usage of our services",
      ],
    },
    {
      icon: FiEye,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures",
        "Regular security audits and updates",
        "Encrypted data transmission (SSL/TLS)",
        "Secure data storage with access controls",
        "Employee training on data protection",
      ],
    },
    {
      icon: FiDatabase,
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Correct inaccurate data",
        "Request deletion of your data",
        "Object to processing of your data",
        "Data portability",
      ],
    },
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
            Privacy Policy
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
            At Eagle Infotech, we take your privacy seriously. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services. Please
            read this privacy policy carefully. If you do not agree with the
            terms of this privacy policy, please do not access the site.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
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
              <ul className="space-y-2 ml-16">
                {section.content.map((item, i) => (
                  <li key={i} className="text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="text-blue-400 mt-2">{contact?.email || "Loading..."}</p>
        </motion.div>
      </div>
    </div>
  );
}
