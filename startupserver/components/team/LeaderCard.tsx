"use client";

import { Leader } from "@/lib/types/teamDepartment";
import { FiEdit2, FiTrash2, FiLinkedin, FiTwitter, FiMail, FiUser } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface LeaderCardProps {
    leader: Leader;
    onEdit: (leader: Leader) => void;
    onDelete: (id: string) => void;
}

export default function LeaderCard({ leader, onEdit, onDelete }: LeaderCardProps) {
    const getImageUrl = (path?: string) => {
        if (!path) return "";
        return path.startsWith("http") ? path : `${API_URL}/${path}`;
    };

    const avatarUrl = getImageUrl(leader.avatar);

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden hover:border-zinc-700 transition-all duration-500 hover:shadow-[0_0_80px_rgba(255,255,255,0.02)] flex flex-col h-full">
            {/* Visual Header */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>

            <div className="p-10 flex flex-col items-center text-center">
                {/* Avatar Area */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={leader.name} className="w-full h-full object-cover" />
                        ) : (
                            <FiUser size={48} className="text-zinc-700" />
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black shadow-xl ring-4 ring-zinc-950 group-hover:rotate-12 transition-transform">
                        <span className="font-black text-[10px]">LID</span>
                    </div>
                </div>

                {/* Info */}
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1 group-hover:text-blue-400 transition-colors">
                        {leader.name}
                    </h3>
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                        {leader.role}
                    </span>
                </div>

                {leader.bio && (
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed italic mb-8 line-clamp-3">
                        "{leader.bio}"
                    </p>
                )}

                {/* Social & Contact */}
                <div className="flex items-center gap-3 mb-10">
                    {leader.linkedin && (
                        <a href={leader.linkedin} target="_blank" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                            <FiLinkedin size={18} />
                        </a>
                    )}
                    {leader.twitter && (
                        <a href={leader.twitter} target="_blank" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                            <FiTwitter size={18} />
                        </a>
                    )}
                    {leader.email && (
                        <a href={`mailto:${leader.email}`} className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                            <FiMail size={18} />
                        </a>
                    )}
                </div>

                {/* Actions */}
                <div className="w-full pt-8 border-t border-zinc-900/50 flex gap-3">
                    <button
                        onClick={() => onEdit(leader)}
                        className="flex-1 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
                    >
                        <FiEdit2 size={14} /> REVISE
                    </button>
                    <button
                        onClick={() => onDelete(leader._id)}
                        className="flex-1 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 hover:border-red-900/20 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
                    >
                        <FiTrash2 size={14} /> PURGE
                    </button>
                </div>
            </div>
        </div>
    );
}
