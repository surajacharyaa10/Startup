"use client";

import { Contributor } from "@/lib/types/contributor";
import { FiGithub, FiLinkedin, FiTwitter, FiEdit2, FiTrash2, FiUser, FiZap, FiTarget } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface ContributorCardProps {
    contributor: Contributor;
    onEdit: (contributor: Contributor) => void;
    onDelete: (id: string) => void;
}

export default function ContributorCard({ contributor, onEdit, onDelete }: ContributorCardProps) {
    const getAvatarUrl = (avatar: string) => {
        if (!avatar) return null;
        return avatar.startsWith("http") ? avatar : `${API_URL}/${avatar}`;
    };

    const avatarUrl = getAvatarUrl(contributor.avatar);

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] p-8 hover:border-zinc-700 transition-all duration-500 overflow-hidden flex flex-col h-full">
            {/* Ambient Background Gradient */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 blur-[100px] group-hover:bg-purple-600/20 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                    {/* Visual Asset */}
                    <div className="relative">
                        <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={contributor.name} className="w-full h-full object-cover" />
                            ) : (
                                <FiUser size={40} className="text-zinc-800" />
                            )}
                        </div>
                        {/* Contribution Badge */}
                        <div className="absolute -bottom-3 -right-3 bg-white text-black px-4 py-1.5 rounded-xl shadow-2xl border-4 border-zinc-950 flex items-center gap-2">
                            <FiZap size={14} className="fill-black" />
                            <span className="text-[11px] font-black uppercase tracking-tighter">{contributor.contributions}</span>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div className="flex gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <button
                            onClick={() => onEdit(contributor)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
                        >
                            <FiEdit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(contributor._id)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-900/20 transition-all"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Info Block */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <FiTarget size={10} /> {contributor.role}
                        </span>
                        <div className="h-px flex-1 bg-zinc-900/50"></div>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight group-hover:text-purple-400 transition-colors">
                        {contributor.name}
                    </h3>
                </div>

                {/* Social Nodes */}
                <div className="mt-auto pt-8 border-t border-zinc-900/50 flex items-center gap-4">
                    {contributor.github && (
                        <a
                            href={contributor.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all group/node"
                        >
                            <FiGithub size={20} className="group-hover/node:scale-110 transition-transform" />
                        </a>
                    )}
                    {contributor.linkedin && (
                        <a
                            href={contributor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-blue-400 hover:bg-zinc-800 transition-all group/node"
                        >
                            <FiLinkedin size={20} className="group-hover/node:scale-110 transition-transform" />
                        </a>
                    )}
                    {contributor.twitter && (
                        <a
                            href={contributor.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-sky-400 hover:bg-zinc-800 transition-all group/node"
                        >
                            <FiTwitter size={20} className="group-hover/node:scale-110 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
