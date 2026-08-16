"use client";
import { motion } from "framer-motion";
import { FiDollarSign, FiCheck, FiStar, FiTrendingUp } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getInvolvedApi } from "@/app/api/getInvolved";

export default function Sponsor() {
  const [sponsorshipTiers, setSponsorshipTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const data = await getInvolvedApi.getOptions("sponsor");
        // Sort by price if possible, or just use order
        setSponsorshipTiers(
          data.map((item) => ({
            name: item.title,
            price: item.description.split(" - ")[0] || "$5,000", // Assuming price is in description or default
            period: "/year",
            color: "from-blue-400 to-purple-600",
            features: item.benefits,
            popular: item.featured,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch sponsorship tiers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTiers();
  }, []);

  const impactAreas = [
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Education Programs",
      description:
        "Fund scholarships and training programs for aspiring developers",
      impact: "500+ students annually",
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Community Events",
      description: "Support workshops, hackathons, and tech conferences",
      impact: "50+ events per year",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Open Source",
      description: "Contribute to open-source projects and tools",
      impact: "100+ projects supported",
    },
  ];

  const currentSponsors = [
    { name: "TechCorp", logo: "TC", tier: "Platinum" },
    { name: "InnovateLabs", logo: "IL", tier: "Gold" },
    { name: "CloudSystems", logo: "CS", tier: "Gold" },
    { name: "DataFlow", logo: "DF", tier: "Silver" },
    { name: "CodeBase", logo: "CB", tier: "Silver" },
    { name: "DevTools", logo: "DT", tier: "Bronze" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-6">
            Become a Sponsor
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Partner with us to empower the next generation of tech innovators
            and make a lasting impact on the community.
          </p>
        </motion.div>

        {/* Impact Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Your Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-6">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-400 mb-4">{area.description}</p>
                <p className="text-blue-400 font-semibold">{area.impact}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sponsorship Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Sponsorship Tiers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 ${
                  tier.popular ? "ring-2 ring-blue-500/50 scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="text-center mb-4">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3
                    className={`text-2xl font-bold bg-gradient-to-r ${tier.color} text-transparent bg-clip-text mb-2`}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-gray-400 ml-2">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-300"
                    >
                      <FiCheck className="text-green-400 flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  Choose {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Sponsors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {currentSponsors.map((sponsor, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {sponsor.logo}
                </div>
                <h4 className="text-white font-semibold mb-1">
                  {sponsor.name}
                </h4>
                <p className="text-gray-400 text-xs">{sponsor.tier}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Custom Sponsorship */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Package?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We can create a tailored sponsorship package that aligns with your
            company's goals and budget.
          </p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
