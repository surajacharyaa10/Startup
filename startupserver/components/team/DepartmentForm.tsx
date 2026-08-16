"use client";

import { FiSave, FiX, FiUsers, FiGrid, FiHexagon } from "react-icons/fi";

interface DepartmentFormProps {
    formData: any;
    editingDept: any;
    saving: boolean;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function DepartmentForm({
    formData,
    editingDept,
    saving,
    onReset,
    onChange,
    onSubmit,
}: DepartmentFormProps) {
    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-r from-zinc-800/10 via-zinc-800/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-white">
                        <FiHexagon size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingDept ? "Adjust Architecture" : "Initialize Unit"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Cluster Definition & Resource Allocation
                        </p>
                    </div>
                </div>
                {editingDept && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800"
                    >
                        <FiX size={18} /> ABORT
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Unit Identity (Name)</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                            className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Operative Count (Members)</label>
                        <input
                            type="number"
                            name="members"
                            value={formData.members}
                            onChange={onChange}
                            min={0}
                            required
                            className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Chroma Identification (Color)</label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={onChange}
                                placeholder="#3b82f6"
                                className="flex-1 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-zinc-400 font-mono text-[10px] focus:ring-2 focus:ring-white/10 transition-all"
                            />
                            <div
                                className="w-16 h-16 rounded-2xl border border-zinc-800 shadow-xl shrink-0"
                                style={{ backgroundColor: formData.color || "transparent" }}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Visual Marker (Icon)</label>
                        <input
                            type="text"
                            name="iconText"
                            value={formData.iconText}
                            onChange={onChange}
                            placeholder="e.g. 💼 or 🏢"
                            className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-3xl flex items-center justify-center text-center focus:ring-2 focus:ring-white/10 transition-all"
                        />
                    </div>
                </div>

                <div className="mt-14">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full h-20 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white rounded-[2rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 active:scale-[0.98] group/btn"
                    >
                        {saving ? (
                            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <FiSave size={24} />
                                <span>{editingDept ? "DECODE & UPDATE" : "INITIALIZE SECTOR"}</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
