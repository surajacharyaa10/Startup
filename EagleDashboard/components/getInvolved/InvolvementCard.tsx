"use client";

import { GetInvolved } from "@/lib/types/getInvolved";
import API_URL from "@/app/api/url";
import { FiEdit2, FiTrash2, FiExternalLink, FiMapPin, FiBriefcase, FiUsers, FiCpu, FiPlus } from "react-icons/fi";

interface InvolvementCardProps {
    option: GetInvolved;
    onEdit: (option: GetInvolved) => void;
    onDelete: (id: string) => void;
}

export default function InvolvementCard({ option, onEdit, onDelete }: InvolvementCardProps) {
    const getImageUrl = (path: string | undefined) => {
        if (!path) return null;
        return path.startsWith("http") ? path : `${API_URL}/${path}`;
    };

    const imageUrl = getImageUrl(option.icon);

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] p-8 hover:border-zinc-700 transition-all duration-500 overflow-hidden flex flex-col h-full">
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                    {/* Visual Asset */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                            {imageUrl ? (
                                <img src={imageUrl} alt={option.title} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl">
                                    {option.category === "volunteer" ? "🙋" : option.category === "contribute" ? "💻" : "💼"}
                                </span>
                            )}
                        </div>
                        {option.featured && (
                            <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-lg shadow-xl ring-4 ring-zinc-950">
                                HOT
                            </div>
                        )}
                    </div>

                    {/* Quick Access */}
                    <div className="flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <button
                            onClick={() => onEdit(option)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
                        >
                            <FiEdit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(option._id)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-900/20 transition-all"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                            {option.category}
                        </span>
                        <div className="h-px flex-1 bg-zinc-900/50"></div>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                        {option.title}
                    </h3>
                </div>

                <p className="text-zinc-500 text-sm font-medium leading-relaxed italic mb-8 line-clamp-3">
                    "{option.description}"
                </p>

                {/* Category specific metadata */}
                {option.category === "careers" && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {option.department && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-900 rounded-2xl text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                <FiUsers size={12} /> {option.department}
                            </div>
                        )}
                        {option.location && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-900 rounded-2xl text-[10px] font-black text-purple-400 uppercase tracking-widest">
                                <FiMapPin size={12} /> {option.location}
                            </div>
                        )}
                        {option.jobType && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-900 rounded-2xl text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                <FiBriefcase size={12} /> {option.jobType}
                            </div>
                        )}
                    </div>
                )}

                {/* CTA - Bottom alignment */}
                <div className="mt-auto pt-8 border-t border-zinc-900/50">
                    <a
                        href={option.applyLink || option.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-16 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-white/10 text-white rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 group/btn"
                    >
                        {option.category === "careers" ? "INITIATE APPLICATION" : "ACCESS CORE"}
                        <FiExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
}
