"use client";

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
  FiUserPlus,
  FiFilm,
  FiActivity,
  FiGrid,
  FiCommand,
} from "react-icons/fi";

export default function DashboardHome() {
  const stats = [
    {
      name: "Founder Profile",
      value: "ACTIVE",
      icon: FiUser,
      href: "/dashboard/founder",
      gradient: "from-blue-600/20 to-indigo-600/20",
      border: "hover:border-blue-500/50",
      text: "text-blue-400",
    },
    {
      name: "Services",
      value: "MODULES",
      icon: FiBriefcase,
      href: "/dashboard/services",
      gradient: "from-purple-600/20 to-pink-600/20",
      border: "hover:border-purple-500/50",
      text: "text-purple-400",
    },
    {
      name: "Projects",
      value: "PORTFOLIO",
      icon: FiFolder,
      href: "/dashboard/projects",
      gradient: "from-emerald-600/20 to-teal-600/20",
      border: "hover:border-emerald-500/50",
      text: "text-emerald-400",
    },
    {
      name: "Team Members",
      value: "SQUAD",
      icon: FiUsers,
      href: "/dashboard/team",
      gradient: "from-orange-600/20 to-red-600/20",
      border: "hover:border-orange-500/50",
      text: "text-orange-400",
    },
    {
      name: "Contributors",
      value: "NETWORK",
      icon: FiUserPlus,
      href: "/dashboard/contributors",
      gradient: "from-cyan-600/20 to-blue-600/20",
      border: "hover:border-cyan-500/50",
      text: "text-cyan-400",
    },
    {
      name: "Reels",
      value: "MEDIA",
      icon: FiFilm,
      href: "/dashboard/reels",
      gradient: "from-rose-600/20 to-pink-600/20",
      border: "hover:border-rose-500/50",
      text: "text-rose-400",
    },
  ];

  const quickActions = [
    {
      title: "Manage Founder",
      description: "Update personnel signature",
      icon: FiUser,
      href: "/dashboard/founder",
    },
    {
      title: "About Company",
      description: "Calibrate institutional identity",
      icon: FiInfo,
      href: "/dashboard/about",
    },
    {
      title: "Add Service",
      description: "Deploy new service module",
      icon: FiBriefcase,
      href: "/dashboard/services",
    },
    {
      title: "Add Project",
      description: "Catalog new case study",
      icon: FiFolder,
      href: "/dashboard/projects",
    },
    {
      title: "Team Protocol",
      description: "Manage squad personnel",
      icon: FiUsers,
      href: "/dashboard/team",
    },
    {
      title: "Media Grid",
      description: "Upload visual assets",
      icon: FiFilm,
      href: "/dashboard/reels",
    },
  ];

  return (
    <div className="max-w-[1800px] mx-auto space-y-20 p-4 md:p-8 pb-20">
      {/* Header */}
      <div className="relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-75 transition-opacity duration-700"></div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic">
                Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Control</span>
              </h1>
            </div>
            <p className="text-zinc-500 font-bold max-w-xl text-sm leading-relaxed uppercase tracking-widest pl-5">
              Centralized command interface. Initialize modules, calibrate parameters, and deploy updates.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-full p-2 pr-6">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System Status</span>
              <span className="text-xs font-bold text-white tracking-wide">OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-zinc-900 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${stat.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center ${stat.text} group-hover:scale-110 transition-transform duration-500`}>
                    <Icon size={28} />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:border-white/30 group-hover:text-white transition-colors">
                    <FiCommand size={14} />
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{stat.value}</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-zinc-950/50 backdrop-blur-xl border border-zinc-900/50 rounded-[3rem] p-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
              <FiGrid size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Tactical Grid</h2>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Rapid Deployment Protocols</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">{action.title}</h3>
                    <p className="text-[10px] text-zinc-500 font-medium">{action.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[3rem] p-10 flex flex-col">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
              <FiActivity size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">Live Feed</h2>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Telemetry</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div className="relative pl-6 border-l border-zinc-800 space-y-6">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-zinc-950"></div>
                <p className="text-xs font-bold text-zinc-300">System Initialized</p>
                <p className="text-[10px] text-zinc-600 font-mono mt-1">SESSION START</p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-zinc-800 ring-4 ring-zinc-950"></div>
                <p className="text-xs font-bold text-zinc-400">Database Connection</p>
                <p className="text-[10px] text-zinc-600 font-mono mt-1">ESTABLISHED</p>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-zinc-900">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">All Systems Normal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
