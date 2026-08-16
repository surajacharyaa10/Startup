"use client";

import { Department } from "@/lib/types/teamDepartment";
import { FiEdit2, FiTrash2, FiUsers, FiHexagon } from "react-icons/fi";

interface DepartmentCardProps {
    dept: Department;
    onEdit: (dept: Department) => void;
    onDelete: (id: string) => void;
}

export default function DepartmentCard({ dept, onEdit, onDelete }: DepartmentCardProps) {
    return (
        <div className="group relative bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 hover:border-zinc-700 transition-all duration-500 overflow-hidden">
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <FiHexagon size={120} className="text-white rotate-12" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundColor: dept.color || "#27272a" }}
                    >
                        {dept.icon || "💼"}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-1">
                            {dept.name}
                        </h3>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <FiUsers size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{dept.members} OPERATIVES</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-zinc-900/50">
                    <button
                        onClick={() => onEdit(dept)}
                        className="flex-1 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
                    >
                        <FiEdit2 size={12} /> RE-STRUCTURE
                    </button>
                    <button
                        onClick={() => onDelete(dept._id)}
                        className="flex-1 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 hover:border-red-900/20 transition-all font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
                    >
                        <FiTrash2 size={12} /> DISSOLVE
                    </button>
                </div>
            </div>
        </div>
    );
}
