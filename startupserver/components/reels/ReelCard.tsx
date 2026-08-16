"use client";

import { Reel } from "@/lib/types/reel";
import { FiTrash2, FiPlay, FiVideo, FiClock } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface ReelCardProps {
    reel: Reel;
    onDelete: (id: string) => void;
}

export default function ReelCard({ reel, onDelete }: ReelCardProps) {
    const videoUrl = (url: string) => {
        if (!url) return "";
        return url.startsWith("http") ? url : `${API_URL}/${url}`;
    };

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden hover:border-blue-500/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.05)] flex flex-col h-full ring-1 ring-zinc-900/50">
            {/* Video Container */}
            <div className="relative aspect-[9/16] bg-black overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                <video
                    className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                    src={videoUrl(reel.videoUrl)}
                    controls
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

                {/* Play Icon Placeholder (Visual only when not playing) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <FiPlay className="text-white ml-1" size={24} />
                    </div>
                </div>
            </div>

            {/* Info & Actions */}
            <div className="p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-blue-500 transition-colors">
                            {reel.title}
                        </h3>
                        <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                            <FiClock className="text-blue-600" />
                            <span>DEEPLOYED {new Date(reel.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => onDelete(reel._id)}
                        className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 hover:border-red-900/20 flex items-center justify-center transition-all shadow-xl active:scale-95 shrink-0"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>

                <div className="pt-6 border-t border-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">REEL SECTOR</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-700">
                        <FiVideo size={10} />
                        <span className="text-[8px] font-black uppercase tracking-widest">MP4 DATA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
