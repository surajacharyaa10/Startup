import Link from "next/link";
import {
  FiUser,
  FiBriefcase,
  FiFolder,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiInfo,
  FiMail,
  FiSettings,
  FiArrowRight,
} from "react-icons/fi";

export default function Home() {
  const features = [
    {
      icon: FiUser,
      title: "Founder Profile",
      description: "Manage founder information and social links",
    },
    {
      icon: FiInfo,
      title: "About Company",
      description: "Update company mission and vision",
    },
    {
      icon: FiBriefcase,
      title: "Services",
      description: "Showcase your service offerings",
    },
    {
      icon: FiFolder,
      title: "Projects",
      description: "Display your portfolio and work",
    },
    {
      icon: FiUsers,
      title: "Team Members",
      description: "Manage your team profiles",
    },
    {
      icon: FiMessageSquare,
      title: "Testimonials",
      description: "Collect and display reviews",
    },
    {
      icon: FiFileText,
      title: "Blog Posts",
      description: "Create and manage content",
    },
    {
      icon: FiMail,
      title: "Contact Messages",
      description: "Handle customer inquiries",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-20">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Eagle Infotech
              </h1>
              <p className="text-zinc-400 mt-1">
                Central hub for managing the Eagle Infotech website
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              Go to Dashboard
              <FiArrowRight />
            </Link>
          </div>

          {/* Hero Content */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Manage Your Company
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                All in One Place
              </span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              A comprehensive control panel to manage every section of the Eagle
              Infotech website.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                Get Started
                <FiArrowRight />
              </Link>
              <Link
                href="/dashboard/founder"
                className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
              >
                View Demo
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Everything You Need
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-all hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-blue-400" size={24} />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-zinc-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">10+</div>
                <div className="text-zinc-400">Management Sections</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-zinc-400">Customizable</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-zinc-400">Access</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Access your dashboard and start managing your company content
              today
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Open Dashboard
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-zinc-400 text-sm">
              © 2024 Eagle Infotech. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link
                href="/dashboard"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-zinc-400 hover:text-white transition-colors text-sm"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
