"use client";

import { Project } from "@/lib/types/project";
import { FiEdit2, FiTrash2, FiStar, FiUsers, FiCpu, FiCheckCircle } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
    const getImageUrl = (image: string) => {
        if (!image) return "";
        return image.startsWith('/uploads') ? `${API_URL}${image}` : image;
    };

    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] overflow-hidden hover:border-emerald-500/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(16,185,129,0.05)] flex flex-col h-full">
            {/* Maturity Badge */}
            <div className="absolute top-6 left-6 z-20">
                <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-white tracking-[0.2em] uppercase">{project.maturity} MATURITY</span>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative h-64 bg-zinc-900 overflow-hidden">
                {project.image ? (
                    <img
                        src={getImageUrl(project.image)}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-800">
                        <FiCpu size={64} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
            </div>

            <div className="p-10 flex flex-col flex-1">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{project.name}</h3>
                    </div>
                    <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] ml-4">{project.tagline}</p>
                </div>

                <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-xl italic">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-900 flex items-center gap-4">
                            <FiUsers className="text-emerald-500" />
                            <div className="flex flex-col">
                                <span className="text-white font-black text-lg leading-none">{project.contributors}</span>
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Architects</span>
                            </div>
                        </div>
                        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-900 flex items-center gap-4">
                            <FiStar className="text-emerald-500" />
                            <div className="flex flex-col">
                                <span className="text-white font-black text-lg leading-none">{project.stars}</span>
                                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Endorsements</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FiCheckCircle className="text-emerald-500" size={14} />
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{project.status}</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(project)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xl active:scale-95"
                        >
                            <FiEdit2 size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(project._id)}
                            className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 hover:border-red-900/20 flex items-center justify-center transition-all shadow-xl active:scale-95"
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
