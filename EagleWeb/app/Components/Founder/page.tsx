"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { founderApi, Founder as IFounder } from "@/app/api/founder";
import { contactApi, ContactData } from "@/app/api/contact";
import API_URL from "@/app/api/url";
import { getSocialIcon } from "../shared/socialUtils";

export default function Founder() {
  const [founder, setFounder] = useState<IFounder | null>(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (img: string) => img?.startsWith('/uploads') ? `${API_URL}${img}` : img;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [founderData, contactData] = await Promise.all([
          founderApi.getFounder(),
          contactApi.getContact()
        ]);
        setFounder(founderData);
        setContact(contactData);
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-white py-32">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-32">Error: {error}</p>;
  }

  if (!founder) {
    return (
      <p className="text-center text-white py-32">No founder data found.</p>
    );
  }

  // Prioritize Founder's specific WhatsApp/Phone, then Contact's
  const whatsappNumber = founder.whatsapp || contact?.whatsapp || founder.phone || contact?.phone;
  // Fallback for cleaning number
  const cleanNumber = whatsappNumber ? whatsappNumber.replace(/\D/g, "") : "";

  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Meet Our Founder
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The visionary behind Eagle Infotech&apos;s success
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50"></div>
                <img
                  src={getImageUrl(founder.avatar)}
                  alt={founder.name}
                  className="relative w-48 h-48 rounded-full border-4 border-white/20 object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {founder.name}
                </h3>
                <p className="text-blue-400 text-xl mb-4">{founder.position}</p>
                <p className="text-gray-300 leading-relaxed mb-4 italic">
                  &quot;{founder.quote}&quot;
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {founder.details}
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center">
                  {founder.socials?.map((social) => {
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
                        className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-lg flex items-center justify-center transition-all duration-300"
                        title={social.platform}
                      >
                        <Icon className="w-5 h-5 text-gray-400 hover:text-blue-400" />
                      </a>
                    );
                  })}

                  {/* Schedule a Call Button */}
                  {cleanNumber && (
                    <a
                      href={`https://wa.me/${cleanNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/30 ml-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Schedule a Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
