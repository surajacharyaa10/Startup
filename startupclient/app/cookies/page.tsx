"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiTarget, FiBarChart, FiCircle } from "react-icons/fi";
import { contactApi } from "@/lib/api/contact";
import { ContactInfo } from "@/lib/types/contact";

export default function CookiePolicy() {
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

  const cookieTypes = [
    {
      icon: FiSettings,
      title: "Essential Cookies",
      description:
        "Required for the website to function properly. Cannot be disabled.",
      examples: ["Session management", "Security features", "Load balancing"],
    },
    {
      icon: FiBarChart,
      title: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      examples: ["Google Analytics", "Page views", "User behavior tracking"],
    },
    {
      icon: FiTarget,
      title: "Marketing Cookies",
      description:
        "Used to track visitors across websites for advertising purposes.",
      examples: [
        "Ad targeting",
        "Campaign tracking",
        "Social media integration",
      ],
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
            <FiCircle className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Cookie Policy
          </h1>
          <p className="text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 bg-white/5 border border-white/10 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
          <p className="text-gray-300 leading-relaxed">
            Cookies are small text files that are placed on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and provide information to the owners
            of the site.
          </p>
        </motion.div>

        <div className="space-y-8 mb-12">
          {cookieTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <type.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-300">{type.description}</p>
                </div>
              </div>
              <div className="ml-16">
                <p className="text-sm text-gray-400 mb-2">Examples:</p>
                <ul className="space-y-1">
                  {type.examples.map((example, i) => (
                    <li
                      key={i}
                      className="text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-blue-400">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-white/5 border border-white/10 rounded-xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            You can control and/or delete cookies as you wish. You can delete
            all cookies that are already on your computer and you can set most
            browsers to prevent them from being placed.
          </p>
          <p className="text-gray-300 leading-relaxed">
            However, if you do this, you may have to manually adjust some
            preferences every time you visit a site and some services and
            functionalities may not work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have questions about our use of cookies, please contact us
            at:
          </p>
          <p className="text-blue-400 mt-2">{contact?.email || "Loading..."}</p>
        </motion.div>
      </div>
    </div>
  );
}
