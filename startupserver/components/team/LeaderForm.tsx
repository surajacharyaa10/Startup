"use client";

import { useRef } from "react";
import { FiSave, FiX, FiUser, FiLinkedin, FiTwitter, FiMail, FiUploadCloud, FiAward, FiFileText } from "react-icons/fi";

interface LeaderFormProps {
    formData: any;
    editingLeader: any;
    saving: boolean;
    imagePreview: string | null;
    onReset: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    fileRef: React.RefObject<HTMLInputElement | null>;
}

export default function LeaderForm({
    formData,
    editingLeader,
    saving,
    imagePreview,
    onReset,
    onChange,
    onImageChange,
    onSubmit,
    fileRef,
}: LeaderFormProps) {
    return (
        <div className="bg-zinc-950 shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-[3rem] overflow-hidden border border-zinc-900 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-gradient-to-r from-zinc-800/10 via-zinc-800/5 to-transparent px-12 py-10 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl text-white">
                        <FiAward size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            {editingLeader ? "Refine Protocol" : "Enlist Leader"}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">
                            Leadership Registry & Talent Authorization
                        </p>
                    </div>
                </div>
                {editingLeader && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-zinc-800"
                    >
                        <FiX size={18} /> DISCONTINUE
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-10 lg:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

                    {/* Avatar Area */}
                    <div className="lg:col-span-4 flex flex-col items-center">
                        <div className="relative group w-full max-w-[280px]">
                            <div className="aspect-square rounded-[3rem] bg-zinc-900 border-4 border-dashed border-zinc-800 group-hover:border-white/20 transition-all overflow-hidden relative shadow-inner">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all flex-col gap-3">
                                            <FiUploadCloud size={40} className="text-white animate-bounce" />
                                            <span className="text-white font-black text-[10px] uppercase tracking-widest">Update Identification</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-700">
                                        <FiUser size={64} />
                                        <span className="font-black text-[10px] uppercase tracking-widest">Awaiting Capture</span>
                                    </div>
                                )}
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={onImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                            </div>
                        </div>

                        <div className="mt-10 w-full space-y-6">
                            <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-2xl">
                                <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <FiLinkedin size={12} /> Social Integrity (LinkedIn)
                                </h4>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={onChange}
                                    placeholder="https://linkedin.com/in/..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 font-mono text-[10px] focus:ring-1 focus:ring-white/10 outline-none"
                                />
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-900 rounded-2xl">
                                <h4 className="text-[9px] font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <FiTwitter size={12} /> Comms Uplink (Twitter)
                                </h4>
                                <input
                                    type="url"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={onChange}
                                    placeholder="https://twitter.com/..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 font-mono text-[10px] focus:ring-1 focus:ring-white/10 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Leader Designation (Name)</label>
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
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2">Strategic Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={onChange}
                                    required
                                    className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-white font-black uppercase text-xs tracking-widest focus:ring-2 focus:ring-white/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiMail size={12} className="text-white" /> Direct Channel (Email)
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="leader@network.core"
                                className="w-full h-16 bg-zinc-900 border border-zinc-800 rounded-2xl px-8 text-blue-500 font-mono text-[10px] focus:ring-2 focus:ring-white/10 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                                <FiFileText size={12} className="text-white" /> Professional Dossier (Bio)
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={onChange}
                                rows={6}
                                placeholder="Synthesize professional trajectory..."
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-[2rem] px-8 py-6 text-zinc-400 font-medium text-sm leading-relaxed italic focus:ring-2 focus:ring-white/10 transition-all"
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full h-24 bg-white hover:bg-zinc-200 text-black rounded-[2.5rem] transition-all font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 shadow-[0_10px_40px_rgba(255,255,255,0.1)] active:scale-[0.96] group/btn"
                            >
                                {saving ? (
                                    <div className="w-8 h-8 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <FiSave size={28} />
                                        <span>{editingLeader ? "AUTHORIZE UPDATES" : "DECODE & REGISTER"}</span>
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
