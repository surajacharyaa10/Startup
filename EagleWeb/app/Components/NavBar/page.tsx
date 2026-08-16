"use client";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiCalendar,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiCpu,
  FiLayout,
  FiTrendingUp,
  FiArrowRight,
  FiUsers,
  FiTarget,
  FiAward,
  FiPackage,
  FiTool,
  FiArchive,
  FiClock,
  FiHeart,
  FiDollarSign,
  FiGithub,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 } as const
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const getParentHref = (key: string) => {
    switch (key) {
      case "services": return "/services";
      case "about": return "/mission-vision";
      case "projects": return "/projects/graduated";
      case "events": return "/events/upcoming";
      case "involved": return "/careers";
      case "resources": return "/docs";
      default: return "/";
    }
  };

  const menuItems = {
    services: [
      { name: "Web Development", desc: "Scalable web apps", icon: <FiCode />, href: "/services/web" },
      { name: "Mobile Apps", desc: "iOS & Android", icon: <FiSmartphone />, href: "/services/mobile" },
      { name: "Cloud & DevOps", desc: "Infrastructure", icon: <FiCloud />, href: "/services/cloud" },
      { name: "AI & ML", desc: "Intelligent solutions", icon: <FiCpu />, href: "/services/ai" },
      { name: "Product Design", desc: "UI/UX Design", icon: <FiLayout />, href: "/services/design" },
      { name: "Consulting", desc: "Strategic advice", icon: <FiTrendingUp />, href: "/services/consulting" },
    ],
    about: [
      { name: "Contributors", desc: "The team behind magic", icon: <FiUsers />, href: "/Contributors" },
      { name: "Mission & Vision", desc: "Our goals", icon: <FiTarget />, href: "/mission-vision" },
      { name: "Our Team", desc: "Meet the experts", icon: <FiUsers />, href: "/team" },
    ],
    projects: [
      { name: "Graduated", desc: "Production-ready", icon: <FiAward />, href: "/projects/graduated" },
      { name: "Incubating", desc: "Growing projects", icon: <FiPackage />, href: "/projects/incubating" },
      { name: "Sandbox", desc: "Experimental", icon: <FiTool />, href: "/projects/sandbox" },
      { name: "Archived", desc: "Past projects", icon: <FiArchive />, href: "/projects/archived" },
    ],
    events: [
      { name: "Upcoming Events", desc: "Don't miss out", icon: <FiCalendar />, href: "/events/upcoming" },
      { name: "Past Events", desc: "Our history", icon: <FiClock />, href: "/events/past" },
    ],
    involved: [
      { name: "Volunteer", desc: "Join our program", icon: <FiHeart />, href: "/volunteer" },
      { name: "Careers", desc: "Work with us", icon: <FiDollarSign />, href: "/careers" },
      { name: "Contribute", desc: "Open source", icon: <FiGithub />, href: "/contribute" },
    ],
    resources: [
      { name: "Case Studies", desc: "Success stories", icon: <FiTrendingUp />, href: "/case-studies" },
      { name: "Documentation", desc: "Tech guides", icon: <FiArchive />, href: "/docs" },
      { name: "Sponsorship", desc: "Support us", icon: <FiDollarSign />, href: "/sponsor" },
    ]
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 px-4 pt-6 ${isScrolled ? "pt-4" : "pt-6"}`}>
      <div 
        className={`container mx-auto max-w-7xl transition-all duration-700 rounded-3xl border border-white/40 ${
          isScrolled 
            ? "bg-white/30 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-2 saturate-[2] backdrop-brightness-110" 
            : "bg-transparent py-4 border-transparent shadow-none"
        }`}
        style={{
          background: isScrolled 
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))" 
            : "transparent",
          boxShadow: isScrolled 
            ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.8), 0 20px 40px rgba(0, 0, 0, 0.1)" 
            : "none"
        }}
      >
        <div className="flex items-center justify-between px-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group outline-none">
            <div className="relative h-20 w-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/assets/logo.png"
                alt="Eagle Logo"
                width={900}
                height={900}
                className="w-full h-full object-contain filter drop-shadow-sm"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-2xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r transition-all duration-700 ${
                isScrolled 
                  ? "from-slate-900 via-blue-900 to-blue-700" 
                  : "from-white via-blue-100 to-blue-400"
              }`}>
                Eagle Infotech
              </span>
              <span className={`text-[10px] uppercase font-black tracking-[0.3em] transition-colors duration-700 mt-1 ${
                isScrolled ? "text-blue-700" : "text-blue-400"
              }`}>
                Digital Evaluation
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link 
              href="/" 
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-500 hover:-translate-y-0.5 ${
                isScrolled 
                  ? "text-slate-800 hover:text-blue-700 hover:bg-slate-900/5 shadow-sm hover:shadow-slate-200" 
                  : "text-gray-100 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>

            {Object.entries(menuItems).map(([key, items]) => (
              <div 
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-500 hover:-translate-y-0.5 ${
                  activeDropdown === key 
                    ? (isScrolled ? "text-blue-700 bg-blue-500/10 shadow-inner" : "text-blue-400 bg-blue-500/10 shadow-inner") 
                    : (isScrolled ? "text-slate-800 hover:text-blue-700 hover:bg-slate-900/5" : "text-gray-100 hover:text-white hover:bg-white/10")
                }`}>
                  <span className="capitalize">{key}</span>
                  <FiChevronDown className={`transition-transform duration-500 ${activeDropdown === key ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === key && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-5 w-85 z-50"
                    >
                      <div className={`rounded-4xl p-5 shadow-2xl backdrop-blur-3xl transition-all duration-700 border overflow-hidden ${
                        isScrolled 
                          ? "bg-white/70 border-white/60 saturate-[2]" 
                          : "bg-slate-950/70 border-white/10 saturate-[1.8]"
                      }`}
                      style={{
                        background: isScrolled 
                          ? "linear-gradient(165deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))" 
                          : "linear-gradient(165deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))",
                        boxShadow: "inset 0 1px 1px 0 rgba(255,255,255,0.5), 0 30px 60px -12px rgba(0,0,0,0.3)"
                      }}>
                        <div className="grid gap-3">
                          {items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className={`group flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 border border-transparent ${
                                isScrolled 
                                  ? "hover:bg-blue-50/50 hover:border-blue-100/50" 
                                  : "hover:bg-white/5 hover:border-white/5"
                              }`}
                            >
                              <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-md ${
                                isScrolled ? "bg-blue-600 text-white shadow-blue-500/20" : "bg-blue-500/20 text-blue-400 shadow-blue-500/10"
                              }`}>
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <div className={`text-[0.95rem] font-black transition-colors ${
                                  isScrolled 
                                    ? "text-slate-900 group-hover:text-blue-700" 
                                    : "text-white group-hover:text-blue-400"
                                }`}>
                                  {item.name}
                                </div>
                                <div className={`text-xs font-semibold leading-relaxed transition-colors mt-0.5 ${
                                  isScrolled ? "text-slate-500" : "text-gray-400"
                                }`}>
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className={`mt-5 pt-5 border-t ${isScrolled ? "border-slate-100" : "border-white/5"}`}>
                          <Link href={getParentHref(key)} className="flex items-center justify-between px-5 py-2.5 rounded-xl bg-blue-600/5 text-xs font-black text-blue-700 hover:bg-blue-600 hover:text-white transition-all duration-500 group">
                            Explore {key}
                            <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-500" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link 
              href="/blogs" 
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-500 hover:-translate-y-0.5 ${
                isScrolled 
                  ? "text-slate-800 hover:text-blue-700 hover:bg-slate-900/5 shadow-sm hover:shadow-slate-200" 
                  : "text-gray-100 hover:text-white hover:bg-white/10"
              }`}
            >
              Blog
            </Link>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <Link href="/book-meeting" className="hidden sm:block outline-none">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all relative overflow-hidden group shadow-2xl ${
                  isScrolled 
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30" 
                    : "bg-blue-600 text-white shadow-blue-600/40"
                }`}
              >
                <span className="relative z-10">Book Meeting</span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-3 rounded-2xl transition-all duration-500 ${
                isScrolled ? "text-slate-900 hover:bg-slate-900/10" : "text-white hover:bg-white/10 outline-none"
              }`}
            >
              {isOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`lg:hidden mt-4 overflow-hidden rounded-4xl border p-2 shadow-2xl backdrop-blur-3xl transition-all duration-500 ${
              isScrolled 
                ? "bg-white/80 border-white/60 saturate-[2]" 
                : "bg-slate-950/80 border-white/10 saturate-[1.8]"
            }`}
            style={{
              background: isScrolled 
                ? "linear-gradient(165deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))" 
                : "linear-gradient(165deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6))",
              boxShadow: "inset 0 1px 1px 0 rgba(255,255,255,0.4), 0 30px 60px rgba(0,0,0,0.3)"
            }}
          >
            <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {Object.entries(menuItems).map(([key, items]) => (
                <div key={key} className="space-y-4">
                  <h3 className={`text-[10px] uppercase font-black tracking-[0.3em] px-2 ${
                    isScrolled ? "text-blue-700" : "text-blue-400"
                  }`}>
                    {key}
                  </h3>
                  <div className="grid gap-2">
                    {items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all border border-transparent ${
                          isScrolled 
                            ? "hover:bg-blue-50/50 hover:border-blue-100/50 text-slate-800" 
                            : "hover:bg-white/5 hover:border-white/5 text-gray-200"
                        }`}
                      >
                        <div className={`p-3 rounded-2xl shadow-md ${
                          isScrolled ? "bg-blue-600 text-white" : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {item.icon}
                        </div>
                        <span className="text-[0.95rem] font-bold">{item.name}</span>
                      </Link>
                    ))}
                    <div className="pt-2 px-1">
                      <Link 
                        href={getParentHref(key)} 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl text-xs font-black transition-all group ${
                          isScrolled 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        Explore All {key}
                        <FiArrowRight className="group-hover:translate-x-1.5 transition-transform duration-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className={`pt-8 border-t space-y-4 ${isScrolled ? "border-slate-100" : "border-white/5"}`}>
                <Link 
                  href="/blogs" 
                  onClick={() => setIsOpen(false)} 
                  className={`flex items-center justify-center p-4 rounded-2xl font-black transition-all ${
                    isScrolled ? "bg-slate-100 text-slate-900 hover:bg-slate-200" : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  Blog
                </Link>
                <Link href="/book-meeting" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-5 rounded-2xl bg-blue-600 font-black text-white shadow-xl shadow-blue-600/20 active:scale-95 transition-transform">
                    Book Meeting
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
