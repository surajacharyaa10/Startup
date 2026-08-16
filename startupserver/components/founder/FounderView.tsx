"use client";

import { Founder } from "@/lib/types/founder";
import { FiEdit2, FiTrash2, FiAward, FiBookOpen } from "react-icons/fi";
import { getSocialIcon } from "@/lib/socialUtils";

interface FounderViewProps {
  founder: Founder;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FounderView({
  founder,
  onEdit,
  onDelete,
}: FounderViewProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="relative overflow-hidden bg-zinc-950 rounded-[4rem] border border-zinc-800/50 shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[80px] -ml-40 -mb-40"></div>

        {/* Action Header */}
        <div className="relative z-10 flex items-center justify-between px-12 py-10 border-b border-zinc-900">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Founder Identification Protocol</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onEdit}
              className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800 shadow-xl active:scale-95"
            >
              <FiEdit2 size={16} /> RECONFIGURE
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-red-900/20 hover:text-red-500 text-zinc-500 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800 shadow-xl active:scale-95"
            >
              <FiTrash2 size={16} /> PURGE
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative z-10 p-12 lg:p-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left: Avatar Pillar */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center">
              <div className="relative group">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

                <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border-4 border-zinc-900 bg-zinc-900 shadow-2xl">
                  {founder.avatar ? (
                    <img
                      src={founder.avatar}
                      alt={founder.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                      <span className="text-8xl font-black text-zinc-800 italic">
                        {founder.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Badge Row */}
              <div className="mt-12 flex gap-4 flex-wrap justify-center">
                {founder.socials && founder.socials.map((social, index) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-blue-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all"
                      title={social.platform}
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
                {/* WhatsApp Badge */}
                {founder.whatsapp && (
                  <a
                    href={`https://wa.me/${founder.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-green-500 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all"
                    title="WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Right: Vision Stack */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-12">
              {/* Identity Header */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full">
                  <FiAward className="text-blue-500" />
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{founder.position}</span>
                </div>

                <h2 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                  {founder.name}
                </h2>
              </div>

              {/* Quote Block */}
              <div className="relative py-10 px-12 bg-zinc-900/50 rounded-[3rem] border border-zinc-800/80 shadow-inner">
                <div className="absolute top-0 left-10 -translate-y-1/2 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black italic shadow-lg shadow-blue-900/40">
                  "
                </div>
                <p className="text-2xl font-black text-zinc-300 italic leading-relaxed tracking-tight uppercase">
                  {founder.quote}
                </p>
              </div>

              {/* Detailed Dossier */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                    <FiBookOpen size={20} />
                  </div>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Strategic Dossier</span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                    {founder.details}
                  </p>
                </div>
              </div>

              {/* Stats Row Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-zinc-900">
                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 shadow-xl">
                  <div className="text-4xl font-black text-white mb-2 italic">10+</div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">YEARS VISION</div>
                </div>
                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 shadow-xl">
                  <div className="text-4xl font-black text-white mb-2 italic">50+</div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">SYSTEM PULSES</div>
                </div>
                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 shadow-xl">
                  <div className="text-4xl font-black text-white mb-2 italic">01</div>
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">ORIGIN POINT</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
