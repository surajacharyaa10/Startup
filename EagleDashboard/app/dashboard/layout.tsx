"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUser,
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
  FiInfo,
  FiBriefcase,
  FiFolder,
  FiUsers,
  FiMessageSquare,
  FiFileText,
  FiMail,
  FiBarChart2,
  FiCalendar,
  FiUserPlus,
  FiFilm,
} from "react-icons/fi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: FiHome },
    { name: "Stats", href: "/dashboard/stats", icon: FiBarChart2 },
    { name: "Founder", href: "/dashboard/founder", icon: FiUser },
    { name: "About Us", href: "/dashboard/about", icon: FiInfo },
    { name: "Services", href: "/dashboard/services", icon: FiBriefcase },
    { name: "Projects", href: "/dashboard/projects", icon: FiFolder },
    { name: "Events", href: "/dashboard/events", icon: FiCalendar },
    { name: "Get Involved", href: "/dashboard/getInvolved", icon: FiUsers },
    { name: "Contributors", href: "/dashboard/contributors", icon: FiUserPlus },
    { name: "Reels", href: "/dashboard/reels", icon: FiFilm },
    { name: "Team", href: "/dashboard/team", icon: FiUsers },
    {
      name: "Testimonials",
      href: "/dashboard/testimonials",
      icon: FiMessageSquare,
    },
    { name: "Meetings", href: "/dashboard/meetings", icon: FiCalendar },
    { name: "Blog", href: "/dashboard/blog", icon: FiFileText },
    { name: "Contact", href: "/dashboard/contact", icon: FiMail },
    { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 rounded-xl text-white shadow-lg shadow-black/40"
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-zinc-950/80 backdrop-blur-2xl border-r border-zinc-800/80 shadow-xl shadow-black/50 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-zinc-800/80">
            <h1 className="text-2xl font-semibold tracking-tight bg-linear-to-r from-blue-400 via-sky-400 to-purple-400 text-transparent bg-clip-text">
              Eagle Infotech
            </h1>
            <p className="text-xs text-zinc-400/80 mt-1">Website Control Panel</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${isActive(item.href)
                    ? "bg-linear-to-r from-blue-500/80 via-sky-500/80 to-indigo-500/80 text-white shadow-md shadow-blue-900/40"
                    : "text-zinc-400 hover:bg-zinc-900/70 hover:text-white border border-transparent hover:border-zinc-700/70"
                    }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900/80">
                    <Icon size={18} />
                  </div>
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-800/80">
            <button className="flex items-center gap-3 px-4 py-2.5 w-full text-xs text-zinc-500 hover:bg-zinc-900/80 hover:text-white rounded-xl transition-colors">
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="relative p-6 md:p-8">
          {/* subtle inner glow / frame */}
          <div className="pointer-events-none absolute inset-6 md:inset-8 rounded-3xl border border-zinc-800/70 bg-zinc-950/40 shadow-[0_0_80px_rgba(0,0,0,0.7)]" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
