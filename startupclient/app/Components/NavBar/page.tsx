"use client";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiBook,
  FiUsers,
  FiTarget,
  FiCalendar,
  FiBookOpen,
  FiFileText,
  FiHeart,
  FiDollarSign,
  FiGithub,
  FiAward,
  FiClock,
  FiArchive,
  FiPackage,
  FiTool,
  FiDatabase,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiCpu,
  FiLayout,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full z-50 transition-all duration-500 text-white text-lg ${isScrolled ? "border-b border-white/10" : ""
        }`}
      style={{
        backgroundColor: isScrolled
          ? "rgba(10, 10, 31, 0.85)"
          : "rgba(10, 10, 31, 0.5)",
        backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
        boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "none",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-screen-xl">
        {/* Logo */}
        <div className="flex items-center space-x-20">
          <Link href="/" className="transition-transform flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="startup-logo"
              width={1010}
              height={910}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8 mx-8">
            <Link href="/" className="nav-link">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-1 group">
                Services
                <FiChevronDown className="transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block transform transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                <div className="p-6 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 mt-2 w-80">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">
                      Our Expertise
                    </h3>

                    <Link href="/services/web" className="menu-item">
                      <FiCode className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Web Development</h4>
                        <p className="text-sm text-gray-400">Scalable web apps</p>
                      </div>
                    </Link>

                    <Link href="/services/mobile" className="menu-item">
                      <FiSmartphone className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Mobile Apps</h4>
                        <p className="text-sm text-gray-400">iOS & Android</p>
                      </div>
                    </Link>

                    <Link href="/services/cloud" className="menu-item">
                      <FiCloud className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Cloud & DevOps</h4>
                        <p className="text-sm text-gray-400">Infrastructure</p>
                      </div>
                    </Link>

                    <Link href="/services/ai" className="menu-item">
                      <FiCpu className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">AI & ML</h4>
                        <p className="text-sm text-gray-400">Intelligent solutions</p>
                      </div>
                    </Link>

                    <Link href="/services/design" className="menu-item">
                      <FiLayout className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Product Design</h4>
                        <p className="text-sm text-gray-400">UI/UX</p>
                      </div>
                    </Link>

                    <Link href="/services/consulting" className="menu-item">
                      <FiTrendingUp className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Consulting</h4>
                        <p className="text-sm text-gray-400">Strategic advice</p>
                      </div>
                    </Link>

                    <div className="pt-2 border-t border-white/10">
                      <Link href="/services" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        View All Services <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-1 group">
                About
                <FiChevronDown className="transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block transform transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                <div className="p-6 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 mt-2 w-72">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">
                      Discover Us
                    </h3>
                    <Link href="/Contributors" className="menu-item">
                      <FiUsers className="text-blue-400 mt-7" />
                      <div>
                        <h4 className="font-medium">Contributors</h4>
                        <p className="text-sm text-gray-400">
                          The Team Behind this Magic
                        </p>
                      </div>
                    </Link>

                    <Link href="/mission-vision" className="menu-item">
                      <FiTarget className="text-blue-400 mt-7" />
                      <div>
                        <h4 className="font-medium">Mission & Vision</h4>
                        <p className="text-sm text-gray-400">
                          Our goals and aspirations
                        </p>
                      </div>
                    </Link>

                    <Link href="/team" className="menu-item">
                      <FiUsers className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Our Team</h4>
                        <p className="text-sm text-gray-400">
                          Meet the people behind this Magic
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-1 group">
                Projects
                <FiChevronDown className="transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block transform transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                <div className="p-6 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 mt-2 w-max">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">
                      Project Categories
                    </h3>

                    <Link href="/projects/graduated" className="menu-item">
                      <FiAward className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Graduated</h4>
                        <p className="text-sm text-gray-400">
                          Production-ready projects
                        </p>
                      </div>
                    </Link>

                    <Link href="/projects/incubating" className="menu-item">
                      <FiPackage className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Incubating</h4>
                        <p className="text-sm text-gray-400">
                          Growing projects
                        </p>
                      </div>
                    </Link>

                    <Link href="/projects/sandbox" className="menu-item">
                      <FiTool className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Sandbox</h4>
                        <p className="text-sm text-gray-400">
                          Experimental projects
                        </p>
                      </div>
                    </Link>

                    <Link href="/projects/archived" className="menu-item">
                      <FiArchive className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Archived</h4>
                        <p className="text-sm text-gray-400">
                          Completed projects
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Events
                <FiChevronDown className="transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block transform transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                <div className="p-6 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 mt-2 w-80">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    Our Events
                  </h3>

                  <div className="space-y-4">
                    <Link href="/events/upcoming" className="menu-item">
                      <FiCalendar className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Upcoming Events</h4>
                        <p className="text-sm text-gray-400">
                          Check our scheduled events
                        </p>
                      </div>
                    </Link>

                    <Link href="/events/past" className="menu-item">
                      <FiClock className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Past Events</h4>
                        <p className="text-sm text-gray-400">
                          Browse our event history
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Link */}
            <Link href="/blogs" className="nav-link">
              Blog
            </Link>

            {/* Get Involved Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Get Involved
                <FiChevronDown className="transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block transform transition-all opacity-0 duration-300 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                <div className="p-6 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 mt-2 w-96">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    Join Our Community
                  </h3>

                  <div className="space-y-4">
                    <Link href="/volunteer" className="menu-item">
                      <FiHeart className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Volunteer</h4>
                        <p className="text-sm text-gray-400">
                          Join our volunteer program
                        </p>
                      </div>
                    </Link>
                    <Link href="/careers" className="menu-item">
                      <FiDollarSign className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Careers</h4>
                        <p className="text-sm text-gray-400">
                          Explore career opportunities
                        </p>
                      </div>
                    </Link>
                    <Link href="/contribute" className="menu-item">
                      <FiGithub className="text-blue-400" />
                      <div>
                        <h4 className="font-medium">Contribute to Projects</h4>
                        <p className="text-sm text-gray-400">
                          Help us build better software
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex">
            <Link href="/book-meeting">
              <button className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative">Book Meeting</span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="w-8 h-8" />
            ) : (
              <FiMenu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0"
          } overflow-y-auto fixed w-full top-20 border-t border-white/10`}
        style={{
          backgroundColor: "rgba(10, 10, 31, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="space-y-6">
            {/* Mobile Home */}
            <Link
              href="/"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded-lg"
            >
              Home
            </Link>

            {/* Mobile About */}
            <div className="space-y-2">
              <h3 className="px-4 text-blue-400 font-semibold">About</h3>
              <div className="pl-4 space-y-2">
                <Link href="/Contributors" className="mobile-menu-item">
                  <FiUsers className="w-5 h-5" />
                  <span>Contributors</span>
                </Link>
                <Link href="/mission-vision" className="mobile-menu-item">
                  <FiTarget className="w-5 h-5" />
                  <span>Mission & Vision</span>
                </Link>
                <Link href="/team" className="mobile-menu-item">
                  <FiUsers className="w-5 h-5" />
                  <span>Our Team</span>
                </Link>
              </div>
            </div>

            {/* Mobile Projects */}
            <div className="space-y-2">
              <h3 className="px-4 text-blue-400 font-semibold">Projects</h3>
              <div className="pl-4 space-y-2">
                <Link href="/projects/graduated" className="mobile-menu-item">
                  <FiAward className="w-5 h-5" />
                  <span>Graduated Projects</span>
                </Link>
                <Link href="/projects/incubating" className="mobile-menu-item">
                  <FiPackage className="w-5 h-5" />
                  <span>Incubating Projects</span>
                </Link>
                <Link href="/projects/sandbox" className="mobile-menu-item">
                  <FiTool className="w-5 h-5" />
                  <span>Sandbox Projects</span>
                </Link>
                <Link href="/projects/archived" className="mobile-menu-item">
                  <FiArchive className="w-5 h-5" />
                  <span>Archived Projects</span>
                </Link>
              </div>
            </div>

            {/* Mobile Events */}
            <div className="space-y-2">
              <h3 className="px-4 text-blue-400 font-semibold">Events</h3>
              <div className="pl-4 space-y-2">
                <Link href="/events/upcoming" className="mobile-menu-item">
                  <FiCalendar className="w-5 h-5" />
                  <span>Upcoming Events</span>
                </Link>
                <Link href="/events/past" className="mobile-menu-item">
                  <FiClock className="w-5 h-5" />
                  <span>Past Events</span>
                </Link>
              </div>
            </div>

            {/* Mobile Blog */}
            <Link
              href="/blogs"
              className="block px-4 py-2 text-lg hover:bg-gray-700 rounded-lg"
            >
              Blog
            </Link>

            {/* Get Involved */}
            <div className="space-y-2">
              <h3 className="px-4 text-blue-400 font-semibold">Get Involved</h3>
              <div className="pl-4 space-y-2">
                <Link href="/volunteer" className="mobile-menu-item">
                  <FiHeart className="w-5 h-5" />
                  <span>Volunteer</span>
                </Link>
                .{" "}
                <Link href="/careers" className="mobile-menu-item">
                  <FiDollarSign className="w-5 h-5" />
                  <span>Careers</span>
                </Link>
                <Link href="/contribute" className="mobile-menu-item">
                  <FiGithub className="w-5 h-5" />
                  <span>Contribute</span>
                </Link>
              </div>
            </div>

            <Link href="/book-meeting">
              <button className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative">Book Meeting</span>
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
