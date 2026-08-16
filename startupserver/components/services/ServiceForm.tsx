"use client";

import { ServiceInput, Service } from "@/lib/types/services";
import { FiSave, FiX, FiBriefcase, FiZap, FiLayout, FiActivity, FiSmile } from "react-icons/fi";

interface ServiceFormProps {
    formData: ServiceInput;
    editingService: Service | null;
    saving: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onCancel: () => void;
}

export default function ServiceForm({
    formData,
    editingService,
    saving,
    onSubmit,
    onChange,
    onCancel,
}: ServiceFormProps) {
    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(37,99,235,0.1)] rounded-[3rem] overflow-hidden border border-zinc-800/50 animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent px-12 py-10 border-b border-zinc-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl">
                        <FiBriefcase size={32} className="text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingService ? "Reconfigure Module" : "Integrate Solution"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Service Infrastructure Management
                        </p>
                    </div>
                </div>
                {editingService && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800 shadow-xl"
                    >
                        <FiX size={18} /> DISCONTINUE RECONFIG
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Side: Identity */}
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiLayout size={12} className="text-blue-500" /> Module Designation
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                required
                                placeholder="e.g. Advanced AI Integration"
                                className="w-full text-2xl font-black bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-6 text-white placeholder:text-zinc-800 focus:ring-2 focus:ring-blue-500/30 transition-all uppercase tracking-tighter"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiZap size={12} className="text-blue-500" /> System Capabilities
                            </label>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={onChange}
                                required
                                rows={4}
                                placeholder="Define the primary functions and client values..."
                                className="w-full text-lg font-medium bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-6 text-zinc-400 placeholder:text-zinc-800 focus:ring-2 focus:ring-blue-500/30 transition-all leading-relaxed italic"
                            />
                        </div>
                    </div>

                    {/* Right Side: Visual Specs */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiSmile size={12} className="text-blue-500" /> Visual Avatar (Icon/Emoji)
                                </label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={onChange}
                                    required
                                    maxLength={10}
                                    className="w-full h-20 text-center text-4xl bg-zinc-900 border border-zinc-800 rounded-3xl focus:ring-2 focus:ring-blue-500/30 transition-all shadow-inner"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiActivity size={12} className="text-blue-500" /> Chromatic Signature (Tailwind)
                                </label>
                                <input
                                    type="text"
                                    name="bg"
                                    value={formData.bg}
                                    onChange={onChange}
                                    required
                                    placeholder="from-blue-600 to-indigo-600"
                                    className="w-full h-20 font-mono text-[10px] uppercase bg-zinc-900 border border-zinc-800 rounded-3xl px-6 text-emerald-500 focus:ring-2 focus:ring-blue-500/30 transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="pt-10">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 hover:from-blue-500 hover:to-indigo-500 text-white rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(37,99,235,0.3)] active:scale-[0.96] group/btn relative overflow-hidden disabled:grayscale"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave size={28} />
                                        <span>{editingService ? "COMMIT MODULE CHANGES" : "INITIALIZE NEW MODULE"}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
