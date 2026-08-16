"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from "react-icons/fi";
import { contactApi, ContactData } from "@/app/api/contact";
import { getSocialIcon } from "../Components/shared/socialUtils";

// Define a local interface or import if available. Assuming ContactData covers it.
// We imported ContactData from api/contact.

export default function Contact() {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await contactApi.getContact();
        if (data) {
          setContact(data);
        }
      } catch (e) {
        console.error("Error fetching contact:", e);
      }
    };
    fetchContactData();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Have a question or want to work together? We&apos;d love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiMail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-gray-400">{contact?.email || "Loading..."}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiPhone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <p className="text-gray-400">{contact?.phone || "Loading..."}</p>
              </div>
            </div>
            {contact?.whatsapp && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
                  <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`} className="text-gray-400 hover:text-green-400 transition-colors">
                    {contact.whatsapp}
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiMapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Address</h3>
                <p className="text-gray-400 whitespace-pre-line">
                  {contact?.address || "Loading..."}
                </p>
              </div>
            </div>

            {/* Dynamic Social Icons */}
            {contact?.socials && contact.socials.length > 0 && (
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
                <div className="flex flex-wrap gap-4">
                  {contact.socials.map((social) => {
                    const Icon = getSocialIcon(social.platform);
                    const href = social.platform.toLowerCase().includes('email')
                      ? `mailto:${social.url}`
                      : social.url;

                    return (
                      <a
                        key={social._id}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-lg flex items-center justify-center transition-all duration-300 group"
                        title={social.platform}
                      >
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="Your message..."
                />
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2">
                Send Message
                <FiSend />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
