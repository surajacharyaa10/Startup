"use client";

import { useRef } from "react";
import { FiSave, FiX, FiUploadCloud, FiUser, FiZap, FiGithub, FiLinkedin, FiTwitter, FiGrid, FiTarget, FiHash } from "react-icons/fi";
import API_URL from "@/app/api/url";

interface ContributorFormProps {
    formData: any;
    editingContributor: any;
    saving: boolean;
    avatarPreview: string | null;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function ContributorForm({
    formData,
    editingContributor,
    saving,
    avatarPreview,
    onReset,
    onChange,
    onAvatarChange,
    onSubmit,
}: ContributorFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500 mb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-800/10 via-zinc-800/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-white">
                        <FiUser size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingContributor ? "Update Identity" : "Recruit Talent"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Personnel Integration & Legacy Maintenance
                        </p>
                    </div>
                </div>
                {editingContributor && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-700 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800"
                    >
                        <FiX size={18} /> DISCONTINUE
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

                    {/* Visual Asset & Matrix */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Digital Fingerprint (Avatar)</label>
                            <div className="relative group">
                                <div className="w-full aspect-square rounded-[3rem] bg-zinc-900 border-4 border-dashed border-zinc-800 group-hover:border-white/20 transition-all overflow-hidden relative shadow-inner">
                                    {avatarPreview ? (
                                        <>
                                            <img
                                                src={avatarPreview.startsWith("http") || avatarPreview.startsWith("data:") ? avatarPreview : `${API_URL}/${avatarPreview}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all flex-col gap-3">
                                                <FiUploadCloud size={40} className="text-white animate-bounce" />
                                                <span className="text-white font-black text-[10px] uppercase tracking-widest px-4 text-center">Update Identification</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-700 p-8 text-center">
                                            <FiUser size={64} />
                                            <span className="font-black text-[10px] uppercase tracking-widest">Awaiting Capture (1:1 Ratio)</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onAvatarChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 bg-zinc-900/50 border border-zinc-900 rounded-[2.5rem]">
                                <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                    <FiZap size={14} className="text-yellow-500 fill-yellow-500" /> Strategic Impact
                                </h4>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Contributions Count</label>
                                    <input
                                        type="number"
                                        name="contributions"
                                        value={formData.contributions}
                                        onChange={onChange}
                                        className="w-full h-16 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 text-white font-black text-2xl focus:ring-1 focus:ring-white/10 outline-none shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Core Parameters */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiTarget size={12} className="text-white" /> Full Designation (Name)
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={onChange}
                                    required
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all shadow-inner"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                    <FiGrid size={12} className="text-white" /> Strategic Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={onChange}
                                    required
                                    placeholder="e.g. Lead Core Architect"
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-bold uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all italic"
                                />
                            </div>
                        </div>

                        {/* Social Uplinks */}
                        <div className="p-10 bg-zinc-900/30 border border-zinc-900 rounded-[3.5rem] space-y-10">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] flex items-center gap-3">
                                <FiHash size={14} /> Network Connectivity Uplinks
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                        <FiGithub size={12} /> Github Node
                                    </label>
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-mono text-[10px] focus:ring-1 focus:ring-white/10 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                        <FiLinkedin size={12} /> LinkedIn Node
                                    </label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-mono text-[10px] focus:ring-1 focus:ring-white/10 transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                                        <FiTwitter size={12} /> Twitter Node
                                    </label>
                                    <input
                                        type="url"
                                        name="twitter"
                                        value={formData.twitter}
                                        onChange={onChange}
                                        className="w-full h-14 bg-zinc-950 border border-zinc-800 rounded-xl px-6 text-white font-mono text-[10px] focus:ring-1 focus:ring-white/10 transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-white hover:bg-zinc-100 text-black rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-[0.96] group/btn"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <FiSave size={28} />
                                        <span>{editingContributor ? "UPDATE LEGACY DATA" : "COMMIT NEW TALENT"}</span>
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
