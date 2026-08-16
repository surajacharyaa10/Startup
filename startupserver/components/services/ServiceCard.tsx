"use client";

import { Service, ServiceInput } from "@/lib/types/services";
import { FiEdit2, FiTrash2, FiActivity } from "react-icons/fi";

interface ServiceCardProps {
    service: Service;
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
}

export default function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[3rem] p-8 overflow-hidden hover:border-blue-500/20 transition-all duration-500 hover:shadow-[0_0_80px_rgba(59,130,246,0.05)] flex flex-col justify-between h-full">
            {/* Dynamic Background Glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${service.bg} blur-[120px] rounded-full translate-x-32 -translate-y-32 opacity-20 group-hover:opacity-40 transition-opacity`}></div>

            <div className="relative z-10">
                <div className={`w-20 h-20 mb-8 bg-gradient-to-br ${service.bg} rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <span className="drop-shadow-lg">{service.icon}</span>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
                            {service.title}
                        </h3>
                    </div>

                    <p className="text-zinc-500 text-sm font-medium leading-relaxed italic">
                        "{service.desc}"
                    </p>
                </div>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-zinc-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <FiActivity className="text-blue-500" size={14} />
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Active System Module</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(service)}
                        className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-all shadow-xl active:scale-95"
                    >
                        <FiEdit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(service._id)}
                        className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 hover:border-red-900/20 flex items-center justify-center transition-all shadow-xl active:scale-95"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
