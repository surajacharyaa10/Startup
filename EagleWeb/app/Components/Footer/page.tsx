"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { contactApi } from "@/lib/api/contact";
import { ContactInfo } from "@/lib/types/contact";
import { getSocialIcon } from "../shared/socialUtils";

export default function Footer() {
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



  const footerLinks = {
    Company: [
      { name: "About Us", href: "/Components/About" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    Services: [
      { name: "Web Development", href: "/services/web" },
      { name: "Mobile Apps", href: "/services/mobile" },
      { name: "Cloud Solutions", href: "/services/cloud" },
      { name: "Consulting", href: "/services/consulting" },
      { name: "AISolutions", href: "/services/ai" },
      { name: "Design", href: "/services/design" }
    ],
    Resources: [
      { name: "Blog", href: "/blogs" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4">
              Eagle Infotech
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming ideas into innovative digital solutions. Building the
              future, one project at a time.
            </p>
            <div className="flex gap-4 flex-wrap">
              {contact?.socials?.map((social, index) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-lg flex items-center justify-center transition-all duration-300"
                    title={social.platform}
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-blue-400" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">
            <div className="flex items-start gap-3">
              <FiMapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">Address</p>
                <p className="text-sm">
                  {contact?.address || "Loading address..."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiPhone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">Phone</p>
                <p className="text-sm">{contact?.phone || "Loading phone..."}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiMail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">Email</p>
                <p className="text-sm">{contact?.email || "Loading email..."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Eagle Infotech. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with ❤️ by Eagle Infotech Team
          </p>
        </div>
      </div>
    </footer>
  );
}


